import request from '@/utils/request'

// 仓库列表
export function getRepolist(accountName) {
  return request(({
    url: `/${accountName}/repos`,
    method: 'get',
  }))
}