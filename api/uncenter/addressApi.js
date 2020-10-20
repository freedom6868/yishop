
import requert from "../request.js";

//获取地址列表
export function getAddressListData(){
	return requert({
		url:'address/list'
	})
}

// 删除地址
export function addressDeleteData(msg){
	return requert({
		url:'address/delete',
		method:'POST',
		data:msg
	})
}
