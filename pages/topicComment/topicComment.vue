<template>
	<view class="comment-container">
		<view class="comment-list">
			<view class="comment-item" v-for="item in moreCommentData" :key="item.id">
				<view class="item-top">
					<view class="user-info">
						<view class="icon">
							<u-image width="80rpx" height="80rpx" :src="item.user_info.avatar"
							 shape="circle"></u-image>
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
	</view>
</template>

<script>
	import { getMoreComment } from "@/api/topicDetailApi.js";
	export default {
		data() {
			return {
				id: "",
				typeId: "",
				size:100,
				page:1,
				showType:0,
				moreCommentData:[]
			}
		},
		methods: {
			//获取更多碰评论
			async getMoreCommentData(){
				let id = this.id;
				let typeId = this.typeId;
				let size = this.size;
				let page = this.page;
				let showType = this.showType;
				let { data } = await getMoreComment(id,typeId,size,page,showType);
				this.moreCommentData = data.data;
				console.log(this.moreCommentData);
 			}
		},
		onLoad(options) {
			this.id = options.valueId;
			this.typeId = options.typeId;
			console.log( "onload", this.id);
			this.getMoreCommentData();
		}
		
	}
</script>

<style lang="scss" scoped>
	.comment-container {
		
		.comment-list {
			margin-top: 60rpx;
			padding-left: 30rpx;
			.comment-item {
				border-bottom: 1px solid #d8d8d8;
				padding: 20rpx 0rpx 20rpx 0rpx;
				margin-bottom: 10rpx;
				.item-top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.user-info {
						display: flex;
						align-items: center;

						.name {
							padding-left: 20rpx;
							font-size: 28rpx;
						}
					}

					.time {
						padding-right: 20rpx;
						color: #7f7f7f;
						font-size: 25rpx;
					}
				}
				.item-bottom {
					width: 720rpx;
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #333;
					padding: 10rpx 20rpx 20rpx 0;
				}
			}
		}
	}
</style>
