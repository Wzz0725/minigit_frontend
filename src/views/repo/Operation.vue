<template>
  <div>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <el-card class="my-2">
          <router-link
            :to="{
              name: 'user',
            }"
          >
            <span class="is-size-5">{{ accountName }}</span> 
          </router-link>
          <span class="is-size-5"> / </span> 
          <router-link
            :to="{
              name: 'repo-detail',
              params: {
                accountName: accountName,
                repoName: repoName,
                branchName: branchName,
              },
            }"
            ><span class="is-size-5">{{ repoName }}</span>
          </router-link>
           操作界面
        </el-card>
        <!-- 标签导航栏 -->
        <div class="tabs is-centered is-boxed">
          <ul>
            <li :class="{ 'is-active': activeTab === 'filestatus' }">
              <a @click="changeTab('filestatus')">
                <!-- <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span> -->
                <span>File Status</span>
              </a>
            </li>
            <li :class="{ 'is-active': activeTab === 'add' }">
              <a @click="changeTab('add')">
                <!-- <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span> -->
                <span>Add</span>
              </a>
            </li>
            <li :class="{ 'is-active': activeTab === 'commit' }">
              <a @click="changeTab('commit')">
                <!-- <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span> -->
                <span>Commit</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- File Status页面 -->
        <!-- 所有文件 -->
        <article class="panel" v-if="activeTab === 'filestatus'">
          <p class="panel-heading">所有文件</p>
          <div>
            <!-- 未追踪 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in untracked"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: grey;"></i>
              </span>
              <span style="color: grey;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
            <!-- 已缓存 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in indexed"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: green;"></i>
              </span>
              <span style="color: green;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
            <!-- 未修改 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in unmodified"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: black;"></i>
              </span>
              <span style="color: black;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
            <!-- 已修改 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in modified"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: orange;"></i>
              </span>
              <span style="color: orange;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
          </div>
        </article>
        <!-- 已删除 -->
        <article class="panel" v-if="activeTab === 'filestatus'">
          <p class="panel-heading">
            <i class="el-icon-delete-solid" aria-hidden="true" style="color: black;"></i>
          </p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in deleted"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: red;"></i>
              </span>
              <span style="color: red;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
          </div>
        </article>

        <!-- Add页面 -->
        <!-- 待Add -->
        <div v-if="activeTab === 'add'">
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
              <!-- 未追踪 -->
              <a
                class="panel-block checkbox-wrapper"
                v-for="(item, index) in untracked"
                :key="index"
              >
                <span>
                  <i class="el-icon-document mr-2" aria-hidden="true" style="color: grey;"></i>
                  <span style="color: grey;" class="has-text-weight-semibold">{{ item }}</span>
                </span>
                <el-checkbox class="hide-text" :label="item"></el-checkbox>
              </a>
              <!-- 已修改 -->
              <a
                class="panel-block checkbox-wrapper"
                v-for="(item, index) in modified"
                :key="index"
              >
                <span>
                  <i class="el-icon-document mr-2" aria-hidden="true" style="color: orange;"></i>
                  <span style="color: orange;" class="has-text-weight-semibold">{{ item }}</span>
                </span>
                <el-checkbox class="hide-text" :label="item"></el-checkbox>
              </a>
              <!-- 提交按钮 -->
              <a class="panel-block">
                <el-button type="primary" @click="clickToAdd">add</el-button>
              </a>
            </article>
          </el-checkbox-group>
        </div><br />
        <!-- 已缓存 -->
        <article class="panel is-success" v-if="activeTab === 'add'">
          <p class="panel-heading">已缓存</p>
          <div>
            <a
              class="panel-block is-active"
              v-for="(item, index) in indexed"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: green;"></i>
              </span>
              <span style="color: green;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
          </div>
        </article>

        <!-- Commit、Push页面 -->
        <article class="panel is-info" v-if="activeTab === 'commit'">
          <p class="panel-heading">待Commit文件</p>
          <div>
            <!-- 已缓存 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in indexed"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: green;"></i>
              </span>
              <span style="color: green;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
            <!-- 已删除 -->
            <a
              class="panel-block is-active"
              v-for="(item, index) in deleted"
              :key="index"
            >
              <span>
                <i class="el-icon-document mr-2" aria-hidden="true" style="color: red;"></i>
              </span>
              <span style="color: red;" class="has-text-weight-semibold"> {{ item }}</span>
            </a>
          </div>
        </article>
        <!-- commit信息文本框 -->
        <el-input
            type="textarea"
            autosize
            placeholder="请输入commit信息"
            v-model="commitMessage"
            class="my-3"
            v-if="activeTab === 'commit'"
            >
        </el-input>
        <!-- commit、push按钮 -->
        <div class="level-right" v-if="activeTab === 'commit'">
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
      untracked: [], // 未追踪
      indexed: [],   //缓存区
      unmodified: [],//未修改
      modified: [],  //已修改
      deleted: [],   //已删除
      untrackedANDmodified: [], //待上传
      addFileList: [],
      checkAll: false,
      isIndeterminate: true,
      commitMessage: "",
      // 新增
      activeTab: 'filestatus',
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.commitMessage="";
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
        /* this.$message({
          message: data,
          type: "success",
          duration: 2000,
        }); */
        this.$buefy.snackbar.open({
          message: data,
          type: "is-success",
          position: "is-top",
          actionText: "OK",
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
        /* this.$message({
          message: "commit成功!",
          type: "success",
          duration: 2000,
        }); */
        this.$buefy.snackbar.open({
          message: "commit成功!",
          type: "is-success",
          position: "is-top",
          actionText: "OK",
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
          /* this.$message({
            message: data,
            type: "success",
            duration: 2000,
          }); */
          this.$buefy.snackbar.open({
          message: data,
          type: "is-success",
          position: "is-top",
          actionText: "OK",
          duration: 2000,
        });
          this.init();
          //this.$forceUpdate();
        }
      );
    },
    // 新增
    changeTab(tab) {
      this.activeTab = tab;
    }
  }
}
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