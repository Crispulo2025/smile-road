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

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#scene"),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// LIGHTS
const light = new THREE.PointLight(0x00e5ff, 1.5);
light.position.set(5,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xff4d6d, 0.4);
scene.add(ambient);

// GLOBE
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    color:0x0f172a,
    wireframe:true,
    emissive:0x00e5ff,
    emissiveIntensity:0.25
  })
);

scene.add(globe);

// PARTICLES
const particlesGeo = new THREE.BufferGeometry();
const count = 300;

const positions = new Float32Array(count * 3);

for(let i=0;i<count*3;i++){
  positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particles = new THREE.Points(
  particlesGeo,
  new THREE.PointsMaterial({ color:0x00e5ff, size:0.03 })
);

scene.add(particles);

// ANIMATION
function animate(){
  requestAnimationFrame(animate);

  globe.rotation.y += 0.002;
  particles.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

animate();

// RESIZE FIX
window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
