import requert from "../request.js";

export function getCouponApiData(userId){
	return requert({
		url:'coupon/userCoupon',
		method:"GET",
		data:{
			userId:userId
		}
	})
	
}