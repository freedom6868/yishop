<template>
	<view class="container">
		<view class="footprint">
			<view class="day-item" v-for="(item,index) in footprintList" :key='index'>
				<!-- {{item[0]}} -->
				<view class="day-hd">{{item[0].add_time}}</view>
				<view class="day-list" >
					<view class="item" v-for="gitem in item" :key='gitem.id' @longpress='delFootprint(gitem.id)'>
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
	import {getFootprintListData,deleteFootprintData} from '@/api/uncenter/footprintApi.js'
	export default {
		data() {
			return {
				footprintList:[],
				productList:{}, 
				currentPage:1,
			};
		},
		methods:{
			
			async getFootprintList(){
				let res = await getFootprintListData({page:this.currentPage});
				
				if(res.errno == 0){
					// let responData = res.data.data;
					// responData.forEach(itemArr => {
					// 	var key = itemArr[0].add_time;
					// 	this.productList[key] = itemArr
					// })
					this.footprintList = res.data.data;
					this.currentPage = parseInt(res.data.currentPage);
				}else{
					uni.showToast({
						title:res.errmsg
					})
				}
				console.log(res)
			},
			async loadMore(){
				// console.log('loadMore.....')
				// console.log('footprintList',this.footprintList)
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
				let lastTimeArr = this.footprintList[this.footprintList.length-1];
				for(let i in responData){
					if(lastTimeArr[lastTimeArr.length-1].add_time == responData[i][0].add_time){
						this.footprintList[this.footprintList.length-1] = lastTimeArr.concat(responData[i]);
					}else{
						this.footprintList.push(responData[i])
					}
				}
				// responData.forEach( itemArr =>{
				// 	let key = itemArr[0].add_time
				// 	if(this.productList[key]){
				// 		this.productList[key] = this.productList[key].concat(itemArr);
				// 	}else{
				// 		this.productList[key] = itemArr;
				// 	}
				// })
				this.$forceUpdate();
				// console.log(this.productList)
				
			},
			delFootprint(id){
				let _this = this;
				uni.showModal({
					title:'',
					content:"确定要删除吗?",
					async success(res) {
						if(res.confirm){
							console.log('点击了确定');
							let res = await deleteFootprintData({footprintId:id});
							if(res.errno == 0){
								uni.showToast({
									title:"删除成功",
									icon:"success",
									duration:1000
								});
								_this.footprintList.forEach( (v,vIndex) =>{
									v.forEach( (item,index) =>{
										if(item.id == id){
											v.splice(index,1);
										}
									});
									if(v.length == 0){
										_this.footprintList.splice(vIndex,1);
									}
								} )
								_this.$forceUpdate()
							}
						}else{
							console.log('点击了取消')
						}
					}
				})
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
