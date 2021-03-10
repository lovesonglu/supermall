<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物街</div>
    </nav-bar>

    <tab-control ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
                 :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>

    <scroll ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            class="contentk">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods">
      </goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMulidata, getHomeGoods} from "network/home";
  /*import {debounce} from "common/utils";*/
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,

      NavBar,
      TabControl,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data(){
      return{
        banners: [],
        recommends: [],
        goods:{
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    destroyed(){

    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated(){
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMulidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){
      //已混入到mixin.js文件中
/*      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      //对监听的事件进行保存
      this.itemImgListener = () => {//监听事件总线
        refresh();
      }
      //监听item中图片加载完成
      this.$bus.$on('itemImgLoad', this.itemImgListener)*/

      //2.获取tabControl的offsetTop
      //所有组件都有一个属性$el：用于获取组件中的元素
      //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    methods:{

      //事件监听相关方法
      tabClick(index){
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

/*      backClick(){//已混入
        this.$refs.scroll.scrollTo(0, 0);
      },*/

      contentScroll(position){
        //1.判断backtop是否显示
        /*this.isShowBackTop = (-position.y) > 1000*///已混入
        this.listenShowBackTop(position)

        //2.决定tabcontrol是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore(){
        console.log('加载更多');
        this.getHomeGoods(this.currentType)

        //this.$refs.scroll.refresh();
      },

      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      //网络请求相关方法
      getHomeMulidata(){
        getHomeMulidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
    z-index: 1;
  }
  .home-nav{
    background: var(--color-high-text);
    color: white;

/*    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
    background: white;
  }
  .contentk{
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top:44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
</style>
