<template>
	<view class="article">
		<!-- 文章内容区域 -->
	     <view class="article-content">
	     	<view class="article-list">
	     		<image :src="articleinfo.userpic" class="article-list-image"></image>
	     		<view class="article-list-content">
	     			<view class="content-title">{{articleinfo.nickname}}</view>
	     			<view class="content-article">{{articleinfo.articleinfo}}</view>
	     			<view class="article-image">
	     				<view class="article-image-content" v-for="(info,i) in articleinfo.artpic" :key='i'>
	     					<image class="article-image-list" :src="info.path" mode="aspectFill"></image>
	     				</view>	
	     			</view>
	     		</view>
	     	</view>
	     </view>
		 <view class="addcomment" @click="isshowinput">
		 	  写留言
		 </view>
		 <view class="delcomment" v-if="userid == articleinfo.userid" @click="delmyarticle()">
		 	 删除
		 </view>
		 <!-- 删除再次确认 -->
		 <uni-popup ref="popup" type="dialog">
		 	<uni-popup-dialog  title="是否删除" confirmText="确认" message="成功消息"
		 		:duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		 </uni-popup
		 
		 <!-- 评论区域 -->
		 <view class="comment-content">
		 	 <view class="comment-content-list" v-for="(item,index) in comment" :key="index">
				 <image :src="item.userpic" mode="" class="comment-userpic"></image>
		 	 	 <view class="comment-name">{{item.username}}:</view>
		 	 	 <view class="comment-info">{{item.comment}}</view> 	
		 	 </view>
		 </view>
		<!-- 输入框区 -->
		<view class="comment-toinput" v-if="isinput !== 0">
			<uni-easyinput  placeholder="请输入评论" v-model="commentvalue" class="comment-toinput-input"></uni-easyinput>
			<button type="primary" size="mini" class="comment-toinput-button" @click="commentupdata">评论</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:'',
				articleid:'',
				articleinfo:'',			
				comment:'',			
				isinput: 0,
				commentvalue:'',
				username:'',
				userpic:'',
				point:''
			};
		},
		onLoad(e) {
			this.userid = uni.getStorageSync('userid')
			this.username = uni.getStorageSync('nickname')
			this.userpic = uni.getStorageSync('user_pic')
			this.point = uni.getStorageSync('point')
			this.articleid = e.id
			this.geteassy()
			this.getcomment()
		},
		methods:{
			// 获取文章信息
			async geteassy() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/eassy/geteassybyid',
					method: 'POST',
					data: {
						id: this.articleid,
					}
				})
				// console.log(res.data[0])
				this.articleinfo = res.data[0]
			},
			// 获取品论信息
			async getcomment() {
				const 
					{data:res}
				= await this.$myRequest({
					url: '/eassy/getcomment',
					method: 'POST',
					data: {
						id: this.articleid,
					}
				})
				 // console.log(res)
				 this.comment = res.data
			},
				// 显示输入框
			isshowinput(){
				this.isinput = 1
			},
			//评论按钮
		   async  commentupdata(){
				const
					{data:res}
				= await this.$myRequest({
					url: '/eassy/addcomment',
					method: 'POST',
					data: {
						article_id: this.articleid,
						comment:this.commentvalue,
						userpic:this.userpic,
						username:this.username,
					}
				})
				this.getcomment()
				this.isinput = 0
				this.commentvalue = ''
				const
					{data:re}
				=  this.$myRequest({
					url: '/user/unuser/changepoint',
					method: 'POST',
					data: {
						id:this.userid,
						point:this.point + 10
					}
				})
				uni.setStorage({
					key:'point',
					data:this.point +10
				})
			},
			// 删除我的文章
			delmyarticle(){
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
								url: '/eassy/deleassy',
								method: 'POST',
								data: {
									id:this.articleid
								 }
							 })
				   // console.log(res)	 
					uni.showToast({
					title:'删除成功'
					})
				   this.$refs.popup.close()
				uni.navigateTo({
					url:"user_article"
				})
		   },	
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #ebebeb;
	}
	
.article-list {
	background-color: #ffffff;
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
	.addcomment{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 40px;
		color: #4CD964;
		background-color: #ffffff;
	}
	.delcomment{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 40px;
		color: #ffffff;
		background-color: #ff434f;
	}
	// 评论区样式
	.comment-content{
		// background-color: #ebebeb;
		width: 100%;
		height: 100%;
		// margin-right: 20px;
		border-radius: 5%;
		.comment-content-list{
			display: flex;
			align-items: center;
			border-bottom: 1px solid #d9d9d9;
			// justify-content: space-around;
			.comment-userpic{
				width: 40px;
				height: 40px;
				margin: 5px 10px;
				border-radius: 10%;
			}
			.comment-name{
				font-size: 20px;
				color: #37aae8;
			}
			
		}
		
	}
	.comment-toinput{
		// margin-top: 270px;
		// height: 50px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.comment-toinput-input{
			// height: 100%;
		}
	}
	
</style>
