import Vue from 'vue'
import Vuex from 'vuex'
import activity_module from './activity/index.js'
import bet_module from './bet/index.js'
import chart_module from './chart/index.js'
import help_module from './help/index'
import personal_module from './personal/index.js'
import report_module from './report/index.js'
import home_module from './home/index.js'
import login_module from './login/index.js'
import register_module from './register/index.js'
import twobet_module from './twobet/index.js'
import recharge_module from './recharge/index.js'
import canvas_module from './canvas/index.js'

import {
  request
} from '../../utils/request.js'
import common from '../common.vue'
Vue.use(Vuex)
const state = {
  //查询银行获得的所有公司入款数据
  dataList: sessionStorage.getItem('_datas') ? JSON.parse(sessionStorage.getItem('_datas')) : [], //当sessiion里有数据时，默认为session里的数据；防止刷新后数据为空
  dataList2: [],
  //充值说明
  income: sessionStorage.getItem('Income') ? JSON.parse(sessionStorage.getItem('Income')) : [],
  //充值订单数据
  PaymentOrder: sessionStorage.getItem('PaymentType') ? JSON.parse(sessionStorage.getItem('PaymentType')) : [],
  //三方充值二维码相关数据
  qrCode: sessionStorage.getItem('qrCode') ? JSON.parse(sessionStorage.getItem('qrCode')) : {},
  //三方充值类型
  serviceType: '',
  //提现查询
  drawCondition: '',
  isLogin: false, //登陆状态
  service_b: false,
  award: {}, //登陆状态
  isApp:true, //app下载提示显示
  msg: '', //ws消息
  memberModel: [],
  activities: [],
  websocketMsg: {}, //websocket
  queryAccout: "",
  flyGuildNum:"0",
}
const getters = {
  //通过条件判断获取各数据列表
  datas(state) {
    return function (routerId) {
      let arr = [];
      let datasmap = [...state.dataList, ...state.dataList2];
      for (let item of datasmap) {
        if (routerId === 'bank') {
          if (!common.BankNo.includes(item.bankNo) && item.bankNo) {
            arr.push(item);
          }
        } else if (routerId === "alipayTransfer") {
          if (item.bankNo === common.BankNo[1]) {
            arr.push(item);
          }
        } else if ((routerId === "qqTransfer")) {
          if (item.bankNo === common.BankNo[0]) {
            arr.push(item);
          }
        } else if ((routerId === "wechatTransfer")) {
          if (item.bankNo === common.BankNo[2]) {
            arr.push(item);
          }
        } else if ((routerId === "wechatScan")) {
          if (item.serviceType === common.BankNo[3]) {
            arr.push(item);
          }
        } else if ((routerId === "qqScan")) {
          if (item.serviceType === common.BankNo[4]) {
            arr.push(item);
          }
        } else if ((routerId === "directPay")) {
          if (item.serviceType === common.BankNo[5] || item.serviceType === common.BankNo[7]) {
            arr.push(item);
          }
        } else if ((routerId === "alipayScan")) {
          if (item.serviceType === common.BankNo[6]) {
            arr.push(item);
          }
        } else if ((routerId === "unionScan")) {
          if (item.serviceType === common.BankNo[9]) {
            arr.push(item);
          }
        } else if ((routerId === "jdScan")) {
          if (item.serviceType === common.BankNo[8]) {
            arr.push(item);
          }
        }
      }
      return arr
    }
  },
  //通过条件判断获取不同充值的说明
  incomeMessage(state) {
    return function (routerId) {
      //公司入款的路由数组
      let routers = ["bank", "qqTransfer", "alipayTransfer", "wechatTransfer", ];
      for (let item of state.income) {
        if (item.id === '0') {
          if (routers.includes(routerId)) {
            return item.remark
          }
        } else if (item.id === '2') {
          if (!routers.includes(routerId)) {
            return item.remark
          }
        }
      }
    }
  },
  memberModel_p(state) {
    let arr = Array.of()
    for (let i = 0; i < state.memberModel.length; i += 10) {
      arr.push(state.memberModel.slice(i, i + 10))
    }
    return arr
  },
  activeNum(state) {
    let num = 0;
    for (let item of state.activities) {
      if (item.status === '1' && !item.nowStatus) {
        ++num
      }
    }
    return num

  }

}
const mutations = {
  sendMessage(state, msg) {
    state.msg = msg
  },
  queryBank(state, data) {
    if (data.code === 2) {
      state.dataList = data.data
    } else if (data.code === 1) {
      state.PaymentOrder = data.data
    }
  },
  queryBank2(state, data) {
    if (data.code === 2) {
      state.dataList2 = data.data
    } else if (data.code === 1) {
      state.PaymentOrder = data.data
    }
  },
  queryIncome(state, data) {
    state.income = data
  },
  updateThreeOrder(state, data) {
    state.qrCode = data
  },

  //存入三方存款类型
  serviceType(state, data) {
    state.serviceType = data.type
  },
  queryDrawCondition(state, data) {
    state.drawCondition = data
  }, 
  setIsLogin(state, data) {
    state.isLogin = data
  },
  setService_b(state, data) {
    state.service_b = data
  },
  loadApp(state, data) {
    state.isApp = data
  },
  awardLi(state, data){
    state.award = data
  },
  queryMemberModel(state, data) {
    state.memberModel = data
  },
  queryActivity(state, data) {
    state.activities = data
  },
  setWebsocketMsg(state, data) {
    state.websocketMsg = data
  },
  setQueryAccout(state,data){
    state.queryAccout = data
  },
  setflyGuildNum(state,data){
    state.flyGuildNum = data
  }
}
const actions = {
  //保存头像
  saveDiy({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'saveDiy', params).then((res) => {
        resolve(res)
      })
    })
  },
  //查询银行卡
  queryBank({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'queryBank', params).then((res) => {
        if (res.code === 2) {
          if (params.type === '0') {
            commit('queryBank', res)
          } else {
            commit('queryBank2', res)
          }
          sessionStorage.setItem('_datas', JSON.stringify(res.data))
        } else if (res.code === 1) {
          sessionStorage.setItem('PaymentType', JSON.stringify(res.data))
          commit('queryBank', res)
        }
        resolve(res)
      })
    })
  },
  //获取充值说明 
  queryIncome({
    commit
  }) {
    return new Promise(function (resolve, reject) {
      let res = request('get', 'queryIncome').then((res) => {
        if (res.code === 0) {
          sessionStorage.setItem('Income', JSON.stringify(res.data))
          commit('queryIncome', res.data)
        }
        resolve(res)
      })
    })
  },
  //会员生成订单 
  saveMoneyOrder({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'saveMoneyOrder', params).then((res) => {
        resolve(res)
      })
    })
  },
  //会员更新订单
  updateMoneyOrder({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'updateMoneyOrder', params).then((res) => {
        resolve(res)
      })
    })
  },
  //三方生成订单
  saveThreeOrder({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'saveThreeOrder', params).then((res) => {
        resolve(res)
      })
    })
  },
  //三方更新订单
  updateThreeOrder({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'updateThreeOrder', params).then((res) => {
        sessionStorage.setItem('qrCode', JSON.stringify(res.data))
        commit('updateThreeOrder', res.data)
        resolve(res)
      })
    })
  },
  //出款查询
  queryDrawCondition({
    commit
  }) {
    return new Promise(function (resolve, reject) {
      let res = request('get', 'queryDrawCondition').then((res) => {
        if (res.code === 0) {
          commit('queryDrawCondition', res.data)
        }
        resolve(res)
      })
    })
  },
  //出款保存
  saveDrawMoneyInfo({
    commit
  }, params) {
    return new Promise(function (resolve, reject) {
      let res = request('post', 'saveDrawMoneyInfo', params).then((res) => {
        resolve(res)
      })
    })
  },
  //websocket连接
  websocketLink({
    commit,
    state
  }, params) {
    return new Promise(function (resolve, reject) {
      let accord = window.location.protocol;
      console.log(accord,'accord')
      let str, socket, url;
      if (accord == "https:") {
        str = "wss:";
        url = params.url.slice(6);
      } else if (accord == "http:") {
        str = "ws:";
        url = params.url.slice(5);
      }
      let user = state.login.userDetails.account;
      socket = new WebSocket(
        encodeURI(str + url + params.type + user + '/3')
      );
      resolve(socket);
    })


  },
  queryMemberModel({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'queryMemberModel', params).then((res) => {
        commit('queryMemberModel', res.data);
        resolve(res)
      })
    })
  },
  updateMemberModel({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'updateMemberModel', params).then((res) => {
        resolve(res)
      })
    })
  },
  signTime({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'signTime').then((res) => {
        resolve(res)
      })
    })
  },
  signRecord({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'signRecord').then((res) => {
        resolve(res)
      })
    })
  },
  queryActivity({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'queryActivity').then((res) => {
        commit('queryActivity', res)
        resolve(res)
      })
    })
  },
  getBetAwardAmount({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'getBetAwardAmount').then((res) => {
        resolve(res)
      })
    })
  },
  queryOrderByNo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'queryOrderByNo', params).then((res) => {
        resolve(res)
      })
    })
  },
  //  下级充值奖励
  activityAward({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'activityAward', params).then((res) => {
        resolve(res)
      })
    })
  },

  // 联系上级 touchsuper  
  touchsuper({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'touchsuper').then((res) => {
        resolve(res)
      })
    })
  },
  // 抢红包接口 redPacket  
  redPacket({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'redPacket').then((res) => {
        resolve(res)
      })
    })
  },
  // 转点下级 superToSub  applyPoint
  superToSub({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'superToSub', params).then((res) => {
        resolve(res)
      })
    })
  },
  // 非一级代理申请转点   applyPoint queryApplyPoint
  applyPoint({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'applyPoint', params).then((res) => {
        resolve(res)
      })
    })
  },
  // 非一级代理申请转点   queryApplyPoint 
  queryApplyPoint({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let res = request('get', 'queryApplyPoint').then((res) => {
        resolve(res)
      })
    })
  },
  // 审核申请转点    disposeApplyPoint playformAll
  disposeApplyPoint({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      let res = request('post', 'disposeApplyPoint', params).then((res) => {
        resolve(res)
      })
    })
  },
  // 查询个人报表全部，中奖等
  async queryMemberReportAll({ commit }, params) {
    return await request('post', 'queryMemberReportAll', params)
  },
  // 个人报表详情
  async queryMemberReportOne ({ commit }, params) {
    return await request('post', 'queryMemberReportOne', params)
  }



}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    activity: activity_module,
    bet: bet_module,
    chart: chart_module,
    help: help_module,
    personal: personal_module,
    report: report_module,
    home: home_module,
    login: login_module,
    register: register_module,
    twobet: twobet_module,
    recharge:recharge_module,
    canvas:canvas_module,
  }
})
