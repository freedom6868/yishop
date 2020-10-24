
import requert from "../request.js";

//收藏列表
export function getCollectList(id){
	return requert({
		url:`collect/list?typeId=${id}`
	})
}