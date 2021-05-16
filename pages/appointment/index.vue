<template>
	<view class="contain">
		<view class="top">Tod's上海尚佳中心</view>
		<view class="txt">请选择您要的服务类型</view>
		<view class="form">
			<view class="Row">
				<picker mode="selector" :range="serviceList" range-key="serviceName" :value="typeIndex" @change="handleChange($event, 'typeIndex')">
					<view class="Item">
						<view class="Item-left">
							<i class="iconfont icon-user"></i>
							<view>{{serviceList[typeIndex] ? serviceList[typeIndex].serviceName : ''}}</view>
						</view>
					</view>
				</picker>
			</view>
			<view class="time">
				<picker mode="date" :value="date" :start="startDate" class="picker Row" @change="handleChange($event, 'date')">
					<view class="Item">
						<view class="Item-left">
							<i class="iconfont icon-calendar"></i>
							<view class="uni-input">{{date}}</view>
						</view>
						<i class="iconfont icon-arrow-down"></i>
					</view>
				</picker>
				<picker mode="selector" :value="time" :range=timeList class="picker Row" @change="handleChange($event, 'time')">
					<view class="Item">
						<view class="Item-left">
							<i class="iconfont icon-clock"></i>
							<view>{{timeList[time]}}</view>
						</view>
						<i class="iconfont icon-arrow-down"></i>
					</view>
				</picker>
			</view>
			<!-- 姓名 -->
			<view class="time">
				<view :class="['Row', {'error': errorKey['surname']}]">
					<i class="iconfont icon-user"></i>
					<input :value=surname placeholder="姓" @input="getInput($event, 'surname')"/>
				</view>
				<view :class="['Row', 'name', {'error': errorKey['firstname']}]">
					<i class="iconfont icon-user"></i>
					<input :value=firstname placeholder="名" @input="getInput($event, 'firstname')"/>
				</view>
			</view>
			<!-- 性别 -->
			<view :class="['Row', {'error': errorKey['gender']}]">
				<picker mode="selector" :range="genderList" :value="gender" @change="handleChange($event, 'gender')">
					<view class="Item">
						<view class="Item-left">
							<i class="iconfont icon-gender"></i>
							<view>{{genderList[gender]}}</view>
						</view>
						<i class="iconfont icon-arrow-down"></i>
					</view>
				</picker>
			</view>
			<!-- 手机号 -->
			<view :class="['Row','phone', {'error': errorKey['mobile']}]">
				<view class="Item-left">
					<i class="iconfont icon-arrow-down"></i>
					<text v-if="mobile">{{mobile}}</text>
				</view>
				<button v-if=!mobile class="ClearStyle" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getMobile">授权微信手机号</button>
			</view>
			<!-- 备注 -->
			<view class="des">
				<i class="iconfont icon-msg"></i>
				备注
			</view>
			<view class="Row">
				<textarea :value=des @input="getInput($event, 'des')" placeholder="备注信息"></textarea>
			</view>
			<!-- 阅读 -->
			<view class="agree">
				<view>
					<checkbox-group @change="changeCheck">
						<checkbox value="checked"/>
					</checkbox-group>
				</view>
				<view>
					本人确认已经收悉本分《隐私协议》；本人已阅览并同意将本人个人信息提供给TODS供其内部使用。
				</view>
			</view>
			<button class="bottom" type="primary" @click="sumbit">完成预约</button>
		</view>
	</view>
	
</template>

<script>
	import api from '@/models/api.js'
	import { format } from '@/utils/index.js'
	
	export default {
		components: {},
		data () {
			return {
				serviceList: [],
				typeIndex: 0,
				timeList: [],
				time: 0,
				surname: '',
				firstname: '',
				genderList: ['先生', '女士'],
				gender: '',
				mobile: '',
				des: '',
				timeList: [],
				today: new Date(new Date().getTime() + 1000 * 60 * 60 * 24).getDay(),
				weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				date: format(),
				errorKey: {
					surname: false,
					firstname: false,
					gender: false,
					mobile: false,
					des: false
				}
			}
		},
		created () {
			this.getService()
		},
		computed: {
			startDate () {
				return format()
			}
		},
		methods: {
			async getService () {
				const {data: {Service, ShopTime}} = await api.serviceTime(115)
				this.serviceList = Service
				let week = this.weeks[this.today]
				let firstInfo = []
				let timeSpacing = []
				ShopTime.forEach((el) => {
					if (el.week === week) {
						firstInfo.push(el)
					}
				})
				for (let i = 0; i < firstInfo.length; i++) {
				  let timeArr = this.timeDeal(firstInfo[i].startTime, firstInfo[i].endTime);
				  timeArr.map(v => {
					timeSpacing.push(v);
				  })
				}
				this.timeList = timeSpacing
			},
			// 时间处理
			timeDeal(start, end) {
				// console.log('时间', start, end);
				let startVal = Number(start.slice(0, 2));
				let endVal = Number(end.slice(0, 2));
				let startSuffix = start.slice(-2);
				let endSuffix = end.slice(-2);
				// console.log(startVal, endVal);
				const time_arr = [];
				if (startVal + 1 == endVal) {
					time_arr.push(`${start}-${end}`)
				} else {
					for (let i = 0; i < (endVal - startVal); i++) {
						let time_v = '';
						if (i + 1 == (endVal - startVal)) {
						time_v = `${startVal + i}:${startSuffix}-${startVal + i + 1}:${endSuffix}`;
						} else {
						time_v = `${startVal + i}:${startSuffix}-${startVal + i + 1}:${startSuffix}`;
						}
						time_arr.push(time_v)
					}
				}
				return time_arr;
			},
			handleChange ({target: {value}}, type) {
			  this[type] = value
			},
			getInput ({target: {value}}, type) {
				this[type] = value
			},
			changeCheck () {
				let val = this.checked
				this.checked = !val
			},
			async getMobile ({detail}) {
			    const { encryptedData, iv: ivBase64 } = detail
				const { data: res } = await api.decodePhone({ encryptedData, ivBase64 })
				console.log(res)
				if (res && res.phoneNumber) {
					this.mobile = res.phoneNumber
				}
			},
			checkForm () {
				let status = false
				let info = ''
				let prop1 = ['surname', 'firstname','gender', 'mobile', 'des', 'checked']
				let prop2 = new Map([
					['surname', '请填写姓'],
					['firstname', '请填写名'],
					['gender', '请选择性别'],
					['mobile', '请输入手机号'],
					['des', '请输入备注信息'],
					['checked', '请勾选阅读须知']
				])
				for (let k of prop1) {
					this.errorKey[k] = false
					if (!this[k] && !status) {
						status = true
						info = prop2.get(k)
						this.errorKey[k] = true
					}
				}
				if (status) {
					console.log('show' + info)
					uni.showToast({
						title: info,
						icon: 'none'
					})
				}
				return status
			},
			async sumbit () {
				let res = this.checkForm()
				console.log(res)
				if (!res) {
					 let params = {
						serviceId: this.serviceList[this.typeIndex].id,
						bookingTime: `${this.date} ${this.timeList[this.time]}`,
						mobile: this.mobile,
						userName: this.surname + this.firstname,
						remark: this.des,
						gender: this.gender,
						storeId: 115,
						address: '人民广场'
					  }
					  const { data } = await api.postBooking(params)
					  console.log(data)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 650rpx;
		text-align: center;
		font-size: 28rpx;
		color: #000;
		margin: 0 auto;
		overflow: auto;
		
		i {
			margin-right: 10rpx;
		}
	}
	
	.top {
		font-size: 34rpx;
		margin: 20rpx;
	}
	
	.Row {
		  text-align: left;
		  display: flex;
		  align-items: center;
		  padding: 25rpx;
		  border: 2rpx solid rgba(222, 222, 222, 1);
		  border-radius: 6rpx;
		  flex: 1;
		  box-sizing: border-box;
		  margin-top: 40rpx;
		
		  picker {
			 width: 100%;
		  }
		  
		  .Item {
			display: flex;
			justify-content: space-between;
			align-items: center;
		  }
		  
		  .Item-left {
			display: flex;
			align-items: center;
			
		  }
	}
	.time {
		display: flex;
		.picker {
			flex: 1;
		}
		.picker:nth-child(2), .name {
			margin-left: 10rpx;
		}
	}
	.des {
		display: flex;
		margin-top: 40rpx;
	}
	.agree {
		display: flex;
		margin-top: 40rpx;
		text-align: left;
	}
	.bottom {
		background-color: #473130;
		margin-top: 20rpx;
	},
	.error {
		border-color: red
	}
	.phone {
		justify-content: space-between;
		.Item-left {
			display: flex;
		}
	}
	  .ClearStyle {
	        border: 0;
	        padding: 0;
	        background-color: transparent;
	        margin: 0;
			text-decoration: underline;
			font-size: 28rpx;
			color: rgba(71, 49, 48, 1);
			line-height: 36rpx;
			margin-left: 10rpx;
			font-weight: 400;
	
	        &::after {
	          border: 0;
	        }
	      }
</style>
