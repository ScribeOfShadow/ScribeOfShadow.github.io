import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0f1b);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const pointLight = new THREE.PointLight(0x00ffff, 1.5);
pointLight.position.set(0, 3, 3);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load Goblet
const loader = new GLTFLoader();
let goblet;

loader.load('./assets/goblet/brass_goblet_4k.gltf', (gltf) => {
  goblet = gltf.scene;
  goblet.scale.set(1, 1, 1);
  goblet.position.set(0, 0, 0);
  scene.add(goblet);
}, undefined, (error) => {
  console.error('Failed to load goblet:', error);
});

// Water Blob
const waterGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  emissive: 0x00ffff,
  emissiveIntensity: 0.6,
  transparent: true,
  opacity: 0.6,
});
const waterBlob = new THREE.Mesh(waterGeometry, waterMaterial);
waterBlob.position.set(0, 0.7, 0);
waterBlob.scale.set(0.01, 0.01, 0.01);
scene.add(waterBlob);

let fillLevel = 0;
const maxFill = 1.0;

window.addEventListener('click', () => {
  if (fillLevel < maxFill) {
    fillLevel += 0.1;
    waterBlob.scale.set(fillLevel, fillLevel, fillLevel);

    if (fillLevel >= maxFill) {
      spawnMagicSplash();
    }
  }
});

function spawnMagicSplash() {
  const splashGeo = new THREE.PlaneGeometry(1, 1);
  const splashMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });

  const splash = new THREE.Mesh(splashGeo, splashMat);
  splash.position.set(0, 1.2, 0);
  splash.rotation.x = -Math.PI / 2;
  scene.add(splash);

  let scale = 0.1;
  function animateSplash() {
    if (scale < 1.5) {
      scale += 0.05;
      splash.scale.set(scale, scale, scale);
      splash.material.opacity -= 0.02;
      requestAnimationFrame(animateSplash);
    } else {
      scene.remove(splash);
    }
  }

  animateSplash();
}

function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.001;
  if (goblet) goblet.position.y = Math.sin(t) * 0.05;
  waterBlob.position.y = 0.7 + Math.sin(t * 2) * 0.02;

  controls.update();
  renderer.render(scene, camera);
}

animate();
