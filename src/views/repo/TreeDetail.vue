<template>
  <div>
    <el-card class="my-2">目录详情，当前分支为：{{ branchName }} </el-card>
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
      </p>
      <div>
        <a class="panel-block is-active">
          <span class="panel-icon">
            <i class="el-icon-folder" aria-hidden="true"></i>
          </span>
          <router-link
            v-if="getUpath(treeName) == null || getUpath(treeName) === ''"
            :to="{
              name: 'repo-detail',
              params: {
                accountName: accountName,
                repoName: repoName,
                branchName: branchName,
              },
            }"
          >
            <span class="has-text-dark"> ...</span>
          </router-link>
          <router-link
            v-else
            :to="{
              name: 'tree-detail',
              params: {
                accountName: accountName,
                repoName: repoName,
                branchName: branchName,
                treeName: getUpath(treeName),
              },
            }"
          >
            <span class="has-text-dark"> ...</span>
          </router-link>
        </a>
      </div>
      <div>
        <a
          class="panel-block is-active"
          v-for="(item, index) in tree"
          :key="index"
        >
          <span class="panel-icon">
            <i class="el-icon-folder" aria-hidden="true"></i>
          </span>
          <router-link
            :to="{
              name: 'tree-detail',
              params: {
                accountName: accountName,
                repoName: repoName,
                branchName: branchName,
                treeName: getRpath(item),
              },
            }"
          >
            <span class="has-text-dark"> {{ item }}</span>
          </router-link>
        </a>
      </div>
      <div>
        <a
          class="panel-block is-active"
          v-for="(item, index) in blob"
          :key="index"
        >
          <span class="panel-icon">
            <i class="el-icon-document" aria-hidden="true"></i>
          </span>
          <router-link
            :to="{
              name: 'blob-detail',
              params: {
                accountName: accountName,
                repoName: repoName,
                branchName: branchName,
                treeName: treeName,
                blobName: item,
              },
            }"
          >
            <span class="has-text-dark"> {{ item }}</span>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import { getTreedetail } from "@/api/repo.js";

export default {
  name: "TreeDetail",
  data() {
    return {
      accountName: this.$route.params.accountName,
      repoName: this.$route.params.repoName,
      branchName: this.$route.params.branchName,
      treeName: this.$route.params.treeName,
      pathArray: [],
      tree: [],
      blob: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.pathArray = this.treeName.split("/");
      console.log("分割后的路径：", this.pathArray);
      /* console.log("获得的对应路由参数：",this.getPartialPaths("dir0")) */
      getTreedetail(
        this.accountName,
        this.repoName,
        this.branchName,
        this.treeName
      ).then((response) => {
        const { data } = response;
        var i = 0,
          j = 0;
        for (const key in data) {
          if (data[key] === "tree") {
            this.tree[i] = key;
            i++;
          } else {
            this.blob[j] = key;
            j++;
          }
          console.log("key名称是:" + key + ",key的值是:" + data[key]);
        }
        console.log(this.tree);
        console.log(this.blob);
        this.$forceUpdate();
      });
    },
    getRpath(item) {
      //获取相对路径
      console.log("getRpath(" + item + ")");
      const str1 = this.treeName;
      const str2 = item;
      const result = `${str1}/${str2}`;
      console.log(result);

      console.log(this.treeName + "/" + item);
      return result;
    },
    getUpath(path) {
      console.log("getUpath(" + path + ")");
      //获取上级目录
      let lastSlashIndex = path.lastIndexOf("/");
      let result = path.substring(0, lastSlashIndex);
      console.log(result);
      return result;
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