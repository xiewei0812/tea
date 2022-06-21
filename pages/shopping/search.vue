<template>
	<view>
		<!-- 搜索框区域 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" placeholder="输入搜索内容" cancelButton='none' bgColor='#fcfcfc'>
			</uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-if="sresult==0">
			<view class="history-title">
				<text>搜索历史</text>
				<view class="iconfont icon-shanchu" @click="clealhistory"></view>	
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historys" :key='i' @click="hsearch(item)"></uni-tag>
			</view>
		</view>
          
		<!-- 显示区域 -->
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="(item,i) in sresult" :key='i' @click="toinfo(item.id)">
				<view class="item-name">{{pageid==1?item.article_title:item.goods_name}}</view>
				<view class="iconfont icon-gengduo"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//页面id
				pageid: 1,
				// 延时器
				timer: null,
				//搜索关键字
				kw: '',
				// 搜索结果
				sresult: [],
				// 搜索历史
				historylist:[],	
			};
		},
		onLoad(e) {
			// console.log(e.id)
			this.pageid = e.id
			this.historylist = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		computed:{
			historys(){
				return  [...this.historylist].reverse()
			}
		},
		methods: {
			// 输入时触发的事件
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					if (this.pageid == 1) {
						this.getartlist()
					} else {
						this.getprolist()
					}
				}, 1000)
				// this.historylist.push(e)
			},
			//获取搜索的文章数据
			async getartlist() {
				if (this.kw.length === 0) {
					this.sresult = []
					return
				}
				const {
					data: res
				} = await this.$myRequest({
					url: '/article/getartbyname',
					method: 'POST',
					data: {
						article_name: this.kw,
					}
				})
				// console.log(res.data)
				this.sresult = res.data
				this.sresult.pageid = 1
				// this.historylist.push(this.kw)
				this.savehistoryseacher()
			},
			//获取搜索的商品的数据
			async getprolist() {
				if (this.kw.length === 0) {
					this.sresult = []
					return
				}
				const {
					data: res
				} = await this.$myRequest({
					url: '/my/tea/product/getproductbyname',
					method: 'POST',
					data: {
						goods_name: this.kw,
					}
				})
				// console.log(res.data)	
				this.sresult = res.data
				this.sresult.pageid = 2
				// this.historylist.push(this.kw)
				this.savehistoryseacher()
			},
			// 点击搜索结果跳转
			toinfo(e) {
				if (this.pageid == 1) {
					uni.navigateTo({
						url: '../index/article_item?id=' + e
					})
				} else {
					uni.navigateTo({
						url: 'goods_details?id=' + e
					})
				}
			},
			// 存储搜索历史
			savehistoryseacher(){
				const set = new Set(this.historylist)
				set.delete(this.kw)
				set.add(this.kw)
				this.historylist=Array.from(set)
				//将搜索历史存储到本地
				uni.setStorageSync('kw',JSON.stringify(this.historylist))
			},
			//清空历史计录
			clealhistory(){
				this.historylist = []
				uni.setStorageSync('kw',JSON.stringify(this.historylist))
			},
			// 点击历史记录搜索
			// hsearch(item){
			// 	this.kw = item
			// 	this.input(this.kw) 
			// },
		}
	}
</script>

<style lang="scss" scoped>
	// 搜索框
	.search-box {
		position: sticky;
		top: 44px;
		z-index: 999;
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			margin-bottom: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 16px;
			height: 40px;
			border-bottom: 1px solid #efefef;
			.iconfont {
				font-size: 25px;
				color: #6c6c6c;
			}
		}
		.history-list{
			.uni-tag {
				// margin-top:5px;
				margin-right: 5px;
				color: #000000;
				background-color: #efefef;
				border: 0;
				font-size: 15px;
			}
		}
	}
	
	
	
	
	
  // 搜索内容
	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
</style>
