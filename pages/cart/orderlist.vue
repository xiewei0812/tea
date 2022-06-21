<template>
	<view class="page">
		<view class="head-back">
			<view class="back" @click="onBack">
				<text></text>
			</view>
			<view class="title">
				<text>我的订单</text>
			</view>
		</view>
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>已完成</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>待付款</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>待发货</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>待收货</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>待评价</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 取消订单的再次确认 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog  title="确认是否取消,取消后不可恢复" confirmText="确认" message="成功消息"
				:duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup
		
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="list" v-for="(item,index) in orderlist"  :key="index">
				<view class="title-status">
					<view class="title">
						<text>下单时间：2022-3-12 18:56</text>
					</view>
					<view class="status">
						<text  v-if="OrderType==1">待付款</text>
						<text v-if="OrderType==2">待发货</text>
						<text v-if="OrderType==3">待收货</text>
					</view>
				</view>
				<view class="goods-list">
					<view class="goods" v-for="(list,i) in  item.orderinfo" :key='i' v-if="list.goods_state">
						<view class="thumb">
							<image :src="list.goods_pics" mode=""></image>
						</view>
						<view class="item">
							<view class="goods-name">
								<text class="two-omit">{{list.goods_name}}</text>
							</view>
							<view class="goods-price">
								<text class="min">￥</text>
								<text class="max">{{list.goods_price}}</text>
								<text class="min">.00</text>
								<text class="max"> x{{list.goods_count}}</text>
							</view>
						</view>
					</view>	
					
				</view>
				<view class="status-btn">
					<view class="btn">
						<text v-if="OrderType==1" @click="delorder(item.id)">取消订单</text>
						<text v-if="OrderType==3" @click="surelorder(item.id)">确认收货</text>
					</view>
					<view class="btn" @click="onOrderList(item.id)">
						<text>查看订单</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderType: 0,
				userid:'',
				address:'',
				orderlist:'',
				orderid:'',
			};
		},
		onLoad(params) {
			this.OrderType = params.type;
			this.userid = uni.getStorageSync('userid')
			this.getorderlist()
		},
		methods:{
			//获取用户订单数据
			async  getorderlist(){
				const {data:res} = await this.$myRequest({
							url: '/order/getorderby',
							method: 'POST',
							data: {
								 userid: this.userid,
								 states: this.OrderType,
							 }
						 })	
						// console.log(res) 	
					  this.orderlist  = res.data
				    },
					//取消订单按钮
				    delorder(id){
						this.orderid = id
						this.$refs.popup.open()
					},	
					//取消按钮
					close() {
						this.$refs.popup.close()
					},
					//确认按钮
				async confirm(){
						// console.log(this.orderid)
						const {data:res} = await this.$myRequest({
									url: '/order/delorder',
									method: 'POST',
									data: {
										id:this.orderid
									 }
								 })
					   // console.log(res)	 
						uni.showToast({
						title:'取消成功'
						})
					   this.$refs.popup.close()
					   this.getorderlist()
					 },	
					 // 确认收货
				async surelorder(id){
						 const {
						 	data: res
						 } = await this.$myRequest({
						 	url: '/order/changeorder',
						 	method: 'POST',
						 	data: {
						 		id: id,
						 		states: 0,
						 	}
						 })
						 uni.showToast({
						 	title: '收货成功'
						 })
						this.getorderlist() 
					 },
			/**
			 * 返回点击
			 */
			onBack(){
				uni.navigateBack();
			},
			/**
			 * 订单tab点击
			 */
			onOrderTab(type){
				this.OrderType = type;
				// #ifdef H5
				uni.redirectTo({
					url: '/pages/cart/orderlist?type=' + type,
				})
				//#endif
			},
		
			  // 查看订单点击
			onOrderList(id){
				this.orderid = id
				// console.log(this.orderid)
				uni.navigateTo({
				   url:'orderinfo?type='+this.OrderType+'&id='+this.orderid	
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.page{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
	}
	/* 顶部返回 */
	.head-back{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		/* #ifdef APP-PLUS */
		height: calc(50rpx + var(--status-bar-height));
		padding-top: var(--status-bar-height);
		/* #endif */
		/* #ifdef MP */
		height: 150rpx;
		padding-top: 20rpx;
		/* #endif */
		.back{
			position: absolute;
			left: 0;
			top: 0;
			/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
			/* #endif */
			/* #ifdef MP */
			padding-top: 20rpx;
			/* #endif */
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100%;
			text{
				width: 20rpx;
				height: 20rpx;
				border-left: 2rpx solid #555555;
				border-bottom: 2rpx solid #555555;
				transform: rotate(45deg);
			}
		}
		.title{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				color: #222222;
			}
		}
		.more-icon{
			position: absolute;
			right: 0;
			top: 0;
			/* #ifdef APP-PLUS */
			right: 0rpx;
			padding-top: var(--status-bar-height);
			/* #endif */
			/* #ifdef MP */
			right: 220rpx;
			padding-top: 20rpx;
			/* #endif */
			display: flex;
			align-items: center;
			height: 100%;
			.icon-list{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 100%;
				text{
					font-size: 34rpx;
					color: #222222;
				}
			}
		}
	}
	
	/* 订单tab */
	.order-tab{
		position: fixed;
		left: 0;
		top: 100rpx;
		/* #ifdef APP-PLUS */
		top: calc(50rpx + var(--status-bar-height));
		/* #endif */
		z-index: 10;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		.tab{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20%;
			height: 80%;
			text{
				font-size: 26rpx;
				color: #959595;
			}
		}
		.action{
			text{
				color: #222222;
			}
			.line{
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 60rpx;
				height: 6rpx;
				background: linear-gradient(to right,#3CB79A,#f6f6f6);
				transform: translate(-50%,0);
			}
		}
	}
	
	/* 订单列表 */
	.order-list{
		width: 100%;
		margin-top: 220rpx;
		/* #ifdef APP-PLUS */
		margin-top: calc(170rpx + var(--status-bar-height));
		/* #endif */
		.list{
			padding: 0 4%;
			min-height: 400rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.title-status{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 100rpx;
				.title{
					display: flex;
					align-items: center;
					text{
						font-size: 26rpx;
						font-weight: bold;
						color: #222222;
					}
				}
				.status{
					display: flex;
					align-items: center;
					text{
						font-size: 26rpx;
						color: #3CB79A;
					}
					.del{
						padding: 10rpx;
						font-size: 34rpx;
						color: #222222;
						background-color: #f6f6f6;
						border-radius: 100%;
						margin-left: 20rpx;
					}
				}
			}
			.goods-list{
				width: 100%;
				.goods{
					display: flex;
					align-items: center;
					width: 100%;
					height: 200rpx;
					.thumb{
						display: flex;
						align-items: center;
						width: 30%;
						height: 100%;
						image{
							width: 160rpx;
							height: 160rpx;
							border-radius: 10rpx;
						}
					}
					.item{
						display: flex;
						align-items: center;
						width: 70%;
						height: 100%;
						.goods-name{
							width: 70%;
							text{
								font-size: 26rpx;
								color: #555555;
							}
						}
						.goods-price{
							display: flex;
							align-items: center;
							justify-content: flex-end;
							width: 30%;
							text{
								color: #222222;
							}
							.min{
								font-size: 26rpx;
							}
							.max{
								font-size: 34rpx;
							}
						}
					}
				}
			}
			.status-btn{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: 100%;
				height: 100rpx;
				.btn{
					padding: 10rpx 30rpx;
					border: 1rpx solid #EEEEEE;
					border-radius: 100rpx;
					margin-left: 20rpx;
					text{
						font-size: 26rpx;
						color: #555555;
					}
				}
				.action{
					border: 1rpx solid #3CB79A;
					text{
						color: #3CB79A;
					}
				}
			}
		}
	}
</style>
