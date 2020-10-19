<template>
	<view class="commentpost-container">
		<textarea class="input-box" 
		v-model="content"
		placeholder="留言经过筛选后,对所有人可见"
		/>
		<view class="choose">
			<text class="common" @click="goBack">取消</text>
			<text class="common" @click="confirmComment">发表</text>
		</view>
	</view>
</template>

<script>
	import { getPostComment } from "@/api/topicDetailApi.js";
	export default {
		data() {
			return {
				content:"",
				valueId:"",
				typeId:""
			}
		},
		methods: {
			//提交评论
			async confirmComment(){
				let valueId = this.valueId;
				let typeId = this.typeId;
				let content = this.content;
				
				if(content.trim() == "" || content.trim() == " "){
					uni.showToast({
						title:"不能提交空评论",
						icon:"none"
					})
					return;
				}
				let res = await getPostComment(typeId,valueId,content);
				if(res.errno == 401){
					uni.showToast({
						title:res.errmsg
					})
					return;
				}else if(res.errno == 0){
					uni.showToast({
						title:res.data,
						duration:2000
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},800)
					
				}
			},
			//点击取消，返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options) {
			this.valueId = options.valueId;
			this.typeId = options.typeId;
		}
	}
</script>

<style lang="scss" scoped>
	
	.commentpost-container{
		// height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		// background-color: #F4F4F4;
		.input-box{
			width: 90%;
			height: 340rpx;
			background-color: #fff;
			margin-top: 30rpx;
			padding: 10rpx;
		}
		.choose{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 60rpx 0 60rpx;
		}
	}
	
</style>
