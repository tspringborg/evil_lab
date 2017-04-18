<template>
	<div :style="'width:' + width + 'px; height:'+ height + 'px'">
	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 148.508 148.508" style="enable-background:new 0 0 148.508 148.508;" xml:space="preserve">

	 	<polygon :style="'fill:'+fill" :points="points"/>
	</svg>
</div>

</template>

<script>

	export default {
		name: 'building',
		props: {
			seed: {
				type: Object,
				default(){
					return {
						weights: [[1][1,1,1]]
					}
				}
			},
		},
		created() {
			console.log('compute seed')
			console.log(this.seed)
		},
		computed: {
			fill() {
				//fillIndex++
				return '#ff0000'
			},
			point() {
				//pointIndex++
				return 
			},
			height() {
				return 200
			},
			width() {
				return 200
			},
			yPoints() {

			},
			xPoints() {
				return []
			},
			points() {
				return '20,20 80,20 80,80 20,80'
			}
		},
		data() {
			return {
				pointIndex:0,
				fillIndex:0,
			}
		}
	}
</script>