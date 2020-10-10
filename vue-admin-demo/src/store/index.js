import Vue  from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:localStorage.getItem('token'),
        userInfo:JSON.parse(sessionStorage.getItem('userinfo'))
    },
    mutations:{
        SET_TOKEN:(state,token)=>{
            state.token = token
            localStorage.setItem('token',token)
        },
        SET_USERINFO:(state,userinfo)=>{
            state.userInfo = userinfo
            sessionStorage.setItem('userinfo',JSON.stringify(userinfo))
        },
        REMOVE_INFO:(state)=>{
            state.toekn = ''
            localStorage.setItem('token','')
            state.userInfo = {}
            sessionStorage.setItem('userinfo',JSON.stringify(''))
        }
    },
    getters:{
        GET_USERINFO:(state)=>{
            return state
        }
    },
    actions:{

    },
    modules:{

    }
})