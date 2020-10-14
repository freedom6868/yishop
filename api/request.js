const baseURL = 'http://47.106.90.23:8360/api/';

function request(option){
	return new Promise((resolve,reject)=>{
		// 开启loading 效果
		uni.showLoading({
			title:'loading...'
		})
		uni.request({
			url:baseURL+option.url,
			method : option.method || 'GET',
			data: option.data,
			header: {
				'Content-Type': 'application/json',
				'X-Nideshop-Token': uni.getStorageSync('token')
			},
			success(res){
				if(res.statusCode == 200){
					resolve(res);
				}else{
					reject(res.errMsg);
				}
			},
			fail(err){
				reject(err)
			},
			complate(){
				// 关闭loading效果
				// 关闭loading效果
				setTimeout(()=>{
					uni.hideLoading()
				},500);
			}
			
		})
	})
}