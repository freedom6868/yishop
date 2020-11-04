<template>
	<view class="indexBox">
		<!-- 首页搜索框 -->
		<view class="search">
			<navigator url="/pages/search/search">
				<view class="searchBox">
					<image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png"
					 mode=""></image>
					<!-- 动态数量 -->
					<text class="text">商品搜索，共 {{ goodCount }} 款好物</text>
				</view>
			</navigator>
		</view>

		<!-- 轮播图 -->
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item) in Lunbo" :key='item.id'>
					<view class="swiper-item">
						<image class="lunboImg" :src="item.image_url"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<!-- 五宫格 -->
		<view class="m-menu">
			<!-- 路径 -->
			<view class="item" v-for="(item) in Channel" :key='item.id' @click="goCategory(item)">
				<image :src="item.icon_url"></image>
				<text>{{item.name}}</text>
			</view>
		</view>

		<!-- 商品直供 -->
		<view class="supply">
			<text class="supplyText">品牌制造商直供</text>
		</view>

		<!-- 制造商直供图片 -->
		<view class="manufacturer">
			<view url="" v-for="item in BrandList" :key="item.id" @click="ckGoods(item.id)" class="manubox">
				<view class="manuImg">
					<image :src="item.new_pic_url"></image>
				</view>
				<view class="manuText">
					<text class="brand">{{item.name}}</text><br>
					<text class="price">{{item.floor_price}}</text>
					<text class="unit">元起</text>
				</view>
			</view>
		</view>

		<!-- 新品首发 -->
		<view class="supply">
			<text class="supplyText">周一周四 · 新品首发</text>
		</view>

		<view class="newpro">
			<view class="sunNewPro" v-for="item in newGoods" :key='item.id'>
				<view @click="sunnewGood(item.id)">
					<image :src="item.list_pic_url"></image>
					<text class="name">{{item.name}}</text>
					<text class="price">￥{{item.retail_price}}</text>
				</view>
			</view>
		</view>
		<!-- 人气推荐 -->
		<view class="supply">
			<text class="supplyText">人气推荐</text>
		</view>

		<!-- 人气推荐商品信息 -->
		<view class="top">
			<view class="topGood" v-for="item in hotGoodsList" :key='item.id' @click="sunnewGood(item.id)">
				<image :src="item.list_pic_url"></image>
				<view class="topText">
					<text class="titlename">{{item.name}}</text><br>
					<text class="detail">{{item.goods_brief}}</text><br>
					<text class="top-price">￥{{item.retail_price}}</text>
				</view>
			</view>
		</view>

		<!-- 专题精选 -->
		<view class="supply">
			<navigator url="/pages/topic/topic" open-type="switchTab">
				<text class="supplyText">专题精选</text>
			</navigator>
		</view>

		<!-- swiper -->
		<special-banner :banner-list="bannerList" :swiper-config="swiperConfig"></special-banner>


		<!-- 居家 -->
		<view class="categoryList" v-for="item in categoryList" :key='item.id'>
			<!-- 居家标题 -->
			<view class="supply">
				<text class="supplyText">{{item.name}}</text>
			</view>
			<!-- 居家商品 -->
			<view class="newpro">
				<view class="sunNewPro" v-for="sumItem in item.goodsList" :key='sumItem.id'>
					<view @click="sunnewGood(sumItem.id)">
						<image :src="sumItem.list_pic_url" mode=""></image>
						<text class="name">{{sumItem.name}}</text>
						<text class="price">￥{{sumItem.retail_price}}</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		getHome,
		getGoodsCounts
	} from '@/api/homeApi.js';
	import specialBanner from '@/components/EtherealWheat-banner/specialBanner.vue'
	export default {
		data() {
			return {
				// 商品数量
				goodCount: [],
				// 轮播图
				Lunbo: [],
				// 五宫格
				Channel: [],
				// 品牌制造商list
				BrandList: [],
				// 新品首发
				newGoods: [],
				// 人气推荐
				hotGoodsList: [],
				// 商品lunbo
				topicList: [],
				// 居家
				categoryList: [],
				// 进入专题轮播list
				bannerList: [],

				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: false,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
				}
			}
		},
		methods: {
			// 获取所有home数据
			async getHomeData() {
				var {
					data
				} = await getHome();
				// 轮播图list
				this.Lunbo = data.banner;
				// 宫格list
				this.Channel = data.channel;
				// 制造商直供图片
				this.BrandList = data.brandList;
				// 新品首发
				this.newGoods = data.newGoodsList;
				// 人气推荐
				this.hotGoodsList = data.hotGoodsList;
				// 专题精选
				let newArr = [];
				data.topicList.map(v => {
					let obj = {};
					obj.picture = v.item_pic_url;
					obj.title = v.title;
					obj.description = v.subtitle;
					obj.id = v.id;
					newArr.push(obj);
				})
				this.bannerList = newArr;
				// 居家
				this.categoryList = data.categoryList
			},
			// 商品数量
			async getGoodsCountsData() {
				var data = await getGoodsCounts();
				this.goodCount = data.data.goodsCount;

			},
			// 调转到分类详情页面
			goCategory(item) {
				console.log(item);
				var url = item.url
				var id = url.split('id=')[1];
				var index = item.id - 1;
				uni.navigateTo({
					url: '/pages/category/category?id=' + id + '&index=' + index
				})

			},
			//商品详情
			sunnewGood(id) {
				console.log(id)
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + id

				})
			},
			// 跳转到ck制造商
			ckGoods(id) {
				uni.navigateTo({
					url: "/pages/brandDetail/brandDetail?id=" + id
				})
			}
		},
		created() {
			this.getHomeData();
			this.getGoodsCountsData();

		},
		components: {
			"special-banner": specialBanner
		}

	}
</script>

<style lang="scss" scoped>
	.indexBox {
		background-color: #F4F4F4;

		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90rpx;
			background-color: #FFFFFF;

			.searchBox {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 690rpx;
				height: 56rpx;
				border-radius: 10rpx;
				background: #ededed;

				.text {
					color: #666;
				}

				.icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}
			}
		}

		.lunbo {
			width: 100%;
			height: 400rpx;

			.swiper {
				height: 400rpx;

				.swiper-item {
					width: 100%;
					height: 100%;
				}

				.lunboImg {
					width: 100%;
					height: 100%;
				}

			}
		}

		.gonge {
			background-color: blue;
			height: 198rpx;
			width: 100%;
		}

		.m-menu {
			display: flex;
			height: 181rpx;
			width: 750rpx;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;

			.item {
				flex: 1;
				display: block;
				padding: 20rpx 0;
			}

			image {
				display: block;
				width: 58rpx;
				height: 58rpx;
				margin: 0 auto;
				margin-bottom: 12rpx;
			}

			text {
				display: block;
				font-size: 24rpx;
				text-align: center;
				margin: 0 auto;
				line-height: 1;
				color: #333;
			}

		}

		.supply {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 130rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;

			.supplyText {
				padding-right: 30rpx;
				background-size: 16rpx 27rpx;
				display: inline-block;
				line-height: 40rpx;
				height: 36rpx;
				font-size: 33rpx;
			}
		}

		.manufacturer {
			width: 100%;
			height: 504rpx;
			display: flex;
			flex-wrap: wrap;

			.manubox {
				position: relative;

				.manuImg {
					width: 375rpx;
					height: 253rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.manuText {
					position: absolute;
					z-index: 2;
					padding: 27rpx 31rpx;
					left: 0;
					top: 0;

					.btand {
						display: block;
						font-size: 33rpx;
						height: 43rpx;
						color: #333;
					}

					.price {
						font-size: 25rpx;
						color: #999;
					}

					.unit {
						font-size: 25rpx;
						color: #999;
					}
				}
			}

		}

		.newpro {
			text-align: center;
			width: 100%;
			background-color: #FFFFFF;
			overflow: hidden;
			padding: 0 31rpx 45rpx 31rpx;

			.sunNewPro {
				float: left;
				width: 302rpx;
				margin: 10rpx 21rpx 0rpx 21rpx;

				image {
					width: 302rpx;
					height: 302rpx;
				}

				.name {
					text-align: center;
					display: block;
					width: 300rpx;
					height: 40rpx;
					font-size: 30rpx;
					color: #333;
					margin-bottom: 14rpx;

					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.price {
					display: block;
					text-align: center;
					line-height: 30rpx;
					font-size: 30rpx;
					color: #b4282d;
				}
			}
		}

		.top {
			height: auto;
			width: 100%;
			background-color: #FFFFFF;
			font-size: 29rpx;
			color: #333333;

			.topGood {
				border-top: 1px solid #d9d9d9;
				margin: 0 20rpx;
				height: 264rpx;
				width: 710rpx;
				display: flex;

				image {

					width: 240rpx;
					height: 240rpx;
				}

				.topText {
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: center;
					overflow: hidden;
					height: 264rpx;
					width: 456rpx;

					.titlename {
						width: 456rpx;
						display: block;
						line-height: 50rpx;
						font-size: 30rpx;
						color: #333;
					}

					.detail {
						width: 456rpx;
						display: block;
						line-height: 50rpx;
						font-size: 25rpx;
						color: #999;

					}

					.top-price {
						width: 456rpx;
						display: block;
						line-height: 50rpx;
						font-size: 33rpx;
						color: #b4282d;
					}
				}
			}
		}
	}
</style>
