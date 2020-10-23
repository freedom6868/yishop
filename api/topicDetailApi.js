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

//获取专题推荐信息
export function getTopicRecommend(id){
	return requert({
		url:`topic/related?id=${id}`
	})
}

//获取更多评论
export function getMoreComment(valueId,typeId,size,page,showType){
	return requert({
		url:`comment/list?valueId=${valueId}&typeId=${typeId}&size=${size}&page=${page}&showType=${showType}`
	})
}

//提交评论
export function getPostComment(typeId,valueId,content){
	return requert({
		url:`comment/post`,
		method:"POST",
		data:{
			typeId,
			valueId,
			content
		}
	})
}