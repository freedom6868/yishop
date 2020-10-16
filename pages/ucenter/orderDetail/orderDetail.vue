<template>
	<view class="container">
		<view class="order-info">
			<view class="item-a">下单时间：{{orderInfo.add_time}}</view>
			<view class="item-b">订单编号：{{orderInfo.order_sn}}</view>
			<view class="item-c">
				<view class="l">实付:<text class="cost">￥{{orderInfo.actual_price}}</text></view>
				<view class="r">
					<view class="btn">取消订单</view>
					<view class="btn active">去付款</view>
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
							<view class="name">
								
							</view>
							<view class="number">
								
							</view>
						</view>
						<view class="attr">
							
						</view>
						<view class="price">
							
						</view>
					</view>
				</view>
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
				this.orderInfo = res.data.orderInfo;
				this.orderGoods = res.data.orderGoods;
				this.handleOption = res.data.handleOption;
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
		height: 100%;
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
			
		}
	}
</style>
