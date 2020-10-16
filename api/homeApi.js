import requert from "./request.js";

export function getHome(){
	return requert({
		url:'index/index'
	})
}


export function getGoodsCounts(){
	return requert({
		url:'goods/count'
	})
}



