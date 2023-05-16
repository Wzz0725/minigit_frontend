<template>
    <div>
      <div class="columns">
        <div class="column">
          <UserCard></UserCard>
        </div>
        <div class="column is-three-quarters">
          <RepoList></RepoList>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RepoList from '@/views/repo/RepoList'
  import UserCard from '@/views/user/UserCard'
  
  
  export default {
    name: 'User',
    components: {
      RepoList,
      UserCard
    },
    data(){
      return{
      }
    }
  }
  </script>