/**
 * 调用微信登录
 */

export function login(){
	return new Promise( (resolve,reject)=>{
		uni.login({
			success(res) {
				if(res.code){
					resolve(res)
				}else{
					reject(res)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	} )
	
}
