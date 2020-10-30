<template>
	<view class="container">
		<view class="orders ">
			<navigator :url="'/pages/ucenter/orderDetail/orderDetail?id='+item.id" class="order"  v-for="item in orderList" :key='item.id'>
				<view class="h">
					<view class="l">
						订单编号:{{item.order_sn}}
					</view>
					<view class="r">
						{{item.order_status_text}}
					</view>
				</view>
				<view class="goods" v-for="gitem in item.goodsList" :key='gitem.id'>
					<view class="img">
						<image class="image" :src="gitem.list_pic_url" mode=""></image>
					</view>
					<view class="info">
						<text class="name">{{gitem.goods_name}}</text>
						<text class="number">共{{gitem.number}}件商品</text>
					</view>
					<view class="status"></view>
				</view>
				<view class="b">
					<view class="l">
						实付: <text class="price">￥{{item.actual_price}}</text>
					</view>
					<view class="r">
						<button type="warn" size='mini' @click.stop='payOrder'>去付款</button>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import { getOrderListData} from '@/api/uncenter/orderApi.js'
 	export default {
		data() {
			return {
				orderList:[]
			};
		},
		methods:{
			async getOrderList(){
				let res = await getOrderListData();
				console.log(res);
				if(res.errno == 0){
					this.orderList = res.data.data;
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
			},
			payOrder(){
				uni.showToast({
					title:'支付订单'
				})
			}
		},
		onLoad() {
			this.getOrderList();
		},
		onUnload() {
			uni.switchTab({
				url:'/pages/ucenter/index/index'
			})
		}
	}
</script>

<style lang="scss">
	.container{
		height: 100%;
		width: 100%;
		background-color: #f4f4f4;
		.orders{
			height: auto;
			width: 100%;
			
			.order{
				margin-top: 20rpx;
				background-color: #fff;
				padding: 30rpx 30rpx 0 30rpx;
				box-sizing: border-box;
				height: auto;
				.h{
					width: auto;
					height: 84rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 30rpx;
					color: #333;
					border-bottom: 2rpx solid #f4f4f4;
					.r{
						color: #b4282d;
						font-size: 24rpx;
					}
				}
				
				.goods{
					height: auto;
					width: auto;
					padding: 30rpx;
					display: flex;
					align-items: center;
					
					.img{
						width: 145rpx;
						height: 145rpx;
						background-color: #f4f4f4;
						
						.image{
							width: 100%;
							height: 100%;
						}
					}
					
					.info{
						display: flex;
						flex-direction: column;
						margin-left: 15rpx;
						.name{
							font-size: 30rpx;
							color: #333;
						}
						.number{
							font-size: 25rpx;
							color: #666;
						}
					}
				}
				
				.b{
					height: 104rpx;
					border-top: 2rpx solid #f4f4f4;
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.price{
						color: #b4282d;
					}
				}
			}
		}
	}
</style>
