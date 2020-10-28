<template>
	<view class="container">
		<view class="business">
			<view class="item">30天无忧退货</view>
			<view class="item">48小时快速退款</view>
			<view class="item">满88元免邮费</view>
		</view>
		<!-- 购物车没有商品时显示 -->
		<view class="notCart" v-if="cartGoods.length<=0">
			<view class="no">
				<image src="@/static/images/cart.png" mode=""></image>
				<view class="text">
					<navigator url="/pages/index/index" open-type="switchTab">去添加点什么吧</navigator>
				</view>
			</view>
		</view>
		<!-- 购物车有商品时显示 -->
		<view class="CartData" v-if="cartGoods.length>0">
			<view class="list" v-for="(item,index) in cartGoods" :key="index">
					<!-- 勾选按钮 -->
					<view :class="[item.checked ? 'checked':'checkbox']" @click="aloneChecked(index)"></view>
					<view class="cart-goods">
						<image class="img" :src="item.list_pic_url" mode=""></image>
						<view class="info">
							<view class="t" >
								<text class="name">{{!isEditCart? item.goods_name:' '}}</text>
								<text class="num" v-if="!isEditCart">x{{item.number}}</text>
								<text class="nums" v-if="isEditCart">已选择</text>
							</view>
							<view class="attr" v-if="!isEditCart">{{item.goods_specifition_name_value}}</view>
							<view class="b">
								<text class="price">￥{{item.retail_price}}</text>
								<view class="selnum" v-if="isEditCart">
									<view class="cut" @click="cutNumber(index)">-</view>
									<input type="text" class="number" :value="item.number" />
									<view class="add" @click="addNumber(index)">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cart-bottom" v-if="cartGoods.length>0">
				<view :class="[checkedAllStatus ? 'checkbox':'checked']" @click="checkAll">全选({{ cartTotal.checkedGoodsCount}})</view>
				<view class="total">{{!isEditCart ? '￥'+cartTotal.checkedGoodsAmount : ''}}</view>
				<view class="delete" @click="editCart">{{!isEditCart ? '编辑':'完成'}}</view>
				<view class="checkout" v-if="!isEditCart" @click="ToCartOrder">下单</view>
				<view class="checkout" v-if="isEditCart" @click="deleteCart">删除所选</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCartApiData,postChecked,postNumber,deleteCheckedCart} from "@/api/cartApi.js"
	export default {
		data() {
			return {
				//购物车商品数据
				cartGoods: [],
				cartTotal:{},
				//判断是否全选
				checkedAllStatus:true,
				//判断是否在编辑状态
				isEditCart:false,
			}
		},
		methods: {
			//下单
			ToCartOrder(){
				let bool = false;
				var productId = this.cartGoods.map((v)=>{
					if(v.checked == true){
						bool = true;
						return v.product_id;
					}
				})
				if(!bool){
					uni.showToast({
						title:'还未选择商品哦',
						icon:'none'
					})
					return;
				}
				var productIds = productId.join(',')
				// console.log(productIds)
				console.log(productId)
				uni.navigateTo({
					url: `/pages/checkout/checkout`
				})
			},
			//获取所有商品的product_id 并转换成字符串并用","隔开
			getCheckedProductId(){
				var productId = this.cartGoods.map((v)=>{
					//返回的是一个数组[198,234,456]
					return v.product_id;
				})
				//将数组变为字符串198,234,456
				var productIds = productId.join(',')
				// console.log(productIds)
				return productIds;
			},
			//删除选中购物车商品
			async deleteCart(){
				// var productIds = this.getCheckedProductId();
				let bool = false;
				var productId = this.cartGoods.map((v)=>{
					if(v.checked == true){
						bool = true;
						return v.product_id;
					}
				})
				if(!bool){
					uni.showToast({
						title:'还未选择商品哦',
						icon:'none'
					})
					return;
				}
				var productIds = productId.join(',')
				console.log(productIds)
				var message = await deleteCheckedCart(productIds);
				this.checkedAllStatus = this.isCheckedAll();
				this.getCartApi();
			},
			// 减
			async cutNumber(index){
				var cartItem = this.cartGoods[index];
				// console.log(cartItem);
				var number = (cartItem.number-1 > 1) ? cartItem.number-1:1;
				// console.log(number);
				cartItem.number = number;
				var message = await postNumber(cartItem.goods_id,cartItem.id,number,cartItem.product_id);
				this.getCartApi();
			},
			// 加
			async addNumber(index){
				var cartItem = this.cartGoods[index];
				// console.log(cartItem);
				var number = cartItem.number+1;
				// console.log(number);
				cartItem.number = number;
				var message = await postNumber(cartItem.goods_id,cartItem.id,number,cartItem.product_id);
				this.getCartApi();
			},
			//单选按钮
			async aloneChecked(index){
				var id = this.cartGoods[index].product_id;
				var checkeds = this.cartGoods[index].checked ? '0':'1';
				var message= await postChecked(id,checkeds);
				this.getCartApi()
			},
			//全选按钮
			checkAll(){
				var productIds = this.getCheckedProductId();
				var isChecked =  this.isCheckedAll() ? '0':'1';
				//修改选中状态
				var message= postChecked(productIds,isChecked);
				this.getCartApi()
			},
			//编辑按钮修改状态
			editCart(){
				if(this.isEditCart){
					this.isEditCart = !this.isEditCart;
					var productIds = this.getCheckedProductId();
					var isChecked =  this.isCheckedAll() ? '1':'1';
					//修改选中状态
					var message= postChecked(productIds,isChecked);
					this.getCartApi()
				}else{
					this.isEditCart = !this.isEditCart;
					var productIds = this.getCheckedProductId();
					var isChecked =  this.isCheckedAll() ? '0':'0';
					//修改选中状态
					var message= postChecked(productIds,isChecked);
					this.getCartApi()
				}
			},
			// 判断是否全选
			isCheckedAll(){
				return this.cartGoods.every(function(element){
					if(element.checked == true){
						return true;
					}else{
						return false;
					}
				})
			},
			//获取所有购物车商品
			async getCartApi() {
				var res = await getCartApiData();
				// console.log(res)
				if(res.errno == 0){
					res.data.cartList.map(v=>{
						if(v.checked == 1){
							v.checked = true;
						}else{
							v.checked = false;
						}
					})
					this.cartGoods = res.data.cartList;
					this.cartTotal = res.data.cartTotal;
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
				this.checkedAllStatus = this.isCheckedAll();
			}
		},
		onShow() {
			this.getCartApi();
		}
	}
</script>

<style lang="scss" scoped>
.container{
		background: #f4f4f4;
		height: 100vh;
		// min-height: 100%;
		width: 100%;
		.business{
			display: flex;
			padding: 0 30rpx;
			height: 73rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #F4F4F4;
			.item{
			background: url(@/static/images/bot.png) 0 center no-repeat;
			background-size: 10rpx;
			padding-left: 15rpx;
			display: flex;
			align-items: center;
			font-size: 25rpx;
			color: #666;
		}
		}
		.notCart{
			width: 100%;
			height: auto;
			margin: 0 auto;
			.no{
				margin-top: 200rpx;
				width: 100%;
				height: auto;
				image{
					margin: 0 auto;
					display: block;
					text-align: center;
					width: 260rpx;
					height: 260rpx;
				}
				.text{
					margin: 0 auto;
					display: block;
					width: 258rpx;
					height: 29rpx;
					line-height: 29rpx;
					text-align: center;
					font-size: 29rpx;
				}
			}		
		}
		.CartData{
			width: 100%;
			background-color: #fff;
			margin-bottom: 110rpx;

			.list{
				display: flex;
				width: 100%;
				height: 164rpx;
				.checkbox{
					
					height: 34rpx;
					width: 34rpx;
					margin: 65rpx 18rpx 65rpx 26rpx;
					background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png) no-repeat;
					background-size: 34rpx;
				}
				.checked{
					height: 34rpx;
					width: 34rpx;
					margin: 65rpx 18rpx 65rpx 26rpx;
					background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
					background-size: 34rpx;
					
				}
				.cart-goods{
					
					height: 164rpx;
					width: 672rpx;
					border-bottom: 1px solid #f4f4f4;
					.img{
						float: left;
						height:125rpx;
						width: 125rpx;
						background: #f4f4f4;
						margin: 19.5rpx 18rpx 19.5rpx 0;
					}
					.info{
						float: left;
						height:125rpx;
						width: 503rpx;
						margin: 19.5rpx 26rpx 19.5rpx 0;
						
						.t{
							display: flex;
							justify-content: space-between;
							
							margin: 8rpx 0rpx 20rpx 0rpx;
							height: 28rpx;
							font-size: 28rpx;
							color: #333;
							.nums{
								background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/arrow-right1-e9828c5b35.png) right center no-repeat;
								padding-right: 25rpx;
								background-size: 12rpx 20rpx;
								height: 39rpx;
								line-height: 39rpx;
								font-size: 24rpx;
							}
						}
						
						.data-v-0f00adf4{
							margin-bottom: 20rpx;
						}
						.attr{
							margin-bottom: 10rpx;
							height: 16rpx;
						}
						.b{
							display: flex;
							justify-content: space-between;
							height: 52rpx;
							line-height: 52rpx;
							font-size: 28rpx;
							color: #333;
							
							.price{
								float: left;
							}
							.selnum{
								width: 235rpx;
								height: 52rpx;
								border: 1rpx solid #ccc;
								display: flex;
								.cut{
									width: 70rpx;
									height: 100%;
									text-align: center;
									line-height: 50rpx;
								}
								.number{
									flex: 1;
									height: 100%;
									text-align: center;
									line-height: 68.75rpx;
									border-left: 1px solid #ccc;
									border-right: 1px solid #ccc;
									float: left;
								}
								.add{
									width: 80rpx;
									height: 100%;
									text-align: center;
									line-height: 50rpx;
								}
							}
						}
					}
				}
				
			}
		}
		.cart-bottom{
			width: 100%;
			position: fixed;
			display: flex;
			bottom:0;
			left:0;
			height: 100rpx;
			background-color: #fff;
			/* #ifdef H5 */
			margin-bottom: 94rpx;
			/* #endif */
			.checkbox{
				height: 34rpx;
				padding-left: 60rpx;
				line-height: 34rpx;
				margin: 33rpx 18rpx 33rpx 26rpx;
				background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
				background-size: 34rpx;
				font-size: 29rpx;
			}
			.checked{
				height: 34rpx;
				padding-left: 60rpx;
				line-height: 34rpx;
				margin: 33rpx 18rpx 33rpx 26rpx;
				background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png) no-repeat;
				background-size: 34rpx;
				font-size: 29rpx;
			}
			.total{
				height: 34rpx;
				flex: 1;
				margin: 33rpx 10rpx;
				font-size: 29rpx;
			}
			.delete{
				height: 34rpx;
				margin: 33rpx 18rpx;
				font-size: 29rpx;
			}
			.checkout{
				width: 210rpx;
				height: 100rpx;
				background-color: #B90000;
				text-align: center;
				line-height: 100rpx;
				font-size: 29rpx;
				color: #fff;
			}
		}
	}
</style>
