import {debounce} from "common/utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    //请求数据列表后刷新
    this.itemImgListener = ()=> {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener);
    console.log('我是混入');
  }
}
//返回顶部混入
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
