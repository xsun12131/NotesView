import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/note/page',
    method: 'get',
    params: query
  })
}

export function fetchDataById(query) {
  return request({
    url: '/note',
    method: 'get',
    params: {
      id: query
    }
  })
}

export function search(query) {
  return request({
    url: '/note/search',
    method: 'post',
    data: query
  })
}

export function save(data) {
  return request({
    url: '/note',
    method: 'post',
    data: data
  })
}