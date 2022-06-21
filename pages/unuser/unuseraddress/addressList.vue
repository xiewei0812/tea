<template>
	<view class="page">
		<!-- 地址列表 -->
		<view class="address-list">
			<view class="list" v-for="(item,index) in addresslist" :key="index" @click="saveinaddress(item)">
				<view class="name-phone">
					<view class="name">
						<text class="one-omit">{{item.name}}</text>
					</view>
					<view class="phone">
						<text>{{item.phone}}</text>
					</view>
				</view>
				<view class="address-edit">
					<view class="address">
						<text>{{item.address}}</text>
					</view>
					<view class="edit" @click.stop="deladdress(item.id)">
						<text class="iconfont icon-shanchu"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加地址 -->
		<view class="add-address">
			<view class="btn" @click="onAddressEdit()">
				<text>新建收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				addresslist: '',
			};
		},
		onLoad() {
			this.userid = uni.getStorageSync('userid')
			this.getuseraddress()
		},
		methods: {
			// 获取用户收获地址
			async getuseraddress() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/address/getaddress',
					method: 'POST',
					data: {
						userid: this.userid
					}
				})
				// console.log(res.data)
				this.addresslist = res.data
			},
			//删除用户地址的函数
			async deluseraddress(value) {
				const {
					data: res
				} = await this.$myRequest({
					url: '/address/deladdress',
					method: 'POST',
					data: {
						id: value
					}
				})
                  console.log(res)
			},
			//点击删除弹出的模态框
			deladdress(value) {
				uni.showModal({
					title: '提示',
					content: '是否删除该地址',
					success: res => {
						if (res.confirm) {
						     // console.log(value)
						  this.deluseraddress(value)
						  this.getuseraddress()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//将地址保存到本地
			saveinaddress(item){
				// console.log(item)
				uni.setStorageSync('address',item)
				uni.switchTab({
					url:'../../cart/cart'
				})
			},
			/**
			 * 新建地址点击
			 */
			onAddressEdit() {
				uni.navigateTo({
					url: 'addressEdit'
				})
			}
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

	/* 地址列表 */
	.address-list {
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 120rpx;

		.list {
			padding: 0 4%;
			height: 160rpx;
			border-bottom: 2rpx solid #f6f6f6;

			.name-phone {
				display: flex;
				align-items: center;
				width: 100%;
				height: 80rpx;

				.name {
					display: flex;
					align-items: center;
					width: 30%;
					height: 100%;

					text {
						width: 100%;
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}
				}

				.phone {
					display: flex;
					align-items: center;
					width: 70%;
					height: 100%;

					text {
						font-size: 28rpx;
						font-weight: bold;
						color: #222222;
					}

					.tag {
						padding: 4rpx 8rpx;
						font-size: 24rpx;
						color: #FFFFFF;
						background-color: #3CB79A;
						border-radius: 4rpx;
						margin-left: 20rpx;
					}

					.blue {
						background-color: #0099FF;
					}
				}
			}

			.address-edit {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 60rpx;

				.address {
					display: flex;
					align-items: center;
					width: 90%;
					height: 100%;

					text {
						font-size: 26rpx;
						color: #959595;
					}
				}

				.edit {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					width: 10%;
					height: 100%;

					text {
						font-size: 38rpx;
						color: #555555;
					}
				}
			}
		}
	}

	/* 添加地址 */
	.add-address {
		position: fixed;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 70rpx;
			background: linear-gradient(to right, #3CB79A, #47dcb7);
			border-radius: 70rpx;
			box-shadow: 0 10rpx 10rpx #3CB79A;

			text {
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
