<template>
	<view class="page-detail">
		<view class="title">{{iteminfo.article_title}}</view>
		<view class="author"> 作者：{{iteminfo.author}}<view class="like iconfont icon-xihuan-1">{{iteminfo.likenum}}</view></view>
		<view class="content"> 
			{{iteminfo.article_content}}
		</view>
		<!-- 底部功能区 -->
		<view class="bottom">
			<view :class="shoucclass" @click="collectbtn">
				收藏
			</view>
			<view :class="dianzclass" @click="likebtn">
				点赞
			</view>
			<view class="zhuanf iconfont icon-tubiao_Forward" @click="open">
				转发
			</view>
		</view>
		<!-- 分享的小弹框 -->
		<uni-popup ref="popup" type="share">
			<uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iteminfo: {
					article_title: '',
					author: '',
					article_content: '',
					likenum:''
				},
				
				iscollect: false,
				shoucclass:  'shouc iconfont icon-shoucang',
				shoucclass1: 'shouc iconfont icon-shoucang',
				shoucclass2: 'shouc iconfont icon-shoucang1',
				
				islike: false,
				dianzclass:  'dianz iconfont icon-xihuan2',
				dianzclass1: 'dianz iconfont icon-xihuan2',
				dianzclass2: 'dianz iconfont icon-xihuan-1',
				

				artid:'',
				user_id:'',
			};
		},
		onLoad(e) {
			this.artid = e.id;
			this.user_id = uni.getStorageSync('userid');
			// console.log(user_id)
			// console.log(e.id)
			//获取页面数据
			this.getiteminfo(e)
			//加载收藏数据
			this.howcollect(this.user_id,this.artid)
			//加载喜欢的数据
			this.howlike(this.user_id,this.artid)  
		},
		methods: {
			// 根据页面传的值获取数据
			async getiteminfo(index) {
				const {
					data: res
				} = await this.$myRequest({
					url: '/article/getarticle/' + index.id,
				})
				// console.log(res.data[0])
				this.iteminfo.article_title = res.data[0].article_title
				this.iteminfo.author = res.data[0].author
				this.iteminfo.article_content = res.data[0].article_content
				this.iteminfo.likenum = res.data[0].likenum
			},
			// 判断是否收藏	  
			async howcollect(uid, pid) {
				const {data:res} = await this.$myRequest({
						url: '/collect/iscollect',
					method: 'POST',
					data: {
						 userid: uid,
						 proid:pid
					 }
				 })
				
				  	if(res.status == 1){
						this.shoucclass = this.shoucclass1
						this.iscollect = false
					}
					 else{
						this.shoucclass = this.shoucclass2 
						this.iscollect = true  
				   }
			},
			//判断是否喜欢
			async howlike(uid, pid) {
				const {data:res} = await this.$myRequest({
						url: '/like/islike',
					method: 'POST',
					data: {
						 userid: uid,
						 proid:pid
					 }
				 })
				  // console.log(res)
				  	if(res.status == 1){
						this.dianzclass = this.dianzclass1
						this.islike = false
					}
					 else{
						this.dianzclass = this.dianzclass2 
						this.islike = true  
				   }
			},
			
			// 收藏按钮 
			collectbtn() {
				if(!this.iscollect){
					this.shoucclass = this.iscollect ?this.shoucclass1:this.shoucclass2
					this.iscollect = !this.iscollect
					console.log(this.iscollect)
					this.$myRequest({
						url: '/collect/addcollect',
						method: 'POST',
						data: {
							 userid: this.user_id,
							 proid: this.artid,
						 }
					 })
				  }
				  else{
					this.shoucclass = this.iscollect ? this.shoucclass1 : this.shoucclass2
					this.iscollect = !this.iscollect
					console.log(this.iscollect)
					this.$myRequest({
						url: '/collect/delcollect',
						method: 'POST',
						data: {
							 userid: this.user_id,
							 proid: this.artid,
						 }
					 })
				  }
				
			},
			//喜欢的按钮
			likebtn() {
				if(!this.islike){
					this.dianzclass = this.islike ?this.dianzclass1:this.dianzclass2
					this.islike = !this.islike
					// console.log(this.islike)
					this.$myRequest({
						url: '/like/addlike',
						method: 'POST',
						data: {
							 userid: this.user_id,
							 proid: this.artid,
						 }
					 })
					 this.$myRequest({
					 	url: '/like/uplike',
					 	method: 'POST',
					 	data: {
					 		 likenum: this.iteminfo.likenum + 1,
					 		 proid: this.artid,
					 	 }
					  })  
					  this.iteminfo.likenum+=1	  
				  }
				  else{
					this.dianzclass = this.islike ?this.dianzclass1:this.dianzclass2
					this.islike = !this.islike
					// console.log(this.iscollect)
					this.$myRequest({
						url: '/like/dellike',
						method: 'POST',
						data: {
							 userid: this.user_id,
							 proid: this.artid,
						 }
					 }) 
					 this.$myRequest({
					 	url: '/like/uplike',
					 	method: 'POST',
					 	data: {
					 		 likenum: this.iteminfo.likenum - 1,
					 		 proid: this.artid,
					 	 }
					  })
					this.iteminfo.likenum-=1	  
				  }
				
			},
			
			
			// 转发按钮
			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			}

		},

	};
</script>

<style lang="scss">
	.page-detail {
		padding: 50rpx 0;

		.title {
			padding: 0 30rpx;
			font-size: 42rpx;
			font-weight: 400;
			color: #20263c;
			line-height: 56rpx;
		}

		.author {
			margin: 26rpx 0 31rpx 0;
			padding:  0 10rpx 0 30rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #9b9b9b;
			.like {
			padding-left: 300px;
			font-size: 40rpx;
			font-weight: 400;
			color: #9b9b9b;
		   }
		}
		
		.content {
			padding: 0 30rpx 80rpx 30rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
			line-height: 65rpx;
		}

		.bottom {
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 108rpx;
			border: 1px solid #d1d1d1;
			border-radius: 20px;
			box-shadow: 0px 100rpx 100rpx 0px rgba(0, 0, 0, 0.06);
			background-color: #FFFFFF;
			box-sizing: border-box;
			justify-content: center;

			.shouc,
			.dianz,
			.zhuanf {
				color: #DD524D;
				justify-content: center;
				align-items: center;
				display: flex;
				flex: 1;
				font-size: 18px;
			}
		}
	}
</style>
