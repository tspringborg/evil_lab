
function Blob() {
	this.distortFactor = 0.5
	this.distortSpeed = 1
	this.distortX = 5
	this.distortY = 5
	this.distortZ = 5
	this.rotationDelta = 0.5
	this.rotationY = 0.001
	this.rotationX = 0.000
	this.rotationZ = 0.000
	this.amplitudeFactor = 0.01
	this.amplitudeX = 0.35
	this.amplitudeY = 0.35
	this.amplitudeZ = 1
	this.color1 = [251, 92, 15]
	this.color2 = [188, 44, 138]
	this.color3 = [135, 3, 244]
	this.seed = 0

	var _this = this

	var sphere = new THREE.SphereBufferGeometry(50,50,50)
	this.sphere = sphere
	var spherePositions = sphere.attributes.position.array.slice(0)
	var temp = sphere.attributes.position.array;

	var vertexShader = 'attribute vec3 color; varying vec3 vColor; void main() { vColor = color; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }'
	var fragmentShader = 'varying vec3 vColor; void main(){gl_FragColor = vec4(vColor ,1.0);}'
	var material = new THREE.ShaderMaterial({
	  uniforms: {},
	  vertexShader: vertexShader,
	  fragmentShader: fragmentShader,
	})

	function getColors() {
		var pArr = sphere.attributes.position.array
		var colors = new Float32Array(pArr.length)
		for(var i=0;i<pArr.length;i+=3){
			var perlin = Math.abs(noise.simplex3(pArr[i]*_this.amplitudeFactor * _this.amplitudeX, pArr[i+1]*_this.amplitudeFactor * _this.amplitudeY, pArr[i+2]*_this.amplitudeFactor) * _this.amplitudeZ);
			var c1,c2,lerp
			if (perlin <= 0.5) {
				c1 = _this.color1
				c2 = _this.color2
				lerp = perlin / 0.5
			} else {
				c1 = _this.color2
				c2 = _this.color3
				lerp = (perlin - 0.5) * 2
			}
			// console.log(lerp)
			var color = new THREE.Vector3(
				THREE.Math.lerp(c1[0], c2[0], lerp)/255,
				THREE.Math.lerp(c1[1], c2[1], lerp)/255,
				THREE.Math.lerp(c1[2], c2[2], lerp)/255
			);
			color.toArray(colors, i)
		}
		return new THREE.BufferAttribute( colors, 3 ) 
	}

	this.applyColors = function() {
		sphere.addAttribute( 'color', getColors())
	}
	this.applyColors()
	this.mesh = new THREE.Mesh(sphere, material)

	this.render = function(delta) {
		var a = delta + _this.seed
		for (var i = 0; i < temp.length; i+=3) {
		    var aX = temp[i]*(0.008 * 1)+a*(0.0005 * this.distortSpeed)
		    var aY = temp[i+1]*(0.01 * 1)+a*(0.0005 * this.distortSpeed)
		    var aZ = temp[i+2]*(0.008 * 1)
		    var perlin = noise.simplex3(aX, aY, aZ)
		    temp[i] = spherePositions[i] + (perlin * this.distortFactor * this.distortX);
		    temp[i+1] = spherePositions[i+1] + (perlin * this.distortFactor * this.distortY);
		    temp[i+2] = spherePositions[i+2] + (perlin * this.distortFactor * this.distortZ);
		}
		sphere.addAttribute('position', new THREE.BufferAttribute(temp, 3));
		sphere.applyMatrix(new THREE.Matrix4().makeRotationY(a*this.rotationY * this.rotationDelta));
		sphere.applyMatrix(new THREE.Matrix4().makeRotationZ(a*this.rotationZ * this.rotationDelta));
		sphere.applyMatrix(new THREE.Matrix4().makeRotationX(a*this.rotationX * this.rotationDelta));
	}
}