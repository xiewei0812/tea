<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeallstate">
			<radio color="#C00000" :checked="isfullcheck"/><text>全选</text>
		</label>
		
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalprice}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="tosettle">结算({{checkedcount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['checkedcount','totalprice','total']),
			// 判断是否全部选中
			isfullcheck(){
				return  this.total === this.checkedcount
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateallState']),
			changeallstate(){
				this.updateallState(!this.isfullcheck)
			},
			//结算按钮	
			tosettle(){
				// this.cleaovercart();
				uni.navigateTo({
					url:'../../pages/cart/orserdetails'
				})
			}
			
		},
	}
</script>

<style lang="scss" scoped>
   .my-settle-container{ 
	position: fixed;
	bottom: 50px;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	padding-left: 5px;
	padding-right: 5px;
}
.radio{
	display: flex;
	align-items: center;
}
.amount-box{
	.amount{
		color:#C00000;
		font-weight: bold;
	}
}
.btn-settle{
	color: white;
	height: 50px;
	width: 130px;
	display: flex;
	background-color: #C00000;
	justify-content: center;
	align-items: center;
	padding-right: 5px;
}
</style>
