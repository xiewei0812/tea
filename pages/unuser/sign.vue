<template>
	<view class="pageinfo">
		<button type="default"class="btn-content" @click="btnclick">
			 {{btninfo}}
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:'',
				point:'',
				index:'' 
			};
		},
		computed:{
			btninfo:function(){
				return  this.index==0?'点击签到':'已签到'
			}
		},
		onLoad() {
			this.userid = uni.getStorageSync('userid')
			this.point = uni.getStorageSync('point')
			this.index = uni.getStorageSync('sign')
		},
		methods:{
			btnclick(){
				if(this.index==0){
					this.index = 1
				uni.showToast({
					title:'积分 +10',
				})
				uni.setStorage({
					key:'sign',
					data: 1,
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
				const  time = setTimeout(function(){
					 uni.setStorage({
					 	key:'sign',
					 	data: 0,
					 })
				 },1000*60*60*24)
			   }else{
				 // this.index = 0
				 // uni.setStorage({
				 // 	key:'sign',
				 // 	data: 0,
				 // })
				 uni.showToast({
				 	 title:'今日已签到',
				 })  
			   }
				
			}
		}
	}
</script>

<style lang="scss">
   .pageinfo{
	   // width: 100%;
	   // height: 100%;
	   display: flex;
	   justify-content: center;
	   // align-items: center;
	   .btn-content{
		   margin-top: 50%;
		   width: 200px;
		   height: 200px;
		   background-color: #3CB79A;
		   border-radius: 50%;
		   display: flex;
		   align-items: center;
		   justify-content: center;
		   font-size: 25px;
		   color: #ffffff;
		   box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.5);
	   }
   }
</style>
