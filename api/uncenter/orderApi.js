import requert from "../request.js";

// 订单列表

export function getOrderListData(){
	return requert({
		url:'order/list'
	})
}