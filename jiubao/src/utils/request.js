import axios from 'axios';
axios.defaults.withCredent = true;//是否允许携带cookie请求
const BASE_API = 'https://m.jiubao519.com';//请求的域名
const service = axios.create({
    baseURL: BASE_API,//api的baseurl
    timeout: 10000//请求超时时间
});
// request 拦截器
// service.interceptors.request.use(
//     config => {
//         // 这里可以自定义一些config 配置
//         // console.log(config, '请求的配置')
//         config.headers['Accept'] = 'application/json;charset=utf-8'
//         config.headers['Authorization'] = window.localStorage.getItem('token')
//         config.headers['Content-Type'] = 'application/json'

//         return config
//     },
//     error => {
//         // 这里处理一些请求出错的情况
//         const data = error.response.data
//         if (data.code === 10003) {
//             window.location.hash = '#/user/login'
//             window.location.reload()
//         }
//         console.log(error)
//         Promise.reject(error)
//     }
// )

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑
        console.log(res, '请求的数据')
        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        return Promise.reject(error)
    }
)

export default service