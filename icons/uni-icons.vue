<template>
	<view :class="'icon-' + type" 
	class="iconfont" 
	@click=_onclick></view>
</template>

<script>
	export default {
		name: 'icon',
		props: {
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#333'
			},
			size: {
				type: [Number, String],
				default: 18
			}
		},
		methods: {
			_onclick () {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@import "./uni-icons.css";
</style>
