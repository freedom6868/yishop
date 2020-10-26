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

// 清空历史记录
export function clearHistory(){
	return requert ({
		url:'search/clearhistory'
	})
}

// 获取搜索商品
export function getGoodsList(keyword,page,size,sort,order,categoryId){

	return requert({
		url : 'goods/list',
		method:"GET",
		data:{
			keyword:keyword,
			page:page,
			size:size,
			sort:sort,
			order:order,
			categoryId:categoryId
		}
	})
	
}
