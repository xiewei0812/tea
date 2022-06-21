<template>
	<view>
		<view class="contBg">
			<view class="contOver" v-for="(item,index) in wzsclist" :key="index" @click="goltem(item.id)">
				<view class="idxMainBox">
					<view class="contOverLt">
						<view class="contTxt">{{ item.article_title }}</view>
						<view class="contTime">作者:{{ item.author }}
						   <view class="like iconfont icon-xihuan2">{{item.likenum}}</view>
						</view>
					</view>
					<view class="contRtImg">
						<image :src="item.article_pic"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- {{uid}}
		文章收藏列表页
		{{listid}} -->
		<!-- {{wzsclist}} -->
		<!-- <button type="default" @click="getlistitem()">123333</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				listid:'',
				wzsclist:''
			};
		},
		onLoad() {
			this.uid = uni.getStorageSync('userid')
			this.listid = uni.getStorageSync('wzgz')
			// this.getlist()
			this.getlistitem()
		},
		methods:{
	 	// async  getlist(){
			// const {data:res} = await this.$myRequest({
			// 			url: '/collect/getlist',
			// 			method: 'POST',
			// 			data: {
			// 				 uid: this.uid,
			// 			 }
			// 		 })	
			// 	  // this.wzsclist = res.data;
			// 	  let  list =[];
			//       res.data.forEach( item =>list.push( parseInt(item.proid)))
			// 	  // console.log(list)
			// 	  this.listid = list
			// },
			// 获取列表数据
		  async getlistitem(){
			       let list2 =[]
				   for(var i=0;i<this.listid.length;i++){
				   // console.log(this.listid[i])
				   const {data:res} =await  this.$myRequest({
				  			url: '/article/getarticle/'+this.listid[i],
				  		 })	 
					list2.push(res.data[0])	
			   }  
			  // console.log(list2)
			  this.wzsclist =list2
          },
		  // 文章列表点击进入详情页
		   goltem(e) {
		  	uni.navigateTo({
		  		url: '../../index/article_item?id='+e
		  	})
		  },
		}
	}
</script>

<style lang="scss">
	.contBg {
		background: #FFFFFF;
		overflow: hidden;
		margin: 5px 30upx;
		padding-top: 0upx
	}

	.contOver {
		border-bottom: 1px #EDEDED solid;
		overflow: hidden;
		transition: all 0.4s;
	}

	.contOver:active {
		background: #E2E2E2;
	}

	.contOver:last-child {
		border-bottom: none;
	}

	.contOverLt {
		float: left;
		width: 60%;
	}

	.contTxt {
		color: #333333;
		font-size: 35upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding-top: 30upx;
	}

	.contTime {
		color: #888888;
		font-size: 30upx;
		margin-top: 40upx;
		.like{
			padding-left: 172px;
		}
	}

	.contRtImg {
		float: right;
		width: 35%;
		height: 155upx;
		margin: 30upx 0;
	}

	.contRtImg image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 6upx;
	}
</style>
