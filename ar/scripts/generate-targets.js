import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { mkdir, writeFile } from 'fs/promises';
import { loadImage } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const markerDir = resolve(__dirname, '..', 'markers');
const markers = [
  'marker1.png',
  'marker2.png',
  'marker3.png',
];

async function generate() {
  const imagePaths = markers.map((name) => resolve(markerDir, name));
  const images = await Promise.all(imagePaths.map((path) => loadImage(path)));

  const compiler = new OfflineCompiler();
  await compiler.compileImageTargets(images, (info) => console.log(info));
  const buffer = compiler.exportData();

  const outputDir = resolve(__dirname, '..', 'assets');
  await mkdir(outputDir, { recursive: true });
  const output = resolve(outputDir, 'multi-targets.mind');
  await writeFile(output, buffer);
  console.log(`Generated ${output}`);
}

generate().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
