<template>
	<view>
		<view class="goods-ltem">
			<!-- 商品左侧图片区域 -->
			<view class="goods-ltem-left">
				<radio :checked="goods.goods_state" color="#C00000" @click="radioClickHandler"></radio>
				<image :src="goods.goods_pics || defaultPic" class="goods-pic"></image>
			</view>
			
			<view class="goods-ltem-right">
				<!-- 商品标题 -->
				<view class="goods-name">{{goods.goods_name}}</view>	
				<view class="goods-info-box">
					<!-- 商品价格 -->
					<view class="goods-price">
						￥{{goods.goods_price}}
					</view>
					<uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{},
			},
		},
		data() {
			return {
				defaultPic:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0106e858135099a84a0e282b5b62b5.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649482436&t=a45a1715c46381e01fbc4642248fc456'
			};
		},
		methods:{
			//是否选中事件
			radioClickHandler(){
				this.$emit('radio-change',{
					id:this.goods.id,
					goods_state:!this.goods.goods_state
				})
			},
			// 数量变化事件
			numChangeHandler(val){
				this.$emit('num-change',{
					id:this.goods.id,
					goods_count: +val
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
    .goods-ltem{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-ltem-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;
			.goods-pic{
			width: 100px;
			height:100px;
			display: block;
		  }
		}
		.goods-ltem-right {
			display: flex;
			flex: 1;
			flex-direction: column;
            justify-content: space-between;
			.goods-name{
				font-size: 16px;
			}
			.goods-info-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-right: 15px;
			   .goods-price{
				font-size: 16px;
				color: #c00000;
			}
		  }
		}
	}
</style>
