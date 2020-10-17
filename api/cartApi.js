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
export function postNumber(goodsId,id,number,productId){
	var urls = "cart/update?goodsId="+goodsId+"&"+"id="+id+"&"+"number="+number+"&"+"productId="+productId;
	return requert({
		url:urls,
		method:"POST",
		data:{
			goodsId:goodsId,
			id:id,
			number:number,
			productId:productId
		}
	})
}