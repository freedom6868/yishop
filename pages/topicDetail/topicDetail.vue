<template>
	<view class="topicDetail-container">
			<!-- 专题详情图片 -->
			<view class="img-box" v-for="item in detailPicData" :key="item">
				<image class="img" :src="item" mode=""></image>
			</view>
			<view class="comment-box">
				<!-- 精选留言 -->
				<view class="choiceness-comment">
					<text class="title">精选留言</text>
					<image class="icon" src="../../static/images/postcomment.png" mode=""></image>
				</view>
				<!-- 用户留言区 -->
				<view class="comment-item" v-for="item in detailCommentData" :key="item.id">
					<view class="item-top">
						<view class="user-info">
							<view class="icon">
								<u-image width="80rpx" height="80rpx" :src="item.user_info.avatar" shape="circle"></u-image>
							</view>
							<view class="name">
								{{ item.user_info.nickname }}
							</view>
						</view>
						<view class="time">
							{{ item.add_time }}
						</view>
					</view>
					<view class="item-bottom">
						{{ item.content }}
					</view>
				</view>
			</view>
			<!-- 加载更多按钮 -->
			<view class="load-more">
				<button style="background-color: #fff;" class="btn" type="default">查看更多</button>
			</view>
			<view class="topic-list">
				lsjdi
			</view>
	</view>
	
</template>

<script>
	import { getTopicDetailPic,getDetailComment } from "@/api/topicDetailApi.js"
	export default {
		data() {
			return {
				id:"",
				typeId:1,
				size:5,
				detailPicData:[],
				detailCommentData:[]
			}
		},
		methods: {
			//获取专题详情图片
			async getDetailPic(){
				let { data } = await getTopicDetailPic(this.id);
				// this.detailPicData = data.content;
				let str = data.content;
				//使用正则将所需要的图片获取出来并添加上 " https: "
				//   yanxuan.nosdn.127.net/79ee021bbe97de7ecda691de6787241f.jpg
				//   https://yanxuan.nosdn.127.net/75c55a13fde5eb2bc2dd6813b4c565cc.jpg
				let reg =  /src=\"([a-zA-Z\:\/\d\.]+)/gi;
				let r;
				while(r = reg.exec(str)){
					console.log("https:"+r[1]);
					let pic = "https:" + r[1];
					this.detailPicData.push(pic);
				}
				console.log(this.detailPicData);
			},
			async getDetailCommentData(){
				let valueId = this.id;
				let typeId = this.typeId;
				let size = this.size;
				let { data } = await getDetailComment(valueId,typeId,size);
				this.detailCommentData = data.data;
				console.log(this.detailCommentData);
			}
		},
		onLoad(options) {
			//获取专题页传递过来的id
			this.id = options.id;
			this.getDetailPic();
			this.getDetailCommentData();
		}
	}
</script>

<style lang="scss" scoped>
	.topicDetail-container{
		background-color: #F4F4F4;
		.img-box{
			margin-bottom: 10rpx;
			// background-color: #F4F4F4;
			.img{
				width: 100%;
				height: 440rpx;
			}
		}
		
		.comment-box{
			background-color: #fff;
			padding: 0rpx 0rpx 20rpx 20rpx;
			.choiceness-comment{
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #d8d8d8;
				.title{
					font-size: 20rpx;
				}
				.icon{
					width: 40rpx;
					height: 40rpx;
					padding-right: 20rpx;
				}
			}
			.comment-item{
				border-bottom: 1px solid #d8d8d8;
				padding: 20rpx 0rpx 20rpx 0rpx;
				.item-top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.user-info{
						display: flex;
						align-items: center;
						.name{
							padding-left: 20rpx;
							font-size: 28rpx;
						}
					}
					.time{
						padding-right: 20rpx;
						color: #7f7f7f;
						font-size: 25rpx;
					}
				}
				.item-bottom{
					width: 720rpx;
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #333;
					padding-right: 20rpx;
				}
			}
		}
		.load-more{
			button::after{
				border: none;
				outline: none;
				border-radius: 0px;
				color: #000000;
				box-sizing: 100;
			}
		}
	}
</style>
