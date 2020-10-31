<template>
	<view class="content">

		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)"
			 @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>

		</view>
		<view class="search-keyword" v-if="hasGoods">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<block v-for="(row,index) in keywordList" :key="keywordList">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="keyword-text" @click="getgoodData" :data-rowIndex=index>
							<rich-text :nodes="row"></rich-text>
						</view>
						<!-- 模糊查询 -->
						<view class="keyword-img" @tap.stop="setKeyword(keywordList[index].keyword)">
							<image src="/static/HM-search/back.png"></image>
						</view>
					</view>
				</block>

			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>


				<!-- 历史搜索 -->
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>

				<!-- 热门搜索 -->
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword.keyword)" :key="index">{{keyword.keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="haveGoods" v-else>
			<view class="tag" v-if="GoodsList.length">
				<view :class="[currentSortType == 'default' ? 'active' :'' ]" id="defaultSort" @click="openSortFilter">综合</view>
				<view :class="[ currentSortType == 'price' ? 'active' :'']" @click="openSortFilter" id="priceSort">
					价格
					<image class="price-desc-asc" :src="imageURL" mode=""></image>
				</view>
				<view class="classify " id="categoryFilter" @click="openSortFilter">分类</view>
			</view>
			<!-- 分类 -->
			<view class="fixed " v-if="categoryFilter">
				<view :class="[iitem.id == categoryId? 'active1' : 'text']" v-for="(iitem,index) in filterCategory" :key='iitem.id'
				 @click="selectCategory(index,iitem.id)">
					{{iitem.name}}
				</view>
			</view>

			<!-- 商品 -->
			<view class="goods">
				<view class="sunGoods" v-if="GoodsList.length" v-for="item in GoodsList " :key="item.id" @click="goGoodsDetail(item.id)">
					<image class="goodsImg" :src="item.list_pic_url" mode=""></image>
					<view class="text">
						{{item.name}}
					</view>
					<view class="price">
						￥ {{item.retail_price}}
					</view>
				</view>

				<view class="noSunGoods" v-if="!GoodsList.length">
					<image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noSearchResult-7572a94f32.png">
					</image>
					<text class="text">您寻找的商品还未上架</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getSearchs,
		clearHistory,
		getGoodsList
	} from '@/api/homeApi.js';
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	export default {
		data() {
			return {
				// 背景颜色
				imageURL: '//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png',

				// 默认关键字
				defaultKeyword: "",
				// 关键字
				keyword: "",
				page: 1,
				size: 20,
				sort: '',
				currentSortType: 'id',
				currentSortOrder: 'desc',
				categoryId: 0,
				// 历史记录list
				oldKeywordList: [],
				// 热门搜索
				hotKeywordList: [],
				// 关键字list
				keywordList: [],
				forbid: '',
				// 搜索出来的商品
				GoodsList: [],
				// 分类名
				filterCategory: [],

				// 如果搜索到时，隐藏搜索box，显示商品box
				isShowKeywordList: false,
				hasGoods: true,
				// 全部，居家显示隐藏
				isbool: false,
				// 搜索状态
				categoryFilter: false,
			}
		},
		onLoad() {
			this.init();

		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		methods: {
			//API请求
			async loadHotKeyword() {
				var {
					data
				} = await getSearchs();
				// 热门
				this.hotKeywordList = data.hotKeywordList;
				// 默认关键字
				
				this.defaultKeyword = data.defaultKeyword.keyword;
				// 历史记录
				this.oldKeywordList = data.historyKeywordList;
			},
			// 获取商品信息
			async getgoodData(e) {
				if(!! e ){
				console.log('row',e)
				this.keyword = this.keywordList[e.target.dataset.rowindex];	
					
				}
			
				var {
					data
				} = await getGoodsList(this.keyword, this.page, this.size,
					this.currentSortType, this.currentSortOrder, this.categoryId);
				this.GoodsList = data.goodsList;
				this.filterCategory = data.filterCategory;
				this.hasGoods = false;
			},
			init() {
				this.loadHotKeyword();
			},
			// 综合，价格，分类
			openSortFilter(event) {
				var currentId = event.target.id;
				var ascImg = 'http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png';
				var descImg = 'http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png';
				var Img = '//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png';
				switch (currentId) {
					case 'priceSort':
						let tempSortOrder = 'asc';
						if (this.currentSortOrder == 'asc') {
							tempSortOrder = 'desc';
							this.imageURL = descImg;
						} else if (this.currentSortOrder == 'desc') {
							tempSortOrder = 'asc';
							this.imageURL = ascImg;
						}
						this.currentSortOrder = tempSortOrder;
						this.currentSortType = 'price';
						this.getgoodData();
						this.categoryFilter = false;
						break;
					case 'categoryFilter':
						this.currentSortOrder = 'asc';
						this.currentSortType = '';
						this.imageURL = Img;
						this.categoryFilter = !this.categoryFilter;
						break;
					default:
						this.imageURL = Img;
						this.currentSortType = 'default';
						this.currentSortOrder = 'desc';
						this.categoryFilter = false;
						this.getgoodData();

				}

			},
			// 更改分类状态
			selectCategory(index, id) {
				var filterCategory1 = this.filterCategory;
				for (let key in filterCategory1) {
					if (key == index) {
						this.filterCategory[key].checked = true;
					} else {
						this.filterCategory[key].checked = false;
					}
				}
				this.categoryFilter = false;
				this.currentSortType = 'id';
				this.categoryId = id;
				this.getgoodData()
				console.log(this.filterCategory)




			},

			// 跳往商品详情页面
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + id
				})
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				this.hasGoods = true;
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.request({
					url: 'http://47.106.90.23:8360/api/search/helper?keyword=' + keyword, //仅为示例
					success: (res) => {
						this.keywordList = [];
						var tempArr = res.data.data
						if (tempArr == '') {
							return;
						}
						this.keywordList.push(tempArr[0])
					}
				});
			},

			//顶置关键字
			setKeyword(index) {
				
				/* this.keyword = this.keywordList[index].keyword;
				console.log('this.keyword',this.keyword) */
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.clearHistory();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 清除历史
			async clearHistory() {
				var message = await clearHistory();
				// 重新渲染页面
				this.loadHotKeyword()
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索(历史记录存库)
			async doSearch(keyword) {
				keyword = keyword == false ? this.keyword : keyword;
				this.keyword = keyword;
				var {
					data
				} = await getGoodsList(this.keyword, this.page, this.size,
					this.currentSortType, this.currentSortOrder, this.categoryId);
				this.GoodsList = data.goodsList;
				this.filterCategory = data.filterCategory;
				this.hasGoods = false;
			}
		}
	}
</script>
<style>
	view {
		display: block;
	}

	.content {
		background-color: #F4F4F4;
	}

	/*#ifdef MP-WEIXIN */
	.content .haveGoods .tag {
		position: fixed;

		width: 100%;
		height: 90rpx;
		background-color: #FFFFFF;
		border: 2rpx solid #ccc;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	/*#endif*/

	/*#ifdef H5*/
	.content .haveGoods .tag {
		position: fixed;
		top: 168rpx;
		width: 100%;
		height: 90rpx;
		border: 2rpx solid #ccc;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
		z-index: 1200;
	}

	/*#endif*/


	.content .haveGoods .tag .price {
		display: flex;
	}

	.content .haveGoods .tag .price-desc-asc {

		width: 15rpx;
		height: 25rpx;
		/* background-color: #007AFF; */
		margin-top: 10rpx;
		margin-left: 6rpx;


	}

	#priceSort {
		display: flex;
	}

	.content .haveGoods .tag .active {
		color: #B4282d;
	}

	/*#ifdef MP-WEIXIN */
	.content .haveGoods .fixed {
		position: fixed;
		top: 179rpx;
		background: #FFFFFF;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 40rpx 40rpx 0 0;
		border-bottom: 1px solid #d9d9d9;
		z-index: 1000;
		background-color: #fff;

	}

	/*#endif*/
	/*#ifdef H5*/
	.content .haveGoods .fixed {
		position: fixed;
		top: 2rpx;
		background: #FFFFFF;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 40rpx 40rpx 0 0;
		border-bottom: 1px solid #d9d9d9;
		z-index: 1000;
		background-color: #fff;
		margin-top: 254rpx;
	}

	/*#endif*/

	.content .haveGoods .fixed .text {
		height: 54rpx;
		line-height: 54rpx;
		text-align: center;
		float: left;
		padding: 0 16rpx;
		margin: 0 0 40rpx 40rpx;
		border: 1px solid #666;
		color: #333;
		font-size: 24rpx;
	}

	.content .haveGoods .fixed .active1 {
		height: 54rpx;
		line-height: 54rpx;
		text-align: center;
		float: left;
		padding: 0 16rpx;
		margin: 0 0 40rpx 40rpx;
		border: 1px solid #B4282d;
		color: #333;
		font-size: 24rpx;
		color: #B4282d;


	}

	/*#ifdef MP-WEIXIN */
	.content .haveGoods .goods {

		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 0 6.25rpx;
		height: auto;
		overflow: hidden;
		padding-top: 98rpx;
	}

	/*#endif*/

	/*#ifdef H5 */
	.content .haveGoods .goods {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 0 6.25rpx;
		height: auto;
		overflow: hidden;
		margin-top: 174rpx;
	}

	/*#endif*/





	.content .haveGoods .goods .noSunGoods {

		margin: 100rpx auto;

	}

	.content .haveGoods .goods .noSunGoods .icon {
		margin: 0 auto;
		display: block;
		width: 240rpx;
		height: 240rpx;
	}

	.content .haveGoods .goods .noSunGoods .text {
		display: block;
		width: 100%;
		height: 40rpx;
		font-size: 28rpx;
		text-align: center;
		color: #999;
	}


	.content .haveGoods .goods .sunGoods {
		background: #fff;
		width: 365rpx;
		margin: 2rpx;
		padding-bottom: 33.333rpx;
		height: auto;
		overflow: hidden;
		text-align: center;



	}

	.content .haveGoods .goods .sunGoods .goodsImg {
		width: 302rpx;
		height: 302rpx;
	}

	.content .haveGoods .goods .sunGoods .text {
		display: block;
		width: 365.625rpx;
		height: 35rpx;
		margin: 11.5rpx 0 22rpx 0;
		text-align: center;
		overflow: hidden;
		padding: 0 20rpx;
		font-size: 30rpx;
		color: #333;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.content .haveGoods .goods .sunGoods .price {
		display: block;
		width: 365.625rpx;
		height: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #b4282d;
	}

	/*#ifdef MP-WEIXIN */
	.search-box {
		position: fixed;
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	/*#endif */
	/*#ifdef  H5*/
	.search-box {
		position: fixed;
		top: 80rpx;
		width: 100%;
		/* background-color: #FFFFFF; */
		background-color: #F4F4F4;
		padding: 15upx 2.5%;
		z-index: 100;
	}

	/*#endif */

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: linear-gradient(to right, #ff9801, #ff570a);
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}



	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	/*#ifdef H5 */
	.keyword-box {
		position: fixed;
		top: 100rpx;
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #F4F4F4;
		margin-top: 80rpx;
	}

	/*#endif */

	/*#ifdef MP-WEIXIN */
	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #F4F4F4;
	}

	/*#endif */


	/*#ifdef H5 */
	.keyword-box .keyword-block {
		padding: 10upx 0;
		background-color: #FFFFFF;

		margin-bottom: 20rpx;
	}

	/*#endif */

	/*#ifdef MP-WEIXIN */
	.keyword-box .keyword-block {
		padding: 10upx 0;
		background-color: #FFFFFF;
		/* margin-top: 100rpx; */
		margin-bottom: 20rpx;
	}

	/*#endif*/

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
