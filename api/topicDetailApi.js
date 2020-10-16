import requert from "./request.js";

//获取专题详情图片
export function getTopicDetailPic(id){
	return requert({
		url:`topic/detail?id=${id}`
	})
}

//获取评论
export function getDetailComment(valueId,typeId,size){
	return requert({
		url:`comment/list?valueId=${valueId}&typeId=${typeId}&size=${size}`
	})
}
