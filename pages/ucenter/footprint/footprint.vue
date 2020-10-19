<template>
	<view class="container">
		<view class="footprint">
			<view class="day-item" v-for="(item,index) in productList" :key='index'>
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
				productList:{}, // {'昨天':[],今天：【】，‘201':[]}
				currentPage:1,
			};
		},
		methods:{
			
			async getFootprintList(){
				let res = await getFootprintListData({page:this.currentPage});
				
				if(res.errno == 0){
					this.footprintList = res.data.data
					this.footprintList.forEach(itemArr => {
						var key = itemArr[0].add_time;
						this.productList[key] = itemArr
					})
					// var key="今天"
					// console.log(this.productList[key])
					// console.log('initfootprintList',this.footprintList)
					// console.log('productList',this.productList)
					this.currentPage = parseInt(res.data.currentPage)
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
				console.log(res)
			},
			async loadMore(){
				console.log('loadMore.....')
				console.log('footprintList',this.footprintList)
				this.currentPage = this.currentPage + 1;
				let res = await getFootprintListData({page:this.currentPage});
				var responData = res.data.data
				if(responData.length <=0 ){
					uni.showToast({
						title:'没有更多了'
					})
					return;
				}
				
				// console.log(responData)
				// let lastTimeArr = this.footprintList[this.footprintList.length-1];
				// for(let i in responData){
				// 	if(lastTimeArr[lastTimeArr.length-1].add_time == responData[i][0].add_time){
				// 		this.footprintList[this.footprintList.length-1] = lastTimeArr.concat(responData[i]);
				// 	}else{
				// 		this.footprintList.push(responData[i])
				// 	}
				// }
				responData.forEach( itemArr =>{
					let key = itemArr[0].add_time
					if(this.productList[key]){
						this.productList[key] = this.productList[key].concat(itemArr);
					}else{
						this.productList[key] = itemArr;
					}
				})
				console.log(this.productList)
				
			}
		},
		onLoad() {
			this.getFootprintList();
		},
		async onReachBottom(){
			this.loadMore()
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
