<template>
	<view class="goods_container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper">
			<swiper-item class="swiper_item" v-for="(item,index) in gallery" :key="index" @click="swiperImgInfo(index)">
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
					<text>{{brand.name}}</text>
				</view>
			</view>
		</view>

		<!-- 请选择规格数量 -->
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
						<image :src="item.pic_url" mode="" @click="getCommentImg(index)"></image>
					</block>
				</view>
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
			<image v-for="(itme,index) in goodsDesc" :key='index' :src="itme" mode="widthFix" @click="imgInfo(goodsDesc,index)"></image>
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
		
		<!-- 底部tabbar -->
		<view class="bottom-btn">
			<view class="btn_left" @click="addCannelCollect">
				<image v-if="userHasCollect == 0" class="icon" src="../../static/images/icon_collect.png" mode=""></image>
				<image v-else src="../../static/images/icon_collect_checked.png" class="icon" mode=""></image>
			</view>

			<view class="btn_left">
				<text class="cart-count">{{cartGoodsCount}}</text>
				<image @click="openCartPage" class="icon" src="../../static/images/ic_menu_shoping_nor.png" mode=""></image>
			</view>

			<view class="btn_right" @click="showShare">
				分享
			</view>
			<view class="btn_right addCart" @click="addToCart">
				加入购物车
			</view>
		</view>
		
		<!-- 分享 -->
		<view class="share" :class="isShowShare ? 'share_show' : '' " @click="showShare">
			<view class="share_box" :class="isShowShare ? 'share_box_show' : '' ">
				<button type="default" class="share_item" open-type="share">
					<image src="../../static/images/wechat.png" mode=""></image>
					<view class="text">分享好友</view>
				</button>
				<button type="default" class="share_item" @click="eventDraw">
					<image src="../../static/images/circleOfFriends.png" mode=""></image>
					<view class="text">生成海报</view>
				</button>
			</view>
		</view>
		
		
		<view class="poster" :class="isShowPoster ? 'poster_show' : '' ">
				<image class="close" src="../../static/images/close1.png" mode="" @click="isShowPoster = false"></image>
				<image :src="shareImage" class="share-image" mode="aspectFit"></image>
				<canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage" />
				<button @click="eventSave" class="keep">保存到本地</button>
		</view>
		
		
		<!-- 选规格 -->
		<view class="attr-pop-box" :class="isShowDetail ? 'attr-pop-box_show' : 'attr-pop-box' ">
			<view class="attr-pop" :class="isShowDetail ? 'attr_pop_show' : 'attr-pop'">
				<view class="close" @click="isShowDetail = false">
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
							<view class="value" :class="item1.selected ? 'value_active' : '' " v-for="(item1,index1) in item.valueList" :key="index1"
							 :data-select1="index" :data-select2="index1" @click="clickSkuValue">
								{{item1.value}}
							</view>
						</view>

					</view>

					<!-- 数量 -->
					<view class="number-item">
						<view class="name">数量</view>
						<u-number-box :max="10" :min="1" v-model="number"></u-number-box>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uDivider from '@/uview-ui/components/u-divider/u-divider.vue'
	import {
		getGoodsDeatil,
		getGoodsRelated,
		addOrCannelCollect,
		getCartGoodsCount,
		addCart
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
				checkedSpecText: ['请选择规格数量'],
				specificationList: [], //规格列表
				isShowDetail: false,
				isShowShare: false,
				isShowPoster: false,
				number: 1, //加购数量
				painting: {},
				shareImage: '',
				userInfo: ''

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
			getPreviewImage(arr,imgIndex){
				uni.previewImage({
					urls: arr,
					current: arr[imgIndex],
				})
			},
			// 轮播图图片预览
			swiperImgInfo(imgIndex) {
				var arr = this.gallery.map(item => {
					return item.img_url;
				})
				this.getPreviewImage(arr,imgIndex);
			},
			// 商品详情图片预览
			imgInfo(imgIndex) {
				this.getPreviewImage(this.goodsDesc,imgIndex);
			},
			// 评论图片预览
			getCommentImg(imgIndex) {
				const arr = this.comment.data.pic_list.map(item => {
					return item.pic_url
				})
				this.getPreviewImage(arr,imgIndex);
			},
			
			// 获取大家都在看
			async getGoodsRelatedInfo() {
				const res = await getGoodsRelated({
					id: this.$data.id
				});
				if (res.errno == 0) {
					this.relatedGoods = res.data.goodsList
				}
			},
			// 点击商品跳转到另一个商品详情页
			goGoodsDeatil(goodsId) {
				uni.navigateTo({
					url: `/pages/goods/goods?id=${goodsId}`
				})
			},
			// 点击购物车图标跳转到购物车页面
			openCartPage() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			// 跳转到查看全部评价的页面
			goCommentAll() {
				uni.navigateTo({
					url: `/pages/comment/comment?valueId=${this.$data.id}&typeId=0`
				})
			},
			// 点击前往品牌详情页面
			goBrandDetail() {
				uni.navigateTo({
					url: `/pages/brandDetail/brandDetail?id=${this.brand.id}`
				})
			},
			// 收藏或取消收藏
			async addCannelCollect() {
				const res = await addOrCannelCollect({
					typeId: 0,
					valueId: this.$data.id
				});
				if (res.errno == 0) {
					res.data.type === 'delete' ? (this.userHasCollect = 0) : (this.userHasCollect = 1)
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
				if (res.errno == 0) {
					this.cartGoodsCount = res.data.cartTotal.goodsCount;
				}
			},
			clickSkuValue(e) {
				const index1 = e.currentTarget.dataset.select1;
				const index2 = e.currentTarget.dataset.select2;
				const specificationList = this.specificationList;

				if (specificationList[index1].valueList[index2].selected) {
					specificationList[index1].valueList[index2].selected = false;
				} else {
					specificationList[index1].valueList.forEach(ele => {
						ele.selected = false;
					})
					specificationList[index1].valueList[index2].selected = true;
				}
				this.specificationList = specificationList;

				// 实现页面强制刷新
				this.$forceUpdate();
				this.checkedSpecText = this.getCheckedSpecValue()
				// this.getCheckedSpecValue()

			},
			// 判断是否漏选规格
			skuCanSubmit() {
				const specificationList = this.specificationList;
				let canSubmit = true;
				if (specificationList) {
					specificationList.forEach(item => {
						const selected = item.valueList.find(ele => {
							return ele.selected
						})

						if (!selected) {
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
						nameId: item.specification_id,
						valueId: 0,
						valueText: ''
					}

					item.valueList.forEach(ele => {
						if (ele.selected) {
							_checkedObj.valueId = ele.id;
							_checkedObj.valueText = ele.value;
						}
					})

					checkedValues.push(_checkedObj)
				})
				return checkedValues;

			},
			getCheckedSpecKey() {
				let checkedValue = this.getCheckedSpecValue().map(function(v) {
					return v.valueId;
				});
				return checkedValue.join('_');
			},
			// 判断是否有库存
			getCheckedProductItem(key) {

				return this.productList.filter((item) => {
					if (item.goods_specification_ids == key) {
						return true;
					} else {
						return false;
					}
				})
			},
			// 开启规格
			openDetail() {
				this.isShowDetail = true;
				if (this.specificationList.length <= 0) {
					this.checkedSpecText = [{
						nameId: '',
						valueId: 0,
						valueText: '请选择数量'
					}]
				} else {
					this.checkedSpecText = [{
						nameId: '',
						valueId: 0,
						valueText: '请选择规格数量'
					}]
				}
			},
			// 加入购物车
			async addToCart() {
				this.isShowShare = false;  //关闭分享
				// 判断是否打开规格页面
				if (!this.isShowDetail) {
					this.openDetail()
					return;
				}

				// 判断是否漏选规格，如果该商品没有规格可选返回true
				if (!this.skuCanSubmit()) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					})
					return;
				}

				// 根据选中规格判断是否有sku信息,如果该商品没有规格可选返回true
				let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
				if (!checkedProduct || checkedProduct.length <= 0) {
					uni.showToast({
						title: '库存不足',
						icon: 'none',
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
				if(res.errno == 0) {
					uni.showToast({
						title: '加购成功'
					})
				}else {
					uni.showToast({
						title: res.errmsg,
						icon: 'none'
					})
				}
				this.isShowDetail = !this.isShowDetail;
				// 刷新购物车数量
				this.getCartGoodsNumber()
			},
			// 点击分享
			showShare() {
				this.isShowShare = !this.isShowShare
				this.isShowDetail = false;
			},

			// 生成海报
			eventDraw() {
				if (this.userInfo === '') {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				} else {
					this.isShowPoster = true;
					uni.showLoading({
						title: '绘制分享图片中',
						mask: true
					})

					this.painting = {
						width: 375,
						height: 555,
						clear: true,
						views: [
							// 背景图
							{
								type: 'image',
								url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2446485085,2752527560&fm=26&gp=0.jpg',
								top: 0,
								left: 0,
								width: 375,
								height: 555
							},

							// 头像
							{
								type: 'image',
								url: this.userInfo.avatar,
								top: 38,
								left: 38.5,
								width: 42,
								height: 42
							},
							// 头像外层的镂空圆形
							{
								type: 'image',
								url: '../../static/images/cc-dot-o.png',
								top: 0,
								left: 0,
								width: 118,
								height: 118
							},
							// 头像外层的镂空圆形
							{
								type: 'image',
								url: '../../static/images/cc-dot-o.png',
								top: 0,
								left: 0,
								width: 119,
								height: 119
							},
							// 用户名
							{
								type: 'text',
								content: this.userInfo.nickname,
								fontSize: 16,
								color: '#000',
								textAlign: 'left',
								top: 33,
								left: 96,
								bolder: true
							},
							{
								type: 'text',
								content: '分享给你一件好货',
								fontSize: 15,
								color: '#000',
								textAlign: 'left',
								top: 59.5,
								left: 96
							},
							// 商品图片
							{
								type: 'image',
								url: this.gallery[0].img_url,
								top: 136,
								left: 42.5,
								width: 290,
								height: 290
							},

							// 商品标题
							{
								type: 'text',
								content: this.goods.name,
								fontSize: 16,
								lineHeight: 21,
								color: '#383549',
								textAlign: 'left',
								top: 450,
								left: 29,
								width: 200,
								MaxLineNumber: 2,
								breakWord: true,
								bolder: true
							},
							// 商品价格
							{
								type: 'text',
								content: '￥' + this.goods.retail_price,
								fontSize: 24,
								color: '#E62004',
								textAlign: 'left',
								top: 490,
								left: 29,
								bolder: true
							},

							// 二维码图片
							// {
							// 	type: 'image',
							// 	url: 'http://yanxuan.nosdn.127.net/767b370d07f3973500db54900bcbd2a7.png',
							// 	top: 424,
							// 	left: 270,
							// 	width: 100,
							// 	height: 100,

							// },
							// {
							// 	type: 'text',
							// 	content: '长按识别二维码 或者发送给好友',
							// 	fontSize: 12,
							// 	color: '#ccc',
							// 	textAlign: 'left',
							// 	top: 520,
							// 	left: 280,
							// 	lineHeight: 20,
							// 	MaxLineNumber: 2,
							// 	breakWord: true,
							// 	width: 86
							// }
						]
					}
				}
			},
			eventSave() {
				uni.saveImageToPhotosAlbum({
					filePath: this.shareImage,
					success(res) {
						uni.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
				setTimeout(()=> {
					this.isShowPoster = false;
				},1000)
				
			},
			eventGetImage(event) {
				uni.hideLoading()
				// const { tempFilePath, errMsg } = event.detail
				const result = event.detail.__args__
				const tempFilePath = result[0].tempFilePath
				const errMsg = result[0].errMsg
				if (errMsg === 'canvasdrawer:ok') {
					this.shareImage = tempFilePath
					this.painting = {}
				}
			}

		},
		// 分享好友
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === 'button') { // 来自页面内分享按钮  
				console.log(res.target)
			}
			return {
				title: this.goods.name,
				path: `pages/goods/goods?id=${this.$data.id}`,
				success(resp) {
					console.log(resp)
				}
			}
		},
		onLoad(options) {
			// 模拟商品id
			// this.$data.id = '1181000';
			this.$data.id = options.id;
			
			this.getGoodsInfo();
			this.getGoodsRelatedInfo()
			this.getCartGoodsNumber()

			const users = uni.getStorageSync('userInfo');
			if (users) {
				this.userInfo = JSON.parse(users)
			}
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
					border-right: 1px solid #f4f4f4;
					border-bottom: 1px solid #f4f4f4;

					image {
						width: 310rpx;
						height: 310rpx;
					}

					.name {
						width: 100%;
						font-size: 30rpx;
						color: #333;
						text-align: center;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
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

		.share {
			position: fixed;
			background: rgba(0, 0, 0, .5);
			z-index: 8;

			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: none;

			.share_box {

				width: 100%;
				height: auto;
				max-height: 780rpx;
				padding: 31.25rpx;
				background: #fff;
				position: fixed;
				z-index: 9;
				bottom: 100rpx;
				display: none;



				.share_item {
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: #fff;

					.text {
						font-size: 24rpx;
					}
				}

				.share_item::after {
					border: none;
				}

				image {
					width: 48rpx;
					height: 48rpx;
					// margin-bottom: 10rpx;
				}
			}

			// 显示规格
			.share_box_show {
				display: flex;
				justify-content: space-around;
				animation: fadeIn 0.3s linear;
			}
		}

		.share_show {
			display: block;
		}

		.poster {
			position: fixed;
			background: rgba(0, 0, 0, .5);
			z-index: 8;

			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: none;

			.close {
				position: absolute;
				top: 20rpx;
				right: 35rpx;
				width: 48rpx;
				height: 48rpx;
			}
			.share-image {
				margin-top: 80rpx;
				width: 100%;
				height: 70%;

			}
			
			

			.keep {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 70%;
				height: 80rpx;
				margin-top: 20rpx;
				border-radius: 40rpx;
				background-color: #b4282d;
				color: #fff;
				font-size: 24rpx;

			}
		}

		.poster_show {
			display: block;
			// display: flex;
			// flex-direction: column;
			// align-items: center;
		}

		.attr-pop-box {

			position: fixed;
			background: rgba(0, 0, 0, .5);
			z-index: 8;

			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: none;

			// 隐藏规格
			.attr-pop {
				width: 100%;
				height: auto;
				max-height: 780rpx;
				padding: 31.25rpx;
				background: #fff;
				position: fixed;
				z-index: 9;
				bottom: 100rpx;
				display: none;

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
								position: inline-block;
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

			// 显示规格
			.attr_pop_show {
				display: block;
				animation: fadeIn 0.3s linear;
			}

			@keyframes fadeIn {
				0% {
					opacity: 0;
					transform: translateY(100rpx);
				}

				100% {
					opacity: 1;
					transform: translateY(0);
				}
			}

		}

		// 显示遮盖层
		.attr-pop-box_show {
			display: block;
		}

		// @keyframes fadeOut {
		// 	100% {
		// 		bottom: -100%;
		// 		transform: translateY(-400rpx);
		// 	}
		// }

	}
</style>
