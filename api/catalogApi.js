import requert from "./request.js";

export function getCatalog(){
	return requert({
		url:'catalog/index'
	})
}
export function getClassifyData(id){
	return requert({
		url:`catalog/current?id=${id}`
	})
}
export function getCategoryData(id){
	return requert({
		url:`goods/category?id=${id}`
	})
}
