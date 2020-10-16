import request from '../request.js';

export function getOrderDetailData(msg){
	return request({
		url:'order/detail',
		data:msg
	})
}