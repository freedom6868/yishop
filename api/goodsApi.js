import requert from "./request.js";

// 商品详情
export function getGoodsDeatil(data){
	return requert({
		url:'goods/detail',
		data: data,
		method: 'get'
	})
}

// 获取大家都在看
export function getGoodsRelated(data){
	return requert({
		url:'goods/related',
		data: data,
		method: 'get'
	})
}

// 收藏或取消收藏
export function addOrCannelCollect(data){
	return requert({
		url:'cart/goodscount',
		data: data,
	})
}

// 获取购物车商品件数
export function getCartGoodsCount(){
	return requert({
		url:'cart/goodscount',
	})
}
