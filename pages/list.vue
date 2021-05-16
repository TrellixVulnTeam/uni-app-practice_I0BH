<template>
	<div>
		<uni-list>
			<uni-list-item 
			v-for="(el, index) in list" 
			:key="index"
			:title="el.text"
			:note="el.updatedAt">
			</uni-list-item>
		</uni-list>
		<uni-load-more 
		:status="status" 
		@clickLoadMore="loadMore"
		:contentText="contentText"
		></uni-load-more>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				status: 'more',
				mount: 10,
				list: [],
				contentText: {contentdown: "点击加载更多",contentrefresh: "正在加载...",contentnomore: "加载完毕"}
			}
		},
		mounted () {
			this.getData()
		},
		methods:{
			loadMore () {
				console.log('加载更多')
			},
			getData () {
				this.status = 'loading'
				uni.request({
					url: `https://cat-fact.herokuapp.com/facts/random?amount=${this.mount}`,
					methods: 'get',
					success: (res) => {
						this.list.push(...res.data)
						this.status = 'more'
					}
				})
			},
			loadMore () {
				console.log('点击')
				this.mount = this.mount + 10
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
