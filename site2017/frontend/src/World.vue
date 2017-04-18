<template>
	<div id="world">
		<svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg">
		  <circle cx="500" cy="500" r="500"/>
		  <g>
			<g>
				<polygon style="fill:#010002;" points="25.656,55.841 37.73,55.841 39.542,111.381 24.148,111.381 		"/>
				<polygon style="fill:#010002;" points="15.394,114.4 133.115,114.4 133.115,120.738 142.17,120.738 142.17,129.794 
					148.508,129.794 148.508,136.133 0,136.133 0,129.794 6.338,129.794 6.338,120.738 15.394,120.738 		"/>
				<polygon style="fill:#010002;" points="139.15,39.541 74.253,12.375 9.357,39.541 9.357,43.466 139.15,43.466 		"/>
				<rect x="21.732" y="46.484" style="fill:#010002;" width="105.042" height="6.035"/>
				<polygon style="fill:#010002;" points="110.475,55.841 122.547,55.841 124.359,111.381 108.965,111.381 		"/>
				<polygon style="fill:#010002;" points="82.102,55.841 94.477,55.841 96.289,111.381 80.592,111.381 		"/>
				<polygon style="fill:#010002;" points="54.029,55.841 66.103,55.841 67.914,111.381 52.218,111.381 		"/>
			</g>
		</g>
		</svg>
	</div>
</template>

<script>
	import controls from './Controls.js'
	import {TimelineMax, TweenMax} from 'gsap'

	const comp = {
		name: 'world',
		data(){
			return {
				rPower:0.2,
				rotation: 0,
				friction: 0.95,
				currentRotation: 0,
				ctrl: controls.state,
			}
		},
		mounted() {
			requestAnimationFrame(this.handleRotation)
		},
		methods: {
			handleRotation() {
				if(this.ctrl.left){
					this.rotation-=this.rPower
				}
				if(this.ctrl.right){
					this.rotation+=this.rPower
				}
				TweenMax.set(this.$el, {rotation:"+="+this.rotation})
				this.rotation*=this.friction
				requestAnimationFrame(this.handleRotation)
			}
		}
	}

	export default comp
</script>
