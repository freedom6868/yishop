<template>
	<view class="brandDetail_container">
		<view class="brand-info" v-if="brand != '' ">
			<view class="name">
				<image :src="brand.app_list_pic_url" mode="widthFix"></image>
				<view class="info-box">
					<text>{{brand.name}}</text>
				</view>

			</view>
			<view class="desc">{{brand.simple_desc}}</view>
		</view>

		<view class="goods_list" v-if="goodsList.length > 0">
			<view class="goods_item" v-for="(item,index) in goodsList" :key="index" @click="getGoods(item.id)">
				<image :src="item.list_pic_url"></image>
				<text class="name">{{item.name}}</text>
				<text class="price">￥{{item.retail_price}}</text>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		getBrandData,
		getBrandList
	} from '@/api/brandDetailApi.js'
	export default {
		data() {
			return {
				id: '',
				brand: '',
				page: 0,
				isgetGoods: true,
				size: 10,
				goodsList: []
			}
		},
		methods: {
			async getBrand() {
				const res = await getBrandData({
					id: this.id
				});
				if (res.errno == 0) {
					this.brand = res.data.brand
				}
				// console.log(this.brand)
				// this.getGoodsList()
			},

			async getGoodsList() {
				if (!this.isgetGoods) {
					uni.showToast({
						title: '加载完啦...',
					})
					return;
				}
				this.page = this.page + 1;
				console.log(this.page)
				const res = await getBrandList({
					brandId: this.id,
					page: this.page,
					size: this.size
				});
				if (res.errno == 0) {
					if (res.data.data == '') {
						this.isgetGoods = false;
						return;
					}
					this.goodsList = this.goodsList.concat(res.data.data)
				}
				console.log(res)
			},
			
			getGoods(goodsId) {
				console.log(goodsId)
				uni.navigateTo({
					url:`../goods/goods?id=${goodsId}`
				})
			}
		},
		onReachBottom() {
			this.getGoodsList()
		},
		onLoad(options) {
			
			this.id = parseInt(options.id);
			this.getBrand()
			this.getGoodsList()
		}

	}
</script>

<style lang="scss" scoped>
	.brandDetail_container {
		.brand-info {
			.name {
				position: relative;
				width: 100%;
				height: 290rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 290rpx;
				}

				.info-box {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 290rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						margin: auto;
						font-size: 37.5rpx;
						color: #fff;
						padding-bottom: 8rpx;
						border-bottom: 2rpx solid #fff;
					}
				}
			}

			.desc {
				padding: 41.5rpx 31.25rpx;
				font-size: 30rpx;
				color: #666;
				background: #FFFFFF;
				margin-bottom: 10rpx;
			}
		}

		.goods_list {
			display: flex;
			flex-wrap: wrap;
			border-top: 1px solid #f4f4f4;
			background: #FFFFFF;

			.goods_item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 375rpx;
				padding: 15rpx 31.25rpx;
				// border: 1px solid #f4f4f4;
				border-right: 1px solid #f4f4f4;
				border-bottom: 1px solid #f4f4f4;

				image {
					width: 310rpx;
					height: 310rpx;
				}

				.name {
					font-size: 30rpx;
					color: #333;
				}

				.price {
					font-size: 30rpx;
					color: #b4282d;
				}
			}
		}

	}
</style>
