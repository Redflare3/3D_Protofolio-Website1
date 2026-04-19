import * as THREE from 'three';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(renderer.domElement);

// Move camera to the right so 3D stays on right side
camera.position.set(6, 0, 7);

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(6, 0, 0);
scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Scroll: move and morph the shape between sections
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = scrollY / maxScroll;

  gsap.to(mesh.rotation, { x: progress * Math.PI * 2, duration: 0.5 });
  gsap.to(mesh.position, { y: -progress * 4, duration: 0.5 });
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.007;
  camera.position.x += (mouseX * 0.5 + 6 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
}
animate();

gsap.from(mesh.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});