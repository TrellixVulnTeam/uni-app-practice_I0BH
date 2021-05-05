<template>
	<view class="contain">
		<image class="logo" src="/static/logo.png"></image>
		<view class="content">
			<view class="tit">预约记录</view>
			<view v-for="(el, i) in list" :key="i" class="Item">
				<view class="top">{{el.serviceName}}</view>
				<view class="center">{{el.storeName}}</view>
				<view class="bottom">
					<view>{{el.bookingTime}}</view>
					<view>{{el.statusStr}}</view>
				</view>
			</view>
		</view>
		<button class="back" @click="back">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					serviceName: '购物',
					storeName: 'TODS上海尚嘉中心',
					bookingTime: '2021-05-10 11: 00-12:00',
					statusStr: '已预约'
				}]
			}
		},
		onLoad() {
		},
		methods: {
			back () {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		text-align: center;
		.content {
			.tit {
				color: #473130;
				font-size: 36rpx;
				margin-top: 40rpx;
			}
			.Item {
				box-sizing: border-box;
				margin: 40rpx auto 0rpx;
				text-align: left;
				width: 650rpx;
				background: #FFFFFF;
				box-shadow: -3px 7px 46px 0px rgba(71, 49, 48, 0.06);
				border-radius: 10px;
				padding: 40rpx 50rpx;
				.top {
					font-size: 36rpx;
					font-weight: 500;
					color: #473130;
				}
				.center {
					font-size: 28rpx;
					color: #8F8686;
					margin: 20rpx 0 40rpx;
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					view:first-child {
						color: #8F8686;
					}
					view:last-child {
						color: #E0960A;
					}
				}
			}
		}
		.back {
			width: 650rpx;
			position: fixed;
			bottom: 20rpx;
			left: 50rpx;
		}
	}
</style>
