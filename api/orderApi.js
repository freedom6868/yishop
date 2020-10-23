import requert from "./request.js";

export function getCartCheckout(addressId,couponId){
	return requert({
		url:'cart/checkouts',
		method:"GET",
		data:{
			addressId:addressId,
			couponId:couponId
		}
	})
}

export function postOrderSubmit(addressId,couponId){
	return requert({
		url:'order/submit',
		method:"POST",
		data:{
			addressId:addressId,
			couponId:couponId
		}
	})
}