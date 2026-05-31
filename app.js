const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050816, 5, 25);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 8);

// RENDERER (OPTIMIZED)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#scene"),
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050816, 1);

// ======================
// LIGHTING (FIXED PROPERLY)
// ======================
const pointLight = new THREE.PointLight(0x00e5ff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xff4d6d, 0.4);
scene.add(ambientLight);

// ======================
// CORE METAVERSE GLOBE
// ======================
const globeGeometry = new THREE.SphereGeometry(2, 32, 32);

const globeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0f172a,
  wireframe: true,
  emissive: 0x00e5ff,
  emissiveIntensity: 0.25
});

const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// ======================
// EXTRA METAVERSE LAYER (PARTICLES)
// ======================
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 300;

const positions = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++){
  positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00e5ff,
  size: 0.03
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// ======================
// MOUSE INTERACTION
// ======================
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ======================
// ANIMATION LOOP (STABLE)
// ======================
function animate(){
  requestAnimationFrame(animate);

  globe.rotation.y += 0.002;
  particles.rotation.y += 0.0005;

  scene.rotation.y += mouseX * 0.002;
  scene.rotation.x += mouseY * 0.002;

  renderer.render(scene, camera);
}

animate();

// ======================
// RESPONSIVE FIX
// ======================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
