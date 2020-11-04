<template>
	<view class="container">
		<view class="address-list" v-if="addressList.length > 0">
			<view class="item" v-for="item in addressList" @click="navigateBack" :key='item.id' :data-address-id='item.id' >
				<view class="l" >
					<view class="name">{{item.name}}</view>
					<view class="default" v-if="item.is_default">默认</view>
				</view>
				<view class="c" >
					<view class="mobile">{{item.mobile}}</view>
					<view class="address">{{item.full_region + item.address}}</view>
				</view>
				<view class="r">
					<image mode=""  @click.stop="addressAddOrUpdate" :data-address-id="item.id" class="del" src="../../../static/images/postcomment.png"></image>
				</view>
			</view>
		</view>
		<view class="empty-view" v-if="addressList.length <= 0">
			<image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noAddress-26d570cefa.png"></image>
			<text class="text">收货地址在哪里</text>
		</view>
		<view class="add-address" @click="addressAddOrUpdate" data-address-id="0">新建</view>
	</view>
</template>

<script>
	import {getAddressListData} from '@/api/uncenter/addressApi.js'
	export default {
		data() {
			return {
				addressList:[]
			}
		},
		methods: {
			//返回上一页
			navigateBack(e){
				console.log(e)
				this.checkAddressId = e.currentTarget.dataset.addressId;
				var pages = getCurrentPages();
				var prevPages = pages[pages.length-2]; //上一个页面；
				prevPages.nextPageAddressId = this.checkAddressId;
				console.log('prevPages.nextPageAddressId',prevPages.nextPageAddressId)
				uni.navigateBack();
			},
			async getAddressList(){
				let res = await getAddressListData()
				if(res.errno == 0){
					console.log(res)
					this.addressList = res.data;
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
			},
			addressAddOrUpdate(e){
				let addressId = e.currentTarget.dataset.addressId;
				uni.navigateTo({
					url:'/pages/shopping/addressAdd/addressAdd?id='+addressId
				})
			}
		},
		onLoad() {
			this.getAddressList();
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		
		.address-list{
			background: #fff url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png) 0 0 repeat-x;
			background-size: auto 10.5rpx;
			margin-bottom: 90rpx;
			padding: 0 30rpx;
			
			.item{
				height: 156rpx;
				border-bottom: 2rpx solid #DCD9D9;
				display: flex;
				align-items: center;
				.l{
					width: 125rpx;
					height: 80rpx;
					
					.name{
						width: 100%;
						font-size: 29rpx;
						color: #333;
						margin-bottom: 6rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
					.default{
						width: 62.5rpx;
						height: 33rpx;
						font-size: 20rpx;
						color: #b4282d;
						border: 1rpx solid #b4282d;
						visibility: visible;
						text-align: center;
					}
				}
				.c{
					flex: 1;
					
					.mobile{
						font-size: 29rpx;
						color: #333;
						margin-bottom: 6.25rpx;
					}
					.address{
						font-size: 25rpx;
						color: #666;
					}
				}
				.r{
					.del{
						width: 52rpx;
						height: 52rpx;
					}
				}
			}
		}
		
		.empty-view{
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.icon{
				height: 248rpx;
				width: 258rpx;
				margin-bottom: 10rpx;
			}
			.text{
				font-size: 28rpx;
				color: #999;
			}
		}
		
		.add-address{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #b4282d;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
		}
	}
</style>
