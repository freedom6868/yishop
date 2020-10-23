<template>
	<view class="comment_container">
		<view class="head">
			<view class="item" :class="showType == 0 ? 'active' : '' "  @click="clickTab()">
				<text>全部({{allCount}})</text>
			</view>
			<view class="item" :class="showType == 1 ? 'active' : '' "  @click="clickTab()">
				<text>有图({{hasPicCount}})</text>
			</view>
		</view>
		<view class="body">
			<view class="item left" v-for="(item,index) in comments" :key='index'>
				<view class="info">
					<view class="user">
						<image :src="item.user_info.avatar"
						 class="img" mode=""></image>
						<text>{{item.user_info.nickname}}</text>
					</view>
					<view class="time right">
						{{item.add_time}}
					</view>
				</view>
				<view class="content right">
					{{item.content}}
				</view>
				<view class="imgs">
					<block v-for="(item1,index1) in item.pic_list" :key='index1' >
					<image :src="item1.pic_url" mode="" @click='getImg(index,index1)'></image>
					</block>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getComments,
		getCommentsCount
	} from '@/api/commentApi.js';
	export default {
		data() {
			return {
				valueId: 0, //商品id
				typeId: 0,
				allCount: 0, //评论总数
				hasPicCount: 0, //有图总数
				showType: 0, //展示评价还是有图
				size: 20 , 
				allPage: 1,
				picPage: 1,
				comments: [],
				allCommentList: [],
				picCommentList: [],
			}
		},
		methods: {
			// 获取评价总数
			async getCommentCount() {
				const res = await getCommentsCount({
					valueId: this.valueId,
					typeId: this.typeId
				});
				if (res.errno == 0) {
					this.allCount = res.data.allCount;
					this.hasPicCount = res.data.hasPicCount
				}
			},


			async getCommentList() {
				const res = await getComments({
					valueId: this.valueId,
					typeId: this.typeId,
					size: this.size,
					page: (this.showType == 0 ? this.allPage : this.picPage),
					showType: this.showType
				});
				// console.log(res)
				if(res.errno == 0){
					
					if(this.showType == 0) {
						this.allCommentList = this.allCommentList.concat(res.data.data);
						this.allPage = res.data.currentPage;
						this.comments = this.allCommentList;
						// console.log(this.comments)
					}else {
						this.picCommentList = this.picCommentList.concat(res.data.data);
						this.allPage = res.data.currentPage;
						this.comments = this.picCommentList.filter(item => {
							return item.pic_list.length > 0
						})
						// this.comments = this.picCommentList;
					}
				}
			},
			getImg(InfoIndex,imgIndex) {
				const arr = this.comments[InfoIndex].pic_list.map(item => {
					return item.pic_url
				})  
				uni.previewImage({
					urls: arr,
					current: arr[imgIndex],
				})
				// console.log(this.comments[InfoIndex].pic_list)
			},
			// 点击导航栏
			clickTab() {
				this.showType = this.showType == 1 ? 0 : 1;
				this.getCommentList()
			}
		},
		// 监听用户上拉触底事件
		onReachBottom() {
			if(this.showType == 0) {
				if(this.allCount / this.size < this.allPage) {
					uni.showToast({
						title:'到底啦',
						icon:'none'
					})
					return
				}
				this.allPage = this.allPage +1;
			}else {
				if(this.hasPicCount / this.size < this.picPage) {
					uni.showToast({
						title:'到底啦',
						icon:'none'
					})
					return
				}
				this.picPage = this.picPage +1;
			}
			this.getCommentList()
		},
		onLoad(options) {
			this.valueId = options.valueId;
			this.typeId = options.typeId;

			this.getCommentCount();
			this.getCommentList();

		}
	}
</script>

<style lang="scss" scoped>
	* {
		position: relative;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	view {
		word-break: break-all;
		overflow: auto;
	}

	// 页面左右边距
	.left {
		margin-left: 31.25rpx;
	}

	.right {
		margin-right: 16rpx;
	}

	.comment_container {
		// margin-top: 100rpx;
		position: relative;

		.head {
			display: flex;
			
			position: fixed;
			width: 100%;
			height: 100rpx;
			background: #fff;
			border-bottom: 4rpx solid #f4f4f4;

			.item {
				display: flex;
				align-items: center;
				
				height: 94rpx;
				margin: auto;
				padding: 0 20rpx;
				border-bottom: 2rpx solid #fff;
			}

			.active {
				color: #ab2b2b;
				border-bottom: 2rpx solid #ab2b2b;
			}
		}

		.body {
			padding-top: 100rpx;
			margin-bottom: 10rpx;
			background: #fff;
			
			.item {
				border-bottom: 2rpx solid #f4f4f4;
				background: #fff;
				.info {
					// height: 127rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 33rpx 0 27rpx 0;

					.user {
						display: flex;
						align-items: center;

						.img {
							width: 66rpx;
							height: 66rpx;
							border-radius: 50%;
							margin-right: 17rpx;
						}
					}



					.time {
						color: #7f7f7f;
						font-size: 25rpx;
					}


				}

				.content {
					font-size: 29rpx;
					margin-bottom: 24rpx;
				}

				.imgs {
					margin-bottom: 25rpx;

					image {
						height: 150rpx;
						width: 150rpx;
						margin-right: 28rpx;
					}
				}

			}
		}
	}
</style>
