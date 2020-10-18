<template>
	<view class="container">
		<view class="brand-info">
			<view class="name">
				<image src="http://yanxuan.nosdn.127.net/658f09b7ec522d31742b47b914d64338.png" mode="widthFix"></image>
				<view class="info-box">
					<text>CK制造商</text>
				</view>
				
			</view>
			<view class="desc">
				严选寻访Calvin Klein品牌的制造商，
				深入世界领带第一生产地，设计与品质并重，
				致力于给消费者带来优质典雅的服饰用品。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
			}
		},
		methods: {
			
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			console.log("品牌详情id：",this.id)
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.brand-info {
		.name {
			position: relative;
			width: 100%;
			height: 290rpx;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 290rpx;
			}
			.info-box {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 290rpx;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				
				text {
					margin: auto;
					font-size: 37.5rpx;
					color: #fff;
					padding-bottom: 8rpx;
					border-bottom: 2rpx solid #fff;
				}
			}
		}
	
		.desc {
			padding: 41.5rpx 31.25rpx;
			font-size: 30rpx;
			color: #666;
			background: #FFFFFF;

		}
	}
	
}
</style>
