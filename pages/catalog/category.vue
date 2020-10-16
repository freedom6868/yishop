<template>
	<view class="topmenu">
		<view class="menu">
			<scroll-view class="top" scroll-x="true" style="padding-right: 50rpx;" >
				<text v-for="(item,index) in brotherCategory" :key="item.id" :class="index == topmenuselect?'select wzbox':'wzbox'" @click="select(index)">
					{{item.name}}
				</text>
			</scroll-view>
			<view class="intro">
				<view class="title">
					<text class="">布艺软装</text>
				</view>
				
				<br />
				<view class="introduce">
					<text class="">各种风格软装装点你的家</text>
				</view>
				
			</view>
		</view>
		<!-- <view :class="show==true?'expansion hs':'expansion'">
			<view class="nr">
				<view class="nrbox" v-for="(item,index) in topdata" :key="index" @click="select(index)">
					<view :class="index == topmenuselect?'nrselect nrys':'nrys' " @click="display">{{item.name}}</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		getCategoryData
	} from '../../api/catalogApi.js'
	export default {
		data() {
			return {
				brotherCategory:[],
				topmenuselect: 0
			}
		},
		methods: {
			async getCatagory(id) {
				var data = await getCategoryData(id);
				this.brotherCategory = data.data.brotherCategory
				console.log(this.brotherCategory)
			},
			select(index) {
				this.topmenuselect = index;
			}
		},
		onLoad(data) {
			this.getCatagory(data.id)
			console.log(data)
		}
	}
</script>

<style lang="scss">
	.topmenu {
		padding: 20rpx 0;
		font-size: 30rpx;
		z-index: 100;
		position: sticky;
		top: 80rpx;

		.menu{
			height: 70rpx;
			.top {
				white-space: nowrap; // 滚动必须加的属性
				
				.wzbox {
					margin: 0rpx 26rpx;
					padding-bottom: 20rpx;
				}
			}
			.intro{
				width: 100%;
				height: 145rpx;
				background-color: #f3f3f3;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				
				.introduce{
					font-size: 24rpx;
					// color: #e9e9e9;
				}
			}
			
		}
		.select {
			display: inline-block;
			padding-top: 10rpx;
			color: #cf0d0d;
			border-bottom: 6rpx solid #cf0d0d;
		}

		.expansion {
			position: absolute;
			background-color: #f2f2f2;
			height: 0px;
			overflow: hidden;

			.alltelep {
				margin: 20rpx 20rpx;
			}

			.nr {
				display: flex;
				flex-wrap: wrap;

				.nrbox {
					margin: 0rpx 0 25rpx 20rpx;
					font-size: 28rpx;

					.nrys {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 152rpx;
						height: 52rpx;
						border: 2rpx solid #ccc;
						border-radius: 6rpx;
					}

					.nrselect {
						background-color: #fde0d5;
						border-color: #ff6700;
						color: #ff6700;
					}
				}

			}
		}

		.hs {
			transition: all 0.5s;
			height: 250rpx;
		}
	}
</style>
