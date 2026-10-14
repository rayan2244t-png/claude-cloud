// Рендер «как Minecraft с шейдерами»: AO, лучи солнца, bloom, цветокоррекция,
// tilt-shift (эффект миниатюры), SMAA, небо со звёздами и отражения окружения.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  EffectComposer, RenderPass, EffectPass, BloomEffect, GodRaysEffect, TiltShiftEffect,
  ToneMappingEffect, ToneMappingMode, VignetteEffect, HueSaturationEffect, BrightnessContrastEffect,
  SMAAEffect, SMAAPreset, KernelSize,
} from 'postprocessing';
import { N8AOPostPass } from 'n8ao';

export const QUALITY = {
  high: { label: 'Высокое', pixelRatio: 2, shadow: 4096, post: true, ao: 'Medium', aoHalf: false, godRays: true, smaa: true },
  medium: { label: 'Среднее', pixelRatio: 1.5, shadow: 2048, post: true, ao: 'Low', aoHalf: true, godRays: false, smaa: false },
  low: { label: 'Низкое (быстро)', pixelRatio: 1, shadow: 1024, post: false },
};

export function defaultQuality() {
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  return coarse ? 'medium' : 'high';
}

// Небо: градиент + солнце/луна + звёзды
function createSky() {
  const uniforms = {
    top: { value: new THREE.Color('#9cc3e0') },
    bottom: { value: new THREE.Color('#d8e8e4') },
    stars: { value: 0 },
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(170, 32, 16),
    new THREE.ShaderMaterial({
      uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 top; uniform vec3 bottom; uniform float stars;
        varying vec3 vDir;
        float h(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
        void main() {
          float t = smoothstep(-0.05, 0.6, vDir.y);
          vec3 col = mix(bottom, top, t);
          vec3 cell = floor(vDir * 220.0);
          float s = step(0.9975, h(cell)) * stars * smoothstep(0.05, 0.3, vDir.y);
          col += vec3(s) * 1.6;
          gl_FragColor = vec4(col, 1.0);
        }`,
    }),
  );
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  return { sky, uniforms };
}

export function createRenderPipeline(container, scene, camera, qualityId) {
  const q = QUALITY[qualityId] || QUALITY.high;
  const renderer = new THREE.WebGLRenderer({
    antialias: !q.post,
    stencil: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, q.pixelRatio));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  if (!q.post) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
  }
  container.appendChild(renderer.domElement);

  // Отражения окружения (стёкла, машины, мокрый асфальт)
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.6;

  const { sky, uniforms: skyUniforms } = createSky();
  scene.add(sky);

  // Диск солнца — источник лучей (god rays)
  const sunDisc = new THREE.Mesh(
    new THREE.SphereGeometry(7, 24, 12),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffe6b0'), fog: false, toneMapped: false, transparent: true }),
  );
  sunDisc.frustumCulled = false;
  scene.add(sunDisc);

  const fx = {};
  let composer = null;
  if (q.post) {
    composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType });
    composer.addPass(new RenderPass(scene, camera));

    const w = container.clientWidth, h = container.clientHeight;
    const ao = new N8AOPostPass(scene, camera, w, h);
    ao.configuration.aoRadius = 1.6;
    ao.configuration.distanceFalloff = 1.0;
    ao.configuration.intensity = 2.4;
    ao.configuration.color = new THREE.Color('#2b2340');
    ao.configuration.halfRes = q.aoHalf;
    ao.setQualityMode(q.ao);
    composer.addPass(ao);
    fx.ao = ao;

    if (q.godRays) {
      fx.godRays = new GodRaysEffect(camera, sunDisc, {
        resolutionScale: 0.5, density: 0.96, decay: 0.93, weight: 0.25, exposure: 0.4, samples: 60, clampMax: 1, blur: true,
      });
      composer.addPass(new EffectPass(camera, fx.godRays));
    }

    fx.bloom = new BloomEffect({ mipmapBlur: true, intensity: 0.55, luminanceThreshold: 0.88, luminanceSmoothing: 0.2, radius: 0.8 });
    fx.hue = new HueSaturationEffect({ saturation: -0.04 });
    fx.contrast = new BrightnessContrastEffect({ brightness: -0.035, contrast: 0.04 });
    fx.tone = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC });
    fx.vignette = new VignetteEffect({ offset: 0.4, darkness: 0.28 });
    composer.addPass(new EffectPass(camera, fx.bloom, fx.hue, fx.contrast, fx.tone, fx.vignette));

    fx.tilt = new TiltShiftEffect({ focusArea: 0.74, feather: 0.26, offset: 0.04, kernelSize: KernelSize.SMALL });
    composer.addPass(new EffectPass(camera, fx.tilt));

    if (q.smaa) composer.addPass(new EffectPass(camera, new SMAAEffect({ preset: SMAAPreset.HIGH })));
  }

  const fwd = new THREE.Vector3(), up = new THREE.Vector3(), right = new THREE.Vector3();

  return {
    renderer,
    quality: q,
    fx,
    sky: skyUniforms,
    sunDisc,
    // azimuth: −1 (запад) … 1 (восток); glow — яркость лучей
    placeSun(azimuth, glow) {
      camera.getWorldDirection(fwd);
      right.crossVectors(fwd, camera.up).normalize();
      up.crossVectors(right, fwd).normalize();
      const dir = fwd.clone()
        .addScaledVector(up, Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.42)))
        .addScaledVector(right, azimuth * 0.55)
        .normalize();
      sunDisc.position.copy(camera.position).addScaledVector(dir, 140);
      sky.position.copy(camera.position);
      sunDisc.visible = glow > 0.01;
      sunDisc.material.opacity = Math.min(1, glow * 1.5);
      if (fx.godRays) fx.godRays.godRaysMaterial.exposure = 0.4 * glow;
    },
    setSize(w, h) {
      renderer.setSize(w, h);
      composer?.setSize(w, h);
    },
    render(dt) {
      if (composer) composer.render(dt);
      else renderer.render(scene, camera);
    },
  };
}
