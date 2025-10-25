import { MindARThree } from 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.module.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const container = document.querySelector('#ar-container');
const startButton = document.querySelector('#start-button');
const overlay = document.querySelector('#ar-overlay');
const hint = overlay.querySelector('.hint');

const anchorsConfig = [
  { index: 0, color: 0xff3b30, label: 'Marker 1', height: 0.1 },
  { index: 1, color: 0x34c759, label: 'Marker 2', height: 0.1 },
  { index: 2, color: 0x007aff, label: 'Marker 3', height: 0.1 },
];

function createLabelTexture(text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return new THREE.CanvasTexture(canvas);
}

function createAnchorContent({ color, label }) {
  const group = new THREE.Group();

  const boxGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.35);
  const boxMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.4,
    metalness: 0.1,
  });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 0, 0.175);

  const labelGeometry = new THREE.PlaneGeometry(0.8, 0.4);
  const labelTexture = createLabelTexture(label, '#111');
  const labelMaterial = new THREE.MeshBasicMaterial({
    map: labelTexture,
    transparent: true,
  });
  const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
  labelMesh.position.set(0, -0.35, 0.02);

  const baseGeometry = new THREE.CircleGeometry(0.6, 64);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.7,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.rotateX(-Math.PI / 2);

  group.add(base);
  group.add(box);
  group.add(labelMesh);

  return { group, box };
}

async function setup() {
  const mindarThree = new MindARThree({
    container,
    maxTrack: 3,
    imageTargetSrc: './assets/multi-targets.mind',
  });

  const { renderer, scene, camera } = mindarThree;

  const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1.2);
  scene.add(light);

  const directional = new THREE.DirectionalLight(0xffffff, 0.6);
  directional.position.set(0.5, 1, 0.5);
  scene.add(directional);

  const animated = [];

  anchorsConfig.forEach((config) => {
    const anchor = mindarThree.addAnchor(config.index);
    const { group, box } = createAnchorContent(config);
    anchor.group.add(group);

    anchor.onTargetFound = () => {
      console.log(`Found target ${config.index}`);
    };
    anchor.onTargetLost = () => {
      console.log(`Lost target ${config.index}`);
    };

    animated.push(box);
  });

  const render = () => {
    animated.forEach((mesh) => {
      mesh.rotation.y += 0.02;
    });
    renderer.render(scene, camera);
  };

  renderer.setClearColor(0x000000, 0);

  startButton.addEventListener('click', async () => {
    try {
      overlay.style.display = 'none';
      await mindarThree.start();
      renderer.setAnimationLoop(render);
    } catch (error) {
      overlay.style.display = 'flex';
      const reason = error?.message || error?.name || '不明なエラー';
      hint.textContent = `カメラにアクセスできませんでした (${reason})。ブラウザの設定をご確認ください。`;
      console.error(error);
    }
  });

  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      mindarThree.pause(true);
    } else {
      mindarThree.resume();
    }
  });
}

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  startButton.disabled = true;
  hint.textContent = 'このブラウザはカメラ機能に対応していません。別のブラウザまたは最新OSでお試しください。';
} else {
  setup();
}
