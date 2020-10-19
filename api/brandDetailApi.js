import requert from "./request.js";

// 品牌详情
export function getBrandData(data){
	return requert({
		url:'brand/detail',
		data: data,
		method: 'get'
	})
}

// 
export function getBrandList(data){
	return requert({
		url:'goods/list',
		data: data,
		method: 'get'
	})
}
