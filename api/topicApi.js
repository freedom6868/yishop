import requert from "./request.js";

export function getTopicList(page,pageSize){
	return requert({
		url:`topic/list?page=${page}&size=${pageSize}`
	})
}