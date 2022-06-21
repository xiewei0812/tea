const BASE_URL = 'http://localhost:5218'
export const myRequest = (options)=>{
	 return  new Promise((resolve,reject)=>{
		const access_token = uni.getStorageSync('token');
		const header = {
			 'content-type': 'application/x-www-form-urlencoded',
			 'Authorization': access_token || '',
		};
		 uni.request({
		 	url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			header:header,
			success:(res)=>{
				if(res.data.status!==0){
					 // return  uni.showToast({
				 	//  title:"数据获取失败"
				  // })
				}
				resolve(res)			
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}	
		 })
	 })
}