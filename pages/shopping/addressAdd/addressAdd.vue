<template>
	<view class="container">
		<view class="add-address">
			<view class="add-form">
				<view class="form-item">
					<input type="text" :value="address.name" @input="changeInputName" class="input" placeholder='姓名 ' auto-focus />
				</view>
				<view class="form-item">
					<input type="number" maxlength=11 :value="address.mobile" @input="changeInputMobile" class="input" placeholder='手机号码 ' auto-focus />
				</view>
				<view class="form-item">
					<input class="input" :value="address.full_region" disabled="true" @click="chooseRegion" placeholder="省份、城市、区县" />
				</view>
				<view class="form-item">
					<input class="input" @input="changeInputAddress" :value="address.address" placeholder="详细地址, 如街道、楼盘号等" />
				</view>
				<view class="form-default">
					<text @click="isDefault" class="default-input" :class="address.is_default == 1 ? 'selected' : ''" >设为默认地址</text>
				</view>
			</view>
			<view class="site-clipboard">
				<textarea @input='autoRecognition' placeholder-class="line"  value="" placeholder="粘贴文本,可自动识别姓名和地址如:罗xx , 18534444444,广东省汕头市xx区xx街道xx" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view>
			<view class="btns">
				<button class="cannel" @click="cancelAddress">取消</button>
				<button class="save" @click="saveAddress">保存</button>
			</view>
			
			<view class="region-select" v-if="openSelectRegion" >
				<view class="hd">
					<view class="region-selected">
						<view class="item" v-for="(item,index) in selectRegionList" :key='item.name'
							:class="[item.id === 0 ? 'disabled': '',(regionType - 1) == index ? 'selected' :'' ]" 
							@click="selectRegionType" :data-region-type-index='index' >
							{{item.name}}
						</view>
					</view>
					<view class="done" :class="selectRegionDone ? '' : 'disabled'" @click="doneSelectRegion">
						确定
					</view>
				</view>
				<view class="bd">
					<view class="region-list">
						<view class="item" :class="item.selected ? 'selected' : ''" @click="selectRegion" :data-region-index="index"
						v-for="(item,index) in regionList" :key='item.id' >
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getAddressDetailData,addressSaveData,getRegionListData} from '@/api/uncenter/addressAddApi.js';
	import {getDetailedAddress} from '@/utils/util.js';
	export default {
		data() {
			return {
				address: {
				  id:0,
				  province_id: 0,
				  city_id: 0,
				  district_id: 0,
				  address: '',
				  full_region: '',
				  name: '',
				  mobile: '',
				  is_default: 0
				},
				addressId:0,
				regionType:1,
				regionList:[],
				openSelectRegion: false,
				selectRegionList: [
				  { id: 0, name: '省份', parent_id: 1, type: 1 },
				  { id: 0, name: '城市', parent_id: 1, type: 2 },
				  { id: 0, name: '区县', parent_id: 1, type: 3 }
				],
				selectRegionDone:false,
				// 省份列表
				provinceList:[]
			};
		},
		methods:{
			async getAddressDetail(){
				let res = await getAddressDetailData({id:this.addressId});
				console.log(res)
				if(res.errno == 0){
					this.address = res.data;
				}
				this.getRegionList(1)
			},
			async getRegionList(regionId){
				let _this = this;
				let regionType = _this.regionType;
				let res = await getRegionListData({parentId:regionId})
				console.log('getRegionList',res)
				if(res.errno == 0){
					_this.regionList = res.data.map( v => {
						//标记已选择的
						if(regionType == v.type && _this.selectRegionList[regionType-1].id == v.id){
							v.selected = true;
						}else{
							v.selected = false;
						}
						return v;
					})
				}
			},
			changeInputName(e){
				// console.log(e)
				let address = this.address;
				address.name = e.detail.value;
				this.address = address;
			},
			changeInputMobile(e){
				let address = this.address;
				address.mobile = e.detail.value;
				this.address = address;
			},
			changeInputAddress(e){
				let address = this.address;
				address.address = e.detail.value;
				this.address = address;
			},
			chooseRegion(){
				this.openSelectRegion = !this.openSelectRegion;
				let address = this.address;
				console.log(this.address)
				if(address.province_id > 0 && address.city_id > 0 && address.district_id > 0){
					let selectRegionList = this.selectRegionList;
					selectRegionList[0].id = address.province_id;
					selectRegionList[0].name = address.province_name;
					selectRegionList[0].parent_id = 1;
					
					selectRegionList[1].id = address.city_id;
					selectRegionList[1].name = address.city_name;
					selectRegionList[1].parent_id = address.province_id;
					
					selectRegionList[2].id = address.district_id;
					selectRegionList[2].name = address.district_name;
					selectRegionList[2].parent_id= address.city_id;
					
					this.selectRegionList = selectRegionList;
					this.regionType = 3
					this.getRegionList(address.city_id);
				}else{
					this.selectRegionList = [
						{ id: 0, name: '省份', parent_id: 1, type: 1 },
						{ id: 0, name: '城市', parent_id: 1, type: 2 },
						{ id: 0, name: '区县', parent_id: 1, type: 3 }
					];
					this.regionType = 1
					this.setRegionDoneStatus();
				};
			},
			isDefault(){
				this.address.is_default = !this.address.is_default;
				this.$forceUpdate();
			},
			cancelAddress(){
				uni.navigateTo({
					url:'/pages/ucenter/address/address'
				})
			},
			async saveAddress(){
				let address = this.address;
				if (address.name == '') {
				 uni.showToast({
				 	title:'请输入姓名',
					image:'/static/images/icon_error.png'
				 })
				  return ;
				}
			
				if (address.mobile == '') {
					uni.showToast({
						title:'请输入手机号码',
						image:'/static/images/icon_error.png'
					})
					return ;
				}
			
			
				if (address.district_id == 0) {
					uni.showToast({
						title:'请输入省市区',
						image:'/static/images/icon_error.png'
					})
					return ;
				}
			
				if (address.address == '') {
					uni.showToast({
						title:'请输入详细地址',
						image:'/static/images/icon_error.png'
					})
					return ;
				}
				if(!(/^1[3-9]\d{9}$/g.test(address.mobile))){
					uni.showToast({
						title:'手机号格式不正确',
						image:'/static/images/icon_error.png'
					})
					return ;
				}
				
				let msg = {
					id:address.id,
					name:address.name,
					mobile:address.mobile,
					province_id:address.province_id,
					city_id:address.city_id,
					district_id:address.district_id,
					address:address.address,
					is_default : address.is_default
				}
				let res = await addressSaveData(msg);
				console.log(res)
				if(res.errno == 0){
					uni.navigateTo({
						url:'/pages/shopping/address/address'
					})
				}
				
			},
			doneSelectRegion(){
				// 确定按钮
				if(this.selectRegionDone === false){
					return;
				}
				let address = this.address;
				let selectRegionList = this.selectRegionList;
				address.province_id = selectRegionList[0].id;
				address.city_id = selectRegionList[1].id;
				address.district_id = selectRegionList[2].id;
				address.province_name = selectRegionList[0].name;
				address.city_name = selectRegionList[1].name;
				address.district_name = selectRegionList[2].name;
				address.full_region = selectRegionList.map(item =>{
					return item.name;
				}).join('');
				this.address = address;
				this.openSelectRegion = false;
			},
			selectRegion(event){
				console.log(event)
				 let that = this;
				let regionIndex = event.target.dataset.regionIndex;
				let regionItem = this.regionList[regionIndex];
				let regionType = regionItem.type;
				let selectRegionList = this.selectRegionList;
				selectRegionList[regionType - 1] = regionItem;
				
				if(regionType != 3 ){
					this.selectRegionList = selectRegionList;
					this.regionType = regionType + 1;
					this.getRegionList(regionItem.id);
					
				}else{
					this.selectRegionList = selectRegionList;
				}
				
				 //重置下级区域为空
				 selectRegionList.map((item ,index )=>{
					 if(index > regionType-1 ){
						 item.id = 0;
						item.name = index == 1 ? '城市' : '区县';
						item.parent_id = 0;
					 }
					 return item;
				 })
				
				 this.selectRegionList = selectRegionList;
				 this.regionList = this.regionList.map(v => {
					 //标记已选择的
					 if(that.regionType == v.type && that.selectRegionList[this.regionType - 1].id == v.id){
						 v.selected = true;
					 }else{
						 v.selected = false;
					 }
					 return v;
				 })
				 this.setRegionDoneStatus();
				
			},
			cancelSelectRegion(){},
			selectRegionType(event){
				console.log(event);
				let regionTypeIndex = event.target.dataset.regionTypeIndex;
				let selectRegionList = this.selectRegionList;
				//判断是否可点击
				if(regionTypeIndex+1 == this.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex-1].id <=0) ){
					return ;
				}
				this.regionType = regionTypeIndex + 1;
				let selectRegionItem = selectRegionList[regionTypeIndex];
				this.getRegionList(selectRegionItem.parent_id);
				this.setRegionDoneStatus();
				
			},
			setRegionDoneStatus(){
				let doneStatus = this.selectRegionList.every( v =>{
					return v.id != 0
				});
				this.selectRegionDone = doneStatus;
			},
			autoRecognition(e){
				uni.showLoading({
					title:'智能识别中',
					mask:true,
				})
				let that = this;
				setTimeout(()=>{
					uni.hideLoading({
						async success(){
							let value = e.detail.value;
							let res = getDetailedAddress(value);
							console.log(res)
							if(res.code == 0){
								let address = res.msg;
								console.log('address',address)
								let provinceItem = await that.getData({regionId:1,data:address.province});
								let cityItem = await that.getData({regionId:provinceItem.id,data:address.city});
								let areaItem = await that.getData({regionId:cityItem.id,data:address.area});
								console.log('provinceItem',provinceItem,'cityItem',cityItem,'areaItem',areaItem);
								that.address.city_id = cityItem.id;
								that.address.city_name = cityItem.name;
								that.address.district_id = areaItem.id;
								that.address.district_name = areaItem.name;
								that.address.province_id = provinceItem.id;
								that.address.province_name = provinceItem.name;
								that.address.full_region = provinceItem.name + cityItem.name + areaItem.name;
								that.address.address = address.details || '';
								that.address.name = address.name || '';
								that.address.mobile = address.phone || '';
								that.$forceUpdate();
							}else{
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
							}
						}
					});
				},1000);
				
			},
			async getData(msg){
				let res = await getRegionListData({parentId:msg.regionId});
				console.log('getData',res);
				let data = res.data;
				let boolArr = [];
				let trueLength = 0;
				let item = data.find((v)=>{
					if(v.name == msg.data){
						return v;
					}
				});
				if(item == null){
					item = data.find((v)=>{
						trueLength = 0;
						boolArr = [];
						for(let i=0;i<msg.data.length;i++){
							if(v.name.indexOf(msg.data[i]) != -1){
								boolArr.push(true);
							}
						}
						boolArr.forEach(v=>{
							if(v === true){
								trueLength++;
							}
						})
						if(trueLength >= 3 ){
							return v
						}
					});
				}
				return item;
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.id){
				this.addressId = options.id;
				this.getAddressDetail();
			};
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.add-address{
			background-color: #fff;
			.add-form{
				background-color: #fff;
				width: 100%;
				height: auto;
				
				.form-item{
					height: 116rpx;
					border-bottom: 2rpx solid #d9d9d9;
					display: flex;
					align-items: center;
					padding: 0 32rpx;
					
					.input{
						flex: 1;
						height: 44rpx;
					}
				}
				
				.form-default{
					border-bottom: 2rpx solid #d9d9d9;
					height: 96rpx;
					background-color: #fafafa;
					box-sizing: border-box;
					padding-top: 28rpx;
					font-size: 28rpx;
					
					.default-input{
						margin: 0 auto;
						display: block;
						width: 240rpx;
						height: 40rpx;
						line-height: 40rpx;
						padding-left: 50rpx;
						background:  url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png) 1rpx -448rpx no-repeat;
						background-size: 38rpx 486rpx;
						font-size: 28rpx;
					}
					.selected{
						background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png) 0 -192rpx no-repeat;
						background-size: 38rpx 486rpx;
					}
				}
			}
			
			.site-clipboard {
				padding-right: 40rpx;
				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;
					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
			
			.btns{
				position: fixed;
				bottom: 0;
				left: 0;
				display: flex;
				height: 100rpx;
				width: 100%;
				
				.cannel,.save{
					flex: 1;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
					border: none;
					border-radius: 0;
				}
				.cannel{
					background-color: #333;
				}
				.save{
					background-color: #b4282d;
				}
			}
			
			.region-select{
				width: 100%;
				height: 600rpx;
				background-color: #fff;
				position: fixed;
				left: 0;
				bottom: 0;
				z-index: 10;
				
				.hd{
					height: 108rpx;
					width: auto;
					border-bottom: 2rpx solid #f4f4f4;
					padding: 46rpx 30rpx 0 30rpx;
					display: flex;
					justify-content: space-between;
					.region-selected{
						height: 60rpx;
						display: flex;
						
						.item{
							max-width: 140rpx;
							margin-right: 30rpx;
							text-align: left;
							height: 100%;
							color: #333;
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.disabled{
							color: #999;
						}
						.selected{
							color: #b4282d;
						}
					}
					
					.done{
						height: 60rpx;
						width: 60rpx;
						text-align: center;
						color: #333;
						font-size: 28rpx;
					}
					.disabled{
						color: #999;
					}
				}
			
				.bd{
					height: 492rpx;
					width: auto;
					padding: 0 30rpx;
					overflow: scroll;
					.region-list{
						height: auto;
						overflow: scroll;
						margin-bottom: 30rpx;
						.item{
							width: 100%;
							line-height: 104rpx;
							height: 104rpx;
							text-align: left;
							color: #333;
							font-size: 28rpx;
						}
						
						.selected{
							color: #b4282d;
						}
					}
				}
				
			}
		}
	}
</style>
