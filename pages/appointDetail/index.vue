<template>
	<view class="contain">
		<image class="logo" src="/static/logo.png"></image>
		<view class="content">
			<view class="top">
				<view>已到店</view>
				<button>取消预约</button>
			</view>
			<view class="center">
				<view class="Item">
					<view class="left">姓名:</view>
					<view class="right">{{name}}</view>
				</view>
				<view class="Item">
					<view class="left">电话:</view>
					<view class="right">{{mobile}}</view>
				</view>
				<view class="Item">
					<view class="left">预约时间:</view>
					<view class="right">{{date}}</view>
				</view>
				<view class="Item">
					<view class="left">预约门店:</view>
					<view class="right">{{store}}</view>
				</view>
				<view class="Item">
					<view class="left">预约服务:</view>
					<view class="right">{{service}}</view>
				</view>
				<view class="Item">
					<view class="left">备注:</view>
					<view class="right">{{des}}</view>
				</view>
			</view>
			<view class="bottom">
				<canvas class="qrcode" canvas-id="myQrcode"></canvas>
			</view>
			<view class="qrtxt">
				本次预约二维码
			</view>
		</view>
		<view class="fixButton">
			<button @click="back">返回首页</button>
			<button @click="toList" type="primary">预约记录</button>
		</view>
	</view>
</template>

<script>
	import drawQrcode from 'weapp-qrcode'
	export default {
		data () {
			return {
				name: '小王',
				mobile: '18998887611',
				date: '2021-05-10 12:00-13:00',
				store: '人民广场',
				service: '售后',
				des: '备注到店信息'
			}
		},
		created () {
			drawQrcode({
			  width: 200,
			  height: 200,
			  canvasId: 'myQrcode',
			  text: '人民广场店'
			})
		},
		methods: {
			toList () {
				uni.navigateTo({
					url: '/pages/appointmentList/index'
				})
			},
			back () {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 100%;
	}
	.content {
		width: 650rpx;
		margin: 40rpx auto 200rpx;
		background: #fff;
		box-shadow: -3px 7px 46px 0px rgba(71, 49, 48, 0.06);
		border-radius: 10px;
		box-sizing: border-box;
		padding: 40rpx;
		.top {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			
			button {
			  border: 2rpx solid #F3EDE6;
			  border-radius: 6rpx;
			  color: #978F8F;
			  font-size: 24rpx;
			  margin: 0;
			}
		}
		.center {
			border: 1rpx solid #F3EDE6;
			border-left: none;
			border-right: none;
			
			.Item {
				display: flex;
				font-size: 28rpx;
				.left {
					width: 200rpx;
					color: #978F8F;
				}
				
				.right {
					color: #473130;
				}
				
			}
		}
		.bottom {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  margin: 40rpx 0 25rpx;
			  .qrcode {
			  	width: 340rpx;
			  	height: 340rpx;
			  }
		}
		.qrtxt {
			text-align: center;
			font-size: 24rpx;
			color: #978F8F;
		}
	}
	.fixButton {
		width: 650rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		padding: 20rpx 50rpx;
		background: #fff;
		
		button {
			flex: 1;
		}
		button:nth-child(2) {
			margin-left: 20rpx;
			background-color: #473130;
		}
	}
</style>
