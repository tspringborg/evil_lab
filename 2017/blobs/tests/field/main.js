

var stats
window.onload = function() {
  var gui = new dat.GUI()

  stats = new Stats();
  document.body.appendChild( stats.dom );
}


var ww = window.innerWidth,
    wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  alpha: true,
});
// renderer.setClearColor('#BC2C8A');
renderer.setSize(ww, wh);

var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 200);

var domEvents = new THREEx.DomEvents(camera, renderer.domElement)

// var controls = new THREE.OrbitControls(camera);


window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

//get random number in specified range
function randRange(min, max) {
  var randomNum = (Math.random() * (max - min)) + min;
  return randomNum;
}
var blobs = []
for (var i = 0; i < 8; i++) {
  var blob = new Blob()
  scene.add(blob.mesh)
  blob.mesh.position.set(
    randRange(-400,400),
    randRange(-400,400),
    randRange(-2000, 100)
  )
  blob.distortFactor = randRange(0.2, 1)
  blob.seed = randRange(0, 20000)

  blobs.push(blob)
}

function render(a) {
  requestAnimationFrame(render);
  for (var i = 0; i<blobs.length; i++) {
    blobs[i].render(a)
  }
  
  renderer.render(scene, camera);
  if(stats) {
    stats.update()
  }
}

requestAnimationFrame(render);