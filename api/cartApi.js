import requert from "./request.js";

export function getCartApiData(){
	return requert({
		url:"cart/index"
	})
}
export function postChecked(id,checked){
	var urls= "cart/checked?productIds="+id+"&"+"isChecked="+checked;
	return requert({
		url:urls,
		method:"POST",
		data:{
			productIds:id,
			isChecked:checked,
		}
	})
}