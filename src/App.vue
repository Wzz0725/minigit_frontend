<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
        <router-view :key="this.$route.fullPath"></router-view><!-- 通过绑定一个fullPath，可以识别当前页面路由的完整地址，当地址发生改变(包括参数改变)则重新渲染页面(例如动态路由参数的变化 -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
export default {
  name: "App",
  components: { Header },
};
</script>

<style>

</style>
