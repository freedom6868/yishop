<template>
	<view class="helpCenter">
		<text class="title">常见问题</text>
		<u-collapse>
			<u-collapse-item :title="item.issue" v-for="(item, index) in itemList" :key="index">
				{{item.answer}}
			</u-collapse-item>
		</u-collapse>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[
					{"issue":"网易严选的商品都是正品吗？","answer":"网易严选秉承网易一贯的严谨态度，对商品的产地、工艺、原材料都严格把关，力求帮消费者甄选到最优质的商品，您可以放心选购。"},
					{"issue":"网易严选的订单如何配送？","answer":"网易严选会根据商品所在地、顾客所在地和商品的尺寸重量优选物流配送商，确保优质用户体验。目前暂不支持自选快递，具体物流信息可在下单成功后“我的订单-追踪物流”中查看。"},
					{"issue":"我的包裹多长时间能送到？","answer":"我们会在订单支付成功后1-3天内发货（节假日顺延，部分特殊商品七天内发货），送达时间视快递配送时间而定。"},
					{"issue":"如何免运费？","answer":" 对于严选自营仓商品，前述商品单笔订单总价金额（不含运费）大于或等于99元的，我们提供一次免费送货服务；对于严选合作仓商品，订购一件前述商品，我们即提供一次免费送货服务。港澳台地区需单笔订单金额大于或等于500元，我们提供一次免费送货服务； 部分商品的详情页服务政策中说明有单独的运费政策，以商详页运费说明为准。"},
					{"issue":"订单生成后我需要在多长时间内支付货款？","answer":"下单后我们会为您保留1小时，为确保订单的有效性，需要您在1小时内完成支付。"},
					{"issue":"在线支付已经成功，为什么我的订单状态还是显示“待付款”？","answer":"一般来说，网上支付是即时到账的。但有时因为网络原因，可能会有几分钟的延迟，请您耐心等待，并及时查询您的银行卡账户余额，如果费用已扣，但订单状态依然是“等待付款”，请联系客服处理。"}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.helpCenter{
		background-color: #FFFFFF;
		.title{
			display: inline-block;
			font-size: 40rpx;
			text-align: center;
			width: 100%;
		}
	}
</style>
