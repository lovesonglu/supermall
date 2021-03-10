<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
    </scroll>
    <detail-bot-bar @addCart="addToCart"></detail-bot-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBotBar from './childComps/DetailBotBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecomment} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBotBar,
      Scroll,
      GoodList
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo:[],
        recommends:[],
        itemImgListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)

        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.获取商品信息
        this.detailInfo = data.detailInfo;

        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评价信息
        if(data.rate.cRate !== 0){//评价数不为0
          this.commentInfo = data.rate.list
        }
      })

      //3.请求推荐数据
      getRecomment().then(res => {
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 100)
    },
    mounted() {
/*      const refresh = debounce(this.$refs.scroll.refresh, 200)//已混入到mixin.js文件中
      //请求数据列表后刷新
      this.itemImgListener = ()=> {
        refresh()
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener);*/
    },
    destroyed(){
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position){
        const positionY = -position.y

        let length = this.themeTopYs.length
        for(let i=0; i < length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(position);
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {
        }
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.lowNowPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        //this.$store.cartList.push(product)
        //this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
          this.$toast.show(res,1500);
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background: white;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 10;
    background: white;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
