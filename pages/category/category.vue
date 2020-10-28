<template>
	<view class="topmenu">
		<!-- 头部菜单选项 -->
		<view class="menu">
			<scroll-view class="top" scroll-x="true" style="padding-right: 50rpx;">
				<text v-for="(item,index) in brotherCategory" :key="item.id" :class="index == topmenuselect?'select wzbox':'wzbox'"
				 @click="select(index,item.id)">
					{{item.name}}
				</text>
			</scroll-view>
		</view>
		<!-- 商品分类介绍 -->
		<view class="intro">
			<view class="title">
				<text class="">{{brotherCategory[topmenuselect].name}}</text>
			</view>
			<br />
			<view class="introduce">
				<text class="">{{brotherCategory[topmenuselect].front_name}}</text>
			</view>

		</view>
		<!-- 所有商品 -->
		<view class="productList">
			<view class="commodity" v-for="(item,index) in productList" :key="item.id" :class=" [(index + 1) % 2 == 0 ? 'commodity-b' : 'commodity']" @click="sunnewGood(item.id)">
				<image :src="item.list_pic_url"></image>
				<text class="name">{{item.name}}</text>
				<text class="price">￥{{item.retail_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCategoryData,
		getproductList
	} from '@/api/catalogApi.js'
	export default {
		data() {
			return {
				brotherCategory: [],
				topmenuselect: 0,
				productList: []
			}
		},
		methods: {
			async getCatagory(data1) {
				//获取二级分类的头部选项
				var data = await getCategoryData(data1.id);
				this.brotherCategory = data.data.brotherCategory
				
				//将获取的到的id放到数据列表里进行匹配，所在下标赋值为在头部菜单中的下标
				// var i1=this.brotherCategory.findIndex((value)=>value.id==data1.id);
				this.topmenuselect = this.brotherCategory.findIndex((value)=>value.id==data1.id);
				
				//获取所在分类的全部商品
				var commodity = await getproductList(data1.id)
				this.productList = commodity.data.data
				
				console.log(this.brotherCategory)
				console.log(data1.id)
				// console.log(this.topmenuselect);
			},
			async select(index,id) {
				this.topmenuselect = index;
				var commodity = await getproductList(id)
				this.productList = commodity.data.data
				// console.log(commodity)
			},
			sunnewGood(id) {
				console.log(id)
				uni.navigateTo({
					url: "../goods/goods?id=" + id
			
				})
			}
		},
		onLoad(data) {
			this.getCatagory(data);
			
		}
	}
</script>

<style lang="scss" scoped>
	.topmenu {
		padding: 20rpx 0;
		font-size: 30rpx;
		z-index: 100;
		position: sticky;
		top: 80rpx;

		.menu {
			height: 70rpx;

			.top {
				white-space: nowrap; // 滚动必须加的属性

				.wzbox {
					margin: 0rpx 26rpx;
					padding-bottom: 20rpx;
				}
			}


		}

		.intro {
			width: 100%;
			height: 145rpx;
			background-color: #f9f9f9;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;

			.introduce {
				font-size: 24rpx;
				// color: #e9e9e9;
			}
		}

		.select {
			display: inline-block;
			padding-top: 10rpx;
			color: #cf0d0d;
			border-bottom: 6rpx solid #cf0d0d;
		}

		.productList {
			width: 750rpx;
			padding: 0 6.25rpx;
			height: auto;
			overflow: hidden;
			background-color: #f7f7f7;
			.commodity {
				float: left;
				background-color: #fff;
				width: 365rpx;
				margin-bottom: 6.25rpx;
				padding-bottom: 33.333rpx;
				height: auto;
				overflow: hidden;
				text-align: center;

				image {
					width: 302rpx;
					height: 302rpx;
				}
				
				.name{
				  display: block;
				  width: 365.625rpx;
				  height: 35rpx;
				  margin: 11.5rpx 0 22rpx 0;
				  text-align: center;
				  overflow: hidden;
				  padding: 0 20rpx;
				  font-size: 30rpx;
				  color: #333;
				}
				
				.price{
				  display: block;
				  width: 365.625rpx;
				  height: 30rpx;
				  text-align: center;
				  font-size: 30rpx;
				  color: #b4282d;
				}
			}
			.commodity-b{
			  margin-left: 6.25rpx;
			}
		}

	}
</style>
