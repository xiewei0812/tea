<template>
	<view class="page">
		<!-- 用户信息 -->
		<view class="user-info">
			<view class="user-data" @click="onUserInfo">
				<view class="portrait-nickname">
					<view class="portrait">
						<image :src="userpic?userpic:'../../static/user_pic.jpg'" mode=""></image>
					</view>
					<view class="nickname">
						<text>{{nickname}}</text>
					</view>
				</view>
				<view class="more">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			<view class="address" @click="onAddress">
				<view class="title">
					<text>地址管理</text>
				</view>
				<view class="more">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
		</view>
		<!-- 设置列表 -->
		<view class="setting-list">
			<view class="list" @click="onSetting('account')">
				<view class="title">
					<text>账户安全</text>
				</view>
				<view class="more-content">
					<text class="content">密码/支付等管理</text>
					<text class="iconfont icon-gengduo more"></text>
				</view>
			</view>
			<view class="list" @click="onSetting('pay')">
				<view class="title">
					<text>支付设置</text>
				</view>
				<view class="more-content">
					<text class="iconfont icon-gengduo more"></text>
				</view>
			</view>
			<view class="list" @click="onSetting('invoice')">
				<view class="title">
					<text>发票</text>
				</view>
				<view class="more-content">
					<text class="content">添加发票</text>
					<text class="iconfont icon-gengduo more"></text>
				</view>
			</view>
			<view class="list" @click="onSetting('vip')">
				<view class="title">
					<text>商城会员</text>
				</view>
				<view class="more-content">
					<text class="content">会员专属商品</text>
					<text class="iconfont  icon-gengduo more"></text>
				</view>
			</view>
		</view>
		<!-- 设置列表 -->
		<view class="setting-list">
			<view class="list" @click="onSetting('about')">
				<view class="title">
					<text>关于我们</text>
				</view>
				<view class="more-content">
					<text class="content"></text>
					<text class="iconfont icon-gengduo more"></text>
				</view>
			</view>
		</view>
		<!-- 退出 -->
		<view class="quit-login" @click="onQuitLogin">
			<text>退出登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:'',
				userpic:''
			};
		},
		onReady() {
			 this.nickname = uni.getStorageSync('nickname')
			 this.userpic = uni.getStorageSync('user_pic')
		},
		methods:{
			/**
			 * 用户信息点击
			 */
			onUserInfo(){
				uni.navigateTo({
					url: '/pages/unuser/userinfomation'
				})
			},
			/**
			 * 地址点击
			 */
			onAddress(){
				uni.navigateTo({
				     url:'unuseraddress/addressList'
				})
			},
			/**
			 * 设置列表点击
			 * @param {String} type
			 */
			onSetting(type){
				switch(type) {
					case 'account':
						uni.navigateTo({
							
						})
						break;
					case 'pay':
						uni.navigateTo({
							
						})
						break;
					case 'invoice':
						uni.navigateTo({
						
						})
						break;
					case 'vip':
						uni.navigateTo({
							
						})
						break;
					case 'common':
						uni.navigateTo({
							
						})
						break;
					case 'about':
						uni.navigateTo({
							
						})
						break;
				}
			},
			/**
			 * 退出点击
			 */
			onQuitLogin(){
				uni.clearStorage();
                uni.navigateTo({
                	url: '/pages/public/login'
                });
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
	}
	
	/* 用户信息 */
	.user-info{
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 0 0 20rpx 20rpx;
		.user-data{
			display: flex;
			align-items: center;
			padding: 0 4%;
			height: 200rpx;
			.portrait-nickname{
				display: flex;
				align-items: center;
				width: 100%;
				height: 90%;
				.portrait{
					width: 140rpx;
					height: 140rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 100%;
					}
				}
				.nickname{
					display: flex;
					align-items: center;
					margin-left: 20rpx;
					height: 140rpx;
					text{
						font-size: 28rpx;
						color: #222222;
					}
				}
			}
			.more{
				display: flex;
				align-items: center;
				text{
					color: #959595;
					font-size: 28rpx;
				}
			}
		}
		.address{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4%;
			height: 100rpx;
			border-top: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				align-items: center;
				text{
					font-size: 28rpx;
					color: #555555;
				}
			}
			.more{
				display: flex;
				align-items: center;
				text{
					color: #959595;
					font-size: 28rpx;
				}
			}
		}
	}
	
	/* 设置列表 */
	.setting-list{
		padding: 0 4%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;
		.list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			border-bottom: 2rpx solid #f6f6f6;
			.title{
				display: flex;
				align-items: center;
				text{
					font-size: 28rpx;
					color: #222222;
				}
			}
			.more-content{
				display: flex;
				align-items: center;
				.content{
					font-size: 28rpx;
					color: #959595;
				}
				.more{
					font-size: 24rpx;
					color: #959595;
					margin-left: 20rpx;
				}
			}
		}
	}
	
	/* 退出登录 */
	.quit-login{
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		text{
			color: #222222;
			font-size: 28rpx;
		}
	}
</style>
