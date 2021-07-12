import request from '@/utils/request'

export function login(query) {
    return request({
        url: '/login',
        method: 'post',
        data: query
    }).then((data) => {
        window.localStorage.setItem("token", data.token);
    })
}

export function currentUserSimple() {
    return request({
        url: '/user/currentUserSimple',
        method: 'get',
    }).then((data) => {
        if (data.username) {
            window.localStorage.setItem("isLogin", true);
        } else {
            window.localStorage.setItem("isLogin", false);
        }
    })
}