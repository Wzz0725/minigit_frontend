<template>
  <div>
    <!-- <div>文件详情</div> -->
    <el-card class="my-2"
      >文件详情，当前分支为：{{ branchName }}
      </el-card
    >
    <nav class="panel">
      <p class="panel-heading">
        <router-link
          :to="{
            name: 'user',
          }"
        >
          {{ accountName }} </router-link
        >/
        <router-link
          :to="{
            name: 'repo-detail',
            params: {
              accountName: accountName,
              repoName: repoName,
              branchName: branchName,
            },
          }"
          >{{ repoName }} </router-link
        >/
        <span v-for="(item, index) in pathArray"
          :key="index">
        <router-link
          :to="{
            name: 'tree-detail',
            params: {
              accountName: accountName,
              repoName: repoName,
              branchName: branchName,
              treeName: getPartialPaths(item)
            },
          }"
          >{{ item }} </router-link
        >/ 
      </span>
        {{ blobName }}
      </p>
    </nav>
    <el-card shadow="never">
      {{ content }}
    </el-card>
  </div>
  
</template>
  
<script>
import {getBlobdetail} from "@/api/repo.js";

export default {
  name: "BlobDetail",
  data() {
    return {
      accountName: this.$route.params.accountName,
      repoName: this.$route.params.repoName,
      branchName: this.$route.params.branchName,
      treeName: this.$route.params.treeName,
      blobName: this.$route.params.blobName,
      content:"",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.pathArray = this.treeName.split("/");
      console.log("分割后的路径：", this.pathArray);
      console.log(
        "显示当前信息" +
          this.accountName +
          "/" +
          this.repoName +
          "/" +
          this.branchName +
          "/" +
          this.treeName +
          "/" +
          this.blobName
      );
      getBlobdetail(this.accountName, this.repoName, this.branchName,this.treeName,this.blobName).then(
        (response) => {
          const { data } = response;
          this.content = data;
          console.log(this.content);
        }
      );
    },
    getPartialPaths(targetString) {
      const targetIndex = this.pathArray.indexOf(targetString);

      if (targetIndex !== -1) {
        return this.pathArray.slice(0, targetIndex + 1).join("/");
      }

      return null; // 如果找不到目标字符串，返回 null 或其他合适的值
    },
  },
};
</script>
  
  <style>
</style>