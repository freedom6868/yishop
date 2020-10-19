<template>
	<view class="container">
		<view class="collect-list">
			<view class="item" v-for="(item,index) in collectList" :key="item.id" @click="sunnewGood(item.value_id)">
				<image class="img" :src="item.list_pic_url">
					<view class="info">
						<view class="name">{{item.name}}</view>
						<view class="subtitle">{{item.goods_brief}}</view>
						<view class="price">￥{{item.retail_price}}</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCollectList
	} from '../../../api/uncenter/collectApi.js'
	export default {
		data() {
			return {
				id: 0,
				collectList: []
			}
		},
		methods: {
			async getCollectData() {
				var data = await getCollectList(this.id);
				this.collectList = data.data.data
				console.log(this.collectList)
			},
			sunnewGood(id) {
				console.log(id)
				uni.navigateTo({
					url: "../../goods/goods?id=" + id
			
				})
			}
		},
		created() {
			this.getCollectData()
		}
	}
</script>

<style lang="scss">
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
