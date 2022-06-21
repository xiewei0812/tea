<template>
	<view>
		<!-- 搜索区 -->
			<search @click='gosearch'></search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height:sysinfo+'px'}" class="left-scroll-view">
			   <block v-for="(item,i) in catelist" :key='i'>
				   <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activechange(i)">{{item.name}}</view>
			   </block>
			</scroll-view>

			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y="true" :style="{height:sysinfo +'px'}" class="contOver">
				<view class="idxMainBox" v-for="(item,i) in productlist" :key='i' @click="todetail(item.id)" v-if="item.is_delete == 0">
					<view class="contOverLt">
						<view class="contTxt">{{item.goods_name}}</view>
						<view class="contprice">价格:￥{{item.goods_price}}</view>
					</view>
					<view class="contRtImg">
						<image :src="item.pics"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import search from '../../components/search/search.vue';
	export default {
		components:{
			search,
		}	
		,
		data() {
			return {
				// 设备数据
                sysinfo:'',
				catelist:[],
				active: 0,
				productlist:[]
			}
		},		
		onLoad(){
			// 获取设备数据 获取页面可用的高度
			 const  sys = uni.getSystemInfoSync()
             this.sysinfo = sys.windowHeight -50
			 //获取分类数据
			 this.getcatelist()
			 //获取商品数据
			 this.getproductlist(this.active +1)
			 // console.log(this.active+1)
		},
		methods: {
				//搜索框点击事件
			gosearch(){
				uni.navigateTo({
					url:'search?id=2'
				})
			},
			//获取分类列表
           async getcatelist() {
				const {	data:res} = await this.$myRequest({
					url: '/my/tea/getcates',
				})
				// console.log(res.data)
				this.catelist = res.data
			},
			//左侧边栏的点击事件
			activechange(i){
				this.active = i
				this.getproductlist(i+1)
			},
			//根据分类id获取商品信息
		    async getproductlist(e) {
							const {	data:res} = await this.$myRequest({
								url: '/my/tea/product/getproduct/'+e,
							})
							// console.log(res.data)
							this.productlist = res.data
				},
				//商品点击跳转到详情页
				todetail(id){
					// console.log(id)
					uni.navigateTo({
						url:'goods_details?id='+ id
					})
				},
		}
	}
</script>

<style  scoped lang="scss">
	// .search-box{
	// 	position: sticky;
 //        top: 44px;
	// 	z-index: 999;		
	// }
  .scroll-view-container{
	  // margin-top: 50px;
	  display: flex;	  
	  .left-scroll-view{
		  width: 120px;
		  .left-scroll-view-item{
			  background-color: #eeeeee;
			  line-height: 50px;
			  text-align: center;
			  font-size: 15px;  
			  &.active{
				  background-color: #FFFFFF;
				  position: relative;
				  &::before {
					  content: '';
					  display: block;
					  width: 3px;
					  height: 40px;
					  background-color: #3CB79A;
					  position: absolute;
					  top: 50%;
					  left: 0;
					  transform: translateY(-50%);
				  }
			  }
		  }
	  }
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
