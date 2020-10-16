<template>
	<view class="container">
		<view class="business">
			<view class="item">30天无忧退货</view>
			<view class="item">48小时快速退款</view>
			<view class="item">满88元免邮费</view>
		</view>
		<!-- :class="[disabledCode==true?'code_text_tap':'code_text']" -->
		<view class="notCart" v-if="cartGoods.length<=0">
			<view class="no">
				<image src="../../static/images/cart.png" mode=""></image>
				<text>去添加点什么吧</text>
			</view>
		</view>
		<view class="CartData" v-if="cartGoods.length>0">
			<view class="list" v-for="(item,index) in cartGoods" :key="item.id">
				<view class="item" >
					<!-- 勾选按钮 -->
					<view class="checked"></view>
					<view class="cart-goods" >
						<image class="img" :src="item.list_pic_url" mode=""></image>
						<view class="info">
							<view class="t">
								<text class="name">{{item.goods_name}}</text>
								<text class="num">x{{item.number}}</text>
							</view>
							<view class="attr"></view>
							<view class="b">
								<text class="price">￥{{item.retail_price}}</text>
							</view>
						</view>
					</view>
				</view>		
			</view>
			
			<view class="cart-bottom">
				<view class="checkbox">全选({{cartTotal.checkedGoodsCount}})</view>
				<view class="total">￥{{cartTotal.checkedGoodsAmount}}</view>
				<view class="delete">编辑</view>
				<view class="checkout">下单</view>
				<!-- <view class="checkout">删除所有</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {getCartApiData} from "@/api/cartApi.js"
	export default {
		data() {
			return {
				cartGoods: [],
				cartTotal:{}
			}
		},
		methods: {
			async getCartApi() {
				var {data} = await getCartApiData();
				//data不是一个数组无法使用map 进行转换
				this.cartGoods = data.cartList;
				this.cartTotal = data.cartTotal;
				console.log(this.cartGoods)
				console.log(this.cartTotal)
			}
		},
		created() {
			this.getCartApi();
		}
	}
</script>

<style lang="scss" scoped>
.container{
		background: #f4f4f4;
		height: 100vh;
		min-height: 100%;
		width: 100%;
		.business{
			display: flex;
			padding: 0 30rpx;
			height: 73rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #F4F4F4;
			.item{
				background: url(../../static/images/bot.png) 0 center no-repeat;
				background-size: 10rpx;
				padding-left: 15rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				color: #666;
			}
		}
		.notCart{
			width: 100%;
			height: auto;
			margin: 0 auto;
			.no{
				margin-top: 200rpx;
				width: 100%;
				height: auto;
				image{
					margin: 0 auto;
					display: block;
					text-align: center;
					width: 260rpx;
					height: 260rpx;
				}
				text{
					margin: 0 auto;
					display: block;
					width: 258rpx;
					height: 29rpx;
					line-height: 29rpx;
					text-align: center;
					font-size: 29rpx;
					color: #999;
				}
			}		
		}
		.CartData{
			width: 100%;
			background-color: #fff;
			.list{
				width: 100%;
				height: 164rpx;
				.checked{
					float: left;
					height: 34rpx;
					width: 34rpx;
					margin: 65rpx 18rpx 65rpx 26rpx;
					background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
					background-size: 34rpx;
				}
				.cart-goods{
					float: left;
					height: 164rpx;
					width: 672rpx;
					border-bottom: 1px solid #f4f4f4;
					.img{
						float: left;
						height:125rpx;
						width: 125rpx;
						background: #f4f4f4;
						margin: 19.5rpx 18rpx 19.5rpx 0;
					}
					.info{
						float: left;
						height:125rpx;
						width: 503rpx;
						margin: 19.5rpx 26rpx 19.5rpx 0;
						.t{
							display: flex;
							justify-content: space-between;
							margin: 8rpx 0;
							height: 28rpx;
							font-size: 28rpx;
							color: #333;
						}
						.attr{
							margin-bottom: 17rpx;
							height: 24rpx;
						}
						.b{
							height: 28rpx;
							line-height: 28rpx;
							font-size: 28rpx;
							color: #333;
							.price{
								
							}
						}
					}
				}
			}
			.cart-bottom{
				width: 100%;
				position: fixed;
				display: flex;
				bottom:0;
				left:0;
				height: 100rpx;
				background-color: #fff;
				.checkbox{
					height: 34rpx;
					padding-left: 60rpx;
					line-height: 34rpx;
					margin: 33rpx 18rpx 33rpx 26rpx;
					background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
					background-size: 34rpx;
					font-size: 29rpx;
				}
				.total{
					height: 34rpx;
					flex: 1;
					margin: 33rpx 10rpx;
					font-size: 29rpx;
				}
				.delete{
					height: 34rpx;
					margin: 33rpx 18rpx;
					font-size: 29rpx;
				}
				.checkout{
					width: 210rpx;
					height: 100rpx;
					background-color: #B90000;
					text-align: center;
					line-height: 100rpx;
					font-size: 29rpx;
					color: #fff;
				}
			}
		}
	}
</style>
