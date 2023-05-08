<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
            <article v-for="(item, index) in repoList" :key="index">
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                      <router-link :to="{name:'repo-detail',params:{repoName:item.name}}">
                        <span class="is-size-5 has-text-dark has-text-weight-bold">{{ item.name }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level-right has-text-grey is-mobile  is-size-7 mt-2 ">
                    <div class="level">
                      <span class="level-item ">
                        ispublic: {{ item.isPublic }}
                      </span>
                      <span class="mr-1 ">
                        创建时间:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>
                    </div>
                </nav>
              </div>
            </article>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
import { getRepolist } from '@/api/repo.js'

export default {
    name:"RepoList",
    data(){
        return{
            repoList:[]
        }
    },
    computed: {
      ...mapGetters(['accountName'])
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            getRepolist(this.$store.getters.accountName).then((response)=>{
                const {data}=response
                this.repoList=data

            })
        }
    }
}
</script>

<style>

</style>