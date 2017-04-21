

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
camera.position.set(0, 0, 0)


// calculate field bounding box in relation to camera fov and dist.
function getBoundingBoxAtDist(dist) {
  var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
  // visible height
  var height = 2 * Math.tan( vFOV / 2 ) * dist


  var aspect = ww / wh;
  // visible width
  var width = height * aspect;
  return {
    width,
    height,
  }
}



var domEvents = new THREEx.DomEvents(camera, renderer.domElement)


window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});


function sineWave(t, freq, amplitude, phase) {
  phase = phase || 0
  amplitude = amplitude || 1
  freq = freq || 0.003
  return amplitude * Math.sin(t * freq + phase)
}

function addBlobInteractivity(blob) {
  domEvents.addEventListener(blob.mesh, 'mouseover', function(event){
    var tl = new TimelineMax()
    blob.distortSpeed = blob.distortSpeed * 2
    tl.to(blob, 0.2, {distortFactor: 4 })
    tl.to(blob, 3, { distortFactor: 0.5 })
  }, false)
  domEvents.addEventListener(blob.mesh, 'mouseout', function(event){
    // TweenMax.to(blob, 0.3, {distortSpeed: 1})
    blob.distortSpeed = blob.distortSpeed / 2
    // console.log('mouseout')
    // console.log(event)
    // blob.distortSpeed = 1
  }, false)
}

//get random number in specified range
function randRange(min, max) {
  var randomNum = (Math.random() * (max - min)) + min;
  return randomNum;
}
var blobs = []
for (var i = 0; i < 5; i++) {
  var blob = new Blob(40)
  scene.add(blob.mesh)
  var zPos = randRange(-1000, -100)
  var bb = getBoundingBoxAtDist(Math.abs(zPos))
  blob.mesh.position.set(
    randRange(-bb.width/2,bb.width/2),
    randRange(-bb.height/2,bb.height/2),
    zPos
  )
  blob.distortFactor = randRange(0.2, 1)
  blob.distortSpeed = randRange(0.2, 1.5)
  blob.seed = randRange(0, 200000)
  addBlobInteractivity(blob)
//   TweenMax.to(props, 0.2, { distortFactor: randRange(3, 4), onComplete:function() {
//     TweenMax.to(props, 0.6, { distortFactor: 1})
//   }})
// }, false)
// domEvents.addEventListener(mesh, 'mouseout', function(event){
//   console.log('mouseout')
// }, false)

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