<template>
	<view class="topic-container">
		<!-- 专题内容 -->
		<scroll-view scroll-y="true" scroll-top="scrollTop">
			<view class="topic-content" v-for="item in topicData" :key="item.id" @click="toTopicDetail(item.id)">
				<image class="img" :src="item.scene_pic_url" mode=""></image>
				<view class="content">
					<text class="title">{{ item.title }}</text>
					<text class="desc">{{ item.subtitle }}</text>
					<text class="price">{{ item.price_info }}元起</text>
				</view>
			</view>
			<!-- 切换上一页和下一页 -->
			<view class="check-page">
				<view class="pre-page common " @click="toPrePage">
					上一页
				</view>
				<view class="next-page common" @click="toNextPage">
					下一页
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { getTopicList } from "@/api/topicApi.js";
	export default {
		data() {
			return {
				topicData:[],
				page:1,
				pageSize:10,
				scrollTop:0,
				count:0
			}
		},
		methods: {
			async getTopicListData(){
				let { data } = await getTopicList(this.page,this.pageSize);
				this.topicData = data.data;
				this.count = data.count;
				// console.log(this.count);
				// console.log(this.topicData);
			},
			//前往专题详情
			toTopicDetail(id){
				// console.log("topic",id);
				uni.navigateTo({
					url:"/pages/topicDetail/topicDetail?id="+id
				})
			},
			//切换上一页
			toPrePage(){
				if(this.page < 1){
					// console.log("小于-1了");
					uni.showToast({
						title:"已在第一页了",
						icon:"none",
						duration:1500
					})
					return false;
				}
				this.page = this.page - 1;
				this.getTopicListData();
				this.scrollTop = 0;
			},
			//切换下一页
			toNextPage(){
				if(this.page+1 > this.count / this.pageSize){
					// let aa = this.count / this.pageSize;
					// console.log(this.page+1 + "==" + aa);
					uni.showToast({
						title:"已到最后一页了",
						icon:"none",
						duration:1500
					})
					return false;
				}
				this.page = this.page + 1;
				this.getTopicListData();
				this.scrollTop = 0;
				
			}
			
		},
		created() {
			this.getTopicListData();
		}
		
	}
</script>

<style lang="scss" scoped>
	// page{
	// 	background-color: #F4F4F4;
	// }
	.topic-container{
		background-color: #F4F4F4;
		//每个专题的内容
		.topic-content{
			display: flex;
			flex-direction: column;
			.img{
				width: 100%;
				height: 350rpx;
			}
			.content{
				display: flex;
				flex-direction: column;
				text-align: center;
				background-color: #fff;
				margin-bottom: 18rpx;
				.title{
					font-size: 35rpx;
					color: #333;
					margin-top: 30rpx;
				}
				.desc{
					font-size: 24rpx;
					color: #999;
					margin-top: 16rpx;
					margin-bottom: 30rpx;
				}
				.price{
					font-size: 27rpx;
					color: #b4282d;
					margin-bottom: 16rpx;
				}
			}
		}
		//切换上下页
		.check-page{
			display: flex;
			justify-content: center;
			align-items: space-between;
			.common{
				width: 50%;
				height: 110rpx;
				line-height: 110rpx;
				text-align: center;
				font-weight: 100;
				font-size: 30rpx;
				color: #333;
				background-color: #fff;
			}
			.pre-page{
				border-right: 1rpx solid #d9d9d9;
			}
			.next-page{
				border-left: 1rpx solid #d9d9d9;
			}
			
			
		}
	}
</style>
