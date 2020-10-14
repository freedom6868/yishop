<template>
	<view>
		home
	</view>
</template>

<script>
	import { getHomeLunbo } from '@/api/homeApi.js';
	export default {
		data() {
			return {
				Lunbo:[]
			}
		},
		methods: {
			async getLunboDate(){
				var {data} = await getHomeLunbo();
				// this.Lunbo = data.banner
				console.log(data.banner)
			}
		},
		created() {
			this.getLunboDate();
		}
	}
</script>

<style>

</style>
