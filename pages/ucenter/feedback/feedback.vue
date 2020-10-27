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
		<view class="messageBoard">
			<text>反馈内容：</text>
			<!-- <textarea class="input-box"
			v-model="content"
			maxlength="500"
			placeholder="对我们网站,商品,服务,您还有什么建议吗？您还希望在严选上买到什么？请告诉我们..."
			/> -->
			<view class="box">
				<textarea placeholder-class="line" maxlength="500" v-model="content" placeholder="对我们网站,商品,服务,您还有什么建议吗？您还希望在严选上买到什么？请告诉我们..." />
				<view class="clipboard">
					反馈内容
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view>
		</view>
		<view class="cellphone">
			<!-- <text>手机号码:</text>
			<input type="number" placeholder="请输入你的手机号码" maxlength="11" v-model="cellphone" /> -->
			<view class="form-item">
				<input type="number"  maxlength="11"  v-model="cellphone" class="input" placeholder='联系电话 ' auto-focus />
			</view>
		</view>
		<button type="default" @click="goBack">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: ["请选择", '物流状况', '商品相关', '客户服务', '优惠活动', "功能异常", "产品建议", "其他"],
				index: 0,
				content:"",
				cellphone:""
			}
		},
		methods: {
			
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			 bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			goBack(){
				let content = this.content;
				let cellphone = this.cellphone;
				if(this.index == 0){
					uni.showToast({
						title:"请选择你要反馈的类型",
						icon:"none"
					})
					return;
				}
				if(content.trim() == "" || content.trim() == " "){
					uni.showToast({
						title:"请填写你要反馈的内容",
						icon:"none"
					})
					return;
				}
				if(cellphone.trim() == "" || cellphone.trim() == " " ){
					uni.showToast({
						title:"请填写你的手机号码",
						icon:"none"
					})
					return;
				}
				let reg = /1[3-9]\d{9}/g;
				if(cellphone.trim().length < 11 || cellphone.trim().match(reg)== null){
					uni.showToast({
						title:"请填写正确的手机号码",
						icon:"none"
					})
					return;
				}
				uni.showToast({
					title:'提交成功',
					duration:2000
				})
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},800)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		height: auto;
		background-color: #FFFFFF;

		.title {
			text {
				font-weight: bold;
				font-size: 44rpx;
			}
		}

		.uni-list-cell-db {
			display: flex;
			flex-wrap: nowrap;
			padding: 30rpx;

			text {
				font-size: 34rpx;
			}

			.menu {
				width: 300rpx;
				height: 60rpx;
				border: 2rpx solid #C0C0C0;
				font-size: 34rpx;
			}
		}
		.messageBoard{
			text{
				font-size: 40rpx;
				margin-left: 30rpx;
			}
			
			.box {
				padding-right: 40rpx;
				textarea {
					// width: 100%;
					height: 300rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;
					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
		.cellphone{
			.form-item{
				height: 116rpx;
				border-bottom: 2rpx solid #d9d9d9;
				display: flex;
				align-items: center;
				padding: 0 32rpx;
				
				.input{
					flex: 1;
					height: 44rpx;
				}
			}
		}
	}
</style>
