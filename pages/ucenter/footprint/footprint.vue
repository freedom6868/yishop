<template>
	<view class="container">
		<view class="footprint">
			<view class="day-item" v-for="(item,index) in footprintList" :key='index'>
				<view class="day-hd">{{item[0].add_time}}</view>
				<view class="day-list" >
					<view class="item" v-for="gitem in item" :key='gitem.id'>
						<image class="img" :src="gitem.list_pic_url" mode=""></image>
						<view class="info">
							<view class="name">
								{{gitem.name}}
							</view>
							<view class="subtitle">
								{{gitem.goods_brief}}
							</view>
							<view class="price">
								￥ {{gitem.retail_price}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getFootprintListData} from '@/api/uncenter/footprintApi.js'
	export default {
		data() {
			return {
				footprintList:[],
				currentPage:1,
			};
		},
		methods:{
			
			async getFootprintList(page){
				console.log(page)
				let res = await getFootprintListData({page});
				if(res.errno == 0){
					if(res.data.data.length <=0 ){
						uni.showToast({
							title:'没有更多了'
						})
						return;
					}
					console.log(res.data.data)
					for(var i in res.data.data){
						console.log(i)
						this.footprintList.push(res.data.data[i]);
					}
					// this.footprintList = this.footprintList.concat(res.data.data);
					console.log(this.footprintList)
					this.currentPage = parseInt(res.data.currentPage)
				}
				// console.log(res)
			}
		},
		onLoad() {
			this.getFootprintList(this.currentPage);
		},
		onReachBottom(){
			this.currentPage = this.currentPage + 1;
			
			this.getFootprintList(this.currentPage);
		}
	}
</script>

<style lang="scss">
	.container{
		height: 100vh;
		background-color: #F4F4F4;
		
		.footprint{
			height: auto;
			width: 100%;
			border-top: 2rpx solid #e1e1e1;
			
			.day-item{
				height: auto;
				margin-bottom: 20rpx;
				width: 100%;
				.day-hd{
					padding: 20rpx;
					background-color: #fff;
					font-size: 28rpx;
					color: #333;
				}
				
				.day-list{
					width: auto;
					height: auto;
					background-color: #fff;
					border-top: 2rpx solid #e1e1e1;
					padding-left: 30rpx;
					.item{
						display: flex;
						height: 212rpx;
						align-items: center;
						border-bottom: 2rpx solid #e1e1e1;
						.img{
							width: 150rpx;
							height: 150rpx;
						}
						
						.info{
							padding-left: 20rpx;
							
							.name{
								font-size: 28rpx;
								color: #333;
							}
							.subtitle{
								margin-top: 8rpx;
								color: #888;
								font-size: 24rpx;
							}
							.price{
								margin-top: 8rpx;
								font-size: 28rpx;
								color: #333;
							}
						}
					}
					.item:last-child{
						border: none;
					}
				}
			}
		}
	}
</style>
