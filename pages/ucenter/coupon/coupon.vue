<template>
	<view class="container">
		<view class="instructions">
			<view class="right">
				<image class="img" src="../../../static/images/wenhao.png" mode=""></image>
				<navigator class="a" url="">使用说明</navigator>
			</view>
		</view>
		<view class="couponitem">
			<view class="item">
				<view class="wrapper">
					<view class="left">
						<text class="money">40</text>
						<text class="unit">元</text>
					</view>
					<view class="middle">
						<view class="name">每满300减40</view>
						<view class="time">2020.11.01-2020.11.03</view>
					</view>
					<view class="right">去使用</view>
				</view>
				<view class="bottom">
					<view class="useCondition">
						<text :class="[details ? 'txt':'text']">【11.1-11.3狂欢开幕】全品类可用，新品可用；详情页标注不可用券的商品除外</text>
						<view class="icon" @click="isShow">
							<image class="imge" src="../../../static/images/jt.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="item">
				<view class="wrapper">
					<view class="left">
						<text class="money">40</text>
						<text class="unit">元</text>
					</view>
					<view class="middle">
						<view class="name">每满300减40</view>
						<view class="time">2020.11.01-2020.11.03</view>
					</view>
					<view class="right">去使用</view>
				</view>
				<view class="bottom">
					<view class="useCondition">
						<text :class="[details ? 'txt':'text']">【11.1-11.3狂欢开幕】全品类可用，新品可用；详情页标注不可用券的商品除外</text>
						<view class="icon" @click="isShow">
							<image class="imge" src="../../../static/images/jt.png" mode=""></image>
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:true
			}
		},
		methods: {
			isShow(){
				if(this.details == true){
					this.details = false;
				}else{
					this.details = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		width: 100%;
		background-color: #f4f4f4;
		.instructions{
			margin: 0 auto;
			width: 690rpx;
			height: 72rpx;
			// background-color: #fff;
			.right{
				float: right;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 132rpx;
				height: 100%;
				.img{
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}
				.a{
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
		.couponitem{
			padding-bottom: 40rpx;
			.item{
				margin: 0 auto;
				width: 690rpx;
				height: 254rpx;
				// background-color: #DF847C;
				margin-bottom:40rpx;
				.wrapper{
					width: 690rpx;
					height: 170rpx;
					display: flex;
					align-items: center;
					border-radius: 12rpx 12rpx 0rpx 0rpx;
					overflow: hidden;
					background-color: #F18882;
					.left{
						width: 216rpx;
						height: 94rpx;
						// background-color: #F0AD4E;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
						.money{
							font-size: 64rpx;
						}
						.unit{
							font-size: 36rpx;
							padding-top: 16rpx;
						}
					}
					.middle{
						width: 266rpx;
						height: 60rpx;
						// overflow:hidden;
						color: #FFFFFF;
						.name{
							font-size: 28rpx;
						}
						.time{
							font-size: 20rpx;
						}
					}
					.right{
						text-align: center;
						margin: 0 auto;
						width: 132rpx;
						height: 40rpx;
						font-size: 24rpx;
						background-color: #FDE9E7;
						border-radius: 4rpx;
						color: #E65E5F;
					}
				}
				.bottom{
					width: 690rpx;
					// height: 100rpx;
					background-color: #DF847C;
					display: flex;
					justify-content: center;
					border-radius: 0rpx 0rpx 12rpx 12rpx;
					overflow: hidden;
					.useCondition{
						margin: 20rpx 0rpx 10rpx 0rpx;
						width: 610rpx;
						// height: 29rpx;
						display: flex;
						.txt{
							width: 510rpx;
							font-size: 24rpx;
							display: inline-block;
							white-space: nowrap; 
							text-overflow:ellipsis;
							overflow: hidden;
							color: #FFFFFF;
						}
						.text{
							width: 510rpx;
							font-size: 24rpx;
							color: #FFFFFF;
						}
						.icon{
							margin-left: 30rpx;
							width: 44rpx;
							height: 44rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							.imge{
								width: 36rpx;
								height: 36rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
