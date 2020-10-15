<template>
	<view class="goods_container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper">
			<swiper-item class="swiper_item" v-for="(item,index) in gallery" :key="index">
				<image :src="item.img_url" mode=""></image>
			</swiper-item>
		</swiper>

		<view class="service-policy">
			<view class="item">30天无忧退货</view>
			<view class="item">48小时快速退款</view>
			<view class="item">满88元免邮费</view>
		</view>

		<view class="goods-info">
			<view class="c left">
				<text class="name">{{goods.name}}</text>
				<text class="desc">{{goods.goods_brief}}</text>
				<text class="price">&yen;{{goods.retail_price}}</text>
				<view class="brand" v-if="brand.name">
					<navigator url="">
						<text>{{brand.name}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<!-- 选规格 -->
		<view class=" section-nav">
			<text class="left">请选择规格数量</text>
			<image src="../../static/images/address_right.png" mode="" class="img_size right"></image>
		</view>

		<!-- 评价 -->
		<view class="comments">
			<view class="title left">
				<text>评价(96)</text>
				<view class="check_all">
					<text>查看全部</text>
					<image src="../../static/images/address_right.png" class="img_size" mode=""></image>
				</view>
			</view>
			<view class="matter">
				<view class="item">
					<view class="info">
						<view class="user">
							<image src="https://thirdwx.qlogo.cn/mmopen/vi_32/7rmnEumJia3WnaNAqxhKkU9JiaJWVIYEyaqNVcUqd4sZDdBTSCkfK5q1VGF6kOG1lgJH81MrRFKwKLZ0cLDDBH5w/132" class="img" mode=""></image>
							<text>homi</text>
						</view>
						<view class="time">
							2017-05-05 14:01:39
						</view>
					</view>
					<view class="content">布料很厚实，触感不错，洗过之后不缩水不掉色</view>
					<view class="imgs">
						<image src="https://yanxuan.nosdn.127.net/218783173f303ec6d8766810951d0790.jpg" mode=""></image>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getGoodsDeatil
	} from '@/api/goodsApi.js';
	export default {
		data() {
			return {
				gallery: '', //轮播图
				goods: '',
				brand: '',
			}
		},
		methods: {
			async getGoodsInfo() {
				const res = await getGoodsDeatil({
					id: this.$data.id
				})
				console.log("详情：", res.data)
				if (res.errno === 0) {
					this.gallery = res.data.gallery; //轮播图
					this.goods = res.data.info;
					this.brand = res.data.brand; //品牌
				}
			}
		},
		onLoad(options) {
			// 模拟商品id
			this.$data.id = '1181000'
			this.getGoodsInfo()
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	view {
		word-break: break-all;
		overflow: auto;
	}
	
	// 页面左右边距
	.left {
		margin-left: 31.25rpx;
	}
	.right {
		margin-right: 16rpx;
	}

	// 图标大小
	.img_size {
		width: 52rpx;
		height: 52rpx;
	}

	.goods_container {
		// width: 100vw;
		// height: 100vh; 
		background-color: #f4f4f4;

		// 轮播图
		.swiper {
			width: 100%;
			height: 750rpx;

			.swiper_item {

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.service-policy {
			height: 73rpx;

			display: flex;
			justify-content: space-between;
			align-items: center;

			padding: 0 31.25rpx;
			background: #f4f4f4;

			.item {
				background: url(../../static/images/dot_wps图片.png) 0 center no-repeat;
				background-size: 10rpx;
				padding-left: 15rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				color: #666;
			}
		}

		.goods-info {
			background-color: #fff;

			.c {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				margin-left: 31.25rpx;
				padding: 38rpx 31.25rpx 38rpx 0;
				border-bottom: 1px solid #f4f4f4;

				.name {
					// height: 41rpx;
					margin-bottom: 5.208rpx;
					font-size: 41rpx;
					// line-height: 41rpx;
				}

				.desc {
					// height: 43rpx;
					margin-bottom: 41rpx;
					font-size: 24rpx;
					// line-height: 36rpx;
					color: #999;
				}

				.price {
					// height: 35rpx;
					font-size: 35rpx;
					line-height: 35rpx;
					color: #b4282d;
				}

				.brand {
					margin-top: 23rpx;
					min-height: 40rpx;

					text {
						display: inline-block;
						width: auto;
						padding: 2px 30rpx 2px 10.5rpx;
						line-height: 35.5rpx;
						border: 1px solid #f48f18;
						font-size: 25rpx;
						color: #f48f18;
						border-radius: 4px;
						background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% center no-repeat;
						background-size: 10.75rpx 18.75rpx;
					}

				}
			}
		}

		// 规格
		.section-nav {
			display: flex;
			justify-content: space-between;
			align-items: center;

			height: 108rpx;
			background: #fff;
			margin-bottom: 20rpx;

		}
		
		
		// 评价
		.comments {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.title {
				height: 102.5rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.check_all {
					display: flex;
					align-items: center;
				}
			}
		}
		
	}
</style>
