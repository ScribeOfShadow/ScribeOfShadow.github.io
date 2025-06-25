import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

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

// Load the .gltf file
const loader = new GLTFLoader();
loader.load('assets/models/brass_goblets.gltf', function (gltf) {
  const goblets = gltf.scene;
  goblets.scale.set(1.5, 1.5, 1.5);
  goblets.position.set(0, -1, 0);
  scene.add(goblets);

  const goblet = goblets.children[0]; // pick the one you like

  // Fake blood mesh
  const bloodGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.01, 32);
  const bloodMat = new THREE.MeshStandardMaterial({
    color: 0x8b0000,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85
  });
  const blood = new THREE.Mesh(bloodGeo, bloodMat);
  blood.position.set(0, -0.3, 0); // tweak as needed
  scene.add(blood);

  let fillLevel = 0.01;
  const maxFill = 0.3;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (fillLevel < maxFill) {
      fillLevel += 0.001;
      blood.scale.y = fillLevel * 10;
      blood.position.y = -0.3 + fillLevel / 2;
    }
  }

  animate();
});
