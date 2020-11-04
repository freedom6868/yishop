<template>
	<view class="container">
	  <view class="pay-result">
	    <view class="success" v-if="status == true">
	      <view class="msg">付款成功</view>
	      <view class="btns">
	        <navigator class="btn" @click="setStatus" url="/pages/ucenter/order/order" open-type="redirect">查看订单</navigator>
	        <navigator class="btn" url="/pages/index/index" open-type="switchTab">继续逛</navigator>
	      </view>
	    </view>
	    <view class="error" v-if="status != true">
	      <view class="msg">付款失败</view>
	      <view class="tips">
	        <view class="p">请在 <text class="time">1小时</text> 内完成付款</view>
	        <view class="p">否则订单将会被系统取消</view>
	      </view>
	      <view class="btns">
	        <navigator class="btn" url="/pages/ucenter/order/order" open-type="redirect">查看订单</navigator>
	        <view class="btn" @click='payOrder'>重新付款</view>
	      </view>
	    </view>
	  </view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:true,
				temp:false
			}
		},
		methods: {
			payOrder(){
				uni.showToast({
					title:"支付失败",
					icon:"none"
				})
			},
			setStatus(){
				this.temp = true;
			}
			
		},
		onUnload() {
			if(!this.temp){
				uni.navigateBack({
					delta:1
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.container {
	  height: 100vh;
	  background: #fff;
	  .pay-result {
	    background: #fff;
		.success{
			.msg {
			  text-align: center;
			  padding: 200rpx;
			  color: #2bab25;
			  font-size: 40rpx;
			}
			.btns {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  .btn {
			    text-align: center;
			    height: 80rpx;
			    margin: 0 20rpx;
			    width: 200rpx;
			    line-height: 78rpx;
			    border: 1px solid #868686;
			    color: #000000;
			    border-radius: 5rpx;
			  }
			}
		}
		.error{
			padding: 200rpx;
			.msg {
			  text-align: center;
			  color: #b4282d;
			  margin-bottom: 60rpx;
			  font-size: 40rpx;
			}
			.tips {
			  color: #7f7f7f;
			  margin-bottom: 70rpx;
			  .p {
			  	  font-size: 28rpx;
			  	  line-height: 42rpx;
			  	  text-align: center;
			  	}
			}
			.btns {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  .btn {
			    text-align: center;
			    height: 80rpx;
			    margin: 0 20rpx;
			    width: 200rpx;
			    line-height: 78rpx;
			    border: 1px solid #868686;
			    color: #000000;
			    border-radius: 5rpx;
			  }
			}
		}
	  }
	}
	
	
</style>
