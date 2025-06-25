import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const canvas = document.getElementById('bg-scene');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0,1,5);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

let envMaps = {};

function loadEnvironment(name, url) {
  new RGBELoader().setDataType(THREE.UnsignedByteType)
    .load(url, hdrEquirect => {
      let envMap = pmremGenerator.fromEquirectangular(hdrEquirect).texture;
      envMaps[name] = envMap;
      hdrEquirect.dispose();
      if (!scene.environment) switchEnv(name);
    });
}

loadEnvironment('pantheon', 'assets/hdr/pantheon.hdr');
loadEnvironment('cathedral', 'assets/hdr/cathedral.hdr');

function switchEnv(theme) {
  if (envMaps[theme]) {
    scene.environment = envMaps[theme];
    scene.background = envMaps[theme];
  }
}

function updateTheme() {
  const theme = document.body.classList.contains('theme-dark') ? 'cathedral' : 'pantheon';
  switchEnv(theme);
}

document.addEventListener('DOMContentLoaded', updateTheme);
new MutationObserver(updateTheme).observe(document.body, { attributes: true, attributeFilter: ['class'] });

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
