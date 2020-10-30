<template>
	<view>
		<!-- 状态栏 -->
		<view class="header" :style="{position:headerPosition}">
			<view class="addr">
				<view class="icon location"></view>{{city}}
			</view>
			<view class="search">
				<navigator url="../search/search">
					<view class="searchBox">
						<image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png"
						 mode=""></image>
						<!-- 动态数量 -->
						<text class="text">商品搜索，共 {{ goodCount }} 款好物</text>
					</view>
				</navigator>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(item,index) in categoryList" :key="item.id" :class="[index==showCategoryIndex?'on':'']"
				 @tap="showCategory(index,item.id)">
					<view class="text">
						<view class="block"></view>
						{{item.name}}
					</view>
				</view>

			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category">
					<view class="banner">
						<image :src="subCategoryList.wap_banner_url"></image>
						<view class="txt">{{subCategoryList.front_name}}</view>
					</view>
					<view class="hd">
						<text class="line"></text>
						<text class="txt">{{subCategoryList.name}}分类</text>
						<text class="line"></text>
					</view>
					<view class="list">
						<view class="box" v-for="(box,i) in subCategoryList.subCategoryList" :key="i" @tap="toCategory(box,i)">
							<image :src="box.wap_banner_url"></image>
							<view class="text">{{box.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	import amap from '@/common/SDK/amap-wx.js';
	import {
		getCatalog,
		getClassifyData
	} from '@/api/catalogApi.js'
	import {
		getGoodsCounts
	} from '@/api/homeApi.js';
	export default {
		data() {
			return {
				goodCount: [],
				showCategoryIndex: 0,
				headerPosition: "fixed",
				city: "北京",
				//分类列表
				categoryList: [],
				subCategoryList: []
			}
		},

		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: '7c235a9ac4e25e482614c6b8eac6fd8e'
			});
			//定位地址
			this.amapPlugin.getRegeo({
				success: (data) => {
					this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
				}
			});
		},
		methods: {
			//搜索显示总商品个数
			async getGoodsCountsData() {
				var data = await getGoodsCounts();
				this.goodCount = data.data.goodsCount;
			},
			//获取一二级分类列表
			async getClassify() {
				var data = await getCatalog();
				this.categoryList = data.data.categoryList;
				this.subCategoryList = data.data.currentCategory
				// console.log(data)
			},
			//分类切换显示
			async showCategory(index, id) {
				this.showCategoryIndex = index;
				var data = await getClassifyData(id);
				this.subCategoryList = data.data.currentCategory;
				// console.log(data)
			},
			//跳转到商品三级分类列表
			toCategory(e, index) {
				uni.setStorageSync('catName', e.name);
				// console.log(index)
				uni.navigateTo({
					url: '../category/category?id=' + e.id + '&index=' + index,
				});
			},
		},
		created() {
			this.getClassify();
			this.getGoodsCountsData()
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

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
				width: 580rpx;
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


	}

	.place {

		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			// position: absolute;
			display: flex;
			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;

			.category {

				width: 94%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}

					.txt {
						position: absolute;
						top: 30rpx;
						text-align: center;
						color: #fff;
						font-size: 28rpx;
						left: 0;
						height: 192rpx;
						line-height: 192rpx;
						width: 100%;
					}
				}

				.list {
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.box {
						height: 216rpx;
						width: 144rpx;
						margin-bottom: 20upx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						flex-wrap: nowrap;
						margin-left: 20rpx;

						image {
							height: 144rpx;
							width: 144rpx;
						}

						.txt {
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}

		.hd {
			height: 108rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.txt {
				font-size: 24rpx;
				text-align: center;
				color: #333;
				padding: 0 10rpx;
				width: auto;
			}

			.line {
				width: 40rpx;
				height: 1px;
				background: #d9d9d9;
			}
		}
	}
</style>
