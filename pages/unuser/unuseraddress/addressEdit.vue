<template>
	<view class="page">
		<view class="address-input">
			<view class="list-input">
				<view class="title">
					<text>收货人</text>
				</view>
				<view class="content">
					<input type="text" placeholder="请填写收货人姓名" v-model="name" />
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>手机号</text>
				</view>
				<view class="content">
					<input type="tel" placeholder="请填写收货人手机号" v-model="phone" />
				</view>
			</view>
			<view class="list-input">
				<view class="title">
					<text>所在地区</text>
				</view>
				<view class="content">
					<input type="text" placeholder="省市区县/乡镇等" v-model="address1" />
				</view>
			</view>
			<view class="list-textarea">
				<view class="title">
					<text>详细地址</text>
				</view>
				<view class="content">
					<textarea type="text" placeholder="街道/楼牌号等" v-model="address2" />
				</view>
			</view>
		</view>
		<view class="footer-btn">
			<view class="btn" @click="tosaveaddress()">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				name: '',
				phone: '',
				address1: '',
				address2: '',
			};
		},
		onLoad() {
		 this.userid = uni.getStorageSync('userid')
		},
		methods: {
			// 存地址
			async saveaddress() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/address/addaddress',
					method: 'POST',
					data: {
						userid: this.userid,
						name: this.name,
						phone: this.phone,
						address: this.address1 + this.address2
					}
				})
				console.log(res)
				if (res.status == 0) {
					uni.showToast({
						title: res.message,
					});
				const time = setTimeout(function() {
						uni.navigateTo({
							url: 'addressList'
						})
					}, 1000)
                }
				else {
				uni.showToast({
					   title:res.message,
				       icon:'error'
				   }) 	
				}
			},

			tosaveaddress() {
				if (this.name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'error'
					})
				} else if (this.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'error'
					})
				} else if (this.address1 == '') {
					uni.showToast({
						title: '请输入所在地区',
						icon: 'error'
					})
				} else if (this.address2 == '') {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'error'
					})
				} else {
					this.saveaddress()
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.address-input {
		width: 100%;
		background-color: #FFFFFF;

		.list-input {
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 100rpx;
			border-bottom: 2rpx solid #f6f6f6;

			.title {
				display: flex;
				align-items: center;
				width: 20%;
				height: 100%;

				text {
					color: #222222;
					font-size: 26rpx;
				}
			}

			.content {
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;

				input {
					width: 100%;
					height: 100%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}

		.list-textarea {
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			border-bottom: 2rpx solid #f6f6f6;

			.title {
				display: flex;
				width: 20%;
				height: 80%;

				text {
					color: #222222;
					font-size: 26rpx;
				}
			}

			.content {
				display: flex;
				align-items: center;
				width: 70%;
				height: 100%;

				textarea {
					width: 100%;
					height: 80%;
					font-size: 26rpx;
					color: #222222;
				}
			}
		}
	}

	.footer-btn {
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 70rpx;
			background: linear-gradient(to right, #3CB79A, #48deb9);
			border-radius: 70rpx;
			box-shadow: 0 10rpx 10rpx #3CB79A;

			text {
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
