<template>
	<view class="container">
		<view class="address-box">
			<view class="address-item" @click="selectAddress" v-if="addressList.length > 0">
				<view class="l">
					<text class="name">{{checkedAddress.name}}</text>
					<text class="default" v-if="checkedAddress.is_default===1">默认</text>
				</view>
				<view class="m">
					<text class="mobile">{{checkedAddress.mobile}}</text>
					<text class="address">{{checkedAddress.full_region + checkedAddress.address}}</text>
				</view>
				<view class="r">
					<image src="/static/images/address_right.png"></image>
				</view>
			</view>
			<view class="address-item address-empty" @click="addAddress" v-if="addressList.length <= 0">
				<view class="m">
				   还没有收货地址，去添加
				</view>
				<view class="r">
					<image src="/static/images/address_right.png"></image>
				</view>
			</view>
			<view class="coupon-box"  @click="ToCoupon">
				<view class="coupon-item">
					<view class="l">
						<text class="name">{{couponName !='' ? couponName : '请选择优惠劵'}}</text>
						<text class="txt">{{couponName !='' ? type_money+'元' : couponCount+'张'}}</text>
					</view>
					<view class="r">
						<image src="/static/images/address_right.png" mode=""></image>
					</view>
				</view>
			</view>
			 <view class="order-box">
				<view class="order-item">
					<view class="l">
						<text class="name">商品合计</text>
					</view>
					<view class="r">
						<text class="txt">￥{{goodsTotalPrice}}</text>
					</view>
				</view>
				<view class="order-item">
					<view class="l">
						<text class="name">运费</text>
					</view>
					<view class="r">
						<text class="txt">￥{{freightPrice}}</text>
					</view>
				</view>
				<view class="order-item no-border">
					<view class="l">
						<text class="name">优惠券</text>
					</view>
					<view class="r">
						<text class="txt">-￥{{couponPrice}}</text>
					</view>
				</view>
			</view>
			<!-- 订单商品 -->
			 <view class="goods-items">
				<view class="item" v-for="(item,index) in cartGoods" v-if="item.checked == 1" :key="item.id">
					<view class="img">
						<image :src="item.list_pic_url"></image>
					</view>
					<view class="info">
						<view class="t">
							<text class="name">{{item.goods_name}}</text>
							<text class="number">x{{item.number}}</text>
						</view>
						<view class="m">{{item.goods_specifition_name_value}}</view>
						<view class="b">￥{{item.retail_price}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="order-total">
			<view class="l">实付：￥{{orderTotalPrice}}</view>
			<view class="r" @click="submitOrder">去付款</view>
		</view>
	</view>
</template>

<script>
	import {getCartCheckout,postOrderSubmit} from "@/api/orderApi.js";
	import {getAddressListData} from '@/api/uncenter/addressApi.js';
	export default {
		data() {
			return {
				time:0,
				cartGoods: [],
				addressList:{},
				couponName:'',
				type_money:0.00,
				couponCount:0,
				freightPrice: 0.00,    //快递费
				couponPrice: 0.00,     //优惠券的价格
				goodsTotalPrice:0.00,  //商品总价
				orderTotalPrice:0.00,  //订单总价
				addressId:0,
				couponId:0,
				nextPageAddressId:0,
				checkedAddress:{},
				checkCoupon:{}
			}
		},
		methods: {
			async getAddressList(){
				let res = await getAddressListData();
				console.log(res);
				this.addressList = res.data;
			},
			async tempCheckedout(){
				let res = await getCartCheckout(this.addressId,this.couponId);
				if(res.errno === 0){
					this.cartGoods = res.data.checkedGoodsList;			  //商品
					this.checkedAddress = res.data.checkedAddress;			  //地址
					this.addressId = res.data.checkedAddress.id;		  //地址id
					this.couponPrice = res.data.couponPrice;			  
				    this.freightPrice = res.data.freightPrice;
					this.couponCount = res.data.couponCount;
					this.couponName = res.data.checkedCoupon.name; 		  //红包名
					this.type_money = res.data.checkedCoupon.type_money;  //红包金额
				    this.goodsTotalPrice = res.data.goodsTotalPrice;
				    this.orderTotalPrice = res.data.orderTotalPrice;
					this.userId = res.data.checkedAddress.user_id;
				}else{
					uni.showToast({
						title:res.errmsg,
						icon:"none"
					})
				}
				console.log(res)
			},
			
			//跳转优惠页面
			
			ToCoupon(){
				if(this.addressList.length < 0 || this.checkedAddress == null){
					uni.showToast({
						title:"请先选择收货地址",
						icon:"none"
					})
					return;
				}else if(this.couponCount == 0){
					uni.showToast({
						title:"没有优惠卷了",
						icon:"none",
						duration:1000,
					})
					return;
				}else{
					uni.navigateTo({
						url:'/pages/coupon/coupon?userId='+this.userId
					})
				}
				
			},
			//支付
			async submitOrder(){
				if(this.addressList.length < 0 || this.checkedAddress.id == undefined){
					uni.showToast({
						title:"请选择收货地址",
						icon:"none"
					})
					return false;
				}
				var time = parseInt(new Date().getTime()/1000) ;
				this.time = time;
				var res = await postOrderSubmit(this.addressId,this.couponId,this.time);
				console.log(res)
				if(res.errno === 0){
					//生成订单
					uni.navigateTo({
						url:"/pages/payResult/payResult"
					})
				}else{
					uni.showToast({
						title:res.errmsg,
						icon:"none"
					})
				}
			},
			addAddress(){
				uni.navigateTo({
					url:"/pages/shopping/address/address"
				})
			},
			selectAddress(){
				uni.navigateTo({
					url:"/pages/shopping/address/address"
				})
			},
			
		},
		onLoad(option){
			console.log(option.couponId);
			this.couponId = option.couponId;
			this.tempCheckedout();
			this.getAddressList();
			console.log(this.couponId)
		},
		onShow(){
			let pages = getCurrentPages();
			let currentPage = pages[pages.length-1];
			if(currentPage.nextPageAddressId != 0 && currentPage.nextPageAddressId != undefined){
				this.addressId = currentPage.nextPageAddressId;
				this.checkedAddress = this.addressList.find(v=>{
					if(v.id == this.addressId){
						return v;
					}
				})
				uni.setStorageSync('checkedAddress',JSON.stringify(this.checkedAddress))
				this.$forceUpdate()
			};
			if(currentPage.checkCoupon!= null){
				console.log('currentPage.checkCoupon',currentPage.checkCoupon)
				this.couponId = currentPage.checkCoupon.coupon_id;
				this.tempCheckedout();
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		.address-box{
			width: 100%;
			height: 166.55rpx;
			background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png') 0 0 repeat-x;
			background-size: 62.5rpx 10.5rpx;
			margin-bottom: 20rpx;
			padding-top: 10.5rpx;
			.address-item{
			    display: flex;
			    height: 155.55rpx;
			    background: #fff;
			    padding: 41.6rpx 0 41.6rpx 31.25rpx;
				.l{
				    width: 125rpx;
				    height: 100%;
					.name{
						margin-left: 6.25rpx;
						margin-top: -7.25rpx;
						display: block;
						width: 125rpx;
						height: 43rpx;
						line-height: 43rpx;
						font-size: 30rpx;
						color: #333;
						margin-bottom: 5rpx;
					}
					.default{
					    margin-left: 6.25rpx;
					    display: block;
					    width: 62rpx;
					    height: 33rpx;
					    border-radius: 5rpx;
					    border: 1px solid #b4282d;
					    font-size: 20.5rpx;
					    text-align: center;
					    line-height: 29rpx;
					    color: #b4282d;
					}
				}
				.m{
				    flex: 1;
				    height: 72.25rpx;
				    color: #999;
					.mobile{
					    display: block;
					    height: 29rpx;
					    line-height: 29rpx;
					    margin-bottom: 6.25rpx;
					    font-size: 30rpx;
					    color:#333;
					}
					 .address{
					    display: block;
					    height: 37.5rpx;
					    line-height: 37.5rpx;
					    font-size: 25rpx;
					    color:#666;
					}

				}
				.r{
					width: 77rpx;
					height: 77rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
					    width: 52.078rpx;
					    height: 52.078rpx;
					}
				}
				
			}
			.address-empty{
				line-height: 75rpx;
				text-align: center;
				.m{
				    flex: 1;
				    height: 72.25rpx;
				    color: #999;
				}
				.r{
				    width: 77rpx;
				    height: 77rpx;
				    display: flex;
				    justify-content: center;
				    align-items: center;
					image{
					    width: 52.078rpx;
					    height: 52.078rpx;
					}
				}
			}
			.coupon-box{
				margin-top: 26rpx;
			    width: 100%;
			    height: auto;
			    overflow: hidden;
			    background: #fff;
				.coupon-item{
					width: 100%;
					height: 108rpx;
					overflow: hidden;
					background: #fff;
					display: flex;
					padding-left: 32rpx;
					.l{
						flex: 1;
						height: 43rpx;
						line-height: 43rpx;
						padding-top:35rpx ;
						.name{
						    float: left;
						    font-size: 30rpx;
						    color: #666;
						}
						.txt{
							float: right;
							font-size: 30rpx;
							color: #666;
						}
					}
					.r{
						margin-top: 15.5rpx;
						width: 77rpx;
						height: 77rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
						    width: 52rpx;
						    height: 52rpx;
						}
					}
				}
			}
			.order-box{
				margin-top: 20rpx;
				width: 100%;
				overflow: hidden;
				background: #fff;
				.order-item{
					height: 104.3rpx;
					overflow: hidden;
					background: #fff;
					display: flex;
					margin-left: 31.25rpx;
					padding-right: 31.25rpx;
					padding-top: 26rpx;
					border-bottom: 1px solid #d9d9d9;
					.l{
					    float: left;
					    height: 52rpx;
					    width: 50%;
					    line-height: 52rpx;
					    overflow: hidden;
					}
					.r{
					    float: right;
					    text-align: right;
					    width: 50%;
					    height: 52rpx;
					    line-height: 52rpx;
					    overflow: hidden;
					}

				}
				.no-border{
				    border-bottom: none;
				}

			}
			.goods-items{
				margin-top: 20rpx;
				width: 100%;
				height: auto;
				overflow: hidden;
				background: #fff;
				padding-left: 31.25rpx;
				margin-bottom: 120rpx;
				.item{
				    height: 192rpx;
				    padding-right: 31.25rpx;
				    display: flex;
				    align-items: center;
				    border-bottom: 1px solid rgba(0,0,0,0.15);
					.img{
					    height: 145.83rpx;
					    width: 145.83rpx;
					    background-color: #f4f4f4;
					    margin-right: 20rpx;
						image{
						    height: 145.83rpx;
						    width: 145.83rpx;
						}
					}
					.info{
					    flex: 1;
					    height: 145.83rpx;
					    padding-top: 5rpx;
						.t{
						    height:  33rpx;
						    line-height: 33rpx;
						    margin-bottom: 10rpx;
						    overflow: hidden;
						    font-size: 30rpx;
						    color: #333;
							.name{
							    display: block;
							    float: left;
							}
							.number{
							    display: block;
							    float: right;
							    text-align: right;
							}
						}
						 .m {
						    height:  29rpx;
						    overflow: hidden;
						    line-height: 29rpx;
						    margin-bottom: 25rpx;
						    font-size: 25rpx;
						    color: #666;
						}
						.b {
						    height:  41rpx;
						    overflow: hidden;
						    line-height: 41rpx;
						    font-size: 30rpx;
						    color: #333;
						}

					}
				}
			}
		}
		
		.order-total{
		    position: fixed;
		    left:0;
		    bottom: 0;
		    height: 100rpx;
		    width: 100%;
		    display: flex;
			.l{
			    flex: 1;
			    height: 100rpx;
			    line-height: 100rpx;
			    color: #b4282d;
			    background: #fff;
			    font-size: 33rpx;
			    padding-left: 31.25rpx;
			    border-top: 1rpx solid rgba(0,0,0,0.2);
			    border-bottom: 1rpx solid rgba(0,0,0,0.2);
			}
			.r{
			    width: 233rpx;
			    height: 100rpx;
			    background: #b4282d;
			    border: 1px solid #b4282d;
			    line-height: 100rpx;
			    text-align: center;
			    color: #fff;
			    font-size: 30rpx;
			}
		}
		
	}
</style>
