
import requert from "../request.js";

//微信登录
export function AuthLoginByWeixin(msg){
	return requert({
		url:'auth/loginByWeixin',
		data:msg,
		method:'POST'
	})
}