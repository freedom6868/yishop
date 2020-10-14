import requert from "./request.js";

export function getHomeLunbo(){
	return requert({
		url:'index/index'
	})
}