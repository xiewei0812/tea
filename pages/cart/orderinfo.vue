<template>
	<view class="page">
		<!-- 订单状态 -->
		<view class="order-status">
			<view class="status">
				<text v-if="ordertype == 1">待付款</text>
				<text v-else-if="ordertype==2">待发货</text>
				<text v-else-if="ordertype==3">待收货</text>
				<text v-else>已完成</text>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="shipping-address">
			<view class="name-phone">
				<!-- <text class="iconfont icon-dingwei"></text> -->
				<text>{{address.name}}</text>
				<text>{{address.phone}}</text>
			</view>
			<view class="address">
				<text>{{address.address}}</text>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods">
			<view class="goods-list">
				<view class="list" v-for="(item,index)  in  order.orderinfo" :key='index' v-if="item.goods_state">
					<view class="thumb">
						<image :src="item.goods_pics" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="one-omit">{{item.goods_name}}</text>
						</view>
						<view class="num-size">
							<text>数量：{{item.goods_count}}</text>
						</view>
						<view class="price">
							<text>￥{{item.goods_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="contact">
				<text class="iconfont icon-kefu"></text>
				<text>联系客服</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="info-list">
				<view class="list">
					<view class="title">支付方式:</view>
					<view class="content">
						<text>在线支付</text>
					</view>
				</view>
				<view class="list">
					<view class="title">配送方式:</view>
					<view class="content">
						<text>普通快递</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单明细 -->
		<view class="order-details">
			<view class="details-list">
				<view class="list">
					<view class="title">
						<text>商品总额</text>
					</view>
					<view class="price">
						<text>￥{{order.totalprice}}.00</text>
					</view>
				</view>
				<view class="list action">
					<view class="title">
						<text>实付款：</text>
					</view>
					<view class="price">
						<text>￥{{order.totalprice}}.00</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer-btn">
			<view class="btn">
				<text class="action" @click="payorder" v-if="ordertype==1">确认付款</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordertype: '',
				orderid: '',
				order: '',
				address: '',
			};
		},
		onLoad(e) {
			this.ordertype = e.type
			this.orderid = e.id
			// console.log(this.ordertype)
			// console.log(this.orderid)
			this.getorder()
		},
		methods: {
			//获取订单信息
			async getorder() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/order/getorderbyid',
					method: 'POST',
					data: {
						id: this.orderid
					}
				})
				// console.log(res.data[0]) 
				this.order = res.data[0]
				this.address = res.data[0].address
			},
			//支付
			async payorder() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/order/changeorder',
					method: 'POST',
					data: {
						id: this.orderid,
						states: 2,
					}
				})
				uni.showToast({
					title: '支付成功'
				})
				const time = setTimeout(function() {
					uni.navigateTo({
						url: '/pages/cart/orderlist?type=2'
					})
				}, 1000)
			},




		},
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
	}

	/* 订单状态 */
	.order-status {
		width: 100%;
		height: 200rpx;
		background: linear-gradient(to right, #3CB79A, #4ff4cb);

		.status {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			text {
				font-size: 50rpx;
				// font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	/* 收货地址 */
	.shipping-address {
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: -20rpx auto 20rpx;

		.name-phone {
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 80rpx;

			text {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
				margin-right: 20rpx;
			}
		}

		.address {
			display: flex;
			padding: 0 4%;
			height: 100rpx;
			margin-left: 50rpx;

			text {
				font-size: 26rpx;
				color: #959595;
			}
		}
	}

	/* 订单商品 */
	.order-goods {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;

		.goods-list {
			padding: 0 4%;

			.list {
				display: flex;
				align-items: center;
				width: 100%;
				min-height: 200rpx;

				.thumb {
					display: flex;
					width: 30%;
					height: 200rpx;
					margin-top: 20rpx;

					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
					}
				}

				.item {
					width: 70%;
					height: 100%;

					.title {
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;

						text {
							font-size: 26rpx;
							color: #222222;
						}
					}

					.num-size {
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;

						text {
							font-size: 26rpx;
							color: #959595;
							margin-right: 20rpx;
						}

						text:last-child {
							margin-right: 0;
						}
					}

					.price {
						display: flex;
						align-items: center;
						width: 100%;
						height: 60rpx;

						text {
							font-size: 28rpx;
							font-weight: bold;
							color: #222222;
						}
					}

					.order-btn {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 100%;
						height: 100rpx;

						.btn {
							padding: 10rpx 30rpx;
							color: #555555;
							font-size: 26rpx;
							border: 2rpx solid #EEEEEE;
							border-radius: 100rpx;
						}
					}

					.order-btn {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 100%;
						height: 100rpx;

						.btn {
							padding: 10rpx 30rpx;
							color: #555555;
							font-size: 26rpx;
							border: 2rpx solid #EEEEEE;
							border-radius: 100rpx;
						}
					}
				}
			}
		}

		.contact {
			display: flex;
			align-items: center;
			justify-content: center;
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			box-shadow: 0 0 20rpx #EEEEEE;
			border-radius: 0 0 20rpx 20rpx;

			text {
				font-size: 28rpx;
				color: #555555;
			}

			.iconfont {
				font-size: 34rpx;
				margin-right: 20rpx;
			}
		}
	}

	/* 订单信息 */
	.order-info {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;

		.info-list {
			padding: 0 4%;

			.list {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #f6f6f6;

				.title {
					font-size: 26rpx;
					color: #959595;
				}

				.content {
					display: flex;
					align-items: center;
					margin-left: 20rpx;

					text {
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}

					.btn {
						padding: 6rpx 20rpx;
						background-color: #EEEEEE;
						color: #555555;
						font-size: 24rpx;
						border-radius: 50rpx;
						margin-left: 40rpx;
					}
				}
			}
		}
	}

	/* 订单明细 */
	.order-details {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		padding-bottom: 100rpx;

		.details-list {
			padding: 0 4%;

			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #f6f6f6;

				.title {
					font-size: 26rpx;
					color: #959595;
				}

				.price {
					font-size: 26rpx;
					font-weight: bold;
				}
			}

			.action {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.price {
					font-size: 32rpx;
					font-weight: bold;
					color: #3CB79A;
				}
			}
		}
	}

	.footer-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		// justify-content: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #EEEEEE;
		padding: 0 75%;

		.del {
			display: flex;
			align-items: center;

			text {
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				font-weight: bold;
			}
		}

		.btn {
			display: flex;
			align-items: center;

			text {
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				border: 2rpx solid #C0C0C0;
				border-radius: 100rpx;
				color: #c0c0c0;
				margin-left: 20rpx;
			}

			.action {
				margin-right: 20px;
				background-color: #3CB79A;
				color: #FFFFFF;
				border: 2rpx solid #FFFFFF;
			}
		}
	}
</style>
