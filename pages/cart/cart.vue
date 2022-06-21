<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address :address='address'></my-address>
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文字 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 购物车商品 -->
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key='i'>
			<uni-swipe-action-item :right-options="options" @click="swipeItemClick(goods)">
				<my-goods :goods="goods" @radio-change="radioChangeHandler" @num-change="numberchange"></my-goods>	
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
		
	    </view>
		<!-- 购物车为空时 -->
		<view class="empty-cart" v-else>
			<image src="../../static/emptycart.webp" class="empty-img"></image>
			<view class="empty-btn">
				<button type="default" @click="toshopping">去购物</button>
			</view>			
		</view>
</template>

<script>
	import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		computed:{
			...mapGetters('m_cart',['total']),
			...mapState('m_cart',['cart']),
		},
		watch:{
			total(){
				this.setBadge()
			},
		},
		onShow() {
			this.address=uni.getStorageSync('address')
			   this.setBadge()
		},
		onLoad() {
			
		},
		data() {
			return {	
		options:[ {
            text: '删除',
            style: {
                backgroundColor: '#C00000'
            }
		}],
		address:''
			}
		},
		methods: {
			...mapMutations('m_cart',['updateState','updateCount','removegoodsbyid']),
			//设置导航栏的小图标
			setBadge(){
				// console.log(this.total)
				uni.setTabBarBadge({
					index:2,
					text: this.total +'',
				})
			},
			// 点击修改是否选中
			radioChangeHandler(e){
				// console.log(e)
				this.updateState(e)
			},	
			// 点击商品数量变化
			numberchange(e){
				// console.log(e)
				this.updateCount(e)
			},
			//删除商品
			swipeItemClick(goods){
			this.removegoodsbyid(goods.id)
			},
			// 去购物的按钮
			toshopping(){
				uni.switchTab({
					url:'../shopping/shopping'
				})
			}
		}
	}
</script>
<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
    .cart-title{
		height: 40px;
		display: flex;
		// justify-content: center;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #EFEFEF;
		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.empty-cart {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		.empty-img{
			width: 100%;
			height: 400px;
		}
		.empty-btn{
			margin-top: 50px;
		   	width: 100%;
			height: 120px;
			button {
				width: 50%;
			}
		}
	}
</style>
