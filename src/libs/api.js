import Vue from 'vue'
import axios from 'axios'
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
let base_url = "http://localhost:9527"

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: response.statusText,
        }
    }
}

function checkCode(res) {
    if (res.data.err) {
        alert(res.data.err)
    }
    return res
}
export default {
        post(url, data) {
            return axios({
                method: 'post',
                url: base_url + url,
                data: JSON.stringify(data),
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(checkStatus).then(checkCode)
        },
        put(url, data) {
            return axios({
                method: 'put',
                url: base_url + url,
                data: JSON.stringify(data),
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(checkStatus).then(checkCode)
        },

        get(url, params) {
            return axios({
                method: 'get',
                url: base_url + url,
                params,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(checkStatus).then(checkCode)
        },
        delete(url, params) {
            return axios({
                method: 'delete',
                url: base_url + url,
                params,
                timeout: 30000,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(checkStatus).then(checkCode)
        }
}