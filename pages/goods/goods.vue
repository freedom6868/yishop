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
				<view class="brand" v-if="brand.name" @click="goBrandDetail">
					<!-- <navigator url=""> -->
					<text>{{brand.name}}</text>
					<!-- </navigator> -->
				</view>
			</view>
		</view>

		<!-- 选规格 -->
		<view class=" section-nav" @click="openDetail">
			<text class="left">请选择规格数量</text>
			<image src="../../static/images/address_right.png" mode="" class="img_size right"></image>
		</view>

		<!-- 评价 -->
		<view class="comments" v-if="comment.count > 0">
			<view class="title left">
				<text>评价({{comment.count > 999 ? '999+' : comment.count}})</text>

				<view class="check_all right" @click="goCommentAll">
					<text>查看全部</text>
					<image src="../../static/images/address_right.png" class="img_size" mode=""></image>
				</view>
			</view>
			<view class="matter left">
				<!-- <view class="item"> -->
				<view class="info">
					<view class="user">
						<image :src="comment.data.avatar" class="img" mode=""></image>
						<text>{{comment.data.nickname}}</text>
					</view>
					<view class="time right">
						{{comment.data.add_time}}
					</view>
				</view>
				<view class="content">{{comment.data.content}}</view>
				<view class="imgs" v-if="comment.data.pic_list.length > 0">
					<block v-for="(item,index) in comment.data.pic_list" :key='index'>
						<image :src="item.pic_url" mode=""></image>
					</block>

				</view>
				<!-- </view> -->
			</view>
		</view>

		<!-- 商品参数 -->
		<view class="goods_attr">
			<view class="attr_title left">商品参数</view>
			<view class="attr_content left">
				<view class="item" v-for="(item,index) in attribute" :key='index'>
					<view class="l">{{item.name}}</view>
					<view class="r">{{item.value}}</view>
				</view>
			</view>
		</view>

		<view class="goods_desc" v-if="goodsDesc">
			<image v-for="(itme,index) in goodsDesc" :key='index' :src="itme" mode="widthFix" @click="imgInfo(index)"></image>
		</view>

		<!-- 常见问题 -->
		<view class="common-problem">
			<view class="problem">
				<u-divider>常见问题</u-divider>
			</view>
			<view class="problem_content">
				<view class="problem_item" v-for="(item,index) in issueList" :key="index">
					<view class="question_box">
						<text class="dot"></text>
						<text class="question">{{item.question}}</text>
					</view>
					<view class="answer">{{item.answer}}</view>
				</view>
			</view>
		</view>

		<!-- 大家都在看 -->
		<view class="related_goods" v-if="relatedGoods.length > 0">
			<view class="related_goods_title">
				<u-divider>大家都在看</u-divider>
			</view>
			<view class="related_goods_list">
				<view class="related_goods_item" v-for="(item,index) in relatedGoods" :key="index" @click="goGoodsDeatil(item.id)">
					<image :src="item.list_pic_url"></image>
					<text class="name">{{item.name}}</text>
					<text class="price">￥{{item.retail_price}}</text>
				</view>

			</view>
		</view>
		<view class="bottom-btn">
			<view class="btn_left" @click="addCannelCollect">
				<image v-if="userHasCollect == 0" class="icon" src="../../static/images/icon_collect.png" mode=""></image>
				<image v-else src="../../static/images/icon_collect_checked.png" class="icon" mode=""></image>
			</view>

			<view class="btn_left">
				<text class="cart-count">{{cartGoodsCount}}</text>
				<image @click="openCartPage" class="icon" src="../../static/images/ic_menu_shoping_nor.png" mode=""></image>
			</view>

			<view class="btn_right">
				立即购买
			</view>
			<view class="btn_right addCart" @click="addToCart">
				加入购物车
			</view>
		</view>

		<!-- 选规格 -->
		<view class="attr-pop-box" v-if="isShowDetail">
			<view class="attr-pop">
				<view class="close" @click="closeDetail">
					<image src="../../static/images/close.png" mode=""></image>
				</view>
				<view class="img-info">
					<image :src="gallery[0].img_url" mode=""></image>
					<view class="info">
						<view class="conent">
							<view class="price">
								价格：￥{{goods.retail_price}}
							</view>
							<view class="choose">
								已选择：<text v-for="(item,index) in checkedSpecText" :key="index">{{item.valueText}} </text> 
							</view>
						</view>
					</view>
				</view>
				<view class="spec-con">
					<view class="spec-item" v-for="(item,index) in specificationList" :key="index">
						<view class="name">{{item.name}}</view>
						<view class="values">
							<view class="value" :class="item1.selected ? 'value_active' : '' "  v-for="(item1,index1) in item.valueList" :key="index1" :data-select1="index" :data-select2="index1" @click="clickSkuValue">
								{{item1.value}}
							</view>
						</view>

					</view>

					<!-- 数量 -->
					<view class="number-item">
						<view class="name">数量</view>
						<u-number-box :min="1" v-model="number"  @change="valChange()"></u-number-box>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uDivider from '../../uview-ui/components/u-divider/u-divider.vue'
	import {
		getGoodsDeatil,
		getGoodsRelated,
		addOrCannelCollect,
		getCartGoodsCount,
		addCart,
		getCart
	} from '@/api/goodsApi.js';
	export default {
		data() {
			return {
				gallery: '', //轮播图
				goods: '',
				brand: '', //品牌
				comment: '', //评价
				attribute: '', //商品参数
				goodsDesc: '', //
				issueList: [], //常见问题
				relatedGoods: [], //大家都在看列表
				productList: [], //规格库存数组
				userHasCollect: 0, //是否为收藏
				cartGoodsCount: 0, //购物车商品数量
				gallery: [], //商品规格图片
				checkedSpecText: [],
				specificationList: [], //规格列表
				isShowDetail: false,
				number: 1, //加购数量

			}
		},
		components: {
			"u-divider": uDivider
		},
		methods: {
			async getGoodsInfo() {
				const res = await getGoodsDeatil({
					id: this.$data.id
				})
				// console.log("商品详情：", res)
				if (res.errno === 0) {
					this.gallery = res.data.gallery; //轮播图
					this.goods = res.data.info;
					this.brand = res.data.brand; //品牌
					this.comment = res.data.comment;
					this.attribute = res.data.attribute;
					this.goodsDesc = res.data.info.goods_desc;
					this.issueList = res.data.issue; //常见问题
					this.userHasCollect = res.data.userHasCollect; //是否为收藏0/1
					this.gallery = res.data.gallery; //规格显示图片
					this.specificationList = res.data.specificationList; //规格列表
					this.productList = res.data.productList;
				}
				console.log("规格：",this.specificationList)
				this.getImage()
			},
			getImage() {
				let reg = /<img.*?src="(.*?)".*?\/?>/gi;
				let img = this.goodsDesc;
				let data = '';
				let result = [];
				while (data = reg.exec(img)) {
					result.push(data[1])
				}
				this.goodsDesc = result;
			},
			// 图片预览
			imgInfo(imgIndex) {
				// console.log(this.goodsDesc[imgIndex])
				uni.previewImage({
					urls: this.goodsDesc,
					current: this.goodsDesc[imgIndex],
				})
			},
			// 获取大家都在看
			async getGoodsRelatedInfo() {
				const res = await getGoodsRelated({
					id: this.$data.id
				});
				// console.log(res.data.goodsList)
				if (res.errno == 0) {
					this.relatedGoods = res.data.goodsList
				}
			},
			// 点击商品跳转到另一个商品详情页
			goGoodsDeatil(goodsId) {
				uni.navigateTo({
					url: `../goods/goods?id=${goodsId}`

				})
			},
			// 点击购物车图标跳转到购物车页面
			openCartPage() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			// 跳转到查看全部评价的页面
			goCommentAll() {
				uni.navigateTo({
					url: `../comment/comment?valueId=${this.$data.id}&typeId=0`
				})
			},
			// 点击前往品牌详情页面
			goBrandDetail() {
				uni.navigateTo({
					url: `../brandDetail/brandDetail?id=${this.brand.id}`
				})
			},
			// 收藏或取消收藏，获取商品id默认查看是否收藏，此处用在点击收藏事件
			async addCannelCollect() {
				const res = await addOrCannelCollect({
					typeId: 0,
					valueId: this.$data.id
				});
				// console.log("收藏：", res)
				if (res.errno == 0) {
					if (res.data.type === 'delete') {
						this.userHasCollect = 0
					} else if (res.data.type === 'add') {
						this.userHasCollect = 1
					}
				} else {
					uni.showToast({
						title: res.errmsg,
						icon: 'none'
					})
				}
			},
			// 获取购物车商品件数
			async getCartGoodsNumber() {
				const res = await getCartGoodsCount();
				// console.log("购物车总数：", res)
				if (res.errno == 0) {
					this.cartGoodsCount = res.data.cartTotal.goodsCount;
				}
			},
			
			// 获取选择的规格，前提该商品要有规格
			clickSkuValue(e) {
				const index1 = e.currentTarget.dataset.select1;
				const index2 = e.currentTarget.dataset.select2;
				const specificationList = this.specificationList;
				
				if(specificationList[index1].valueList[index2].selected) {
					specificationList[index1].valueList[index2].selected = false;
				}else {
					specificationList[index1].valueList.forEach(ele => {
						ele.selected = false;
					})
					specificationList[index1].valueList[index2].selected = true;
				}
				this.specificationList = specificationList;
				
				// 实现页面刷新
				this.isShowDetail = false;
				this.isShowDetail = true;
				this.checkedSpecText = this.getCheckedSpecValue()
				
			},
			// 判断是否漏选规格
			skuCanSubmit() {
				const specificationList = this.specificationList;
				let canSubmit = true;
				if(specificationList) {
					specificationList.forEach(item => {
						const selected = item.valueList.find(ele => {
							return ele.selected
						})
						
						if(!selected) {
							canSubmit = false;
						}
					})
				}
				return canSubmit;
			},
			// 实现页面刷新
			getCheckedSpecValue() {
				let checkedValues = [];
				let _specificationList = this.specificationList;
				
				_specificationList.forEach(item => {
					let _checkedObj = {
						nameId : item.specification_id,
						valueId: 0,
						valueText: ''
					}
					
					item.valueList.forEach(ele => {
						if(ele.selected){
							_checkedObj.valueId = ele.id;
							_checkedObj.valueText = ele.value;
						}
					})
					
					checkedValues.push(_checkedObj)
				})
				
				return checkedValues;
				
			},
			getCheckedSpecKey() {
				let checkedValue = this.getCheckedSpecValue().map(function (v) {
				  return v.valueId;
				});
				return checkedValue.join('_');
			},
			
			getCheckedProductItem(key) {
				return this.productList.filter( (item) => {
					if(item.goods_specification_ids == key) {
						return true;
					}else {
						return false;
					}
				})
			},
			// 进步器
			valChange(e) {
				this.number = e.value;
				// console.log(this.value)
			},
			// 关闭规格
			closeDetail() {
				this.isShowDetail = false;
			},
			// 开启规格
			openDetail() {
				this.isShowDetail = true;
				// console.log(this.specificationList.length)
				if(this.specificationList.length <= 0) {
					this.checkedSpecText = [{
						nameId : '',
						valueId: 0,
						valueText: '请选择数量'
					}]
				}else {
					this.checkedSpecText = [{
						nameId : '',
						valueId: 0,
						valueText: '请选择规格数量'
					}]
				}
			},
			// 加入购物车
			async addToCart() {
				
				// 判断是否打开规格页面
				if(!this.isShowDetail) {
					this.openDetail()
					return;
				}
				
				// 判断是否选择完整规格，如果该商品没有规格可选返回true
				if(!this.skuCanSubmit()) {
					uni.showToast({
						title:'请选择规格',
						icon:'none'
					})
					return;
				}
				
				// 根据选中规格判断是否有sku信息,如果该商品没有规格可选返回true
				let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
				console.log("商品规格：",checkedProduct)
				if(!checkedProduct || checkedProduct.length <= 0) {
					uni.showToast({
						title:'库存不足',
						icon:'none',
						mask: true
					})
					return;
				}
				
				// 验证库存
				if (checkedProduct[0].goods_number < this.number) {
					//找不到对应的product信息，提示没有库存
					uni.showToast({
					  title: '库存不足',
					  icon: 'none',
					  mask: true
					});
					return false;
				}
				
				const res = await addCart({
					goodsId: this.goods.id,
					number: this.number,
					productId: checkedProduct[0].id
				})
				console.log("加入购物车：",res)
				if(res.errno == 0) {
					uni.showToast({
						title:'添加成功'
					})
					
				}else {
					uni.showToast({
						title:res.errmsg,
						icon: 'none'
					})
				}
				this.isShowDetail = !this.isShowDetail;
				this.getCartGoodsNumber()
				console.log("加入购物车")
			},
			

		},
		onLoad(options) {
			// 模拟商品id
			this.$data.id = options.id;
			// this.$data.id = '1181000';
			this.getGoodsInfo();
			this.getGoodsRelatedInfo()
			this.getCartGoodsNumber()
			
		}
	}
</script>

<style lang="scss" scoped>
	* {
		position: relative;
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
				border-bottom: 1px solid #f4f4f4;

				.check_all {
					display: flex;
					align-items: center;
				}
			}

			.matter {
				// display: flex;

				.info {
					// height: 127rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 33rpx 0 27rpx 0;

					.user {
						display: flex;
						align-items: center;

						.img {
							width: 66rpx;
							height: 66rpx;
							border-radius: 50%;
							margin-right: 17rpx;
						}
					}



					.time {
						color: #7f7f7f;
						font-size: 25rpx;
					}


				}

				.content {
					font-size: 29rpx;
					margin-bottom: 24rpx;
				}

				.imgs {
					margin-bottom: 25rpx;

					image {
						height: 150rpx;
						width: 150rpx;
						margin-right: 28rpx;
					}
				}

			}
		}

		// 商品参数
		.goods_attr {
			background-color: #fff;

			.attr_title {
				height: 104rpx;
				line-height: 104rpx;
				font-size: 38.5rpx;
			}

			.attr_content {

				.item {
					display: flex;
					align-items: center;
					width: 687.5rpx;
					height: 68rpx;
					padding: 11rpx 20rpx;
					margin-bottom: 11rpx;
					background: #f7f7f7;
					font-size: 38.5rpx;

					.l {
						float: left;
						font-size: 25rpx;
						width: 134rpx;
						height: 45rpx;
						line-height: 45rpx;
						overflow: hidden;
						color: #999;
					}

					.r {
						float: left;
						font-size: 36.5rpx;
						margin-left: 20rpx;
						width: 480rpx;
						height: 45rpx;
						line-height: 45rpx;
						overflow: hidden;
						color: #333;
					}
				}
			}


		}

		// 商品详情图片
		.goods_desc {
			width: 100%;
			// height: 100%;

			image {
				width: 100%;
				height: 100%;
				vertical-align: bottom;
			}
		}

		// 常见问题
		.common-problem {
			background: #fff;

			.problem {
				padding: 56.25rpx 0;
			}

			.problem_content {
				margin-left: 15rpx;

				.problem_item {
					padding: 0 15rpx 15rpx 15rpx;

					.question_box {
						display: flex;
						align-items: center;
						padding-bottom: 6rpx;

						.dot {
							display: block;
							width: 8rpx;
							height: 8rpx;
							border-radius: 50%;
							background: #b4282d;
							margin-right: 10rpx;
						}
					}

					.answer {
						padding-left: 16rpx;
						font-size: 26rpx;
						color: #787878;
					}
				}
			}

		}

		// 大家都在看
		.related_goods {
			background: #fff;
			margin-bottom: 100rpx;

			.related_goods_title {
				padding: 56.25rpx 0;
			}

			.related_goods_list {
				display: flex;
				flex-wrap: wrap;
				border-top: 1px solid #f4f4f4;

				.related_goods_item {
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

		// 底部栏
		.bottom-btn {
			display: flex;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9;

			width: 100%;
			height: 100rpx;
			border-top: 1px solid #f4f4f4;
			background-color: #fff;



			.btn_left {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				width: 162rpx;
				height: 100%;

				border-right: 1px solid #f4f4f4;


				.icon {
					width: 44rpx;
					height: 44rpx;
				}

				.cart-count {
					position: absolute;
					right: 40rpx;
					top: 16rpx;
					font-size: 22rpx;

					width: 28rpx;
					height: 28rpx;
					line-height: 28rpx;
					text-align: center;
					border-radius: 50%;
					color: #fff;
					background: #b4282d;
				}
			}

			.btn_right {
				display: flex;
				justify-content: center;
				align-items: center;

				height: 100%;
				// border: 1rpx solid #f4f4f4;
				flex: 1;
			}

			.addCart {
				color: #fff;
				background: #b4282d;
			}
		}

		.attr-pop-box {
			width: 100%;
			height: 100%;

			position: fixed;
			background: rgba(0, 0, 0, .5);
			z-index: 8;
			bottom: 0;

			.attr-pop {
				width: 100%;
				height: auto;
				max-height: 780rpx;
				padding: 31.25rpx;
				background: #fff;
				position: fixed;
				z-index: 9;
				bottom: 100rpx;

				.close {
					position: absolute;
					width: 48rpx;
					height: 48rpx;
					right: 31.25rpx;
					overflow: hidden;
					top: 31.25rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.img-info {
					display: flex;
					margin-bottom: 41.5rpx;

					image {
						// float: left;
						height: 177rpx;
						width: 177rpx;
						// background: #f4f4f4;
						margin-right: 31.25rpx;
					}

					.info {
						display: flex;
						justify-content: center;
						align-items: center;

						.price {
							font-size: 33rpx;
							margin-bottom: 10rpx;
						}

						.choose {
							font-size: 29rpx;
							
							text {
								position:inline-block;
								margin-right: 16rpx;
							}
						}
					}
				}

				.spec-con {
					.name {
						margin-bottom: 22rpx;
						font-size: 29rpx;
						color: #333;
					}

					.spec-item {


						.values {
							display: flex;
							margin-bottom: 31.25rpx;

							.value {
								padding: 14rpx 35rpx;
								margin-right: 25rpx;
								margin-bottom: 16.5rpx;
								border: 1px solid #333;
								font-size: 25rpx;
								color: #333;
							}
							
							.value_active {
								color: #b4282d;
								border: 1px solid #b4282d;
							}
						}
					}

					.number-item {
						.number {
							padding: 10rpx;
						}
					}
				}
			}
		}


	}
</style>
