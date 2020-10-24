<template>
	<view class="feedback">
		<view class="title">
			<text>关于严选，我们还有很多希望与您交流</text>
		</view>
		<view class="uni-list-cell-db">
			<text>反馈类型：</text>
			<view class="menu">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="">
			<textarea class="input-box"
			v-model="content"
			Number=500
			placeholder="对我们网站,商品,服务,您还有什么建议吗？您还希望在严选上买到什么？请告诉我们..."
			/>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: ["请选择", '物流状况', '商品相关', '客户服务', '优惠活动', "功能异常", "产品建议", "其他"],
				index: 0,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			 bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		height: 2000rpx;
		background-color: #FFFFFF;

		.title {
			text {
				font-size: 40rpx;
			}
		}

		.uni-list-cell-db {
			display: flex;
			flex-wrap: nowrap;
			padding: 30rpx;

			text {
				font-size: 38rpx;
			}

			.menu {
				width: 300rpx;
				height: 60rpx;
				border: 2rpx solid #C0C0C0;
				font-size: 38rpx;
			}
		}
		.input-box{
			width: 90%;
			height: 340rpx;
			margin-top: 30rpx;
			padding: 10rpx;
			border: 2rpx solid #C0C0C0;
		}
	}
</style>
