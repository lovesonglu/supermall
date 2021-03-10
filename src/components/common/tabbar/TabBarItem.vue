<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :class="{active:isActive}" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!--<img src="../../assets/img/tabbar/home.png">
    <div>首页</div>-->
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      data(){
          return{
            //isActive:true
          }
      },
      computed:{
        isActive(){
          return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle(){
          return this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods:{
          itemClick(){
            if(!this.isActive){
              this.$router.replace(this.path)
            }
          }
      }
    }
</script>

<style scoped>

  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }

</style>
