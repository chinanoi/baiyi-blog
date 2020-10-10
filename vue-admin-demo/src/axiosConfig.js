import axios from 'axios'
import ElementUI from 'element-ui';
import store from './store'
import router from './router'
// 配置开发环境还是生产环境
axios.defaults.baseURL = process.env.NODE_ENV === "development"?'http://localhost:9000/':'http://localhost:9100/'
//axios请求前拦截
axios.interceptors.request.use((config) => {
    // console.log('config',config)
    return config
})

// axios请求后拦截
axios.interceptors.response.use(
    
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    (response) => {
        
        const res = response.data
        if(res.code==200){
            return response
        }else if(res.code==400){
            ElementUI.Message({
                showClose: true,
                message: res.msg,
                type: 'error'
            });
            // 直接拒绝往下面返回结果信息
            return Promise.reject(response.data.msg)
        }else{
            ElementUI.Message({
                showClose: true,
                message: res.msg,
                type: 'error'
            });
            router.push('/login')
             // 直接拒绝往下面返回结果信息
            return Promise.reject(res.msg)
        }
    },
    // 否则的话抛出错误
    (error)=>{
        console.log('error1',error)
        ElementUI.Message({
            showClose: true,
            message: "网络开小差,请稍后重试",
            type: 'error'
        });
        if(error.response.data){
            error.message = error.response.data.msg
        }
        // 根据请求状态觉得是否登录或者提示其他
        if(error.response.status===401){
            store.commit("REMOVE_INFO")
            router.push('/login')
            error.message="请重新登录"
        }else if(error.response.status===403){
            error.message="权限不足，无法访问"
        }
        return Promise.reject(error)
    }
)