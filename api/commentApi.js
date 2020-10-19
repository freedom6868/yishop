import requert from "./request.js";

// 获取指定商品的评价总数
export function getCommentsCount(data){
	return requert({
		url:'comment/count',
		data: data,
		method: 'get'
	})
}

// 获取指定商品的评价列表
export function getComments(data){
	return requert({
		url:'comment/list',
		data: data,
		method: 'get'
	})
}