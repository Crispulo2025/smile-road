const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x050816, 5, 20);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#scene"),
  antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 8;

// LIGHTS
scene.add(new THREE.PointLight(0x00e5ff, 1.5).position.set(5,5,5));
scene.add(new THREE.AmbientLight(0xff4d6d, 0.4));

// CORE GLOBE
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    color:0x0f172a,
    wireframe:true,
    emissive:0x00e5ff,
    emissiveIntensity:0.2
  })
);

scene.add(globe);

// ANIMATE
function animate(){
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002;
  renderer.render(scene,camera);
}

animate();

// RESIZE
window.addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
