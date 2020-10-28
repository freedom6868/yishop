<template>
	<view class="feedback_container">

		<picker @change="bindPickerChange" :value="index" :range="array">
			<view class="picker">
				<view class="fb-type">
					<view class="type-label">{{array[index]}}</view>
					<image class="type-icon img_size" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/pickerArrow-a8b918f05f.png"></image>
				</view>
			</view>
		</picker>

		<view class="messageBoard">
			<textarea class="left" placeholder-class="line" maxlength="500" v-model="content" placeholder="对我们网站,商品,服务,您还有什么建议吗？您还希望在严选上买到什么？请告诉我们..." />
		</view>
		
		<view class="cellphone">
			<text> &nbsp;&nbsp; 手机号码：</text>
			<input class="phone_input" type="text" :value="modile" :v-model="mobile" placeholder="  输入手机号便于联系上您" @input="getModile" />
			
		</view>
		<view class="btn" @click="goBack">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: ["请选择类型", '物流状况', '商品相关', '客户服务', '优惠活动', "功能异常", "产品建议", "其他"],
				index: 0,
				content:"",
				mobile:"",
				show: false,
				
				
			}
		},
		methods: {
			
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			 bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			getModile(e) {
				this.mobile = e.target.value
				
			},
			goBack(){
				let content = this.content;
				let cellphone = this.mobile;
				if(this.index == 0){
					uni.showToast({
						title:"请选择你要反馈的类型",
						icon:"none"
					})
					return;
				}
				if(content.trim() == ""){
					uni.showToast({
						title:"请填写你要反馈的内容",
						icon:"none"
					})
					return;
				}
				if(cellphone.trim() == ""){
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
				setTimeout( ()=> {
					uni.switchTab({
						url:'/pages/ucenter/index/index'
					})
				},500 )
				
				
				
				
				

			}
		}
	}
</script>

<style lang="scss" scoped>
	// 页面左右边距
	.left {
		margin-left: 31.25rpx;
	}
	
	.right {
		margin-right: 16rpx;
	}
	
	.img_size {
		width: 52rpx;
		height: 52rpx;
	}
	
	
	.feedback_container {
		position: relative;
		margin: 20rpx 0;
		
		.picker {
			.fb-type{
			  height: 104rpx;
			  width: 100%;
			  background: #fff;
			  margin-bottom: 20rpx;
			  display: flex;
			  flex-direction: row;
			  align-items: center;
			  padding-left: 30rpx;
			  padding-right: 30rpx;
			  
			  .type-label{
			    height: 36rpx;
			    flex: 1;
			    color: #333;
			    font-size: 28rpx;
			  }
			  
			  .type-icon{
			    height: 36rpx;
			    width: 36rpx;
			  }
			}
			
			
		}

		.messageBoard{
			
			background: #fff;
			padding: 40rpx;
			
				textarea {
					background-color: #fff;
					display: block;
					margin: 40rpx auto;
					// width: 100%;
					height: 300rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: auto;
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

		.cellphone {
			text {
				color: #909399; 
				font-size: 22rpx;
			}
			.phone_input {
				height: 100rpx;
				background-color: #fff;
			}
		}
		
		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			
			position: fixed;
			left: 0;
			bottom: 0;
			
			width: 100%;
			height: 100rpx;
			
			background-color: #b4282d;
			font-size: 30rpx;
			color: #fff;
		}
		
	}
</style>
