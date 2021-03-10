<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="nav-center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品的列表-->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      CartList,
      CartBottomBar,
      NavBar,
      Scroll
    },
    computed:{
      ...mapGetters(['cartLength'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background: var(--color-high-text);
    color: white;
  }
  .content{height: calc(100% - 44px - 49px - 40px);overflow: hidden;}
</style>
