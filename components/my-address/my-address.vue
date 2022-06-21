<template>
	<view>
		<!-- 选择收获地址的按钮 -->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnchoose" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<!-- 收获信息 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{address.name}}</view>
				</view>
	            <view class="row1-right">
	            	<view class="phone">电话：{{address.phone}}</view>
					<uni-icons type="arrowright" size="16" @click="chooseAddress"></uni-icons>
	            </view>
			</view>
			<view class="row2">
				<view class="row2-left">收获地址:  </view>
				<view class="row2-right">
					{{address.address}}
				</view>
			</view>
		</view>
		
		<!-- 底部的边框线 -->
		<image src="../../static/bottom2.webp" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				// address:{},
			};
		},
		props:{
			address:{
				type:Object,
				default:{},
			},
		},
		onLoad() {
			this.address = uni.getStorageSync('address')
			console.log(this.address)
		},
		methods:{
		  chooseAddress(){
				uni.navigateTo({
					url:'../../pages/unuser/unuseraddress/addressList'
				})
			}
		}		
	}
</script>

<style lang="scss">
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnchoose{
			background-color: #3CB79A;
		}
	}
	.address-border{
		display: block;
		width: 100%;
		height: 5px;
	}
   .address-info-box{
	   font-size: 12px;
	   height: 90px;
	   display: flex;
	   flex-direction: column;
	   justify-content: center;
	   padding: 0 5px;
	   .row1{
		   display: flex;
		   justify-content: space-between;
		   .row1-left{
			   .username{}
		   }
		   .row1-right{
			    display: flex;
				justify-content: space-between;
			   .phone{}
		   }
	   }
	   .row2{
		   display: flex;
		   // justify-content: space-between;
		   align-items: center;
		   margin-top: 10px;
		   .row2-left{
			   white-space: nowrap;
			   margin-right: 10px;
		   }
	   }
   }
</style>
