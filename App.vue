<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		try{
			this.globalData.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.globalData.token = uni.getStorageSync('token')
		}catch(err){
			// console.log(err)
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData:{
		userInfo : {
			nickname : '点击登录',
			avatar:'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
		},
		token:''
	}
};
</script>

<style lang="scss">
	
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	    @import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

page {
		background-color: #f4f4f4;
	}
</style>
