import {
  request
} from "../../../utils/request.js"
import common from '@/common.vue'
export default {
  namespaced: true,
  state: {
    points:sessionStorage.getItem('points')?JSON.parse(sessionStorage.getItem('points')):[]

  },
  getters: {
    rechargeList(state){
      let arr=[];
      for(let item of state.points){
        if(item.type==='0'){
          arr.push(item)
        }
      }
      return arr
    },
    withdrawList(state){
      let arr=[];
      for(let item of state.points){
        if(item.type==='1'){
          arr.push(item)
        }
      }
      return arr
    }

  },
  mutations: {
    queryApplyPoint(state,data){
      state.points=data
    }
  },
  actions: {
    touchsuper({commit}){
    return  new Promise((resolve,reject)=>{
        let res=request('get', 'touchsuper').then((res)=>{
          resolve(res)
        })
      })
    },
   superToSub({commit},params){
     return new Promise((resolve,reject)=>{
       let res=request('post','superToSub',params).then((res)=>{
        resolve(res)
       })
     })
    },
    applyPoint({commit},params){
      return new Promise((resolve,reject)=>{
        let res=request('post','applyPoint',params).then((res)=>{
          resolve(res)
         })
      })
    },
    queryApplyPoint({commit}){
      return  new Promise((resolve,reject)=>{
        let res=request('get', 'queryApplyPoint').then((res)=>{
          commit('queryApplyPoint',res);
          sessionStorage.setItem('points',JSON.stringify(res));
          resolve(res)
        })
      })
    },
    disposeApplyPoint({commit},params){
      return new Promise((resolve,reject)=>{
        let res=request('post','disposeApplyPoint',params).then((res)=>{
          resolve(res)
         })
      })
    },
  }

}
