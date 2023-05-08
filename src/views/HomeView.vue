<template>
  <div>
    <div class="box">{{ billboard }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <RepoList></RepoList>
      </div>
      <div class="column">
        
      </div>
    </div>
  </div>
</template>

<script>
import RepoList from '@/views/repo/RepoList'


export default {
  name: 'HomeView',
  components: {
    RepoList,

  },
  data(){
    return{
      billboard: '版本更新'
    }
  }
}
</script>
