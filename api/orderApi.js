import requert from "./request.js";

export function getCartCheckout(addressId,couponId){
	return requert({
		url:'cart/checkout',
		method:"GET",
		data:{
			addressId:addressId,
			couponId:couponId || 0
		}
	})
}

export function postOrderSubmit(addressId,couponId,couponUsedTime){
	return requert({
		url:'order/submit',
		method:"POST",
		data:{
			addressId:addressId,
			couponId:couponId,
			couponUsedTime:couponUsedTime
		}
	})
}