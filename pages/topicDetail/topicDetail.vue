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
					<image class="icon" src="@/static/images/postcomment.png" mode="" @click="toPostComment"></image>
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
			<view class="load-more" v-if="isShow">
				<button style="background-color: #fff;" class="btn" type="default" @click="loadMore">查看更多</button>
			</view>
			<view class="topic-rec">
				专题推荐
			</view>
			<!-- 专题推荐列表 -->
			<view class="topic-list">
				<view class="topic-item" v-for="item in detailRecData" :key="item.id" @click="toTopicDetail(item.id)">
					<view class="pic-box">
						<image class="pic" :src="item.scene_pic_url" mode=""></image>
					</view>
					<view class="title">
						{{ item.title }}
					</view>
				</view>
			</view>
	</view>
	
</template>

<script>
	import { getTopicDetailPic,getDetailComment,getTopicRecommend } from "@/api/topicDetailApi.js"
	export default {
		data() {
			return {
				id:"",
				typeId:1,
				size:5,
				isShow:false,
				detailPicData:[],
				detailCommentData:[],
				detailRecData:[]
			}
		},
		methods: {
			//获取专题详情图片
			async getDetailPic(){
				let { data } = await getTopicDetailPic(this.id);
				let str = data.content;
				//使用正则将所需要的图片获取出来并添加上 " https: "
				//   yanxuan.nosdn.127.net/79ee021bbe97de7ecda691de6787241f.jpg
				//   https://yanxuan.nosdn.127.net/75c55a13fde5eb2bc2dd6813b4c565cc.jpg
				let reg =  /src=\"([a-zA-Z\:\/\d\.]+)/gi;
				let r;
				while(r = reg.exec(str)){
					// console.log("https:"+r[1]);
					let pic = "https:" + r[1];
					this.detailPicData.push(pic);
				}
				// console.log(this.detailPicData);
			},
			//获取评论信息
			async getDetailCommentData(){
				let valueId = this.id;
				let typeId = this.typeId;
				let size = this.size;
				let { data } = await getDetailComment(valueId,typeId,size);
				this.detailCommentData = data.data;
				// console.log(this.detailCommentData);
				//判断评论数量大于5显示加载更多按钮
				if(data.count > 5){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
			},
			//获取专题推荐信息
			async getTopicRecommendData(){
				let { data } = await getTopicRecommend(this.id);
				this.detailRecData = data;
				// console.log(this.detailRecData)
			},
			//点击跳转到专题详情
			toTopicDetail(id){
				uni.navigateTo({
					url:"/pages/topicDetail/topicDetail?id="+id
				})
			},
			//点击加载更多
			loadMore(){
				console.log(this.id);
				let id = this.id;
				uni.navigateTo({
					url:"/pages/topicComment/topicComment?valueId=" + id + "&typeId=1"
				})
			},
			//点击前往发表评论
			toPostComment(){
				let valueId = this.id;
				uni.navigateTo({
					url:"/pages/commentPost/commentPost?valueId=" + valueId + "&typeId=1"
				})
			}
		},
		onLoad(options) {
			//获取专题页传递过来的id
			this.id = options.id;
			// this.getDetailPic();
			// this.getDetailCommentData();
			// this.getTopicRecommendData();
		},
		onShow() {
			this.getDetailPic();
			this.getDetailCommentData();
			this.getTopicRecommendData();
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
		.topic-rec{
			height: 100rpx;
			line-height: 80rpx;
			text-align: center;
			padding-top: 20rpx;
		}
		.topic-list{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.topic-item{
				width: 92%;
				height: 350rpx;
				padding: 20rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				.pic-box{
					text-align: center;
					.pic{
						width: 100%;
						height: 250rpx;
					}
				}
				.title{
					font-size: 28rpx;
					margin: 20rpx 0 20rpx 0;
				}
			}
		}
	}
</style>
