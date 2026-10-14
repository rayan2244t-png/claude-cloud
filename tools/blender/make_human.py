# Персонаж в стиле Untitled Goose Game (как садовник): собирается в Blender скриптом.
# Запуск:  python tools/blender/make_human.py   (нужен пакет bpy: pip install bpy)
# Результат: public/models/human.glb — одна модель со скелетом и анимациями,
# варианты (причёски, головные уборы, фартук, комбинезон…) — отдельные части, игра включает нужные
# и перекрашивает материалы под каждого персонажа.
#
# Оси Blender: Z — вверх, персонаж смотрит в −Y (после экспорта в glTF — в +Z, как в игре).
import math
import os
import sys

import bpy  # noqa: I001 — bmesh доступен только после bpy
import bmesh
from mathutils import Matrix, Vector

OUT = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(
    os.path.dirname(__file__), '..', '..', 'public', 'models', 'human.glb')
PREVIEW = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ---------------------------------------------------------------- материалы
# Имена материалов — «слоты», которые игра перекрашивает
SLOTS = {
    'skin': '#c98f63', 'top': '#a8c3e0', 'collar': '#bcd3ea', 'pants': '#7f9a7c', 'shoes': '#3f4a3a',
    'hands': '#5a4030', 'hair': '#5a3a28', 'hat': '#7a4a33', 'overall': '#7f9a7c', 'apron': '#f2ece0',
    'skirt': '#7a5c8a', 'bag': '#d9a441', 'dark': '#2e3238', 'phones': '#e07a5f',
}
MATS = {}
for name, hexc in SLOTS.items():
    m = bpy.data.materials.new(name)
    c = [int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    m.diffuse_color = (*[x ** 2.2 for x in c], 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*[x ** 2.2 for x in c], 1)
    bsdf.inputs['Roughness'].default_value = 1.0
    MATS[name] = m


# ---------------------------------------------------------------- геометрия
def loft(name, rings, mat, seg=16, subsurf=1, cap=(True, True), xform=None):
    """Гладкое тело из колец: rings = [(z, rx, ry, cx, cy), …] снизу вверх."""
    bm = bmesh.new()
    loops = []
    for ring in rings:
        z, rx, ry = ring[:3]
        cx = ring[3] if len(ring) > 3 else 0
        cy = ring[4] if len(ring) > 4 else 0
        loop = []
        for j in range(seg):
            a = 2 * math.pi * j / seg - math.pi / 2
            v = Vector((cx + rx * math.cos(a), cy + ry * math.sin(a), z))
            if xform:
                v = xform @ v
            loop.append(bm.verts.new(v))
        loops.append(loop)
    for i in range(len(loops) - 1):
        for j in range(seg):
            bm.faces.new((loops[i][j], loops[i][(j + 1) % seg], loops[i + 1][(j + 1) % seg], loops[i + 1][j]))
    if cap[0]:
        bm.faces.new(list(reversed(loops[0])))
    if cap[1]:
        bm.faces.new(loops[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    scene.collection.objects.link(ob)
    me.materials.append(MATS[mat])
    if subsurf:
        mod = ob.modifiers.new('sub', 'SUBSURF')
        mod.levels = subsurf
        mod.render_levels = subsurf
        bpy.context.view_layer.objects.active = ob
        ob.select_set(True)
        bpy.ops.object.modifier_apply(modifier='sub')
        ob.select_set(False)
    for p in me.polygons:
        p.use_smooth = True
    return ob


def blob(name, center, radii, mat, seg=14, subsurf=1):
    """Округлая «капля»: эллипсоид из колец."""
    cx, cy, cz = center
    rx, ry, rz = radii
    rings = []
    n = 8
    for i in range(n + 1):
        t = -math.pi / 2 + math.pi * i / n
        k = max(math.cos(t), 0.08)
        rings.append((cz + rz * math.sin(t), rx * k, ry * k, cx, cy))
    return loft(name, rings, mat, seg=seg, subsurf=subsurf)


def along(p0, p1):
    """Матрица, ставящая ось Z лофта вдоль отрезка p0→p1."""
    p0, p1 = Vector(p0), Vector(p1)
    d = (p1 - p0)
    rot = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_matrix().to_4x4()
    return Matrix.Translation(p0) @ rot, d.length


def tube(name, p0, p1, r0, r1, mat, seg=12, subsurf=1, round_ends=True):
    xf, L = along(p0, p1)
    rings = []
    if round_ends:
        rings += [(-r0 * 0.7, r0 * 0.45, r0 * 0.45), (-r0 * 0.35, r0 * 0.9, r0 * 0.9)]
    rings += [(0, r0, r0), (L * 0.5, (r0 + r1) / 2 * 1.02, (r0 + r1) / 2 * 1.02), (L, r1, r1)]
    if round_ends:
        rings += [(L + r1 * 0.35, r1 * 0.9, r1 * 0.9), (L + r1 * 0.7, r1 * 0.45, r1 * 0.45)]
    return loft(name, rings, mat, seg=seg, subsurf=subsurf, xform=xf)


# ---------------------------------------------------------------- скелет
HEAD_Z = 1.66  # центр головы

J = {  # суставы (Blender, Z вверх, лицом в −Y)
    'hips': (0, 0, 0.84), 'spine': (0, 0, 1.0), 'chest': (0, 0, 1.18), 'neck': (0, 0, 1.42), 'head': (0, 0, 1.5), 'top': (0, 0, 1.95),
}
BONES = [
    ('hips', J['hips'], J['spine'], None),
    ('spine', J['spine'], J['chest'], 'hips'),
    ('chest', J['chest'], J['neck'], 'spine'),
    ('neck', J['neck'], J['head'], 'chest'),
    ('head', J['head'], J['top'], 'neck'),
]
for s, x in (('L', 1), ('R', -1)):
    BONES += [
        (f'upperarm.{s}', (0.255 * x, 0.0, 1.37), (0.3 * x, 0.01, 1.1), 'chest'),
        (f'forearm.{s}', (0.3 * x, 0.01, 1.1), (0.31 * x, -0.02, 0.87), f'upperarm.{s}'),
        (f'hand.{s}', (0.31 * x, -0.02, 0.87), (0.31 * x, -0.03, 0.74), f'forearm.{s}'),
        (f'thigh.{s}', (0.125 * x, 0.0, 0.84), (0.125 * x, 0.0, 0.46), 'hips'),
        (f'shin.{s}', (0.125 * x, 0.0, 0.46), (0.125 * x, 0.02, 0.12), f'thigh.{s}'),
        (f'foot.{s}', (0.125 * x, 0.02, 0.12), (0.125 * x, -0.17, 0.05), f'shin.{s}'),
    ]

arm_data = bpy.data.armatures.new('Rig')
rig = bpy.data.objects.new('Rig', arm_data)
scene.collection.objects.link(rig)
bpy.context.view_layer.objects.active = rig
bpy.ops.object.mode_set(mode='EDIT')
for name, h, t, parent in BONES:
    b = arm_data.edit_bones.new(name)
    b.head, b.tail = h, t
    # Ось X кости — вдоль мировой X (ровные повороты для анимации)
    b.align_roll(Vector((0, -1, 0)) if abs(t[2] - h[2]) > abs(t[1] - h[1]) else Vector((0, 0, 1)))
    if parent:
        b.parent = arm_data.edit_bones[parent]
        b.use_connect = (Vector(arm_data.edit_bones[parent].tail) - Vector(h)).length < 1e-4
bpy.ops.object.mode_set(mode='OBJECT')
SEGS = {name: (Vector(h), Vector(t)) for name, h, t, _ in BONES}


def seg_dist(p, a, b):
    ab = b - a
    t = max(0, min(1, (p - a).dot(ab) / ab.length_squared))
    return (p - (a + ab * t)).length


HEAD_SCALE = 1.17  # голова крупнее, как у жителей деревни в Goose Game
HEAD_LIFT = 0.03


def skin(ob, bones, sharp=6):
    """Веса по расстоянию до костей (плавно в суставах), только среди разрешённых костей."""
    if bones == ['head']:
        c = Vector((0, -0.01, HEAD_Z - 0.12))  # масштаб от подбородка: голова растёт вверх и в стороны
        for v in ob.data.vertices:
            v.co = c + (v.co - c) * HEAD_SCALE + Vector((0, 0, HEAD_LIFT))
    groups = {b: ob.vertex_groups.new(name=b) for b in bones}
    for v in ob.data.vertices:
        ds = sorted(((seg_dist(v.co, *SEGS[b]), b) for b in bones))[:2]
        ws = [(1 / (d + 0.015) ** sharp, b) for d, b in ds]
        tot = sum(w for w, _ in ws)
        for w, b in ws:
            if w / tot > 0.02:
                groups[b].add([v.index], w / tot, 'REPLACE')
    mod = ob.modifiers.new('rig', 'ARMATURE')
    mod.object = rig
    ob.parent = rig
    return ob


def join(name, obs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    bpy.ops.object.join()
    ob = bpy.context.active_object
    ob.name = name
    ob.data.name = name
    return ob




def build_body(tag, f=False):
    """Базовое тело: голова, туловище, руки, ноги, обувь. f — женский силуэт."""
    sh = 0.9 if f else 1.0  # ширина плеч
    parts = []
    # Голова-«яйцо»: шире к щекам, сужается к макушке; чуть вытянута вперёд-назад
    head_rings = []
    for i in range(11):
        t = -math.pi / 2 + math.pi * i / 10
        k = max(math.cos(t), 0.06) ** 0.8  # чуть «квадратнее» — овал как у садовника
        z = HEAD_Z + 0.21 * math.sin(t)
        bulge = 1 + 0.05 * max(0, -math.sin(t))  # чуть шире к подбородку
        head_rings.append((z, 0.17 * k * bulge, 0.18 * k * bulge, 0, -0.01))
    parts.append(skin(loft(f'{tag}_skull', head_rings, 'skin', seg=20, subsurf=2), ['head']))
    parts.append(skin(tube(f'{tag}_neck', (0, 0, 1.38), (0, 0, 1.52), 0.075, 0.07, 'skin', round_ends=False), ['neck', 'head', 'chest']))
    # Нос «картошкой»
    parts.append(skin(tube(f'{tag}_nose', (0, -0.16, HEAD_Z + 0.0), (0, -0.215, HEAD_Z - 0.025), 0.05 if f else 0.06, 0.06 if f else 0.075, 'skin', seg=14), ['head']))
    # Уши
    for x in (1, -1):
        parts.append(skin(blob(f'{tag}_ear{x}', (0.172 * x, 0.0, HEAD_Z + 0.0), (0.03, 0.055, 0.07), 'skin'), ['head']))
    # Туловище: от пояса к широким покатым плечам
    torso = [
        (0.8, 0.225 * sh, 0.18), (0.92, 0.24 * sh, 0.205, 0, -0.02), (1.06, 0.245 * sh, 0.21, 0, -0.02), (1.2, 0.245 * sh, 0.19, 0, -0.005),
        (1.31, 0.245 * sh, 0.17, 0, 0.01), (1.38, 0.22 * sh, 0.14, 0, 0.015), (1.43, 0.14 * sh, 0.1, 0, 0.01), (1.46, 0.08, 0.07),
    ]
    if f:
        torso[1] = (0.92, 0.19, 0.16)
        torso[3] = (1.2, 0.24, 0.18)
    parts.append(skin(loft(f'{tag}_torso', torso, 'top', seg=18), ['hips', 'spine', 'chest']))
    # Воротничок рубашки — два уголка
    for x in (1, -1):
        c = loft(f'{tag}_collar{x}', [(0, 0.075, 0.014), (0.11, 0.05, 0.012), (0.17, 0.006, 0.006)], 'collar', seg=8, subsurf=1,
                 xform=Matrix.Translation((0.075 * x, -0.115, 1.45)) @ Matrix.Rotation(math.radians(-50 * x), 4, 'Y') @ Matrix.Rotation(math.radians(130), 4, 'X'))
        parts.append(skin(c, ['chest']))
    # Таз/брюки и ноги
    parts.append(skin(loft(f'{tag}_pelvis', [(0.62, 0.22 * sh, 0.17), (0.76, 0.232 * sh, 0.18), (0.86, 0.228 * sh, 0.18)], 'pants', seg=16),
                      ['hips', 'thigh.L', 'thigh.R']))
    for x, s in ((1, 'L'), (-1, 'R')):
        parts.append(skin(tube(f'{tag}_leg{s}', (0.12 * x, 0, 0.8), (0.125 * x, 0.01, 0.3), 0.14, 0.13, 'pants', seg=14),
                          ['hips', f'thigh.{s}', f'shin.{s}']))
        # Сапоги: крупные, с округлым носком
        boot = loft(f'{tag}_boot{s}', [
            (0.0, 0.085, 0.15, 0, -0.045), (0.05, 0.09, 0.155, 0, -0.05), (0.1, 0.088, 0.13, 0, -0.03),
            (0.16, 0.088, 0.095, 0, -0.005), (0.3, 0.098, 0.1, 0, 0.0), (0.38, 0.11, 0.11, 0, 0.0), (0.4, 0.105, 0.105, 0, 0.0),
        ], 'shoes', seg=14, xform=Matrix.Translation((0.125 * x, 0.0, 0.0)))
        parts.append(skin(boot, [f'shin.{s}', f'foot.{s}']))
        # Рукава
        parts.append(skin(tube(f'{tag}_arm{s}', (0.225 * x * sh, 0, 1.34), (0.3 * x, -0.03, 0.87), 0.085, 0.07, 'top', seg=14),
                          ['chest', f'upperarm.{s}', f'forearm.{s}']))
        # Ладонь-рукавица с большим пальцем
        parts.append(skin(blob(f'{tag}_hand{s}', (0.305 * x, -0.04, 0.77), (0.072, 0.088, 0.105), 'hands'), [f'hand.{s}', f'forearm.{s}']))
        parts.append(skin(blob(f'{tag}_thumb{s}', (0.275 * x, -0.11, 0.81), (0.033, 0.04, 0.05), 'hands'), [f'hand.{s}']))
    return join(f'body_{tag}', parts)


def head_piece(name, obs):
    for o in obs:
        skin(o, ['head'])
    return join(name, obs) if len(obs) > 1 else obs[0].__setattr__('name', name) or obs[0]


build_body('m')
build_body('f', f=True)

# ---------------------------------------------------------------- волосы
HZ = HEAD_Z


def cap_shell(name, mat, z0, front_cut=0.0, r=1.06, seg=18):
    """Оболочка на затылке/макушке: кольца головы, увеличенные, срезанные спереди."""
    rings = []
    for i in range(z0, 11):
        t = -math.pi / 2 + math.pi * i / 10
        k = max(math.cos(t), 0.06)
        rings.append((HZ + 0.2 * math.sin(t) * r + 0.005, 0.17 * k * r, 0.18 * k * r, 0, -0.01 + front_cut))
    return loft(name, rings, mat, seg=seg, subsurf=1)


short = cap_shell('hair_short_cap', 'hair', 5, front_cut=0.035)
burns = [blob(f'burn{x}', (0.158 * x, -0.04, HZ - 0.01), (0.025, 0.04, 0.07), 'hair') for x in (1, -1)]
head_piece('hair_short', [short] + burns)
longh = cap_shell('hair_long_cap', 'hair', 4, front_cut=0.03)
back = blob('hair_long_back', (0, 0.07, HZ - 0.1), (0.17, 0.09, 0.2), 'hair')
sides = [blob(f'hls{x}', (0.155 * x, -0.03, HZ - 0.07), (0.04, 0.06, 0.14), 'hair') for x in (1, -1)]
head_piece('hair_long', [longh, back] + sides)
bunc = cap_shell('hair_bun_cap', 'hair', 5, front_cut=0.035)
bun = blob('hair_bun_ball', (0, 0.06, HZ + 0.21), (0.08, 0.08, 0.075), 'hair')
head_piece('hair_bun', [bunc, bun])
pc = cap_shell('hair_pony_cap', 'hair', 5, front_cut=0.035)
tail = tube('hair_pony_tail', (0, 0.18, HZ + 0.05), (0, 0.24, HZ - 0.18), 0.045, 0.03, 'hair')
head_piece('hair_ponytail', [pc, tail])
curls = [blob(f'curl{i}', (0.17 * math.cos(a), 0.17 * math.sin(a) + 0.01, HZ + 0.1 + 0.03 * math.sin(i * 1.7)), (0.07, 0.07, 0.065), 'hair')
         for i, a in enumerate([k * math.pi * 2 / 11 for k in range(11)]) if math.sin(a) > -0.75]
curls.append(blob('curltop', (0, 0.01, HZ + 0.17), (0.15, 0.15, 0.07), 'hair'))
head_piece('hair_curly', curls)
sp = cap_shell('hair_spiky_cap', 'hair', 5, front_cut=0.02, r=1.09)
tufts = [blob(f'tuft{i}', (0.06 * (i - 2), -0.08 + 0.02 * abs(i - 2), HZ + 0.19 - 0.01 * abs(i - 2)), (0.04, 0.05, 0.05), 'hair') for i in range(5)]
head_piece('hair_spiky', [sp] + tufts)

# ---------------------------------------------------------------- головные уборы
# Плоская кепка садовника: «блин» с козырьком, чуть сдвинута назад
flat = loft('hat_cap_crown', [(0, 0.19, 0.205, 0, 0.01), (0.04, 0.215, 0.235, 0, 0.0), (0.075, 0.2, 0.22, 0, -0.01), (0.095, 0.14, 0.15, 0, -0.01), (0.105, 0.05, 0.05, 0, -0.01)],
            'hat', seg=20, xform=Matrix.Translation((0, 0, HZ + 0.12)) @ Matrix.Rotation(math.radians(-8), 4, 'X'))
brim = loft('hat_cap_brim', [(0, 0.12, 0.05), (0.012, 0.12, 0.05)], 'hat', seg=16, subsurf=1,
            xform=Matrix.Translation((0, -0.19, HZ + 0.12)) @ Matrix.Rotation(math.radians(-12), 4, 'X'))
head_piece('hat_cap', [flat, brim])
beanie = cap_shell('hat_beanie_shell', 'hat', 4, r=1.13)
rim = tube('hat_beanie_rim', (0.0, 0, HZ + 0.02), (0, 0, HZ + 0.07), 0.205, 0.205, 'hat', seg=20, round_ends=False)
pom = blob('hat_beanie_pom', (0, 0.0, HZ + 0.26), (0.045, 0.045, 0.045), 'collar')
head_piece('hat_beanie', [beanie, rim, pom])
paper = loft('hat_paper', [(0, 0.2, 0.09), (0.12, 0.18, 0.02)], 'apron', seg=4, subsurf=0,
             xform=Matrix.Translation((0, 0, HZ + 0.12)) @ Matrix.Rotation(math.radians(45), 4, 'Z'))
head_piece('hat_paper', [paper])

# ---------------------------------------------------------------- аксессуары
glasses = []
for x in (1, -1):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.045, minor_radius=0.009, major_segments=20, minor_segments=6,
                                     location=(0.065 * x, -0.185, HZ + 0.04), rotation=(math.pi / 2, 0, 0))
    g = bpy.context.active_object
    g.data.materials.append(MATS['dark'])
    g.name = f'gl{x}'
    glasses.append(g)
head_piece('glasses', glasses)
head_piece('mustache', [blob('must', (0, -0.21, HZ - 0.07), (0.075, 0.03, 0.022), 'hair')])
band = tube('ph_band', (-0.18, 0, HZ + 0.02), (0.18, 0, HZ + 0.02), 0.018, 0.018, 'dark', seg=8, round_ends=False)
cups = [blob(f'cup{x}', (0.18 * x, 0, HZ), (0.035, 0.06, 0.06), 'phones') for x in (1, -1)]
head_piece('headphones', [band] + cups)

# Комбинезон (нагрудник + лямки) — как у садовника
bib = loft('overall_bib', [(0.6, 0.232, 0.182), (0.78, 0.247, 0.192), (0.95, 0.252, 0.217, 0, -0.02), (1.1, 0.252, 0.212, 0, -0.015), (1.24, 0.25, 0.195)], 'overall', seg=18, cap=(False, False))
straps = [loft(f'strap{x}', [(0, 0.035, 0.008), (0.24, 0.035, 0.008)], 'overall', seg=8, subsurf=1, xform=Matrix.Translation((0.13 * x, -0.17, 1.2)) @ Matrix.Rotation(math.radians(-40), 4, 'X')) for x in (1, -1)]
ov = join('overall', [bib] + straps)
skin(ov, ['hips', 'spine', 'chest'])
# Фартук спереди
apron = loft('apron', [(0.58, 0.245, 0.205, 0, -0.01), (0.8, 0.255, 0.215, 0, -0.012), (0.95, 0.258, 0.232, 0, -0.022), (1.12, 0.258, 0.228, 0, -0.02)], 'apron', seg=18, cap=(False, False))  # поверх туловища, не внутри
skin(apron, ['hips', 'spine', 'chest', 'thigh.L', 'thigh.R'])
# Юбка
skirt = loft('skirt', [(0.5, 0.27, 0.22), (0.7, 0.23, 0.18), (0.86, 0.205, 0.155)], 'skirt', seg=18, cap=(False, False))
skin(skirt, ['hips', 'thigh.L', 'thigh.R'])
# Рюкзак
bag = blob('backpack', (0, 0.22, 1.14), (0.17, 0.09, 0.2), 'bag')
skin(bag, ['chest', 'spine'])

# Чистим «фартук»: передняя половина цилиндра (сзади его не видно — убираем заднюю часть)
for ob_name in ('apron',):
    ob = bpy.data.objects[ob_name]
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().y > 0.02], context='FACES')
    bm.to_mesh(ob.data)
    bm.free()

# ---------------------------------------------------------------- анимации
rig.rotation_mode = 'XYZ'
pb = rig.pose.bones
for b in pb:
    b.rotation_mode = 'XYZ'

FPS = 30
scene.render.fps = FPS


def act(name, frames, keys, loop=True):
    """keys: функция(t от 0 до 1) → {кость: (rx, ry, rz) в градусах, 'hips_z': смещение}"""
    a = bpy.data.actions.new(name)
    a.use_fake_user = True
    rig.animation_data_create()
    rig.animation_data.action = a
    n = frames
    for i in range(n + 1 if loop else n + 1):
        t = i / n
        pose = keys(t)
        for b in pb:
            r = pose.get(b.name, (0, 0, 0))
            # У костей рук и ног (смотрят вниз) ось X направлена наоборот: «вперёд» — это +X.
            # Позы записаны в привычном виде (−X = вперёд, у левой руки −Z = наружу) — переворачиваем.
            if b.name.split('.')[0] in LIMBS:
                r = (-r[0], r[1], -r[2])
            b.rotation_euler = [math.radians(x) for x in r]
            b.keyframe_insert('rotation_euler', frame=i)
            b.location = (0, 0, 0)
            if b.name == 'hips':
                b.location = (0, pose.get('hips_z', 0), 0)  # ось Y кости таза — вверх
                b.keyframe_insert('location', frame=i)
    return a


LIMBS = {'upperarm', 'forearm', 'hand', 'thigh', 'shin'}
S = lambda t, k=1, ph=0: math.sin(2 * math.pi * (t * k + ph))
# Поза садовника: чуть сутулится, голова вперёд, локти согнуты
REST = {'spine': (5, 0, 0), 'chest': (4, 0, 0), 'neck': (6, 0, 0), 'head': (-10, 0, 0),
        'upperarm.L': (-6, 0, -7), 'upperarm.R': (-6, 0, 7), 'forearm.L': (-18, 0, 0), 'forearm.R': (-18, 0, 0)}


def pose(**kw):
    p = dict(REST)
    for k, v in kw.items():
        if k in ('spine', 'chest', 'neck', 'head') and k in REST:
            v = tuple(a + b for a, b in zip(REST[k], v))
        p[k] = v
    return p


act('Idle', 60, lambda t: pose(**{
    'spine': (1.5 * S(t), 0, 0), 'chest': (1.5 * S(t, 1, 0.1), 0, 0), 'head': (2 * S(t, 1, 0.3), 3 * S(t, 0.5), 0),
    'upperarm.L': (2 * S(t), 0, -6), 'upperarm.R': (2 * S(t, 1, 0.5), 0, 6), 'hips_z': 0.004 * S(t, 2)}))

# Шаг: короткий, вперевалку, руки маятником
act('Walk', 24, lambda t: pose(**{
    'thigh.L': (-28 * S(t), 0, 0), 'thigh.R': (28 * S(t), 0, 0),
    'shin.L': (max(0, 35 * S(t, 1, 0.25)), 0, 0), 'shin.R': (max(0, 35 * S(t, 1, 0.75)), 0, 0),
    'foot.L': (10 * S(t, 1, 0.1), 0, 0), 'foot.R': (-10 * S(t, 1, 0.1), 0, 0),
    'upperarm.L': (22 * S(t), 0, -7), 'upperarm.R': (-22 * S(t), 0, 7),
    'forearm.L': (-18 + 8 * S(t), 0, 0), 'forearm.R': (-18 - 8 * S(t), 0, 0),
    'hips': (0, 5 * S(t), 3 * S(t)), 'spine': (4, -4 * S(t), -2 * S(t)), 'head': (-3, 3 * S(t), 0),
    'hips_z': 0.025 * abs(S(t, 1, 0.25))}))

# Говорит: кивает, жестикулирует правой рукой
act('Talk', 48, lambda t: pose(**{
    'head': (6 * S(t, 2), 4 * S(t, 1, 0.2), 4 * S(t, 1)), 'neck': (2 * S(t, 2, 0.2), 0, 0),
    'chest': (2 * S(t, 1), 3 * S(t, 1, 0.3), 0),
    'upperarm.R': (-14 + 6 * S(t, 2), 0, 10 + 5 * S(t, 1)), 'forearm.R': (-38 + 12 * S(t, 2, 0.3), 0, 0), 'hand.R': (0, 25 * S(t, 2), 0),
    'upperarm.L': (-6 + 4 * S(t, 1, 0.5), 0, -6), 'forearm.L': (-20, 0, 0)}))

# Машет рукой
act('Wave', 30, lambda t: pose(**{
    'upperarm.R': (-10, 0, 150), 'forearm.R': (0, 0, 25 * S(t, 2)), 'hand.R': (0, 0, 10 * S(t, 2, 0.1)),
    'head': (-4, 0, -8), 'chest': (0, 0, -4)}))

# Танец
act('Dance', 30, lambda t: pose(**{
    'hips': (0, 25 * S(t, 0.5), 6 * S(t)), 'chest': (0, 0, 8 * S(t)), 'head': (6 * S(t, 2), 0, 8 * S(t)),
    'upperarm.L': (-20, 0, -120 - 20 * S(t)), 'upperarm.R': (-20, 0, 120 + 20 * S(t)), 'forearm.L': (-40, 0, 0), 'forearm.R': (-40, 0, 0),
    'thigh.L': (-20 * S(t), 0, 0), 'thigh.R': (20 * S(t), 0, 0), 'shin.L': (max(0, 30 * S(t, 1, 0.25)), 0, 0), 'shin.R': (max(0, 30 * S(t, 1, 0.75)), 0, 0),
    'hips_z': 0.05 * abs(S(t))}))

# Несёт предмет перед собой
act('Carry', 24, lambda t: pose(**{
    'upperarm.L': (-55, 0, -2), 'upperarm.R': (-55, 0, 2), 'forearm.L': (-35, 0, 0), 'forearm.R': (-35, 0, 0),
    'spine': (-3, 0, 0), 'head': (2 * S(t), 0, 0), 'hips_z': 0.003 * S(t, 2)}))

# Присел (садовник у горшка)
act('Crouch', 30, lambda t: pose(**{
    'hips': (8, 0, 0), 'thigh.L': (-80, 0, 0), 'thigh.R': (-65, 0, 4), 'shin.L': (95, 0, 0), 'shin.R': (110, 0, 0),
    'spine': (18, 0, 0), 'chest': (10, 0, 0), 'head': (-12 + 2 * S(t), 0, 0),
    'upperarm.L': (-50, 0, -10), 'upperarm.R': (-50, 0, 10), 'forearm.L': (-40, 0, 0), 'forearm.R': (-40, 0, 0),
    'hips_z': -0.3}))

rig.animation_data.action = bpy.data.actions['Idle']
scene.frame_set(0)

# ---------------------------------------------------------------- облегчение
# Decimate убирает лишние полигоны, не меняя силуэт (веса костей сохраняются)
for ob in [o for o in scene.objects if o.type == 'MESH']:
    n = len(ob.data.vertices)
    if n < 600:
        continue
    mod = ob.modifiers.new('dec', 'DECIMATE')
    mod.ratio = max(0.25, 1800 / n) if not ob.name.startswith('body') else max(0.3, 4500 / n)
    bpy.context.view_layer.objects.active = ob
    ob.modifiers.move(len(ob.modifiers) - 1, 0)  # до арматуры
    bpy.ops.object.modifier_apply(modifier='dec')
    for p in ob.data.polygons:
        p.use_smooth = True

# ---------------------------------------------------------------- экспорт
os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(
    filepath=os.path.abspath(OUT), export_format='GLB', export_animation_mode='ACTIONS',
    export_yup=True, export_apply=False, export_skins=True, export_morph=False,
    export_force_sampling=True, export_frame_step=1, export_optimize_animation_size=True,
    export_texcoords=False, export_materials='EXPORT',
)
print('saved', os.path.abspath(OUT), os.path.getsize(OUT) // 1024, 'KB')
