import request from '@/utils/request'
import qs from 'qs'

// 仓库列表
export function getRepolist(accountName) {
  return request(({
    url: `/${accountName}/repos`,
    method: 'get',
  }))
}

// 仓库详情
export function getRepodetail(accountName, repoName, branchName) {
  return request(({
    url: `/${accountName}/${repoName}/tree/${branchName}/`,
    method: 'get',
  }))
}

// 初始化仓库
export function initRepo(accountName, form) {
  return request(({
    url: `/${accountName}/init`,
    method: 'post',
    data: form
  }))
}

// 目录详情
export function getTreedetail(accountName, repoName, branchName, treeName) {
  return request(({
    url: `/${accountName}/${repoName}/tree/${branchName}/${treeName}`,
    method: 'get',
  }))
}

// 根目录下的文件详情
export function getBlobdetail1(accountName, repoName, branchName,blobName) {
  return request(({
    url: `/${accountName}/${repoName}/blob/${branchName}/${blobName}`,
    method: 'get',
  }))
}

// 文件详情
export function getBlobdetail2(accountName, repoName, branchName,treeName,blobName) {
  return request(({
    url: `/${accountName}/${repoName}/blob/${branchName}/${treeName}/${blobName}`,
    method: 'get',
  }))
}

// 获取文件状态
export function getStatus(accountName, repoName, branchName) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/status`,
    method: 'get',
  }))
}

// add
export function add(accountName, repoName, branchName, addFileList) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/add`,
    method: 'post',
    params: {
      filePaths: addFileList
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  }))
}

// commit
export function commit(accountName, repoName, branchName, commitMessage) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/commit`,
    method: 'post',
    params: {
      message: commitMessage
    },
  }))
}

// push
export function push(accountName, repoName, branchName) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/push`,
    method: 'get',
  }))
}

// 查询所有分支
export function getBranches(accountName, repoName) {
  return request(({
    url: `/${accountName}/${repoName}/branches`,
    method: 'get',
  }))
}
// 添加新分支
export function addNewbranch(accountName, repoName, newBranch, data) {
  return request(({
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    url: `/${accountName}/${repoName}/add?branchName=${newBranch}`,
    method: 'post',
    data: data
  }))
}
// pull
export function pull(accountName, repoName, branchName, data) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/pull`,
    method: 'post',
    data: data
  }))
}

//获取所有commit记录
export function getCommits(accountName, repoName, branchName) {
  return request(({
    url: `/${accountName}/${repoName}/${branchName}/commits`,
    method: 'get',
  }))
}

// back
export function back(accountName, repoName, branchName, data) {
  return request(({
    url: `/${accountName}/${repoName}/do/${branchName}/back`,
    method: 'post',
    data: data
  }))
}

// 删除仓库
export function deleteRepo(accountName, repoName) {
  return request(({
    url: `/${accountName}/${repoName}`,
    method: 'delete',
  }))
}