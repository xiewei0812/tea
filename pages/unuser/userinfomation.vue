<template>
	<view class="page">
		<!-- 用户信息列表 -->
		<view class="user-list">
			<view class="list" style="height: 160rpx;">
				<view class="title">
					<text>头像</text>
				</view>
				<view class="more-content">
					<image :src="userpic?userpic:'../../static/user_pic.jpg'" mode=""></image>
					<text class="iconfont icon-gengduo more" @click="tochangeimage"></text>
				</view>
			</view>
			<view class="list" @click="onNickname">
				<view class="title">
					<text>昵称</text>
				</view>
				<view class="more-content">
					<text class="content">{{nickname}}</text>
					<text class="iconfont icon-gengduo more"></text>
				</view>

				<!-- 修改名称的输入框 -->
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog mode="input" :value="nickname" title="修改昵称" confirmText="修改" message="成功消息"
						:duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>

			</view>
			<view class="list">
				<view class="title">
					<text>性别</text>
				</view>
				<view class="more-content">
					<text class="content">{{sexText}}</text>
					<text class="iconfont icon-gengduo more"></text>
				</view>
				<view class="picker">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexArray">
						<view class="uni-input" style="height: 100rpx;">{{sexText}}</view>
					</picker>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>出生日期</text>
				</view>
				<view class="more-content">
					<text class="content">{{birthday}}</text>
					<text class="iconfont icon-gengduo more"></text>
				</view>
				<view class="picker">
					<picker @change="birthdayPickerChange" mode="date" :value="birthdayDate" :start="startDate"
						:end="endDate">
						<view class="uni-input" style="height: 100rpx;">{{birthdayDate}}</view>
					</picker>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 性别
				sexArray: ['男', '女', '保密'],
				sexIndex: 0,
				sexText: '保密',
				// 生日
				birthdayDate: currentDate,
				startDate: this.getDate('start'),
				endDate: this.getDate('end'),
				birthday: '2020-02-02',
				DialogBox: {},
				// 昵称
				nickname: '',
				uid: '',
				userpic:'',
			};
		},
		onLoad() {
			this.uid = uni.getStorageSync('userid')
			this.nickname = uni.getStorageSync('nickname')
			 this.userpic = uni.getStorageSync('user_pic')
		},
		methods: {
			//头像修改
			tochangeimage(){
				uni.navigateTo({
					url:'imagechange'
				})
			},
			/**
			 * 性别
			 / * @param {Object} e
			 */
			sexPickerChange(e) {
				this.sexIndex = e.detail.value;
				this.sexText = this.sexArray[this.sexIndex];
			},
			/**
			 * 生日
			 * @param {Object} e
			 */
			birthdayPickerChange(e) {
				this.birthday = e.detail.value;
			},
			/**
			 * 获取日期
			 * @param {Object} type
			 */
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			/**
			 * 昵称点击
			 */
			onNickname() {
				this.$refs.popup.open()
			},
			//修改昵称的取消按钮
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.popup.close()
			},
			/**
			 * 修改昵称的点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			async  confirm(value) {
				// 输入框的值
				// console.log(value)
				if (value === this.nickname) {
					uni.showToast({
						title: '与原昵称一致',
						icon: 'error'
					})
				} else {
			          const{data:res} = await this.$myRequest({
						url: '/user/unuser/changenick',
						method: 'POST',
						data: {
							id: this.uid,
							nickname: value
						}
					})
					// console.log(res)
					if(res.status == 0){
					 uni.setStorageSync('nickname',value)
					 this.nickname = value
					}	
				}
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
	}

	/* 用户信息列表 */
	.user-list {
		padding: 0 4%;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 20rpx auto;

		.list {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			border-bottom: 2rpx solid #f6f6f6;

			.title {
				display: flex;
				align-items: center;

				text {
					font-size: 28rpx;
					color: #222222;
				}
			}

			.more-content {
				display: flex;
				align-items: center;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
				}

				.content {
					font-size: 28rpx;
					color: #959595;
				}

				.more {
					font-size: 24rpx;
					color: #959595;
					margin-left: 20rpx;
				}
			}

			.picker {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
</style>
