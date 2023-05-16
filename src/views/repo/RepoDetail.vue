<template>
  <div>
    <el-card class="my-2">仓库详情About 当前分支为{{ branchName }}</el-card>
    <div class="level my-1">
      <el-dropdown @command="handleCommand">
        <el-button type="primary" plain>
          {{ branchName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in branches"
            :key="index"
            :command="item.name"
          >
            {{ item.name }}
          </el-dropdown-item>
          <el-dropdown-item command="add new branch"
            >添加新分支</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="添加新分支" :visible.sync="dialogVisible">
        <el-form :model="form" ref="form">
          <el-form-item label="分支名" :label-width="formLabelWidth">
            <el-input v-model="newBranch" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="源分支" :label-width="formLabelWidth">
            <el-select v-model="form.name" placeholder="请选择">
              <el-option
                v-for="(item, index) in branches"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <div class="level-right">
        <el-button type="success" plain @click="clickToPull" round>pull/clone</el-button>
        <el-button type="warning" plain @click="goToOperation" round>operation</el-button>
        <el-button type="danger" plain round icon="el-icon-delete" @click="goToDelete">delete</el-button>
      </div>
      <el-dialog title="指定本地文件夹" :visible.sync="dialogVisible2">
        <el-form :model="pullRepo" ref="pullRepo">
          <el-form-item label="本地文件夹" :label-width="formLabelWidth">
            <el-input v-model="pullRepo.path" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('pullRepo')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <nav class="panel">
      <p class="panel-heading">
        <span class="level">
          <span>
            <router-link
              :to="{
                name: 'user',
              }"
            >
              {{ accountName }}
            </router-link>
            / {{ repoName }}
          </span>
          <span class="level-right">
            <el-link type="success" :underline="false" @click="clickToCommits"
              ><i class="el-icon-time"></i> commits</el-link
            >
          </span>
        </span>
      </p>

      <div>
        <a class="panel-block" v-for="(item, index) in tree" :key="index">
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
                treeName: item,
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
import {
  getRepodetail,
  getBranches,
  getRepolist,
  addNewbranch,
  pull,
  deleteRepo,
} from "@/api/repo.js";

export default {
  name: "RepoDetail",
  data() {
    return {
      accountName: this.$route.params.accountName,
      repoName: this.$route.params.repoName,
      branchName: this.$route.params.branchName,
      tree: [],
      blob: [],
      branches: [],
      dialogVisible: false,
      newBranch: "",
      form: {
        name: "",
        repoId: 0,
        authorId: 0,
        createTime: "",
        headHash: null,
      },
      pullRepo: {
        id: "",
        authorId: "",
        name: "",
        isPublic: true,
        path: "",
        createTime: "",
      },
      formLabelWidth: "120px",
      dialogVisible2: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    getBranchName() {
      return this.branchName;
    },
    init() {
      getRepodetail(this.accountName, this.repoName, this.branchName).then(
        (response) => {
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
        }
      );
      getBranches(this.accountName, this.repoName).then((response) => {
        const { data } = response;
        this.branches = data;
        this.$forceUpdate();
      });
      getRepolist(this.accountName).then((response) => {
        const { data } = response;
        this.repoList = data;
        console.log(this.repoList);
        for (var i = 0; i < this.repoList.length; i++) {
          if (this.repoList[i].name == this.repoName) {
            this.form.repoId = this.repoList[i].id;
            this.pullRepo.id = this.repoList[i].id;
            this.form.authorId = this.repoList[i].authorId;
            this.pullRepo.authorId = this.repoList[i].authorId;
            this.pullRepo.name = this.repoList[i].name;
            this.pullRepo.isPublic = this.repoList[i].isPublic;
            this.pullRepo.createTime = this.repoList[i].createTime;
            for (var j = 0; j < this.branches; j++) {
              if (this.branches.repoId == this.form.repoId) {
                this.form.createTime = this.branches.createTime;
              }
            }
          }
        }
        console.log(this.form);
      });
    },

    goToOperation() {
      this.$router.push({
        name: "operation",
        params: {
          accountName: this.accountName,
          repoName: this.repoName,
          branchName: this.branchName,
        },
      });
    },
    handleCommand(command) {
      if (command == "add new branch") {
        this.dialogVisible = true;
      } else {
        this.$message({
          message: "切换分支为" + command,
          type: "success",
          duration: 2000,
        });
        this.$router.push({
          name: "repo-detail",
          params: {
            accountName: this.accountName,
            repoName: this.repoName,
            branchName: command,
          },
        });
      }
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          /*  getRepolist(this.accountName).then((response) => {
            const { data } = response;
            this.repoList = data;
            console.log(this.repoList)
            for (var i = 0; i < this.repoList.length; i++) {
              if (this.repoList[i].name == this.repoName) {
                this.form.repoId = this.repoList[i].id;
                this.form.authorId = this.repoList[i].authorId;
                this.form.createTime = this.getNowTime()
              }
            }
            console.log(this.form)
          }); */
          addNewbranch(
            this.accountName,
            this.repoName,
            this.newBranch,
            this.form
          ).then((response) => {
            console.log(response);
            const { data } = response;
            this.dialogVisible = false;
            this.$message({
              message: "成功创建分支" + data.name,
              type: "success",
              duration: 2000,
            });
            this.init();
          });
        } else {
          return false;
        }
      });
    },
    clickToPull() {
      this.dialogVisible2 = true;
    },
    submitForm2(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          pull(
            this.accountName,
            this.repoName,
            this.branchName,
            this.pullRepo
          ).then((response) => {
            console.log(response);
            const { data } = response;
            this.dialogVisible2 = false;
            this.$message({
              message: "成功pull/clone",
              type: "success",
              duration: 2000,
            });
          });
        } else {
          return false;
        }
      });
    },
    /* getNowTime: function () {
      let dateTime;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      console.log(dateTime);
      return dateTime;
    }, */
    clickToCommits() {
      this.$router.push({
        name: "commits",
        params: {
          accountName: this.accountName,
          repoName: this.repoName,
          branchName: this.branchName,
        },
      });
    },
    goToDelete() {
      deleteRepo(this.accountName, this.repoName).then((response) => {
        console.log(response);
        const { data } = response;
        this.$message({
          message: data,
          type: "success",
          duration: 2000,
        });
        this.$router.push({
          name: "user",
          params: {
            accountName: this.accountName,
          },
        });
      });
    },
  },
};
</script>

<style >
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>