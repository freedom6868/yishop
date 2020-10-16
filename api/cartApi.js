import requert from "./request.js";

export function getCartApiData(){
	return requert({
		url:"cart/index"
	})
}