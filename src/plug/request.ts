import axios from 'axios'
import router from 'vue-router'
// 环境切换
axios.defaults.baseURL = 'http://127.0.0.1:8080'
// 设置请求超时
axios.defaults.timeout = 60*1000
// post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' 
// 请求拦截
axios.interceptors.request.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(res=>{
     if(res.status === 200){
        return Promise.resolve(res)
     }else{
        return Promise.reject(res)
     }
},err=>{
    if(err.response.status){
        // switch (err.response.status){
        //     case 401:
                
        // }
    }
    return Promise.reject(err)
})
export default axios