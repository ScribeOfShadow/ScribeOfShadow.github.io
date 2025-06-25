// assets/js/background.js
const canvas = document.getElementById("bg-scene");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 5;

// Particle material
const theme = document.body.classList.contains("theme-dark") ? "dark" : "light";
const color = theme === "dark" ? 0xff2e4f : 0x00cfff;

const geometry = new THREE.BufferGeometry();
const count = 300;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color,
  size: 0.1,
  transparent: true,
  opacity: 0.7
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Animate
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
