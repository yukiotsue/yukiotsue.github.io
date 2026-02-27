import * as THREE from 'three';

// ===== Setup =====
const canvas = document.getElementById('threeBg');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

const mouseTarget = { x: 0, y: 0 };
const mouseCurrent = { x: 0, y: 0 };

// =======================================
// 1. MESH GRADIENT — Soft morphing color blobs
// =======================================
const gradientMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Smooth noise for organic shapes
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      vec2 p = vec2(uv.x * aspect, uv.y);

      float t = uTime * 0.15;

      // === BLOB 1: Top-right area (blue) ===
      vec2 center1 = vec2(
        aspect * 0.75 + sin(t * 1.1) * 0.2 + uMouse.x * 0.08,
        0.7 + cos(t * 0.9) * 0.15 + uMouse.y * 0.05
      );
      float d1 = length(p - center1);
      float noise1 = snoise(p * 1.5 + t * 0.5) * 0.3;
      float blob1 = smoothstep(0.55 + noise1, 0.0, d1) * 0.18;

      // === BLOB 2: Bottom-left area (lighter blue) ===
      vec2 center2 = vec2(
        aspect * 0.25 + cos(t * 0.8 + 1.0) * 0.25,
        0.3 + sin(t * 0.7 + 2.0) * 0.2
      );
      float d2 = length(p - center2);
      float noise2 = snoise(p * 1.2 + t * 0.4 + 3.0) * 0.25;
      float blob2 = smoothstep(0.5 + noise2, 0.0, d2) * 0.14;

      // === BLOB 3: Center-left (subtle) ===
      vec2 center3 = vec2(
        aspect * 0.15 + sin(t * 0.6 + 4.0) * 0.15,
        0.65 + cos(t * 0.5 + 1.5) * 0.18
      );
      float d3 = length(p - center3);
      float noise3 = snoise(p * 1.8 + t * 0.3 + 5.0) * 0.2;
      float blob3 = smoothstep(0.4 + noise3, 0.0, d3) * 0.1;

      // === BLOB 4: Bottom-right ===
      vec2 center4 = vec2(
        aspect * 0.8 + cos(t * 0.7 + 3.0) * 0.2,
        0.2 + sin(t * 0.6) * 0.15
      );
      float d4 = length(p - center4);
      float noise4 = snoise(p * 1.3 + t * 0.35 + 7.0) * 0.22;
      float blob4 = smoothstep(0.45 + noise4, 0.0, d4) * 0.12;

      // Colors
      vec3 blue1 = vec3(0.0, 0.44, 0.89);    // #0071e3
      vec3 blue2 = vec3(0.16, 0.59, 1.0);     // #2997ff
      vec3 blue3 = vec3(0.35, 0.78, 0.98);    // #5ac8fa
      vec3 blue4 = vec3(0.0, 0.35, 0.75);     // darker blue

      vec3 color = vec3(0.0);
      float alpha = 0.0;

      color += blue1 * blob1;
      alpha += blob1;

      color += blue2 * blob2;
      alpha += blob2;

      color += blue3 * blob3;
      alpha += blob3;

      color += blue4 * blob4;
      alpha += blob4;

      // Normalize color
      if (alpha > 0.001) {
        color /= alpha;
      }

      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
});

const gradientPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  gradientMaterial
);
scene.add(gradientPlane);

// =======================================
// 2. FLOWING LINES — Elegant geometric curves
// =======================================
// We use a separate perspective scene for 3D lines
const lineScene = new THREE.Scene();
const lineCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
lineCamera.position.set(0, 0, 30);
lineCamera.lookAt(0, 0, 0);

function createFlowingLine(cfg) {
  const points = [];
  const segments = 200;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2 * cfg.loops;
    points.push(new THREE.Vector3(0, 0, 0)); // placeholder
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: cfg.color,
    transparent: true,
    opacity: cfg.opacity,
    depthWrite: false,
  });

  const line = new THREE.Line(geometry, material);
  line.userData = {
    segments,
    amplitude: cfg.amplitude,
    frequency: cfg.frequency,
    speed: cfg.speed,
    yOffset: cfg.yOffset,
    zOffset: cfg.zOffset || 0,
    phase: cfg.phase || 0,
    thickness: cfg.thickness || 1,
  };

  return line;
}

function updateFlowingLine(line, time) {
  const d = line.userData;
  const positions = line.geometry.attributes.position.array;

  for (let i = 0; i <= d.segments; i++) {
    const t = (i / d.segments - 0.5) * 60; // x from -30 to 30
    const x = t;
    const y = Math.sin(t * d.frequency + time * d.speed + d.phase) * d.amplitude
      + Math.sin(t * d.frequency * 0.5 + time * d.speed * 0.7 + d.phase * 2.0) * d.amplitude * 0.4
      + d.yOffset;
    const z = Math.cos(t * d.frequency * 0.3 + time * d.speed * 0.5 + d.phase) * d.amplitude * 0.3
      + d.zOffset;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  line.geometry.attributes.position.needsUpdate = true;
}

const flowingLines = [
  // Primary flowing curve
  createFlowingLine({
    color: 0x0071e3, opacity: 0.25, amplitude: 4, frequency: 0.12,
    speed: 0.5, yOffset: 2, phase: 0, loops: 3,
  }),
  // Secondary curve
  createFlowingLine({
    color: 0x2997ff, opacity: 0.2, amplitude: 3.5, frequency: 0.15,
    speed: 0.4, yOffset: -3, phase: 1.5, loops: 3,
  }),
  // Upper subtle curve
  createFlowingLine({
    color: 0x5ac8fa, opacity: 0.15, amplitude: 3, frequency: 0.1,
    speed: 0.35, yOffset: 7, phase: 3.0, zOffset: -2, loops: 3,
  }),
  // Lower curve
  createFlowingLine({
    color: 0x0071e3, opacity: 0.18, amplitude: 2.5, frequency: 0.18,
    speed: 0.45, yOffset: -8, phase: 4.5, zOffset: 1, loops: 3,
  }),
  // Center-accent thin curve
  createFlowingLine({
    color: 0x2997ff, opacity: 0.12, amplitude: 5, frequency: 0.08,
    speed: 0.3, yOffset: 0, phase: 2.0, zOffset: -3, loops: 3,
  }),
];

flowingLines.forEach((l) => lineScene.add(l));

// =======================================
// ANIMATION
// =======================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Mouse smoothing
  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.03;
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.03;

  // Update gradient
  gradientMaterial.uniforms.uTime.value = elapsed;
  gradientMaterial.uniforms.uMouse.value.set(mouseCurrent.x, mouseCurrent.y);

  // Update flowing lines
  flowingLines.forEach((line) => updateFlowingLine(line, elapsed));

  // Subtle camera shift for lines (parallax)
  lineCamera.position.x = mouseCurrent.x * 0.8;
  lineCamera.position.y = mouseCurrent.y * 0.5;
  lineCamera.lookAt(0, 0, 0);

  // Render: gradient first (ortho), then lines on top (perspective)
  renderer.autoClear = true;
  renderer.render(scene, camera);
  renderer.autoClear = false;
  renderer.render(lineScene, lineCamera);
}

// ===== Events =====
window.addEventListener('mousemove', (e) => {
  mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  gradientMaterial.uniforms.uResolution.value.set(w, h);
  lineCamera.aspect = w / h;
  lineCamera.updateProjectionMatrix();
});

// ===== Start =====
animate();
