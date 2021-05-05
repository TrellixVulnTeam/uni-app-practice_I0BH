<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<!-- <image src='https://qa.wechat.d1m.cn/wechat-tods/upload/miniapp/imgs/index_up.png'></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button @click="toAppointment">去预约</button>
	</view>
</template>

<script>
	import api from '@/models/api.js'
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData () {
				api.getAllBookingList().then((data) => {
					console.log(data)
				})
			},
			toAppointment () {
				uni.navigateTo({
					url: '/pages/appointment/index'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
