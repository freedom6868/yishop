<template>
	<view class="container">
		<view class="order-info">
			<view class="item-a">下单时间：{{orderInfo.add_time}}</view>
			<view class="item-b">订单编号：{{orderInfo.order_sn}}</view>
			<view class="item-c">
				<view class="l">实付:<text class="cost">￥{{orderInfo.actual_price}}</text></view>
				<view class="r">
					<view class="btn">取消订单</view>
					<view class="btn active" @click="goToPay">去付款</view>
				</view>
			</view>
		</view>
		
		<view class="order-goods">
			<view class="h">
				<view class="label">商品信息</view>
				<view class="status">{{orderInfo.order_status_text}}</view>
			</view>
			<view class="goods">
				<view class="item" v-for="item in orderGoods" :key='item.id'>
					<view class="img">
						<image class="image" :src="item.list_pic_url" mode=""></image>
					</view>
					<view class="info">
						<view class="t">
							<view class="name">{{item.goods_name}}</view>
							<view class="number">x{{item.number}}</view>
						</view>
						<view class="attr">{{item.goods_specifition_name_value}}</view>
						<view class="price">￥{{ item.retail_price}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="order-bottom">
			<view class="address">
				<view class="t">
					<view class="name">{{orderInfo.consignee}}</view>
					<view class="mobile">{{orderInfo.mobile}}</view>
				</view>
				<view class="b">{{orderInfo.full_region + orderInfo.address}}</view>
			</view>
			<view class="total">
				<view class="t">
					<view class="label">商品合计：</view>
					<view class="txt">￥ {{orderInfo.goods_price}}</view>
				</view>
				<view class="t">
					<view class="label">优惠金额：</view>
					<view class="txt">￥ {{orderInfo.coupon_price}}</view>
				</view>
				<view class="t">
					<view class="label">运费：</view>
					<view class="txt">￥{{orderInfo.freight_price}}</view>
				</view>
				
			</view>
			<view class="pay-fee">
				<view class="label">实付：</view>
				<view class="txt">￥ {{orderInfo.actual_price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getOrderDetailData} from '@/api/uncenter/orderDetailApi.js'
	export default {
		data() {
			return {
				orderId:0,
				orderInfo:{},
				orderGoods:[],
				handleOption:{}
			};
		},
		methods:{
			async getOrderDetail(){
				let res = await getOrderDetailData({orderId:this.orderId});
				console.log(res)
				if(res.errno == 0){
					this.orderInfo = res.data.orderInfo;
					this.orderGoods = res.data.orderGoods;
					this.handleOption = res.data.handleOption;
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
				
			},
			goToPay(){
				uni.showToast({
					title:'付款成功'
				})
			}
		},
		onLoad(option) {
			this.orderId = option.id;
			this.getOrderDetail();
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: auto;
		height: 100vh;
		background-color: #f4f4f4;
		
		.order-info{
			background-color: #fff;
			width: auto;
			padding: 20rpx;
			.item-a{
				font-size: 30rpx;
				color: #666;
			}
			
			.item-b{
				font-size: 30rpx;
				color: #666;
				margin-top: 16rpx;
				padding-bottom: 30rpx;
				border-bottom: 2rpx solid #f4f4f4;
			}
			
			.item-c{
				height: 84rpx;
				padding-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.l{
					.cost{
						 color: #b4282d;
					}
				}
				.r{
					display: flex;
					margin-right: 20rpx;
					
					.btn{
						margin: 0 15rpx;
						height: 66rpx;
						line-height: 66rpx;
						padding: 0 20rpx;
					}
					.active{
						background-color: #b4282d;
						color: #fff;
					}
					
				}
			}
		}
		
		.order-goods{
			margin-top: 20rpx;
			background-color: #fff;
			padding: 25rpx;
			.h{
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #f4f4f4;
				padding-bottom: 20rpx;
				.status{
					color: #b4282d;
					font-size: 30rpx;
				}
			}
			
			.goods{
				.item{
					height: 192rpx;
					display: flex;
					border-bottom: 2rpx solid #f4f4f4;
					padding-top: 20rpx;
					.img{
						width: 146rpx;
						height: 146rpx;
						background-color: #f4f4f4;
						.image{
							height: 100%;
							width: 100%;
						}
					}
					
					.info{
						margin-left: 20rpx;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						color: #333;
						font-size: 30rpx;
						.t{
							display: flex;
							justify-content: space-between;
						}
						.price{
							margin-bottom: 10rpx;                             
							color: #333;
							font-size: 30rpx;
						}
					}
				}
			}
			
		}
		
		.order-bottom{
			margin-top: 20rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
			width: auto;
			height: auto;
			
			.address{
				padding-bottom: 30rpx;
				border-bottom: 2rpx solid #f4f4f4;
				.t{
					display: flex;
					margin-bottom: 10rpx;
					.mobile{
						margin-left: 100rpx;
					}
				}
			}
			
			.total{
				padding: 20rpx 0;
				.t{
					display: flex;
					.label{
						width: 160rpx;
					}
					.txt{
						color: #b4282d;
					}
				}
			}
			.pay-fee{
				height: auto;
				padding: 20rpx 0;
				display: flex;
				font-size: 36rpx;
				color: #b4282d;
				border-top: 2rpx solid #f4f4f4;
				.label{
					width: 160rpx;
				}
			}
		}
	}
</style>
