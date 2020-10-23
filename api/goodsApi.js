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
		url:'collect/addordelete',
		data: data,
		method: 'post'
	})
}

// 获取购物车商品件数
export function getCartGoodsCount(){
	return requert({
		url:'cart/goodscount'
	})
}


// 加入购物车 cart/add
export function addCart(data){
	return requert({
		url:'cart/add',
		data: data,
		method: 'post'
	})
}
