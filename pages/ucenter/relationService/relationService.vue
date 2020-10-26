<template>
	<view>
		<view class="contact-icon">
			<text style="color: #F04A44;" class="icon iconfont icon-kefu"></text>
			<button class="kefu" open-type="contact">联系客服</button>
		</view>
		
		<button class='button' @click='addWechat'>复制添加客服微信</button>
		<button class='button' @click="phone">点击拨打客服电话</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//启动拨号功能
			phone(){
				uni.makePhoneCall({
					phoneNumber: '15913953648', //客服电话
					success: function() {
						console.log('成功拨打电话')
					}
				})
			},
			// 添加客服微信
			addWechat() {
				uni.setClipboardData({
					data: 'zkj5396',
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								console.log('复制成功')
								console.log(res.data) // data
							}
						})
					}
				})
			},
		}
	}
</script>

<style>

</style>
