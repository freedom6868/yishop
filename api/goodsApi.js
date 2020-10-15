import requert from "./request.js";

// 商品详情
export function getGoodsDeatil(data){
	return requert({
		url:'goods/detail',
		data: data,
		method: 'get'
	})
}