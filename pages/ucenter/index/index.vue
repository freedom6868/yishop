<template>
	<view class="container">
		<view class="profile-info">
			<image :src="userInfo.avatar" mode="" @click="onUserInfoClick" class="avatar"></image>

			<view class="info">
				<text @click="onUserInfoClick" class="name">{{userInfo.nickname || '点击登录'}} </text>
			</view>

			<image @click="onUserInfoClick" v-if="this.userInfo.nickname=='点击登录'" src="/static/images/address_right.png" mode=""
			 class="btn"></image>
		</view>

		<view class="user-menu">
			<u-grid :col="3"  >
				<u-grid-item class="u-grid" @click="click" :index='index' v-for="(item,index) in itemList" :key='item.txt'>
					<button class='kefubutton' type="button" open-type="contact" v-if="item.name=='kefu-ermai'">
						<view class="u-icon-Box" >
							<u-icon class="u-icon" :name="item.name" :size="58"></u-icon>
						</view>
						
						<view class="txt">{{item.txt}}</view>
					</button>

					<u-icon :name="item.name" :size="58" v-if="item.name !=='kefu-ermai'"></u-icon>
					<view class="<strong>grid-text</strong>"  v-if="item.name !=='kefu-ermai'">{{item.txt}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="dialog-login" @click="onCloseLoginDialog" v-if="showLoginDialog">
			<view class="dialog-body">
				<view class="title">
					请选择登录方式
				</view>
				<view class="content">
					<button class="btn" type="primary" open-type="getUserInfo" @getuserinfo="onWechatLogin">微信登录</button>
					<button class="btn" type="default" open-type="getUserInfo" @getuserinfo="onWechatLogin">手机号登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		login
	} from '@/utils/util.js';
	import {
		AuthLoginByWeixin
	} from '@/api/uncenter/indexApi.js'
	export default {
		data() {
			return {
				userInfo: {},
				showLoginDialog: false,
				itemList: [{
						name: 'order',
						'txt': '我的订单',
						url: '/pages/ucenter/order/order'
					},
					{
						name: 'star',
						'txt': '我的收藏',
						url: '/pages/ucenter/collect/collect'
					},
					{
						name: 'map',
						'txt': '地址管理',
						url: '/pages/ucenter/address/address'
					},
					{
						name: 'list-dot',
						'txt': '我的足迹',
						url: '/pages/ucenter/footprint/footprint'
					},
					{
						name: 'coupon',
						'txt': '优惠券',
						url: '/pages/ucenter/coupon/coupon'
					},
					{
						name: 'lock',
						'txt': '账号安全',
						url: '/pages/ucenter/accountSecurity/accountSecurity'
					},
					{
						name: 'kefu-ermai',
						'txt': '联系客服',
						url: ''
					},
					{
						name: 'question-circle',
						'txt': '帮助中心',
						url: '/pages/ucenter/helpCenter/helpCenter'
					},
					{
						name: 'chat',
						'txt': '意见反馈',
						url: '/pages/ucenter/feedback/feedback'
					},
				],
				show: false
			}
		},
		methods: {
			onUserInfoClick() {
				if (this.userInfo.nickname == '点击登录') {
					this.isShowLoginDialog();
				}

			},
			isShowLoginDialog() {

				this.showLoginDialog = true;
			},
			onCloseLoginDialog() {
				this.showLoginDialog = false;
			},
			async onWechatLogin(e) {
				console.log(e)
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
						uni.showToast({
							title: '微信登录失败',
							icon: 'none'
						})
						return;
					}
					uni.showToast({
						title: '微信登录失败',
						icon: 'none'
					})
					return;
				}
				let res1 = await login();
				console.log(res1)
				let msg = {
					code: res1.code,
					userInfo: e.detail
				}
				let res2 = await AuthLoginByWeixin(msg);
				console.log(res2)
				if (res2.errno != 0) {
					uni.showToast({
						title: '微信登录失败',
						icon: 'none'
					})
				} else {
					this.userInfo = res2.data.userInfo;
					this.showLoginDialog = false;
					app.globalData.userInfo = res2.data.userInfo;
					app.globalData.token = res2.data.token;
					uni.setStorageSync('userInfo', JSON.stringify(res2.data.userInfo));
					uni.setStorageSync('token', res2.data.token)
				}
			},
			click(index) {
				if (this.userInfo.nickname == '点击登录') {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return;
				}
				let currentItem = this.itemList[index];
				if (currentItem.url.length != 0) {
					console.log(currentItem.url)
					uni.navigateTo({
						url: currentItem.url
					})
				} else {
					uni.showToast({
						title: currentItem.txt,
						icon: 'none'
					})
				}
			}
		},
		onLoad() {
			this.userInfo = app.globalData.userInfo;
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f4f4f4;
		height: auto;
		width: 100%;

		.profile-info {
			width: auto;
			height: 280rpx;
			background-color: #333;
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.avatar {
				width: 148rpx;
				height: 148rpx;
				border-radius: 50%;
			}

			.info {
				flex: 1;
				color: #fff;
				margin-left: 30rpx;
				font-size: 38rpx;
			}

			.btn {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}

		.user-menu {
			
			height: auto;
			background-color: #fff;
			.u-grid {
				.kefubutton::after {
					border: none;
				}
				
				.kefubutton {
					height: 96rpx;
					background-color: #FFFFFF;
					
					display: flex;
					flex-wrap: wrap;
					
					.u-icon-Box{
						width: 200rpx;
						height: 30rpx;
						margin-top: 0;
						margin-bottom: 14rpx;
						line-height: 30rpx;
					}
					.txt {
						margin: 0 auto;
						text-align: center;
						font-size: 30rpx;
					}
				}
			}
			
		}

		.dialog-login {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.dialog-body {
				width: 540rpx;
				height: auto;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 40rpx;

				.title {
					text-align: center;
				}

				.btn {
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
