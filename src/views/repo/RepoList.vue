<template>
  <div v-if="accountName == null || accountName === ''"></div>
  <div v-else>
    <p class="is-size-4 ml-5 has-text-weight-bold">仓库列表</p>
    <div class="level-right">
      <el-button type="primary" plain class="mb-3" @click="dialogVisible = true"
        >Init</el-button
      >
      <el-dialog title="初始化仓库" :visible.sync="dialogVisible" width="50%">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="仓库名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="本地文件夹" prop="path">
            <el-input v-model="form.path" class="input-with-select"> </el-input>
          </el-form-item>

          <el-form-item label="仓库权限" prop="isPublic">
            <el-radio v-model="form.isPublic" label="true">Public</el-radio>
            <el-radio v-model="form.isPublic" label="false">Private</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >创建仓库</el-button
          >
        </span>
      </el-dialog>
    </div>
    <el-card shadow="never">
      <div class="clearfix" v-for="(item, index) in repoList" :key="index">
        <article>
          <div>
            <div class="">
              <p class="ellipsis is-ellipsis-1">
                <!-- 文本溢出显示省略号 -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.name"
                  placement="top"
                >
                  <router-link
                    :to="{
                      name: 'repo-detail',
                      params: {
                        accountName: accountName,
                        repoName: item.name,
                        branchName: branchName,
                      },
                    }"
                  >
                    <span class="is-size-5 has-text-dark semibold">{{
                      item.name
                    }}</span>
                  </router-link>
                </el-tooltip>
              </p>
            </div>
            <nav class="level-right has-text-grey is-mobile is-size-7 mt-2">
              <div class="level">
                <span class="level-item"> {{ item.path }} </span>
                <span class="level-item">
                  {{ item.isPublic ? "Public" : "Private" }}
                </span>
                <span class="level-item mr-1">
                  创建时间:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                </span>
              </div>
            </nav>
          </div>
        </article>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRepolist, initRepo } from "@/api/repo.js";

export default {
  name: "RepoList",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        isPublic: "",
        path: "",
      },
      /* accountName: this.$store.getters.accountName, */
      branchName: "main",
      repoList: [],
      rules: {
        name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        path: [
          { required: true, message: "请输入本地文件夹路径", trigger: "blur" },
          {
            trigger: "blur",
          },
        ],
        isPublic: [
          { required: true, message: "请选择仓库权限", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["accountName"]),
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.repoList= [];
      getRepolist(this.accountName).then((response) => {
        const { data } = response;
        this.repoList = data;
        this.$forceUpdate();
      });
    },
    /* getAccountName(){
          return this.accountName
        }, */
    getDefaultBranch() {
      return this.defaultBranch;
    },
    fileChange(e) {
      try {
        const fu = document.getElementById("file");
        if (fu == null) return;
        this.form.imgSavePath = fu.files[0].path;
        console.log(fu.files[0].path);
      } catch (error) {
        console.debug("choice file err:", error);
      }
    },
    btnChange() {
      var file = document.getElementById("file");
      file.click();
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //this.form.path=this.addBackslash(this.form.path);
          console.log(this.form.path);
          initRepo(this.accountName, this.form).then((response) => {
            console.log(response);
            const { data } = response;
            this.dialogVisible = false;
            this.$message({
              message: "创建成功",
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
    /* addBackslash(path) {
      return path.replaceAll("\\", "\\\\");
    }, */
  },
};
</script>

<style>
</style>