var blob = new Blob()

var color1Control, color2Control, stats
window.onload = function() {
  var gui = new dat.GUI()
  var f1 = gui.addFolder('Distortion');
  f1.open()
  f1.add(blob, 'distortFactor', 0, 3)
  f1.add(blob, 'distortSpeed', 0, 20)
  f1.add(blob, 'distortX', 0, 10)
  f1.add(blob, 'distortY', 0, 10)
  f1.add(blob, 'distortZ', 0, 10)
  f1.open()

  var f2 = gui.addFolder('Texture')
  f2.open()
  // f2.add(blob, 'amplitudeFactor', 0, 0.1).step(0.001).onChange(function(value) {
  //   blob.applyColors()
  // })
  f2.add(blob, 'amplitudeX', 0, 1).onChange(function(value) {
    blob.applyColors()
  })
  f2.add(blob, 'amplitudeY', 0, 1).onChange(function(value) {
    blob.applyColors()
  })
  f2.add(blob, 'amplitudeZ', 0, 1).onChange(function(value) {
    blob.applyColors()
  })
  color1Control = f2.addColor(blob, 'color1')
  color2Control = f2.addColor(blob, 'color2')
  color3Control = f2.addColor(blob, 'color3')
  gui.add(blob, 'rotationDelta', 0, 1)
  gui.add(blob, 'rotationY', 0, 0.05)
  gui.add(blob, 'rotationZ', 0, 0.05)
  gui.add(blob, 'rotationX', 0, 0.05)
  color1Control.onChange(function(value) {
    blob.applyColors()
  })
  color2Control.onChange(function(value) {
    blob.applyColors()
  })
  color3Control.onChange(function(value) {
    blob.applyColors()
  })

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
scene.add(blob.mesh)

var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 200);

var domEvents = new THREEx.DomEvents(camera, renderer.domElement)

var controls = new THREE.OrbitControls(camera);


window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

// //get random number in specified range
// function randRange(min, max) {
//   var randomNum = (Math.random() * (max - min)) + min;
//   return randomNum;
// }
// var mouseOverDistort = 0
// domEvents.addEventListener(mesh, 'mouseover', function(event){
//   TweenMax.to(props, 0.2, { distortFactor: randRange(3, 4), onComplete:function() {
//     TweenMax.to(props, 0.6, { distortFactor: 1})
//   }})
// }, false)
// domEvents.addEventListener(mesh, 'mouseout', function(event){
//   console.log('mouseout')
// }, false)

window.theblob = blob

function render(a) {
  requestAnimationFrame(render);
  blob.render(a)
  
  renderer.render(scene, camera);
  if(stats) {
    stats.update()
  }
}

requestAnimationFrame(render);