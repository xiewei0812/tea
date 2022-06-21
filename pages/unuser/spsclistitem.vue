<template>
	<view class="box-item">
		<!-- {{uid}}
		商品收藏列表页
		{{spsclist}} -->
		<view class="idxMainBox" v-for="(item,i) in spsclist" :key='i' @click="todetail(item.id)">
			<view class="contOverLt">
				<view class="contTxt">{{item.goods_name}}</view>
				<view class="contprice">价格:￥{{item.goods_price}}</view>
			</view>
			<view class="contRtImg">
				<image :src="item.pics"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				listid:'',
				spsclist:''
			};
		},
		onLoad() {
			this.uid = uni.getStorageSync('userid')
			this.listid = uni.getStorageSync('spsc')
			this.getlistitem()
		},
		methods:{
	 	// 获取列表数据
	           async getlistitem(){
	 				       let list2 =[]
	 					   for(var i=0;i<this.listid.length;i++){
	 					   // console.log(this.listid[i])
	 					   const {data:res} =await  this.$myRequest({
	 					  			url: '/my/tea/product/getproductby/'+ this.listid[i],
	 					  		 })	 
	 						list2.push(res.data[0])	
	 				   }  
	 				  // console.log(list2)
	 				  this.spsclist =list2
	 	  },
		  //商品点击跳转到详情页
		   todetail(id){
		  	// console.log(id)
		  	uni.navigateTo({
		  		url:'../shopping/goods_details?id='+ id
		  	})
		  },
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.box-item {
		margin: 0  5px;
	}
.idxMainBox {
	// display: block;
  	width: 95%;
	height: 195upx;
  	margin: 0 auto;
	border-bottom: 1px solid #bfbfbf;
  }
  .contOverLt {
  	float: left;
  	width: 60%;
  }
  .contTxt {
  	color: #333333;
  	font-size: 40upx;
  	width: 100%;
  	text-overflow: ellipsis;
  	display: -webkit-box;
  	-webkit-line-clamp: 2;
  	-webkit-box-orient: vertical;
  	overflow: hidden;
  	padding-top: 30upx;
  }
  .contprice {
  	color: #ea2d40;
  	font-size: 35upx;
  	margin-top: 50upx;
  }
  .contRtImg {
  	float: right;
  	width: 35%;
  	height: 155upx;
  	margin: 20upx 0;
  }
  .contRtImg image {
  	width: 100%;
  	height: 100%;
  	display: block;
  	border-radius: 6upx;
  }
</style>
