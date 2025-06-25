import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Load GLTF
const loader = new GLTFLoader();
loader.load('assets/models/brass_goblets_4k.gltf', (gltf) => {
  const goblets = gltf.scene;
  goblets.scale.set(1.5, 1.5, 1.5);
  goblets.position.set(0, -1, 0);
  scene.add(goblets);
});
