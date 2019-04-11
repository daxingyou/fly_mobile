<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.$nextTick(()=>{
				var stage = new Konva.Stage({
				container: 'container',
				width: 800,
				height: 800
			});
			})
			
		},
		methods: {
			getCanvasHeight(rem) {
				let root_px = document.getElementsByTagName("html")[0].style.fontSize;
				root_px = root_px.slice(0, root_px.length - 2) * 1;
				return rem * root_px
			},
		}

	}
</script>

<style>
	
</style>