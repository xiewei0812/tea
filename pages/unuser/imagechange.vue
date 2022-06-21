<template>
	<view>
		<view class="image-info">
			<image :src="pic?pic:'../../static/user_pic.jpg'"></image>
		</view>
		<view class="btnchange">
			<button type="default" @click="changepic">修改头像+</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				pic: ''
			}
		},
		onLoad() {
			this.uid = uni.getStorageSync('userid')
			this.pic = uni.getStorageSync('user_pic')
		},
		methods: {
			changepic() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						// console.log(JSON.stringify(res.tempFilePaths));
						this.pic = res.tempFilePaths[0]
						console.log(this.pic)
						uniCloud.uploadFile({
							filePath: this.pic,
							cloudPath: 'userpic.jpg',
							success :res =>{
								console.log(res.fileID);
								this.pic = res.fileID
								const {
									data: re
								} = this.$myRequest({
									url: '/user/unuser/changepic',
									method: 'POST',
									data: {
										id: this.uid,
										pic:this.pic
									}
								})
								// console.log(re)
								uni.setStorageSync('user_pic', this.pic)	
							},
							fail(err) {
								console.log(err);
							}
						})

						// const {
						// 	data: re
						// } = this.$myRequest({
						// 	url: '/user/unuser/changepic',
						// 	method: 'POST',
						// 	data: {
						// 		id: this.uid,
						// 		pic: this.pic
						// 	}
						// })
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.image-info {
		width: 100%;
		height: 300px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.btnchange {
		display: flex;
		width: 100%;
		height: 200px;
		justify-content: center;
		align-items: center;

		button {
			width: 300px;
		}
	}
</style>
