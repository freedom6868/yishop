<template>
	<view class="container">
		<view class="profile-info">
			<image :src="userInfo.avatar" mode="" @click="onUserInfoClick" class="avatar"></image>
			
			<view class="info">
				<text @click="onUserInfoClick" class="name">{{userInfo.nickname || '点击登录'}} </text>
			</view>
			
			<image @click="onUserInfoClick" src="/static/images/address_right.png" mode="" class="btn"></image>
		</view>
		
		<view class="user-menu">
			<!-- <view class="item" v-for="item in itemList" :key='item.txt'>
				<navigator :url="item.url" class="a"></navigator>
				<text class="icon" :class="item.class" ></text>
				<text class="txt">{{item.txt}}</text>
			</view> -->
			
		</view>
		<view class="dialog-login" @click="onCloseLoginDialog" v-if="showLoginDialog" >
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
	import {login} from '@/utils/util.js';
	import {AuthLoginByWeixin} from '@/api/uncenter/indexApi.js'
	export default {
		data() {
			return {
				userInfo:{},
				showLoginDialog:false,
				itemList:[
					{'url':'/pages/ucenter/order/order','class':'order','txt':'我的订单'},
					{'url':'/pages/ucenter/coupon/coupon','class':'coupon','txt':'优惠券'},
					{'url':'','class':'gift','txt':'礼品卡'},
					{'url':'/pages/ucenter/collect/collect','class':'address','txt':'我的收藏'},
					{'url':'/pages/ucenter/footprint/footprint','class':'security','txt':'我的足迹'},
					{'url':'','class':'kefu','txt':'会员福利'},
					{'url':'/pages/ucenter/address/address','class':'address','txt':'地址管理'},
					{'url':'','class':'security','txt':'账号安全'},
					{'url':'','class':'kefu','txt':'联系客服'},
					{'url':'','class':'help','txt':'帮助中心'},
					{'url':'/pages/ucenter/feedback/feedback','class':'feedback','txt':'意见反馈'},
				]
			}
		},
		methods: {
			onUserInfoClick(){
				this.isShowLoginDialog();
			},
			isShowLoginDialog(){
				this.showLoginDialog = true;
			},
			onCloseLoginDialog(){
				this.showLoginDialog = false;
			},
			async onWechatLogin(e){
				console.log(e)
				if(e.detail.errMsg !== 'getUserInfo:ok'){
					if(e.detail.errMsg === 'getUserInfo:fail auth deny'){
						uni.showToast({
							title:'微信登录失败'
						})
						return;
					}
					uni.showToast({
						title:'微信登录失败'
					})
					return;
				}
				let res1 = await login();
				console.log(res1)
				let msg = {
					code : res1.code,
					userInfo : e.detail
				}
				let res2 = await AuthLoginByWeixin(msg);
				console.log(res2)
				if(res2.errno != 0){
					uni.showToast({
						title:'微信登录失败'
					})
				}else{
					this.userInfo = res2.data.userInfo;
					this.showLoginDialog = false;
					app.globalData.userInfo = res2.data.userInfo;
					app.globalData.token = res2.data.token;
					uni.setStorageSync('userInfo',JSON.stringify(res2.data.userInfo));
					uni.setStorageSync(res2.data.token)
				}
			}
		},
		onLoad() {
			this.userInfo = app.globalData.userInfo;
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #f4f4f4;
		height: auto;
		width: 100%;
		
		.profile-info{
			width: auto;
			height: 280rpx;
			background-color: #333;
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.avatar{
				width: 148rpx;
				height: 148rpx;
				border-radius: 50%;
			}
			
			.info{
				flex: 1;
				color: #fff;
				margin-left: 30rpx;
				font-size: 38rpx;
			}
			
			.btn{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}
	
		.dialog-login{
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.dialog-body{
				width: 540rpx;
				height: auto;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 40rpx;
				.title{
					text-align: center;
				}
				.btn{
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
