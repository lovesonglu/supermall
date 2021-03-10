<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar",
    }
</script>

<style scoped>

  #tab-bar{
    display: flex;
    background: #f6f6f6;
    position: fixed;
    z-index: 9;
    bottom:0;
    left:0;
    right: 0;
    box-shadow: 0px -2px 1px rgba(100,100,100,0.1);
  }
</style>
