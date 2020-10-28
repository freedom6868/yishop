<template>
	<view class="container">
		<view class="instructions">
			<view class="right">
				<image class="img" src="/static/images/wenhao.png" mode=""></image>
				<navigator class="a" url="">使用说明</navigator>
			</view>
		</view>
		<view class="couponitem">
			<view class="item" v-for="(item,index) in couponList" :key="index">
				<view class="wrapper">
					<view class="left">
						<text class="money">{{item.type_money}}</text>
						<text class="unit">元</text>
					</view>
					<view class="middle">
						<view class="name">{{item.name}}</view>
						<view class="time">{{item.use_start_date_time}}-{{item.use_end_date_time}}</view>
					</view>
					<view class="right" @click="toCoupon">去使用</view>
				</view>
				<view class="bottom">
					<view class="useCondition">
						<text :class="[item.details ? 'txt':'text']">【11.1-11.3狂欢开幕】全品类可用，新品可用；详情页标注不可用券的商品除外</text>
						<view class="icon" @click="isShow(index)">
							<image class="imge" src="/static/images/jt.png" mode="" />
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {getCouponApiData} from "@/api/uncenter/couponApi.js"
	import moment from "@/utils/moment.js";
	export default {
		data() {
			return {
				userInfo:{},
				userId:0,
				couponList:[]
			}
		},
		methods: {
			toCoupon(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			async getCouponList(){
				var res = await getCouponApiData(this.userId);
				// console.log(res)
				res.data.res.map(v=>{
					v.use_end_date_time = moment.unix(v.use_end_date).format('YYYY.MM.DD');    // 2020/10/26
					v.use_start_date_time = moment.unix(v.use_start_date).format('YYYY.MM.DD'); //YYYY-MM-DD HH:mm:ss
					v.details = true;
				})
				this.couponList = res.data.res;
				console.log(this.couponList)
				
			},
			isShow(index){
				if(this.couponList[index].details == true){
					this.couponList[index].details = false
				}else{
					this.couponList[index].details = true
				}
			}
		},
		created(){
			
		},
		onLoad() {
			// var that = this;
			// uni.getStorageSync({
			//     key: 'userInfo',
			//         console.log(res.data);
			// 		that.userInfo = res.data
			// });
			// console.log("123"+that.userInfo)
			const res = JSON.parse(uni.getStorageSync('userInfo'));
			console.log(res)
			this.userId = res.id;
			this.getCouponList();
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
