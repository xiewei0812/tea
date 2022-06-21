<template>
	<view>
		<view class="article-content">
			<view class="article-list" v-for="(item,index) in myarticle" :key='index' @click="todetail(item.id)">
				<image :src="item.userpic" class="article-list-image"></image>
				<view class="article-list-content">
					<view class="content-title">{{item.nickname}}</view>
					<view class="content-article">{{item.articleinfo}}</view>
					
					<view class="article-image">
						<view class="article-image-content" v-for="(info,i) in item.artpic">
							<image class="article-image-list" :src="info.path" mode="aspectFill"></image>
						</view>	
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
					userid: '',
					myarticle: '',
				};
			},
			onShow() {
				this.getmyarticle()
			},
			onLoad() {
				this.userid = uni.getStorageSync("userid")
			},
			methods: {
				// 获取文章列表
				async getmyarticle() {
			    	const {data:res} = await this.$myRequest({
							url: '/eassy/geteassybyuserid',
							method: 'POST',
							data: {
								 userid: this.userid,
							 }
						 })	 
						 // console.log(res.data)
						 this.myarticle = res.data
				   },	
					// 点击文章跳转
				todetail(e){
					uni.navigateTo({
						url:"../index/articledetail?id="+e
					})
					
				},   
		},
	}
</script>

<style lang="scss">
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
			.delbtn{
				   width: 100%;
				   margin: 5px 15px;
				}
		}
	}
</style>
