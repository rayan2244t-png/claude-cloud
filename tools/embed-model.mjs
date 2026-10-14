// Для хостингов, которые не отдают бинарные файлы: встраивает dist/models/human.glb в JS-модуль.
// Запуск после сборки: node tools/embed-model.mjs
import fs from 'fs';
const glb = fs.readFileSync('dist/models/human.glb');
fs.writeFileSync('dist/models/human-glb.js', `export default '${glb.toString('base64')}';\n`);
console.log('dist/models/human-glb.js', Math.round(fs.statSync('dist/models/human-glb.js').size / 1024), 'KB');
