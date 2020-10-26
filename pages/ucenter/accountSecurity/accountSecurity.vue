<template>
	<view>
		<template>
			<u-cell-group>
				<u-cell-item icon="weixin-fill" title="微信名" :value="nickname" @click="changName"></u-cell-item>
				<u-cell-item icon="phone-fill" title="手机号" :value="mobile"  @click="open"></u-cell-item>
			</u-cell-group>

			<view>
				<u-modal v-model="show" title="修改手机号码" @confirm='confirm' show-cancel-button>

					<view style="display: flex; margin: 50rpx;">

						<!-- 手机号码:<input type="tel"  maxlength="11" :v-model="phoneValue" :value="phoneValue" @input="onInput" :placeholder="mobile"/> -->
						手机号码:<input style="margin-left: 10rpx;" type="tel" maxlength="11" @input="onInput" :placeholder="mobile" />
					</view>
				</u-modal>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		changeUserMobile
	} from "../../../api/uncenter/accountSecurityApi.js"
	export default {
		data() {
			return {
				nickname: '',
				mobile: '',
				show: false,
				phoneValue: '',
				userId:0,
				userInfoData:{}

			}
		},
		methods: {
			changName(){
					uni.showToast({
						title: '小程序与微信同号，请前往微信进行更改',
						duration: 3000,
						icon: 'none'
					})
			},
			
			async confirm() {
				var userId = this.userId;
				var mobile = this.phoneValue;
				if (mobile.length < 11) {
					uni.showToast({
						title: '电话号规格不正确',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				if (!(/1[34578][0-9]\d{8}/.test(mobile))) {
					uni.showToast({
						title: '电话号规格不正确',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				
				var {data} = await changeUserMobile(userId,mobile);
				// console.log(data)
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none'
				})
				// 修改成功后存进本地存储
				if(data.msg == '修改成功'){
					this.userInfoData.mobile = mobile;
					uni.setStorageSync("userInfo",JSON.stringify(this.userInfoData));
					this.getUserData();
					
				}

			},
			onInput(e) {
				var value = e.detail.value;
				this.phoneValue = value;
			},
			open() {
				this.show = true;
			},

			getUserData() {
				var userData = JSON.parse(uni.getStorageSync('userInfo'));
				this.userInfoData = userData;
				this.nickname = userData.nickname;
				this.mobile = userData.mobile;
				this.userId = userData.id

			}
		},
		onShow() {
			this.getUserData();
		}
	}
</script>

<style>

</style>
