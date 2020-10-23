import request from '../request.js'

export function getFootprintListData(msg){
	return request({
		url:'footprint/list',
		data:msg
	})
}