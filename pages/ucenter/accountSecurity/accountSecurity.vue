<template>
	<view>
			<template>
				<u-cell-group>
					<u-cell-item icon="weixin-fill" title="微信名" :value="nickname"></u-cell-item>
					<u-cell-item icon="phone-fill" title="手机号" value="eg:15913953648"></u-cell-item>
				</u-cell-group>
				
				
			</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:''
			}
		},
		methods: {
			getUserData(){
				var userData = JSON.parse( uni.getStorageSync('userInfo'));
				console.log(userData)
				this.nickname = userData.nickname;
				console.log(this.nickname)
			}
		},
		
		onLoad(){
			this.getUserData();
		}
	}
</script>

<style>

</style>
