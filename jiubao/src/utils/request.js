import axios from 'axios';
import { Indicator ,Toast } from 'mint-ui';
axios.defaults.withCredent = true;//是否允许携带cookie请求
const BASE_API = 'https://m.jiubao519.com';//请求的域名
const service = axios.create({
    baseURL: BASE_API,//api的baseurl
    timeout: 10000//请求超时时间
});
let questTotal = 0;
// request 拦截器
service.interceptors.request.use(
    config => {
        // 这里可以自定义一些config 配置
        // console.log(config, '请求的配置')
        config.headers['Accept'] = 'application/json;charset=utf-8'
        config.headers['Authorization'] = window.localStorage.getItem('token')
        config.headers['Content-Type'] = 'application/json'
        let token = window.localStorage.getItem('token')=='undefined'?null:window.localStorage.getItem('token');
        questTotal = questTotal+1;
        Indicator.open();
        config.data["token"]=token
        return config
    },
    error => {
        // 这里处理一些请求出错的情况
        const data = error.response.data
        if (data.code === -11) {
            window.location.hash = '#/login'
            window.location.reload()
        }
        console.log(error,9090)
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    
    response => {
        const res = response.data;
        questTotal = questTotal-1;
        if (res.code === -11) {
            window.location.hash = '#/login'
            window.location.reload()
        }
        if(questTotal<=0){
            Indicator.close();
        }
        // 这里处理一些response 正常放回时的逻辑
        console.log(res, '请求的数据')
        return res
    },
    error => {
        console.log(error,8080)
        Indicator.close();
        Toast("请求数据失败，请稍候再试")
        // 这里处理一些response 出错时的逻辑
        return Promise.reject(error)
    }
)

export default service