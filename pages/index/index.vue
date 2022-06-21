<template>
	<!--首页-->
	<view>
		<view class="search-box">
			<search @click='gosearch'></search>
		</view>
		<!--主体-->
		<view class="idxMain">
			<!--轮播图-->
			<swiper class="swiper" indicator-active-color='#fff' :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration" circular>
				<swiper-item v-for="(item,index) in bannerList" :key='index'>
					<view class="swiper-item uni-bg-red">
						<image :src="item.imgs"></image>
					</view>
					<view class="swiper-title">
						<view class="swiper-title-box">{{ item.title }}</view>
					</view>
				</swiper-item>
			</swiper>
			<!--轮播图-->
			<!--头部导航-->
			<view class="headNav">
				<view class="headNavBox">
					<scroll-view>
						<view class="headNavLt" v-for="(item,index) in headTabList" :key="index"
							:class="{activeNav:index == headTabIdx}" @click="IsHeadTabClick(index,item)">
							{{ item.name }}
						</view>
					</scroll-view>
				</view>
			</view>
			<!--头部导航-->
			<!--内容1-->
			<view class="contBg">
				<view class="contOver" v-for="(item,index) in articleinfo" :key="index" @click="goltem(item.id)">
					<view class="idxMainBox">
						<view class="contOverLt">
							<view class="contTxt">{{ item.article_title }}</view>
							<view class="contTime">作者:{{ item.author }}
							   <view class="like iconfont icon-xihuan2">{{item.likenum}}</view>
							</view>
						</view>
						<view class="contRtImg">
							<image :src="item.article_pic"></image>
						</view>
					</view>
				</view>
			</view>
			<!--内容1-->
		</view>
		<!--主体-->
	</view>
</template>

<script>
	import  badgeMix from  '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				headTabList: [{
						id: 0,
						name: '资讯'
					},
					{
						id: 1,
						name: '茶友圈'
					},
				], //头部导航
				headTabIdx: 0,

				bannerList: [{
						id: 1,
						imgs: 'https://img1.baidu.com/it/u=693817120,3152214724&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=433'
					},
					{
						id: 2,
						imgs: 'https://img0.baidu.com/it/u=166679101,4212360978&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=477'
					},
					{
						id: 3,
						imgs: 'https://img1.baidu.com/it/u=2994259212,1160603469&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
					},
				], //轮播图			
				//内容1
				articleinfo: {},
				/*图片轮播*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

			}
		},
		onShow() {
			this.headTabIdx = 0
		},
		onLoad() {
			this.getarticleinfo()
		},
		methods: {
			// 搜索框
			gosearch(){
				uni.navigateTo({
					url:'../shopping/search?id=1'
				})
			},
			
			// 首页头部tab点击切换
			IsHeadTabClick: function(index, item) {
				this.headTabIdx = index;
				if(index==1){
					uni.navigateTo({
						url:'user_article'
					})
				}
			},
			//官网复制的轮播
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			// 文章列表点击进入详情页
			goltem(e) {
				uni.navigateTo({
					url: 'article_item?id=' + e
				})
			},
			async getarticleinfo() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/article/getarticle',
				})
				this.articleinfo = res.data
				// console.log(this.articleinfo)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
	}
    .search-box{
		position: sticky;
		top:44px;
		z-index: 999;
	}
	.headNav {
		width: 100%;
		background: #FFFFFF;
		white-space: nowrap;
		/* position: fixed; */
		top: 200px;
		left: 0;
		/* z-index: 15; */
		border-bottom: 1px #ffffff solid;
	}

	.headNavLt {
		display: inline-block;
		height: 100upx;
		width: 50%;
		line-height: 100upx;
		text-align: center;
		font-size: 30upx;
		margin-right: 30upx;
	}

	.headNavLt:last-child {
		margin-right: 0;
	}

	.activeNav {
		color: #3B7ED5;
	}

	.swiper {
		height: 307rpx;
	}

	.swiper-item image {
		width: 100%;
		height: 307rpx;
		display: block;
	}

	.idxMain {
		width: 100%;
		padding-top: 0upx
	}

	.idxMainBox {
		width: 92%;
		margin: 0 auto;
	}

	.contBg {
		background: #FFFFFF;
		overflow: hidden;
		margin-bottom: 30upx;
		padding-top: 0upx
	}

	.contOver {
		border-bottom: 1px #EDEDED solid;
		overflow: hidden;
		transition: all 0.4s;
	}

	.contOver:active {
		background: #E2E2E2;
	}

	.contOver:last-child {
		border-bottom: none;
	}

	.contOverLt {
		float: left;
		width: 60%;
	}

	.contTxt {
		color: #333333;
		font-size: 35upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding-top: 30upx;
	}

	.contTime {
		color: #888888;
		font-size: 30upx;
		margin-top: 40upx;
		.like{
			padding-left: 172px;
		}
	}

	.contRtImg {
		float: right;
		width: 35%;
		height: 155upx;
		margin: 30upx 0;
	}

	.contRtImg image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 6upx;
	}
</style>
