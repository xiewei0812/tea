import {mapGetters} from 'vuex'

export default {
	computed:{
	  ...mapGetters('m_cart',['total']),
	},
	watch:{
		total(){
			this.setBadge()
		},
	},
	onshow(){
		this.setBadge()
	},
	methods:{
		//设置导航栏的小图标
		setBadge(){
			// console.log(this.total)
			uni.setTabBarBadge({
				index:2,
				text: this.total +'',
			})
		},
	}
}