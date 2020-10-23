
import request from "../request.js";

//获取地址详情
export function getAddressDetailData(msg){
	return request({
		url:'address/detail',
		data:msg
	})
}

//保存收货地址
export function addressSaveData(msg){
	return request({
		url:'address/save',
		data:msg,
		method:'POST'
	})
}

//获取区域列表
export function getRegionListData(msg){
	return request({
		url:'region/list',
		data:msg,
	})
}

