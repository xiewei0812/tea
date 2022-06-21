<template>
	<view>
		<view class="user-info">
			<image class="user-image" :src="userpic" mode=""></image>
			<view class="user-name">
				{{username}}
			</view>
		</view>

		<view class="article-content">
			<view class="article-list" v-for="(item,index) in eassylist" :key='index' @click="todetail(item.id)">
				<image :src="item.userpic" class="article-list-image"></image>
				<view class="article-list-content">
					<view class="content-title">{{item.nickname}}</view>
					<view class="content-article">{{item.articleinfo}}</view>
					
					<view class="article-image">
						<view class="article-image-content" v-for="(info,i) in item.artpic" :key='i'>
							<image class="article-image-list" :src="info.path" mode="aspectFill"></image>
						</view>	
					</view>
				</view>
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view>
			<uni-fab  horizontal="right"  @fabClick="fabClick"></uni-fab>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				userpic: '',
				eassylist: '',
				pattern: {
					buttonColor: '#3CB79A',
				},
			};
		},
		onShow() {
			this.geteassylist()
		},
		onLoad() {
			this.username = uni.getStorageSync("nickname")
			this.userpic = uni.getStorageSync("user_pic")
		},
		methods: {
			// 获取文章列表
			async geteassylist() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/eassy/geteassy',
				})
				// console.log(res)
				this.eassylist = res.data
			},
			// 悬浮按钮点击事件
			fabClick(){
				uni.navigateTo({
					url:'sendarticle'
				})
			},
			// 点击文章跳转
			todetail(e){
				uni.navigateTo({
					url:'articledetail?id='+e
				})
			}
		}
	}
</script>

<style lang="scss">
	// 我的
	.user-info {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		border-bottom: 1px solid #d8d8d8;

		.user-image {
			width: 100%;
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}

		.user-name {
			display: flex;
			flex-direction: row-reverse;
			margin-right: 20px;
			font-size: 20px;
			margin-top: 10px;
			margin-bottom: 10px;
			// font-family: '黑体';s
			font-weight: bold;
			color: #4b9889;
		}
	}

	// 帖子样式
	.article-list {
		display: flex;
		border-bottom: 1px solid #e5e5e5;
		padding-bottom: 5px;

		.article-list-image {
			margin-left: 10px;
			margin-top: 10px;
			width: 50px;
			height: 50px;
			border-radius: 10%;
		}

		.article-list-content {
			display: flex;
			flex-direction: column;
			// margin: 0  15px;
			.content-title {
				margin-top: 12px;
				margin-left: 15px;
				font-size: 20px;
				color: #789dc5;
			}

			.content-article {
				margin: 0 15px;
			}

			.article-image {
				// width: 100%;
				display: flex;
				// height: 130px;
				margin: 5px 15px;
				margin-right: 15px;
				// background-color: #ababab;
				.article-image-content{
					margin-right: 1%;
				}
				.article-image-list {
					height: 130px;
					width: 130px;	
				}
			}
		}
	}
</style>
