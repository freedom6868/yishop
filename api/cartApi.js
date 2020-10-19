import requert from "./request.js";

//购物车商品数据
export function getCartApiData(){
	return requert({
		url:"cart/index"
	})
}
// 修改选中状态
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
//修改数量
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
//删除选中商品
export function deleteCheckedCart(id){
	return requert({
		url:"cart/delete?productIds="+id,
		method:"POST",
		data:{
			productIds:id
		}
	})
}