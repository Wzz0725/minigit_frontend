<template>
  <div>
    <el-card class="my-2">
      <router-link
        :to="{
          name: 'user',
        }"
      >
        {{ accountName }}
      </router-link>
      <router-link
        :to="{
          name: 'repo-detail',
          params: {
            accountName: accountName,
            repoName: repoName,
            branchName: branchName,
          },
        }"
        >{{ repoName }}
      </router-link>
      操作界面</el-card
    >
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <p class="panel-heading">未追踪</p>
          <div>
            <a
              class="panel-block"
              v-for="(item, index) in untracked"
              :key="index"
            >
              <span class="panel-icon">
                <i class="el-icon-document" aria-hidden="true"></i>
              </span>
              <span class="has-text-dark"> {{ item }}</span>
            </a>
          </div>
        </nav>
        <article class="panel is-info">
          <p class="panel-heading">已缓存</p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in indexed"
              :key="index"
            >
              <span class="panel-icon">
                <i class="el-icon-document" aria-hidden="true"></i>
              </span>
              <span class="has-text-dark"> {{ item }}</span>
            </a>
          </div>
        </article>
        <article class="panel is-warning">
          <p class="panel-heading">未修改</p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in unmodified"
              :key="index"
            >
              <span class="panel-icon">
                <i class="el-icon-document" aria-hidden="true"></i>
              </span>
              <span class="has-text-dark"> {{ item }}</span>
            </a>
          </div>
        </article>
        <article class="panel is-danger">
          <p class="panel-heading">已修改</p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in modified"
              :key="index"
            >
              <span class="panel-icon">
                <i class="el-icon-document" aria-hidden="true"></i>
              </span>
              <span class="has-text-dark"> {{ item }}</span>
            </a>
          </div>
        </article>
        <article class="panel is-success">
          <p class="panel-heading">已删除</p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in deleted"
              :key="index"
            >
              <span class="panel-icon">
                <i class="el-icon-document" aria-hidden="true"></i>
              </span>
              <span class="has-text-dark"> {{ item }}</span>
            </a>
          </div>
        </article>
      </div>
      <div class="column">
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox> -->
        <el-checkbox-group
          v-model="addFileList"
          @change="handleCheckedFilesChange"
        >
          <article class="panel is-link">
            <p class="panel-heading checkbox-wrapper">
              待Add文件
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              ></el-checkbox>
            </p>
            <a
              class="panel-block checkbox-wrapper"
              v-for="(item, index) in untrackedANDmodified"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true"></i>
                <span class="has-text-dark">{{ item }}</span>
              </span>
              <el-checkbox class="hide-text" :label="item"></el-checkbox>
            </a>
            <a class="panel-block">
              <el-button type="primary" @click="clickToAdd">add</el-button>
            </a>
          </article>
        </el-checkbox-group>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="commitMessage"
          class="my-3"
        >
        </el-input>
        <div class="level-right">
          <el-button type="warning" @click="clickToCommit">commit</el-button>
          <el-button type="success" @click="clickToPush">push</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStatus, add, commit, push } from "@/api/repo.js";

export default {
  name: "Operation",
  data() {
    return {
      accountName: this.$route.params.accountName,
      repoName: this.$route.params.repoName,
      branchName: this.$route.params.branchName,
      untracked: [],
      indexed: [],
      unmodified: [],
      modified: [],
      deleted: [],
      untrackedANDmodified: [],
      addFileList: [],
      checkAll: false,
      isIndeterminate: true,
      commitMessage: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.untracked = [];
      this.indexed = [];
      this.unmodified = [];
      this.modified = [];
      this.deleted = [];
      this.untrackedANDmodified = [];
      getStatus(this.accountName, this.repoName, this.branchName).then(
        (response) => {
          const { data } = response;
          var a = 0,
            b = 0,
            c = 0,
            d = 0,
            e = 0;
          for (const key in data) {
            if (data[key] === 0) {
              this.untracked[a] = key;
              a++;
            } else if (data[key] === 1) {
              this.indexed[b] = key;
              b++;
            } else if (data[key] === 2) {
              this.unmodified[c] = key;
              c++;
            } else if (data[key] === 3) {
              this.modified[d] = key;
              d++;
            } else {
              this.deleted[e] = key;
              e++;
            }
            console.log("key名称是:" + key + ",key的值是:" + data[key]);
          }
          this.untrackedANDmodified = this.untracked.concat(this.modified);
          this.$forceUpdate();
        }
      );
    },
    handleCheckAllChange(val) {
      this.addFileList = val ? this.untrackedANDmodified : [];
      this.isIndeterminate = false;
    },
    handleCheckedFilesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.untrackedANDmodified.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.untrackedANDmodified.length;
    },
    clickToAdd() {
      add(
        this.accountName,
        this.repoName,
        this.branchName,
        this.addFileList
      ).then((response) => {
        const { data } = response;
        this.$message({
          message: data,
          type: "success",
          duration: 2000,
        });
        this.init();
        //this.$forceUpdate();
      });
    },
    clickToCommit() {
      commit(
        this.accountName,
        this.repoName,
        this.branchName,
        this.commitMessage
      ).then((response) => {
        const { data } = response;
        this.$message({
          message: "commit成功!",
          type: "success",
          duration: 2000,
        });
        this.init();
        //this.$forceUpdate();
      });
    },
    clickToPush() {
      push(this.accountName, this.repoName, this.branchName).then(
        (response) => {
          const { data } = response;
          this.$message({
            message: data,
            type: "success",
            duration: 2000,
          });
          this.init();
          //this.$forceUpdate();
        }
      );
    },
  },
};
</script>

<style>
.hide-text .el-checkbox__label {
  display: none;
}
.checkbox-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>