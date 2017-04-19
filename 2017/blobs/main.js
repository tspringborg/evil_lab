var props = {
  distortFactor: 0.5,
  distortSpeed: 1,
  distortX: 5,
  distortY: 5,
  distortZ: 5,
  rotationDelta: 0.5,
  rotationY: 0.001,
  rotationX: 0.000,
  rotationZ: 0.000,
  amplitudeFactor: 0.01,
  amplitudeX: 0.35,
  amplitudeY: 0.35,
  amplitudeZ: 1,
  color1: [251, 92, 15],
  color2: [188, 44, 138],
  color3: [135, 3, 244],
}
var color1Control, color2Control, stats
window.onload = function() {
  var gui = new dat.GUI()
  var f1 = gui.addFolder('Distortion');
  f1.open()
  f1.add(props, 'distortFactor', 0, 3)
  f1.add(props, 'distortSpeed', 0, 20)
  f1.add(props, 'distortX', 0, 10)
  f1.add(props, 'distortY', 0, 10)
  f1.add(props, 'distortZ', 0, 10)
  f1.open()

  var f2 = gui.addFolder('Texture')
  f2.open()
  // f2.add(props, 'amplitudeFactor', 0, 0.1).step(0.001).onChange(function(value) {
  //   sphere.addAttribute( 'color', getColors());
  // })
  f2.add(props, 'amplitudeX', 0, 1).onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
  })
  f2.add(props, 'amplitudeY', 0, 1).onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
  })
  f2.add(props, 'amplitudeZ', 0, 1).onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
  })
  color1Control = f2.addColor(props, 'color1')
  color2Control = f2.addColor(props, 'color2')
  color3Control = f2.addColor(props, 'color3')
  gui.add(props, 'rotationDelta', 0, 1)
  gui.add(props, 'rotationY', 0, 0.05)
  gui.add(props, 'rotationZ', 0, 0.05)
  gui.add(props, 'rotationX', 0, 0.05)
  color1Control.onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
  })
  color2Control.onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
  })
  color3Control.onChange(function(value) {
    sphere.addAttribute( 'color', getColors());
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

var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 200);

var domEvents = new THREEx.DomEvents(camera, renderer.domElement)

var controls = new THREE.OrbitControls(camera);

var sphere = new THREE.SphereBufferGeometry(50,50,50);
var spherePositions = sphere.attributes.position.array.slice(0);
var temp = sphere.attributes.position.array;
var material = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: document.getElementById("wrapVertexShader").textContent,
  fragmentShader: document.getElementById("wrapFragmentShader").textContent
});


function getColors() {
  var colors = new Float32Array(sphere.attributes.position.array.length);
  for(var i=0;i<sphere.attributes.position.array.length;i+=3){
    var perlin = Math.abs(noise.simplex3(sphere.attributes.position.array[i]*props.amplitudeFactor * props.amplitudeX, sphere.attributes.position.array[i+1]*props.amplitudeFactor * props.amplitudeY, sphere.attributes.position.array[i+2]*props.amplitudeFactor) * props.amplitudeZ);
    var c1,c2,lerp
    if (perlin <= 0.5) {
      c1 = props.color1
      c2 = props.color2
      lerp = perlin / 0.5
    } else {
      c1 = props.color2
      c2 = props.color3
      lerp = (perlin - 0.5) * 2
    }
    // console.log(lerp)
    var color = new THREE.Vector3(
      THREE.Math.lerp(c1[0], c2[0], lerp)/255,
      THREE.Math.lerp(c1[1], c2[1], lerp)/255,
      THREE.Math.lerp(c1[2], c2[2], lerp)/255
    );
    color.toArray(colors, i);
  }
  return new THREE.BufferAttribute( colors, 3 ) 
}
sphere.addAttribute( 'color', getColors());
var mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

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
var mouseOverDistort = 0
domEvents.addEventListener(mesh, 'mouseover', function(event){
  TweenMax.to(props, 0.2, { distortFactor: randRange(3, 4), onComplete:function() {
    TweenMax.to(props, 0.6, { distortFactor: 1})
  }})
}, false)
domEvents.addEventListener(mesh, 'mouseout', function(event){
  console.log('mouseout')
}, false)

function render(a) {
  requestAnimationFrame(render);
  for (var i = 0; i < temp.length; i+=3) {
    var aX = temp[i]*(0.008 * 1)+a*(0.0005 * props.distortSpeed)
    var aY = temp[i+1]*(0.01 * 1)+a*(0.0005 * props.distortSpeed)
    var aZ = temp[i+2]*(0.008 * 1)
    var perlin = noise.simplex3(aX, aY, aZ)
    temp[i] = spherePositions[i] + (perlin * props.distortFactor * props.distortX);
    temp[i+1] = spherePositions[i+1] + (perlin * props.distortFactor * props.distortY);
    temp[i+2] = spherePositions[i+2] + (perlin * props.distortFactor * props.distortZ);
  }
  sphere.addAttribute('position', new THREE.BufferAttribute(temp, 3));
  sphere.applyMatrix(new THREE.Matrix4().makeRotationY(a*props.rotationY * props.rotationDelta));
  sphere.applyMatrix(new THREE.Matrix4().makeRotationZ(a*props.rotationZ * props.rotationDelta));
  sphere.applyMatrix(new THREE.Matrix4().makeRotationX(a*props.rotationX * props.rotationDelta));
  
  renderer.render(scene, camera);
  if(stats) {
    stats.update()
  }
}

requestAnimationFrame(render);