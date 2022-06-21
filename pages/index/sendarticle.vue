<template>
	<view>
		<!-- 头部Tabar栏 -->
		<view class="status_bar">
			<uni-icons type="back" size="30" class="back" @click="back"></uni-icons>
			<view class="addbtn" @click="addarticle">发布 </view>
		</view>
		<!-- 多行文本输入框 -->
		<view class="text">
			<uni-easyinput type="textarea" v-model="textvalue" placeholder="这一刻的想法..."
				placeholderStyle='font-size: 15px' :inputBorder="false"></uni-easyinput>
			<!-- 图片选择区 -->
			<uni-file-picker limit="2" v-model="imagelist"></uni-file-picker>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				nickname: '',
				userpic: '',
				textvalue: '',
				imagelist: [], 
				point:''
			};
		},
		onLoad() {
			this.userid = uni.getStorageSync('userid')
			this.nickname = uni.getStorageSync('nickname')
			this.userpic = uni.getStorageSync('user_pic')
			this.point = uni.getStorageSync('point')
		},
		methods: {
			// 返回按钮
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async addarticle() {
				const {
					data: res
				} = await this.$myRequest({
					url: '/eassy/addeassy',
					method: 'POST',
					data: {
						userid: this.userid,
						nickname: this.nickname,
						userpic: this.userpic,
						articleinfo: this.textvalue,
						artpic: JSON.stringify(this.imagelist)
					}
				})
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
				console.log(res)
				uni.showToast({
					title: '发布成功',
				});
				const time = setTimeout(function() {
					uni.navigateTo({
						url: 'user_article'
					})
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	// 顶部Tabar栏
	.status_bar {
		height: 50px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		// border-bottom: 1px solid #000000;
		.back {
			margin-left: 10px;
		}

		.addbtn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70%;
			width: 60px;
			background-color: #1eb76a;
			margin-right: 20px;
			border-radius: 10%;
			color: #ffffff;
		}
	}

	.text {
		margin: 0 15px;
	}
</style>
