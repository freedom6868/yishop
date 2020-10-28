<template>
	<view class="container">
		<!-- <view class="collect-list">
			<view class="item" v-for="(item,index) in collectList" :key="item.id" @click="sunnewGood(item.value_id)" @longpress="operation(item)">
				<image class="img" :src="item.list_pic_url">
					<view class="info">
						<view class="name">{{item.name}}</view>
						<view class="subtitle">{{item.goods_brief}}</view>
						<view class="price">￥{{item.retail_price}}</view>
					</view>
			</view>
		</view> -->
		<u-swipe-action 
			v-for="(item, index) in collectList" 
			:show="item.show" 
			:index="index" 
			:key="item.id" 
			@click="deleteItem(item.value_id)"
			@open="open"
			:options="options"
			@longpress="operation(item)"
		>
			<view class="item u-border-bottom" @click="sunnewGood(item.value_id)">
				<image class="img" :src="item.list_pic_url">
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="subtitle">{{item.goods_brief}}</view>
					<view class="price">￥{{item.retail_price}}</view>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	import {
		getCollectList
	} from '@/api/uncenter/collectApi.js'
	import {
		addOrCannelCollect
	} from '@/api/goodsApi.js';
	export default {
		data() {
			return {
				id: 0,
				collectList: [],
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					},
				]
			}
		},
		methods: {
			open(index) {
				console.log(index)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.collectList[index].show = true;
				this.collectList.map((val, idx) => {
					if(index != idx) val.show = false;
				});
				this.$forceUpdate();
			},
			deleteItem(item){
				var _this = this
				uni.showModal({
					content: "确定要删除吗？",
					async success(res) {
						if (res.confirm) {
							console.log(item);
							const res1 = await addOrCannelCollect({
								typeId: 0,
								valueId: item
							});
							_this.collectList = _this.getCollectData(_this.id)
							console.log('用户点击确定');
						}
				
					}
				})
			},
			async getCollectData() {
				//加载用户收藏的物品
				var data = await getCollectList(this.id);
				this.collectList = data.data.data;
				this.collectList.map( v=>{
					v.show = false;
				} )
				console.log(this.collectList)
			},
			sunnewGood(id) {
				//点击商品跳转到详情页面
				console.log(id)
				uni.navigateTo({
					url: "../../goods/goods?id=" + id

				})
			},
			operation(item) {
				//长按弹出确认框，确认是否要删除指定收藏物品
				var _this = this
				uni.showModal({
					content: "确定要删除吗？",
					async success(res) {
						if (res.confirm) {
							console.log(item);
							const res1 = await addOrCannelCollect({
								typeId: 0,
								valueId: item.value_id
							});
							_this.collectList = _this.getCollectData(_this.id)
							console.log('用户点击确定');
						}

					}
				})
			}
		},
		created() {
			this.getCollectData()
		},
		onPullDownRefresh() {
			//收藏页面下拉刷新
			var _this = this
			setTimeout(function() {
				uni.stopPullDownRefresh();
				_this.collectList = _this.getCollectData(_this.id)
			}, 1000);
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #f4f4f4;
		min-height: 100%;
	}

	.collect-list {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
		padding-left: 30rpx;
		border-top: 1px solid #e1e1e1;
	}

	.item {
		height: 212rpx;
		width: 720rpx;
		background: #fff;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #e1e1e1;

		.img {
			float: left;
			width: 150rpx;
			height: 150rpx;
		}

		.info {
			float: right;
			width: 540rpx;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 20rpx;

			.name {
				font-size: 28rpx;
				color: #333;
				line-height: 40rpx;
			}

			.subtitle {
				margin-top: 8rpx;
				font-size: 24rpx;
				color: #888;
				line-height: 40rpx;
			}

			.price {
				margin-top: 8rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 40rpx;
			}
		}
	}

	.item:last-child {
		border-bottom: 1px solid #fff;
	}
</style>
