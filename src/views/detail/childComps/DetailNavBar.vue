<template>
    <div>
      <nav-bar>
        <div slot="nav-left">
          <img src="~assets/images/fanhui.png" alt="" class="back-icon" @click="backClick">
        </div>
        <div slot="nav-center" class="title">
          <div v-for="(item, index) in titles"
               class="title-item" :class="{active: index === currentIndex}"
               @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
        return{
          titles: ['商品', '参数', '评论', '推荐'],
          currentIndex: 0,
        }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back-icon {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }
</style>
