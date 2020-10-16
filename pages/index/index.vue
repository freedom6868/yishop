<template>
<<<<<<< HEAD
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
=======
	<view class="indexBox">
		<!-- 首页搜索框 -->
		<view class="search">
			<navigator url="../cearch/cearch">
				<view class="searchBox">
					<image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png"
					 mode=""></image>
					<!-- 动态数量 -->
					<text class="text">商品搜索，共300款好物</text>
				</view>
			</navigator>
		</view>

		<!-- 轮播图 -->
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item) in Lunbo" :key='id'>
					<view class="swiper-item">
						<image class="lunboImg" :src="item.image_url"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<!-- 五宫格 -->
		<view class="m-menu">
			<!-- 路径 -->
			<!-- <navigator class="item" v-for="(item) in Channel" url="详情?id={{item.id}}" :key='id'> -->
			<navigator class="item" v-for="(item) in Channel" :key='id'>
				<image :src="item.icon_url"></image>
				<text>{{item.name}}</text>
			</navigator>
		</view>

		<!-- 商品直供 -->
		<view class="supply">
			<navigator url="">
				<text class="supplyText">品牌制造商直供</text>
			</navigator>
		</view>

		<!-- 制造商直供图片 -->
		<view class="manufacturer">
			<navigator url="" v-for="item in BrandList" :key="id" class="manubox">
				<view class="manuImg">
					<image :src="item.new_pic_url" mode=""></image>
				</view>
				<view class="manuText">
					<text class="brand">{{item.name}}</text><br>
					<text class="price">{{item.floor_price}}</text>
					<text class="unit">元起</text>
				</view>
			</navigator>
		</view>

		<!-- 新品首发 -->
		<view class="supply">
			<navigator url="">
				<text class="supplyText">周一周四 · 新品首发</text>
			</navigator>
		</view>

		<view class="newpro">
			<view class="sunNewPro" v-for="item in newGoods" :key='item.id'>
				<view @click="sunnewGood(item.id)">
					<image :src="item.list_pic_url" mode=""></image>
					<text class="name">{{item.name}}</text>
					<text class="price">${{item.retail_price}}</text>
				</view>
			</view>
		</view>
		<!-- 人气推荐 -->
		<view class="supply">
			<navigator url="">
				<text class="supplyText">人气推荐</text>
			</navigator>
		</view>

		<!-- 人气推荐商品信息 -->
		<view class="top">
			<view class="topGood" v-for="item in hotGoodsList" :key='item.id' @click="sunnewGood(item.id)">
				<image :src="item.list_pic_url" mode=""></image>
				<view class="topText">
					<text class="title">{{item.name}}</text><br>
					<text class="detail">{{item.goods_brief}}</text><br>
					<text class="top-price">￥{{item.retail_price}}</text>
				</view>
			</view>
		</view>

		<!-- 人气推荐 -->
		<view class="supply">
			<navigator url="../topic/topic">
				<text class="supplyText">专题精选</text>
			</navigator>
		</view>

		<!-- swiper -->
		<special-banner :banner-list="bannerList" :swiper-config="swiperConfig"></special-banner>

>>>>>>> dev
	</view>
</template>

<script>
<<<<<<< HEAD
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
=======
	import {
		getHomeLunbo
	} from '@/api/homeApi.js';
	import specialBanner from '../../components/EtherealWheat-banner/specialBanner.vue'
	export default {
		data() {
			return {
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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				bannerList: [{
					picture: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png',
					title: '七夕将至：时光足够久，韧性也能炖出味',
					description: '一万年太久，就现在，给你爱',
					path: ''
				}, {
					picture: 'http://image.mishi.cn/r/yry_h5_test/detail/2_1535359240426.png',
					title: '新菜上架：无边海洋，找到顺眼的那尾鱼',
					description: '花中樱，鱼乃鲷花中樱，鱼乃鲷',
					path: ''
				}, {
					picture: 'http://image.mishi.cn/r/yry_h5_test/detail/1_1535359204228.png',
					title: '在湘西的烟火气里，发现苗族少女的神明',
					description: '取材自湘西苗族传统的烟熏文化',
					path: ''
				}, {
					picture: 'http://image.mishi.cn/r/yry_h5_test/detail/4_1535359327213.png',
					title: '福利降临，陪伴独自行走的丰盛旅程',
					description: '在自己的小世界里，日日好日，夜夜好清宵',
					path: ''
				}],
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
			// 轮播图
			async getLunboDate() {
				var {
					data
				} = await getHomeLunbo();
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
				this.topicList = data.topicList
			},
			//商品详情
			sunnewGood(id) {
				console.log(id)
				uni.navigateTo({
					url: "../goods/goods?id=" + id

				})

			},
		},
		created() {
			this.getLunboDate();
		},
		components:{
			"special-banner" :specialBanner 
		}
		
	}
</script>

<style lang="scss" scoped>
	.indexBox {
		background-color: #F4F4F4;
		height: 20000rpx;

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

			// background-color: red;
			.swiper {
				height: 400rpx;

				// width: 100%;
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
			width: 690rpx;
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
					width: 320rpx;
					height: 35rpx;
					font-size: 30rpx;
					color: #333;
					margin-bottom: 14rpx;
				}

				.price {
					display: block;
					text-align: center;
					line-height: 30rpx;
					font-size: 30rpx;
					color: red;

					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
				// background-color: blue;
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

					.title {
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
>>>>>>> dev
	}
</style>
