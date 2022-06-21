<template>
	<view @click="isMore = false">
		<view class="goods-head" :style="'background:rgba(255,255,255,' + PageScrollTop / 100 + ')'">
			<!-- 返回 -->
			<view class="back" @click="onBack">
				<view class="back-one" :class="{ action: PageScrollTop > 120 }">
					<text></text>
				</view>
			</view>
			<!-- tab切换 -->
			<view class="head-tab" v-if="PageScrollTop > 120">
				<view class="tab" :class="{'action':TabShow===0}" @click="onTab(0)">
					<text>商品</text>
					<text class="line"></text>
				</view>
				<view class="tab" :class="{'action':TabShow===2}" @click="onTab(2)">
					<text>详情</text>
					<text class="line"></text>
				</view>
		 </view> 
			<!-- 分享更多 -->
			<view class="share-more">
				<view class="share-more-one" :class="{ action: PageScrollTop > 120 }">
					<view class="list" @click.stop="isMore = !isMore">
						<text class="iconfont icon-gengduo1"></text>
					</view>
				</view>
				<view class="mroe-list" v-show="isMore">
					<navigator open-type="switchTab" url="/pages/index/index" class="list">
						<view class="icon">
							<text class="iconfont icon-shouye"></text>
						</view>
						<view class="title">
							<text>首页</text>
						</view>
					</navigator>
					<navigator class="list"  url="/pages/unuser/spsclistitem">
						<view class="icon">
							<text class="iconfont icon-wodeguanzhu"></text>
						</view>
						<view class="title">
							<text>我的关注</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- banner，标题 -->
		<view class="banner-title">
			<!-- banner -->
             <!-- 轮播图 -->
			<view class="banner">
				<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true"
					interval="5000" duration="500">
					<swiper-item v-for="(item, index) in goodsinfo.picinfo" :key="index" @click="preview(index)">
						<image :src="item.url" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 价格 -->
			<view class="price-info">
				<view class="price">
					<text class="min">￥</text>
					<text class="max">{{goodsinfo.goods_price}}</text>
					<text class="min">.00</text>
				</view>
				<view class="info">
					<view class="list" @click="onAttention">
						<text class="iconfont"
							:class="AttentionShow==0?'icon-shoucang':'icon-shoucang1 action'"></text>
						<text>{{ AttentionShow == 0 ? '关注' : '已关注' }}</text>
					</view>
				</view>
			</view>
			<!-- 标题 -->
			<view class="goods-title">
				<text>{{goodsinfo.goods_introduce}}</text>
				<!-- <view class="yf">运费--{{cart.length}}</view> -->
			</view>
		</view>
		<!-- 商品介绍 -->
		<view class="products-introduction" ref="products">
			<view class="title">
				<text>商品介绍</text>
			</view>
			<view class="content">
				<div class="m-img">
					<img
						:src="goodsinfo.infopic">
				</div>
			</view>
		</view>
		<!-- 底部 -->
		<view class="page-footer">
			<view class="footer-fn">
				<view class="list">
					<text class="iconfont icon-lianxikefu"></text>
					<text>联系客服</text>
				</view>
				<!-- <view class="list" @click="onToCart"> -->
					<!-- <text class="iconfont icon-gouwuchekong"></text>
					<text>购物车</text> -->
					<uni-goods-nav :options="options" @click="onToCart" class="iconfont"/>
				<!-- </view> -->
			</view>
			<view class="footer-buy">
				<view class="cart-add" @click="addcart">
					<text>加入购物车</text>
				</view>
				<view class="buy-at" @click="">
					<text>立即购买</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		computed:{
			// 吧m_cart模块中的total的getter映射到当前页面使用
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total:{
				handler(newVal){
					const findResult = this.options.find((x)=>x.text==='购物车')
					if(findResult){
						findResult.info = newVal
					}
				},
				immediate:true
			},
		},
		data() {
			return {
				pageid:'',
				user_id:'',
				goodsinfo:{},
				TabShow: 0,
				// 控制右上角更多的
				isMore: false,
				// 控制收藏显示
				AttentionShow: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: '/static/1.webp'
					},
					{
						id: 1,
						type: 'image',
						url: '/static/2.webp'
					},
					{
						id: 2,
						type: 'image',
						url: '/static/3.webp'
					},
					{
						id: 3,
						type: 'image',
						url: '/static/4.webp'
					},
					{
						id: 4,
						type: 'image',
						url: '/static/5.webp'
					},
				],
				PageScrollTop: 0,
				 options: [{
							icon: 'cart',
							text: '购物车',
							info: 0
						 }],
			};
		},
		onLoad(params) {
		   this.user_id = uni.getStorageSync('userid');
			// console.log(params.type)
			this.getgoodsinfo(params);
			this.pageid = params.id
			// console.log(params.id)
			this.howspsc(this.user_id,this.pageid)
		},
		// 页面滚动
		onPageScroll(e) {
			this.PageScrollTop = e.scrollTop;
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			
			//加入购物车
			addcart(){
				const goods ={
					id : this.goodsinfo.id,
					goods_name : this.goodsinfo.goods_introduce,
					goods_price : this.goodsinfo.goods_price,
					goods_count : 1,
					goods_pics :  this.goodsinfo.pics,
					goods_state:true
				}
			 // console.log(goods)
			 this.addToCart(goods)
				
			},
			
            // 点击轮播图预览
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.goodsinfo.picinfo.map(x=>x.url)
				})
			},
			/**
			 * 返回
			 */
			onBack() {
				uni.navigateBack();
			},
			// 顶部的显示控制
			onTab(type) {
				this.TabShow = type;
				switch (type) {
					case 0:
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
						break;
					case 2:
						uni.createSelectorQuery().select(".products-introduction").boundingClientRect((
						data) => { //data - 各种参数
							uni.pageScrollTo({
								scrollTop: this.PageScrollTop + data.top - 50,
								duration: 300
							});
						}).exec()
						break;
				}
			},
			/**
			 * 去购物车
			 */
			onToCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			/**
			 * 关注点击
			 */
			onAttention() {
				if (this.AttentionShow === 0) {
					this.AttentionShow = 1;
					this.$myRequest({
						url: '/spsc/addspsc',
						method: 'POST',
						data: {
							 uid: this.user_id,
							 pid: this.pageid,
						 }
					 })
					uni.showToast({
						title: '关注成功',
						icon: 'none'
					})
				} else {
					this.AttentionShow = 0;
					this.$myRequest({
						url: '/spsc/delspsc',
						method: 'POST',
						data: {
							 uid: this.user_id,
							 pid: this.pageid,
						 }
					 })
					uni.showToast({
						title: '取消成功',
						icon: 'none'
					})
				}
			},		
				 // 获取关注数据
			async howspsc(uid,pid){
				const {data:res} = await this.$myRequest({
						url: '/spsc/isspsc',
					method: 'POST',
					data: {
						 uid:uid,
						 pid:pid
					 }
				 })
				  // console.log(res)
				  	if(res.status == 1){
						this.AttentionShow = 0
					}
					 else{
						this.AttentionShow = 1 
				   } 
			 }	,
		    // 获取商品数据				
		    async getgoodsinfo(i){
				const {	data: res} = await this.$myRequest({
				  url: '/my/tea/product/getproductby/' + i.id,
			   })
			   console.log(res.data)
			   this.goodsinfo = res.data[0]
			   // console.log(this.goodsinfo.pics)
			}
		}
	};
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		width: 100%;
		// height: 100%;
		background: #f6f6f6;
		overflow-x: hidden;
		// overflow-y: auto;
	}
	.goods-head{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background:rgba(255,255,255,0);
		/* #ifdef APP-PLUS */
		height: calc(100rpx + var(--status-bar-height));
		/* #endif */
		/* #ifdef MP */
		height: 200rpx;
		/* #endif */
		.back{
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100%;
			/* #ifdef APP-PLUS */
			padding-top: 50rpx;
			/* #endif */
			/* #ifdef MP */
			padding-top: 100rpx;
			/* #endif */
			// 返回
			.back-one{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50rpx;
				height: 50rpx;
				background-color: rgba(0,0,0,0.3);
				border-radius: 100%;
				text{
					display: flex;
					width: 20rpx;
					height: 20rpx;
					border-left: 2rpx solid #FFFFFF;
					border-bottom: 2rpx solid #FFFFFF;
					transform: rotate(45deg);
				}
			}
			.action{
				background-color: transparent;
				text{
					border-color: #555555;
				}
			}
		}
		// tab切换
		.head-tab{
			display: flex;
			align-items: center;
			height: 100%;
			/* #ifdef APP-PLUS */
			padding-top: 50rpx;
			/* #endif */
			/* #ifdef MP */
			padding-top: 100rpx;
			/* #endif */
			.tab{
				position: relative;
				margin: 0 20rpx;
				padding: 0 10rpx;
				text{
					color: #555555;
					font-size: 26rpx;
				}
			}
			.action{
				text{
					color: #212121;
					font-size: 28rpx;
				}
				.line{
					position: absolute;
					left: 0;
					bottom: -10rpx;
					width: 100%;
					height: 6rpx;
					background: linear-gradient(to right,#3CB79A,rgba(255,255,255,0.3));
				}
			}
		}
		// 分享更多
		.share-more{
			position: absolute;
			right: 0;
			top: 0;
			width: 140rpx;
			height: 100%;
			/* #ifdef APP-PLUS */
			padding-top: 50rpx;
			/* #endif */
			/* #ifdef MP */
			padding-top: 100rpx;
			/* #endif */
			.share-more-one{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-left: 65rpx;
				height: 100%;
				.list{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50rpx;
					height: 50rpx;
					background-color: rgba(0,0,0,0.3);
					border-radius: 100%;
					text{
						font-size: 50rpx;
						color: #FFFFFF;
					}
				}
			}
			.action{
				.list{
					background-color: transparent;
					text{
						color: #555555;
					}
				}
			}
			.mroe-list{
				position: fixed;
				right: 20rpx;
				top: 100rpx;
				/* #ifdef MP */
				top: 180rpx;
				/* #endif */
				width: 200rpx;
				background-color: rgba(255,255,255,0.9);
				border-radius: 10rpx;
				.list{
					display: flex;
					align-items: center;
					width: 90%;
					height: 80rpx;
					margin: 0 auto;
					border-bottom: 2rpx solid #C8C7CC;
					padding: 0 4%;
					.icon{
						display: flex;
						align-items: center;
						width: 60rpx;
						text{
							font-size: 34rpx;
						}
					}
					.title{
						display: flex;
						align-items: center;
						text{
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
	/* banner 标题 */
	.banner-title{
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
	}
	/* banner */
	.banner{
		width: 100%;
		height: 750rpx;
		.screen-swiper{
			width: 100%;
			height: 100%;
		}
	}
	.screen-swiper image{
		width: 100%;
		height: 100%;
	}
	
	/* 价格 */
	.price-info{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 4%;
		height: 120rpx;
		.price{
			display: flex;
			align-items: center;
			.min{
				color: #fe3b0f;
				font-size: 28rpx;
				font-weight: bold;
			}
			.max{
				color: #fe3b0f;
				font-size: 48rpx;
				font-weight: bold;
			}
		}
		.info{
			display: flex;
			align-items: center;
			height: 100%;
			.list{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0 20rpx;
				text{
					font-size: 24rpx;
					color: #555555;
				}
				.iconfont{
					font-size: 34rpx;
					margin-bottom: 10rpx;
					color: #555555;
				}
				.action{
					color: #fe3b0f;
				}
			}
		}
	}
	/* 标题 */
	.goods-title{
		padding: 0 4%;
		margin: 20rpx auto;
		text{
			font-size: 32rpx;
			color: #212121;
		}
	}
	/* 商品介绍 */
	.products-introduction{
		padding: 0 4% 100rpx;
		.title{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80rpx;
			text{
				font-size: 28rpx;
				color: #212121;
				margin: 0 20rpx;
			}
		}
		.title:before{
			content: "";
			width: 100rpx;
			height: 2rpx;
			background-color: #c0c0c0;
		}
		.title:after{
			content: "";
			width: 100rpx;
			height: 2rpx;
			background-color: #c0c0c0;
		}
		.content{
			width: 100%;
			image{
				width: 100%;
			}
			img{
				width: 100%;
			}
		}
	}
	/* 底部 */
	.page-footer{
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #f6f6f6;
		padding: 0 4%;
		.footer-fn{
			display: flex;
			align-items: center;
			width: 35%;
			height: 100%;
			.list{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 40%;
				height: 100%;
				text{
					font-size: 22rpx;
					color: #555555;
				}
				.iconfont{
					font-size: 40rpx;
					color: #212121;
				}
			}
		}
		.footer-buy{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 60%;
			height: 100%;
			.cart-add{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 48%;
				height: 70rpx;
				background: linear-gradient(to right,#fe3b0f,#ff4e17);
				border-radius: 70rpx;
				text{
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
			.buy-at{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 48%;
				height: 70rpx;
				background: #fc603a;
				border-radius: 70rpx;
				text{
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
