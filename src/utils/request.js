import Taro from '@tarojs/taro'
// import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))


function getBaseUrl(url) {
    //let BASE_URL = 'https://doctor.hippokidcare.com/';
    let BASE_URL = "https://api.account.hippokidcare.com/"

    if (url.indexOf('login/') == 0) {
        BASE_URL = "https://account.hippokidcare.com/"
    }
    // if (process.env.NODE_ENV === 'development') {
    //   //开发环境 - 根据请求不同返回不同的BASE_URL
    //   if (url.includes('/api/')) {
    //     BASE_URL = ''
    //   } else if (url.includes('/iatadatabase/')) {
    //     BASE_URL = ''
    //   }
    // } else {
    //   // 生产环境
    //   if (url.includes('/api/')) {
    //     BASE_URL = ''
    //   } else if (url.includes('/iatadatabase/')) {
    //     BASE_URL = ''
    //   }
    // }
    if (url.indexOf('http://') >= 0 || url.indexOf("https://") >= 0) {
        return url
    }
    return BASE_URL + url
}


export function get_token(str) {
    const tokenString =
        typeof str === 'undefined' ? Taro.getStorageSync('doctor-online-token') : str;
    return tokenString;
}

export function set_token(value, key = "doctor-online-token") {
    if (value) {
        return Taro.setStorageSync(key, value);
    }
}

export function clear_token() {
    Taro.clearStorageSync()
}

export default function request(params, loading) {
    if (loading) {
        Taro.showLoading({
            title: "加载中...",
            mask: true
        })
    }
    let { url, data, method } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
        url: BASE_URL,
        data: data,
        method: method,
        header: {
            'content-type': contentType,
            'Authorization': 'Bearer ' + get_token()
        }
    };
    // 请求
    return Taro.request(option)
}

request.get = (url, data = "", loading = true) => {
    let params = { url, data, method: "GET" };
    return request(params, loading);
}

request.post = (url, data, loading = true) => {
    let params = { url, data, method: "POST" };
    return request(params, loading);
}

request.put = (url, data = "", loading = true) => {
    let params = { url, data, method: "PUT" };
    return request(params, loading);
}

request.delete = (url, data = "", loading = true) => {
    let params = { url, data, method: "DELETE" };
    return request(params, loading);
}


