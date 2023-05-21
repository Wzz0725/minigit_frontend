<template>
  <div class="welcome-page">
    <div class="column is-4 is-offset-4">
      <img src="@/assets/image/black_radius_minigit.png" alt="图片描述">
    </div>
    <div class="column is-6 is-offset-3 ">
      <p class="is-size-5">
        <span class="has-text-weight-bold">MiniGit</span>是一个代码托管平台，用户可以<span class="has-text-weight-semibold">初始化</span>个人仓库，包括功能<span class="has-text-weight-bold">add、commit、push、pull、delete</span>，以及<span class="has-text-weight-semibold">版本控制</span><span class="has-text-weight-bold">back</span>，还有<span class="has-text-weight-semibold">添加分支、切换分支</span>等操作。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.welcome-page {
  margin-top:10%
}
</style>