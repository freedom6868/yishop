
import requert from "../request.js";

//添加或取消收藏
export function getCollect(){
	return requert({
		url:'collect/addordelete'
	})
}
//收藏列表
export function getCollectList(id){
	return requert({
		url:`collect/list?typeId=${id}`
	})
}