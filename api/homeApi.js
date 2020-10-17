import requert from "./request.js";

// 首页（index）所有数据
export function getHome(){
	return requert({
		url:'index/index'
	})
}

// 全部商品数量
export function getGoodsCounts(){
	return requert({
		url:'goods/count'
	})
}

// 搜索数据
export function getSearchs(){
	return requert({
		url:'search/index'
	})
}



