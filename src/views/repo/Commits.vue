<template>
  <div>
    <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link
            :to="{
              name: 'user',
            }"
          >
            {{ accountName }}
          </router-link>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
    <div class="level-right">
      <el-button @click="clickToBack" class="my-2">back</el-button>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(commit, index) in commitList"
          :key="index"
          :timestamp="commit.createTime"
          placement="top"
        >
          <el-card>
            <div class="level">
              <span
                ><h4 class="is-size-5 has-text-weight-semibold">
                  {{ commit.message }}
                </h4>
                <p>
                  {{ commit.committer }} 提交于 {{ commit.createTime }}
                </p></span
              >
              <span class="level-right"
                ><el-radio :label="commit" v-model="temp">&nbsp;</el-radio></span
              >
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { getCommits, back } from "@/api/repo.js";

export default {
  name: "Commits",
  data() {
    return {
      accountName: this.$route.params.accountName,
      repoName: this.$route.params.repoName,
      branchName: this.$route.params.branchName,
      commitList: [],
      temp: {},
      selectedCommit: {
        id: null,
        branchId: null,
        createTime: "",
        committer: "",
        hash: "",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getCommits(this.accountName, this.repoName, this.branchName).then(
        (response) => {
          const { data } = response;
          this.commitList = data;
        }
      );
    },
    clickToBack() {
      this.selectedCommit.id = this.temp.id;
      this.selectedCommit.branchId = this.temp.branchId;
      this.selectedCommit.createTime = this.temp.createTime;
      this.selectedCommit.committer = this.temp.committer;
      this.selectedCommit.hash = this.temp.hash;
      console.log(this.selectedCommit);
      back(
        this.accountName,
        this.repoName,
        this.branchName,
        this.selectedCommit
      ).then((response) => {
        const { data } = response;
        this.$message({
          message: data,
          type: "success",
          duration: 2000,
        });
      });
    },
  },
};
</script>

<style>
</style>

<!-- 
  {
          id: 1653968261187067905,
          branchId: 1653954522375241730,
          create_time: "2023-05-04 11:42:17",
          committer: "jizelong",
          message: "First Commit!",
          hash: "3795a4282bb6cda38b2c2f2f396284e6eb861116",
          parentHash: "",
        },
        {
          id: 1657256762791948290,
          branchId: 1653954522375241730,
          create_time: "2023-05-13 13:29:37",
          committer: "jizelong",
          message: "second commit",
          hash: "821fa3e60468e44c0416241ad39e9c8528993075",
          parentHash: "3795a4282bb6cda38b2c2f2f396284e6eb861116",
        },
        {
          id: 1657272131984289794,
          branchId: 1653954522375241730,
          create_time: "2023-05-13 14:30:42",
          committer: "jizelong",
          message: "third commit",
          hash: "c03f42c874d8a4f97511e48719304277f8794dc5",
          parentHash: "f780fd34956b51d829eab9052f57ebaafbcbd96c",
        },
 -->