import request from '../request.js'

export function getFootprintListData(msg){
	return request({
		url:'footprint/list',
		data:msg
	})
}

export function deleteFootprintData(msg){
	return request({
		url:'footprint/delete',
		data:msg,
		method:'POST'
	})
}
