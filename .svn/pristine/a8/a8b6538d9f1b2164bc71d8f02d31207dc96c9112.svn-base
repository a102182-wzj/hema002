import Taro from "@tarojs/taro"
// import LoginAuthor from '../components/LoginAuthor/index'
import request, { clear_token, get_token, set_token } from './request'
import LoginAuthor from '../components/LoginAuthor/index'

const login_url = "http://192.168.1.11:9202/"

const codeMessage = {
    200: 'ok',
    201: '执行成功',
    202: '服务器已接收，未返回任何',
    204: '删除成功',
    400: '请求出错',
    401: '无访问权限',
    403: '禁止访问',
    404: '未找到数据',
    406: '请求参数不正确',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '系统错误，请联系管理员',
    502: '服务器网络错误',
    503: '服务不可用，服务器过载或维护。',
    504: '请求超时',
};

const customInterceptor = (chain) => {
    const requestParams = chain.requestParams
    return chain.proceed(requestParams).then(res => {
        // 隐藏loading
        Taro.hideLoading()
        // 只要请求成功，不管返回什么状态码，都走这个回调
        if (res.statusCode >= 200 && res.statusCode < 300) {
            return res.data
        }
        if (res.statusCode === 401) {
            // 查询本地的token是否存在
            const token = Taro.getStorageSync("author_token")
            console.log("token", token)
            if (token === "" || token === undefined || res.data.error_code === 4001) {
                clear_token()
                // 判断用户是否已经授权过
                Taro.getSetting({
                    success(setting) {
                        console.log("setting", setting)
                        if (!setting.authSetting['scope.userInfo']) {
                            console.log("tanchuang")
                            // 弹出授权引导窗口
                            
                            // Taro.showModal({
                            //     content: '需要您授权登录获取更多信息',
                            //     confirmColor: '#000',
                            // }).then(result => {
                            //     if (result.confirm) {
                            //         // 调用授权登录api
                            //         request.post(login_url + "/login/weapp",
                            //             {

                            //             }).then(login_res => {
                            //                 console.log("author res", login_res)
                            //             })
                            //     }
                            // })
                        } else {
                            // 授权过，直接获取openid登录
                            // 调用授权登录api
                            request.post(login_url + "/login/weapp",
                                {

                                }).then(login_res => {
                                    console.log("author res", login_res)
                                })
                        }
                    }
                })
            }
        }

        const errorText = res.msg !== undefined ? res.msg : false || codeMessage[res.statusCode] || res.statusText;
        if (errorText !== undefined) {
            Taro.showToast({
                icon: 'none',
                title: errorText,
                duration: 3
            })
            return Promise.reject(errorText)
        }
    })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors