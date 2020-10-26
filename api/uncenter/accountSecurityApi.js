import request from "../request.js";

export function changeUserMobile(userId,mobile){
	return request({
		url:'user/saveUserMobile',
		method:"GET",
		data:{
			userId:userId,
			mobile:mobile
		}
		
	})
}