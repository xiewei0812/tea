<template>
	<view class="search-container" @click="gosearch">
		<view class="search-box">
			<view class="iconfont icon-sousuo">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods:{
			gosearch(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container{
		height: 50px;
		background-color: #3CB79A;
		display: flex;
		justify-content: center;
		align-items: center;
		// border-top:1px solid #FFFFFF ;
		.search-box{
			width: 90%;
			margin: 0 5%;
			height: 36px;
			border-radius: 30px;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center
		}
	}
      
</style>
