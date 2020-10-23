/**
 * 调用微信登录
 */

export function login(){
	return new Promise( (resolve,reject)=>{
		uni.login({
			success(res) {
				if(res.code){
					resolve(res)
				}else{
					reject(res)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	} )
	
}

let detailAddressData = require('./detailAddress.js');
let provinceData = require('./province.js');
let cityData = require('./city.js');
let areaData = require('./area.js');
let firstNameData = require('./firstName.js');

export function getDetailedAddress(value){
	// let value = '广东省深圳市龙华区观澜街道淑女路2号安防学院 郑嘉淳 18823996899'
	let res = {};
	let address  = {};
	// 匹配所有标点符号的正则
	let reg1 = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?\，|\s+ ]/g;
	// 截取手机号
	let reg2 = /1[3-9]\d{9}/g;
	
	try{
		// 获取下标
		let provinceIndex = provinceData.findIndex( item=>{
			if (value.indexOf(item.label) != -1){
				return item;
			}
		})
		
		let cityIndex = cityData[provinceIndex].findIndex( item=>{
			if (value.indexOf(item.label) != -1){
				return item;
			}
		} )
		
		let areaIndex = areaData[provinceIndex][cityIndex].findIndex(item => {
			if (value.indexOf(item.label) != -1) {
				return item;
			}
		})
		
		let province = provinceData[provinceIndex].label;
		let city = cityData[provinceIndex][cityIndex].label;
		let area = areaData[provinceIndex][cityIndex][areaIndex].label;
		let streetData = detailAddressData[province][city];
		
		
		let street = streetData[area].find( item => {
			if (value.indexOf(item) != -1) {
				return item;
			}
		} )
		
		// 获取字符串中的姓
		// let firstName = firstNameData.find( v=>{
			
		// 	if(value.indexOf(v) != -1 || ){
		// 		return v;
		// 	}
		// })
		
		// 将字符串分割
		let addressArr = value.split(reg1);
		
		let firstName = addressArr.find( v =>{
			let temp = firstNameData.find( item =>{
				if(v.indexOf(item) != -1 && v.length <= 4){
					return v;
				}
			})
			return temp;
		})
		address.name = firstName;
		
		addressArr.find( v => {
			
			if(street){
				if (v.indexOf(street) != -1) {
					address.details = v.substring(v.indexOf(street));
				}
			}
			
		} ) 
		console.log('street',street)
		address.province = province;
		address.city = city;
		address.area = area;
		address.phone = value.match(reg2)[0];
		// console.log(address)
		res = {
			code:0,
			msg:address
		}
		return res;
	}catch(err){
		res = {
			code:-1,
			msg:'格式异常,请重新输入'
		}
		return res;
	}
}
