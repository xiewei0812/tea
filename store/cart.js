export default {
	namespaced:true,
	
	state:()=>({
		// {id , goods_name,goods_price,goods_count,goods_pic,goods_state}
		cart:JSON.parse(uni.getStorageSync('cart') ||'[]')
	}),
	mutations:{
		//加入购物车时商品进行增加
		addToCart(state,goods){
			const findResult = state.cart.find((x)=>x.id ===goods.id)
			// console.log(findResult)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count ++
			}
			// console.log(state.cart)
			//调用数据持久化
			this.commit('m_cart/saveToStorage')
			
		},
		//对cart数据进行数据持久化
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
			// uni.setStorageSync('cart',state.cart)
		},
		// 更新购物车中商品的勾选状态
		updateState(state,goods){
			const findResult = state.cart.find((x)=>x.id ===goods.id)
			if(findResult){
				findResult.goods_state =goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		//增加或减少商品数量
		updateCount(state,goods){
			const findResult = state.cart.find((x)=>x.id ===goods.id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		//删除商品
		 removegoodsbyid(state,id){
		    state.cart = state.cart.filter(x=> x.id !== id)
			this.commit('m_cart/saveToStorage')
		},
		//更改所有商品的选中状态
		updateallState(state,newState){
			state.cart.forEach(x=>x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		},
		
		// 清空购物车
		cleaovercart(state){
			state.cart = state.cart.filter(x=> x.goods_state !== true)
			this.commit('m_cart/saveToStorage')
		},
	},
	getters:{
		//获取购物车总条数
		total(state){
			let c =0
			state.cart.forEach(goods => c+=goods.goods_count)
			return c
		},
		// 获取选中的商品数量
		checkedcount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total+=item.goods_count,0)
		},
		//获取选中的商品的价格
		totalprice(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total+=item.goods_count*item.goods_price,0).toFixed(2)
		},
		
	}
}