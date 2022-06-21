<template>
	<view class="page">
		<view class="my-top">
			<!-- head -->
			<view class="head" :style="'background-color: rgba(255,255,255,'+(scrollTop/50)+');'">
				<view class="portrait">
					<image v-show="scrollTop>20"
						src="//img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png">
					</image>
				</view>
				<view class="title">
					<text v-show="scrollTop>20">我的</text>
				</view>
				<view class="setting-mess">
					<view class="setting" @click="onSetting">
						<text class="iconfont icon-shezhi" :style="scrollTop>20?'color:#333333':''"></text>
					</view>
					<view class="mess" @click="onMessage">
						<text class="iconfont icon-xiaoxizhongxin" :style="scrollTop>20?'color:#333333':''"></text>
					</view>
				</view>
			</view>
			<!-- 用户信息 -->
			<view class="user-info">
				<view class="portrait">
					<image :src="userpic?userpic:'../../static/user_pic.jpg'"></image>
				</view>
				<view class="info">
					<view class="nickname">
						<text>{{nickname?nickname:'登录'}}</text>
					</view>
				</view>
			</view>
			<!-- 关注区 -->
			<view class="focus-area">
				<view class="list" @click="onCollect('goods')">
					<view class="num">
						<text>{{wzlist.length}}</text>
					</view>
					<view class="title">
						<text>文章收藏</text>
					</view>
				</view>
				<view class="list" @click="onCollect('content')">
					<view class="num">
						<text>{{splist.length}}</text>
					</view>
					<view class="title">
						<text>商品收藏</text>
					</view>
				</view>
				<view class="list" @click="onCollect('record')">
					<view class="num">
						<text>{{myarticle.length}}</text>
					</view>
					<view class="title">
						<text>我的文章</text>
					</view>
				</view>
			</view>
			<!-- 会员 -->
			<view class="vip-info" @click="onMmeberVip">
				<view class="vip">
					<text>超级会员</text>
					<text class="line"></text>
				</view>
				<view class="vip-explain">
					<text>超级会员一年预计可省99元</text>
				</view>
				<view class="vip-btn">
					<text>立即查看</text>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="list" @click="onSkipOrder(1)">
				<view class="icon">
					<text class="iconfont icon-daifukuan"></text>
					<!-- <text class="num">22</text> -->
				</view>
				<view class="title">
					<text>待付款</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(2)">
				<view class="icon">
					<text class="iconfont icon-31daifahuo"></text>
					<!-- <text class="num">22</text> -->
				</view>
				<view class="title">
					<text>待发货</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(3)">
				<view class="icon">
					<text class="iconfont icon-daishouhuo-1"></text>
				</view>
				<view class="title">
					<text>待收货</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(4)">
				<view class="icon">
					<text class="iconfont icon-31daipingjia"></text>
				</view>
				<view class="title">
					<text>待评价</text>
				</view>
			</view>
			<view class="list" @click="onSkipOrder(5)">
				<view class="icon">
					<text class="iconfont icon-tuihuanhuo"></text>
				</view>
				<view class="title">
					<text>退换</text>
				</view>
			</view>
		</view>
		<!-- 钱包 -->
		<!-- <view class="wallet-info">
			<view class="list" @click="onWallet('integral')">
				<view class="icon">
					<text class="number">{{point}}</text>
				</view>
				<view class="title">
					<text>积分</text>
				</view>
			</view> -->
			<!-- <view class="list" @click="onWallet('coupon')">
				<view class="icon">
					<text class="number">2</text>
				</view>
				<view class="title">
					<text>优惠券</text>
				</view>
			</view> -->
			<!-- <view class="list" @click="onWallet('wallet')">
				<view class="icon">
					<text class="number">200.00</text>
				</view>
				<view class="title">
					<text>余额</text>
				</view>
			</view> -->
			<!-- <view class="list">
				<view class="icon">
					<text class="iconfont icon-wodeqianbao"></text>
				</view>
				<view class="title">
					<text class="action">我的钱包</text>
				</view>
			</view> -->
		<!-- </view> -->
		<!-- 积分，付款码 -->
		<view class="integral-payment">
			<view class="list">
				<view class="title" @click="signin">
					<text class="iconfont icon-qiandao" style="font-weight: bold;"></text>
					<text>签到</text>
				</view>
				<view class="mess">
					<text>每日签到 领取积分</text>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<!-- <text class="iconfont icon-fukuanma"></text> -->
					<text>{{point}}</text>
				</view>
				<view class="mess">
					<text>您拥有的的积分</text>
				</view>
			</view>
		</view>
		<!-- 我的服务 -->
		<view class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<view class="list" @click="onServer('feedback')">
					<view class="thumb">
						<image src="/static/yjfk.png"></image>
					</view>
					<view class="name">
						<text>意见反馈</text>
					</view>
				</view>
				<view class="list" @click="onServer('serve')">
					<view class="thumb">
						<image src="/static/kfrx.png"></image>
					</view>
					<view class="name">
						<text>客服热线</text>
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
				scrollTop: 0,
				isHotline: false,
				nickname: '',
				//用户图片
				userpic: '',
				// 文章关注
				wzlist: '',
				//商品关注
				splist: '',
				//我的文章
				myarticle: '',
				// 用户id
				uid: '',
				// 用户积分
				point: ''

			};
		},
		onShow() {
			this.getpoint()
			this.getwzlist()
			this.getsplist()
			this.getmyarticle()
		},
		onLoad() {
			//获取用户姓名
			this.nickname = uni.getStorageSync('nickname')
			this.userpic = uni.getStorageSync('user_pic')
			this.uid = uni.getStorageSync('userid')
			// this.getwzlist()
			// this.getsplist()
			// this.getmyarticle()
			// this.getpoint()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			//文章收藏列表获取
			async getwzlist() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/collect/getlist',
					method: 'POST',
					data: {
						uid: this.uid,
					}
				})
				// this.wzsclist = res.data;
				let list = [];
				res.data.forEach(item => list.push(parseInt(item.proid)))
				// console.log(list)
				this.wzlist = list
				uni.setStorageSync('wzgz', list)
			},
			//商品收藏列表获取	
			async getsplist() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/spsc/getspsc',
					method: 'POST',
					data: {
						uid: this.uid,
					}
				})
				// this.wzsclist = res.data;
				let list = [];
				res.data.forEach(item => list.push(parseInt(item.pid)))
				// console.log(list)
				this.splist = list
				uni.setStorageSync('spsc', list)
			},
			//用户文章信息 
			async getmyarticle() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/eassy/geteassybyuserid',
					method: 'POST',
					data: {
						userid: this.uid,
					}
				})
				// console.log(res.data)
				this.myarticle = res.data
			},
			//获取用户积分
		async getpoint() {
                const {
                	data: res
                } = await this.$myRequest({
                	url: '/user/unuser/getpoint',
                	method: 'POST',
                	data: {
                		id: this.uid,
                	}
                })
			     // console.log(res.data)
				 this.point = res.data
				 uni.setStorage({
					 key:'point',
					 data:this.point
				 })
			},
			/**
			 * 关注跳转
			 */
			onCollect(type) {
				switch (type) {
					case 'goods':
						uni.navigateTo({
							url: 'wzsclistitem/wzsclistitem'
						})
						break;
					case 'content':
						uni.navigateTo({
							url: 'spsclistitem'
						})
						break;
					case 'record':
						uni.navigateTo({
							url: 'myarticle'
						})
						break;
				}
			},
			/**
			 * 订单
			 */
			onSkipOrder(type) {
				if (type === 5) {
					uni.navigateTo({
					
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/cart/orderlist?type=' + type,
				})
			},
			
			//签到跳转				
			signin(){
				uni.navigateTo({
					url:'sign'
				})
			},
			/**
			 * 我的服务点击
			 */
			onServer(type) {
				switch (type) {
					case 'feedback':
						uni.navigateTo({

						})
						break;
					case 'serve':
						this.isHotline = true;
						break;
				}
			},
			/**
			 * 设置点击
			 */
			onSetting() {
				uni.navigateTo({
					url: '/pages/unuser/setting'
				})
			},
			/**
			 * 消息点击
			 */
			onMessage() {
				uni.navigateTo({
					url: '/pages/Message/Message'
				})
			},

			/**
			 * 用户信息点击
			 * @param {Number} type
			 */
			onUserInfo() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		width: 100%;
		// height: 100%;
		padding-bottom: 100rpx;
		background-color: #f6f6f6;
	}

	.my-top {
		position: relative;
		width: 100%;
		height: 420rpx;
		/* #ifdef APP-PLUS */
		height: 460rpx;
		/* #endif */
		/* #ifdef MP */
		height: 520rpx;
		/* #endif */
		background: linear-gradient(to left, #3CB79A, #3CB79A);
		border-radius: 0 0 50% 50% / 0% 0% 15% 15%;
		overflow: hidden;

		.head {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			/* #ifdef APP-PLUS */
			height: calc(100rpx + var(--status-bar-height));
			padding-top: var(--status-bar-height);
			/* #endif */
			/* #ifdef MP */
			height: calc(200rpx + var(--status-bar-height));
			padding-top: calc(100rpx + var(--status-bar-height));
			/* #endif */
			background-color: rgba(255, 255, 255, 0);

			// transition: all 1s;
			.portrait {
				display: flex;
				width: 60rpx;
				height: 60rpx;
				margin-left: 20rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}

			.title {
				display: flex;
				align-items: center;

				text {
					color: #212121;
					font-size: 28rpx;
				}
			}

			.setting-mess {
				display: flex;
				align-items: center;
				height: 100%;
				margin-right: 20rpx;

				.setting {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 100%;

					text {
						color: #FFFFFF;
						font-size: 45rpx;
					}
				}

				.mess {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 100%;

					text {
						color: #FFFFFF;
						font-size: 45rpx;
					}
				}
			}
		}

		/* 用户信息 */
		.user-info {
			display: flex;
			align-items: center;
			padding: 0 5%;
			height: 120rpx;
			margin-top: 100rpx;
			/* #ifdef APP-PLUS */
			margin-top: 130rpx;
			/* #endif */
			/* #ifdef MP */
			margin-top: 200rpx;

			/* #endif */
			.portrait {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				box-sizing: border-box;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
					border: 4rpx solid #FFFFFF;
					box-sizing: border-box;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 70%;
				height: 100%;

				.nickname {
					width: 100%;
					padding: 10rpx 0;

					text {
						color: #FFFFFF;
						font-size: 28rpx;
					}
				}

				.rank {
					display: flex;
					align-items: center;
					width: 120rpx;
					height: 30rpx;
					padding: 0 10rpx;
					border: 2rpx solid #F0AD4E;
					border-radius: 30rpx;

					image {
						width: 24rpx;
						height: 24rpx;
					}

					text {
						font-size: 24rpx;
						color: #FFFFFF;
						margin-left: 10rpx;
					}
				}
			}
		}

		/* 关注区 */
		.focus-area {
			display: flex;
			align-items: center;
			width: 100%;
			height: 120rpx;

			.list {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33%;
				height: 100%;

				.num {
					display: flex;
					align-items: center;

					text {
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.title {
					display: flex;
					align-items: center;
					margin-top: 5rpx;

					text {
						color: #FFFFFF;
						font-size: 24rpx;
					}
				}
			}
		}

		/* vip */
		.vip-info {
			position: absolute;
			left: 50%;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			padding: 0 4%;
			width: 90%;
			height: 80rpx;
			background-color: #464C5B;
			transform: translate(-50%, 0);
			border-radius: 10rpx 10rpx 0 0;

			.vip {
				position: relative;
				display: flex;
				align-items: center;
				width: 20%;
				height: 60rpx;

				text {
					color: #ffe678;
					font-size: 26rpx;
				}

				.line {
					position: absolute;
					right: 0;
					top: 40%;
					width: 2rpx;
					height: 20rpx;
					background-color: #ffe678;
				}
			}

			.vip-explain {
				display: flex;
				align-items: center;
				height: 60rpx;
				margin: 0 10rpx;

				text {
					color: #ffe678;
					font-size: 24rpx;
				}
			}

			.vip-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;
				height: 40rpx;
				background-color: #ffe678;
				border-radius: 30rpx;
				margin-top: 10rpx;

				text {
					font-size: 24rpx;
					color: #464C5B;

				}
			}
		}
	}

	/* 订单信息 */
	.order-info {
		display: flex;
		width: 94%;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx auto;

		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 20%;
			height: 100%;

			.icon {
				position: relative;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 45rpx;
					color: #333333;
				}

				.num {
					position: absolute;
					right: -20rpx;
					top: -20rpx;
					padding: 4rpx;
					font-size: 18rpx;
					color: #fe3b0f;
					border: 2rpx solid #fe3b0f;
					border-radius: 100%;
					background-color: #FFFFFF;
				}
			}

			.title {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				text {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
	}

	/* 钱包 */
	.wallet-info {
		display: flex;
		width: 94%;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx auto;
		justify-content: center;
		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 25%;
			height: 100%;

			.icon {
				position: relative;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 50rpx;
					color: #fe3b0f;
				}

				.number {
					font-size: 28rpx;
					color: #212121;
					font-weight: bold;
				}
			}

			.title {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				text {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
	}

	/* 签到，付款码 */
	.integral-payment {
		display: flex;
		justify-content: space-between;
		width: 94%;
		height: 180rpx;
		margin: 20rpx auto;

		.list {
			width: 48%;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 20rpx;

			.title {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 120rpx;

				.iconfont {
					font-size: 48rpx;
					margin-right: 10rpx;
					font-weight: normal;
				}

				text {
					color: #212121;
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.mess {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;

				text {
					color: #C0C0C0;
					font-size: 26rpx;
				}
			}
		}
	}

	/* 我的服务 */
	.my-service {
		width: 94%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;

		.title {
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 80rpx;

			text {
				font-size: 28rpx;
				font-weight: bold;
				color: #212121;
			}
		}

		.service-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 4%;

			.list {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 25%;
				height: 140rpx;

				.thumb {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 80rpx;

					text {
						color: #212121;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	/* 客服热线弹窗 */
	.serve-hotline {
		.cu-dialog {
			width: 100%;
			border-radius: 20rpx 20rpx 0 0 !important;

			.contact-list {
				width: 100%;

				.list {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100rpx;

					text {
						color: #222222;
						font-size: 32rpx;
					}
				}
			}
		}
	}
</style>
