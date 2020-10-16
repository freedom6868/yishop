<template>
	<view class="topmenu">
		<scroll-view class="wz" scroll-x="true" style="padding-right: 50rpx;" v-if="!show">
			<text v-for="(item,index) in topdata" 
			:key="index" 
			:class="index == topmenuselect?'select wzbox':'wzbox'"
			 @click="select(index)">
				{{item.name}}
			</text>
		</scroll-view>
		<view :class="show==true?'expansion hs':'expansion'">
			<view class="alltelep">
				全部
			</view>
			<view class="nr">
				<view class="nrbox" v-for="(item,index) in topdata" :key="index" @click="select(index)">
					<view :class="index == topmenuselect?'nrselect nrys':'nrys' " @click="display">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.topmenu {
		padding-top: 10rpx;
		background-color: #f2f2f2;
		font-size: 30rpx;
		color: #333;
		z-index: 100;
		position: sticky;
		top: 80rpx;
	
		.wz {
			white-space: nowrap; // 滚动必须加的属性
	
			.wzbox {
				margin: 0rpx 26rpx;
				padding-bottom: 4rpx;
			}
			.wzbox:last-child{
				margin-right: 70rpx;
			}
		}
		.zbm{
			margin-right: 30rpx;
		}
	
		.select {
			display: inline-block;
			color: #FF6B00;
			border-bottom: 4rpx solid #ff6b00;
		}
	
		.jt {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 56rpx;
			height: 58rpx;
			background-color: #f2f2f2;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 100;
	
			.xz {
				.xz180 {
					transition: all 1s;
					transform: rotate(180deg);
				}
	
				.z180 {
					transition: all 1s;
					transform: rotate(0deg);
				}
			}
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
	
		.hs{
			transition: all 0.5s;	
			height: 250rpx;
		}
	}
	
</style>
