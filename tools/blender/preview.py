# Превью персонажа: рендерит human.glb в нескольких позах и нарядах (ракурс как в Goose Game).
# Запуск: python tools/blender/preview.py --out /tmp/preview  (нужен bpy)
import math
import os
import sys

import bpy  # noqa: I001
from mathutils import Vector

GLB = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'models', 'human.glb')
OUT = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else '/tmp/preview'
os.makedirs(OUT, exist_ok=True)

# Наряды: какие части видны и цвета слотов
OUTFITS = [
    ('gardener', ['body_m', 'hair_short', 'hat_cap', 'overall'], {'skin': '#b8774a', 'top': '#a8c3e0', 'pants': '#7f9a7c', 'overall': '#7f9a7c', 'hands': '#5a4030', 'shoes': '#3f4a3a', 'hat': '#7a4a33', 'hair': '#5a3a28'}),
    ('jess', ['body_f', 'hair_bun', 'apron'], {'skin': '#f1c7a5', 'top': '#7fb38a', 'pants': '#4a3f5c', 'hands': '#f1c7a5', 'shoes': '#3a302a', 'hair': '#c4572e'}),
    ('marcus', ['body_m', 'hair_short', 'hat_cap', 'mustache'], {'skin': '#8d5a3b', 'top': '#2f3b52', 'collar': '#f2c230', 'pants': '#3d4a5c', 'hands': '#8d5a3b', 'shoes': '#3a302a', 'hat': '#2f3b52', 'hair': '#1d1d1d'}),
    ('rosa', ['body_f', 'hair_long', 'glasses', 'skirt'], {'skin': '#c99a73', 'top': '#b0577a', 'pants': '#5b4b6b', 'skirt': '#5b4b6b', 'hands': '#c99a73', 'hair': '#d9d4cc'}),
]
POSES = [('Idle', 10), ('Walk', 6), ('Talk', 12), ('Carry', 5), ('Wave', 8), ('Crouch', 5)]


def lin(hexc):
    return [(int(hexc[i:i + 2], 16) / 255) ** 2.2 for i in (1, 3, 5)] + [1]


bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
copies = []
for i, (name, parts, colors) in enumerate(OUTFITS):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.abspath(GLB))
    new = [o for o in bpy.data.objects if o not in before]
    holder = bpy.data.objects.new(f'holder{i}', None)
    scene.collection.objects.link(holder)
    for o in new:
        if o.parent is None:
            o.parent = holder
    holder.location = ((i - 1.5) * 1.1, 0, 0)
    holder.rotation_euler = (0, 0, math.radians(20 - i * 12))
    for o in new:
        if o.type == 'MESH':
            o.hide_render = o.name.split('.')[0] not in parts
            # Свои материалы на каждую копию
            for slot in o.material_slots:
                if slot.material:
                    m = slot.material.copy()
                    base = slot.material.name.split('.')[0]
                    if base in colors:
                        m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = lin(colors[base])
                        m.diffuse_color = lin(colors[base])
                    slot.material = m
    arm = [o for o in new if o.type == 'ARMATURE'][0]
    copies.append(arm)

# Земля, свет, камера сверху под углом
bpy.ops.mesh.primitive_plane_add(size=30)
g = bpy.context.active_object
gm = bpy.data.materials.new('ground')
gm.diffuse_color = lin('#6fa07b')
g.data.materials.append(gm)
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam'))
scene.collection.objects.link(cam)
cam.location = (0, -5.2, 4.4)
target = bpy.data.objects.new('target', None)
scene.collection.objects.link(target)
target.location = (0, 0, 0.8)
tc = cam.constraints.new('TRACK_TO')
tc.target = target
tc.track_axis = 'TRACK_NEGATIVE_Z'
tc.up_axis = 'UP_Y'
cam.data.lens = 42
scene.camera = cam
scene.render.engine = 'BLENDER_WORKBENCH'
sh = scene.display.shading
sh.light = 'FLAT' if '--flat' in sys.argv else 'STUDIO'  # FLAT — плоские цвета, как в Goose Game
sh.color_type = 'MATERIAL'
sh.show_shadows = True
sh.shadow_intensity = 0.12
sh.show_cavity = False
scene.display.light_direction = (0.4, -0.5, 0.75)
scene.render.resolution_x, scene.render.resolution_y = 1100, 640
scene.view_settings.view_transform = 'Standard'

for action_name, frame in POSES:
    act = bpy.data.actions.get(action_name)
    for arm in copies:
        arm.animation_data_create()
        arm.animation_data.action = act
        if hasattr(arm.animation_data, 'action_slot') and act.slots:
            arm.animation_data.action_slot = act.slots[0]
    scene.frame_set(frame)
    scene.render.filepath = os.path.join(OUT, f'{action_name}.png')
    bpy.ops.render.render(write_still=True)
print('ok', OUT)
