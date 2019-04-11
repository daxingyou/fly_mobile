import Vue from 'vue'
import axios from 'axios'
import common from '../src/common.vue'
import router from '../src/router/index.js';
import store from '../src/store/index';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
let baseURL = common.baseUrl;
let basurl = common.chart_baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
var axiosURL = {
  queryChildBill: '/inter/user/queryChildBill', //帐变记录
  touristLogin: "/inter/user/visitorLogin", //游客登录
  getGamePlayList: "/inter/ticket/gamePlay", //彩类玩法列表
  memberLogin: "/inter/user/userLogin", //会员登录
  getUserDetails: '/inter/user/userDetail',
  queryLotteryOrderOwn: "/inter/user/queryLotteryOrderOwn", //查询我的投注
  kind: "/inter/ticket/kind", //所有彩种
  queryMemberReportOne: '/inter/user/queryMemberReportOne', //查看投注详情
  cancelOrder: '/inter/ticket/cancelOrder', //撤单
  queryMemberReport: '/inter/user/queryMemberReport', //个人报表
  queryMemberReportAll: '/inter/user/queryMemberReportAll', //个人报表—全部，中奖，退码等
  queryMemberReportOne: '/inter/user/queryMemberReportOne', //个人报表明细
  myCash: '/inter/user/myCash/', //账变记录
  queryOrderByNo: '/inter/user/queryOrderByNo/', //账变记录
  queryLotteryReport: '/inter/user/queryLotteryReport', //代理报表
  queryLoginInfo: '/inter/user/queryLoginInfo', //登入记录
  updateLoginPassword: '/inter/user/updateLoginPassword', //修改登录密码
  updateTradePassword: '/inter/user/updateTradePassword', //修改资金密码
  saveSafeQuestion: '/inter/user/saveSafeQuestion', //保存安全问题
  signOut: '/inter/user/userLogOut', //登出
  queryIncome: '/inter/money/queryIncome', //获取充值说明
  queryBank: '/inter/money/queryBank', //查询银行卡
  winHistory: '/inter/ticket/winHistory/', //开奖历史1
  winsDragon: "/inter/ticket/winsDragon/", //开奖历史2(长龙)
  registerMember: '/inter/user/registerMember', //会员注册
  saveMoneyOrder: '/inter/money/saveMoneyOrder', //会员生成订单
  updateMoneyOrder: '/inter/money/updateMoneyOrder', //会员更新订单
  memberIfBind: '/inter/user/memberIfBind', //银行卡
  saveMemberOtherBank: "/inter/user/saveMemberOtherBank", //新增银行卡
  saveMemberBank: '/inter/user/saveMemberBank', //绑定首张银行卡
  saveThreeOrder: '/inter/money/saveThreeOrder', //三方生成订单
  updateThreeOrder: '/inter/money/updateThreeOrder', //三方更新订单
  queryDocumentContentList: '/notice/queryDocumentContentList/?documentListId=402880435f948968015f948c1c8a0000', // 优惠活动
  queryMemberNoticeList: '/notice/queryMemberNoticeList', // 获取公告
  queryNoticeAlertList: '/notice/queryNoticeAlertList', // 获取消息
  deleteNoticeAlert: '/notice/deleteNoticeAlert',
  updateNoticeAlert: '/notice/updateNoticeAlert',
  queryDrawCondition: '/inter/money/queryDrawCondition', //出款查询
  saveDrawMoneyInfo: '/inter/money/saveDrawMoneyInfo', //出款保存  
  getWinsDragon: '/inter/ticket/winsDragon', //获取开奖长龙及历史
  chipIn: '/inter/ticket/chipIn', //投注
  getTimes: '/inter/ticket/timeLeft', //获取彩种开奖倒计时
  feedback: '/inter/user/feedback', //帮助与反馈
  timeLeft: '/inter/ticket/timeLeft/', // 获取倒计时
  queryDrawCondition: '/inter/money/queryDrawCondition', //出款查询
  saveDrawMoneyInfo: '/inter/money/saveDrawMoneyInfo', //出款保存  
  getSubGames: '/inter/ticket/subGames', //获取玩法列表
  helpService: '/collect/helpService', //在线客服
  saveDiy: '/inter/user/diy',
  twoGameOdd: '/inter/ticket/twoGameOdd', //两面盘赔率
  twoBet: '/inter/ticket/bet', //两面投注
  queryRegister: '/inter/user/queryRegister', //两面投注

  queryAgentMemberInfo: '/inter/user/queryAgentMemberInfo', // 下级会员查询
  queryMemberInfoEdit: '/inter/user/queryMemberInfoEdit', // 查询下级配额
  updateOwnInfo: '/inter/user/updateOwnInfo', // 修改当前账号详细信息
  queryTeamQutaType: '/inter/user/queryTeamQutaType', // 详细配额
  updateTeamRebet: '/inter/user/updateTeamRebet', // 修改反水配额
  updateMemberAgent: '/inter/user/updateMemberAgent', // 转为代理
  agentRegisterMember: '/inter/user/agentRegisterMember', // 新增会员
  queryPromoteUrl: '/inter/user/queryPromoteUrl', //推广链接
  savePromoteUrl: '/inter/user/savePromoteUrl', //保存推广链接
  recentOpenCode: '/inter/ticket/recentOpenCode',
  queryMemberModel: '/inter/user/queryMemberModel',
  updateMemberModel: '/inter/user/updateMemberModel',
  signTime: '/inter/user/signTime',
  myOrderList: '/inter/user/myOrderList',
  signRecord: '/inter/user/signRecord',
  queryActivity: '/inter/user/queryActivity',//查询活动
  getBetAwardAmount: '/inter/user/getBetAwardAmount',

  balance: '/inter/user/balance', // 热门体育查询余额
  amountOut: '/inter/user/amountOut', // 中心转向三方
  withdrawal: '/inter/user/withdrawal', // 三方转入中心
  open: '/inter/user/open', // 请求三方地址
  register: '/inter/user/register', //
  moneySwitch: '/inter/user/moneySwitch',// 资金转换
  m52Login: "/inter/user/businessesLogin",  // 外联登录
  getIp: "/inter/user/getIpSndSite",
  activityAward: '/inter/user/activityAward', // 下级充值奖励
  touchsuper: '/inter/user/touchsuper', // 联系上级
  redPacket: '/inter/user/redPacket', // 抢红包接口
  superToSub: '/inter/user/superToSub', // 转点下级
  getAutoUrl: '/inter/user/webMonitor',//线路检测网址
  applyPoint: '/inter/user/applyPoint', // 非一级代理申请转点
  queryApplyPoint: '/inter/user/queryApplyPoint',// 上级接收下级申请转点消息
  disposeApplyPoint: '/inter/user/disposeApplyPoint',// 上级审核下级申请转点  
  kindSum: "/inter/ticket/kindSum", //所有彩种list
  playformAll: '/inter/user/playformAll',// 热门游戏全部数据  
  queryRedPacket: '/inter/user/queryRedPacket',// 红包记录
  chartLogout: '/chat/user/logout',
  querySlidesImg:'/inter/user/querySlidesImg' ,//获取轮播图大图
  openRecord:"/inter/ticket/openRecord", // 开奖结果
  querySlidesImg:'/notice/querySlidesImg?type=mobile' ,//获取轮播图大图
  nowAllKindMessage:'/inter/ticket/nowAllKindMessage',
  updateGameType:'/inter/user/updateGameType',//修改用户配置
  validateImgCode:'/inter/user/validateImgCode', // 图片验证
}
export function request(type = 'POST', name = '', data = '') {
  return new Promise(function (resolve, reject) {
    var result
    type = type.toUpperCase()
    if (type === 'GET') {
      axios.get(baseURL + axiosURL[name] + data)
        .then(res => {
          result = res.data;
          // console.log(result)
          if (result.code =='666' && result.msg =='被迫下线！您的账号在异地登陆' && router.history.current.name != 'allKinds') {
            axios.get(basurl + axiosURL['chartLogout']).then(res => {
              sessionStorage.setItem("chartLogin", "2");
            })
            if(router.history.current.name != 'login'){
              alert(result.msg)
              router.push({
                name: "login"
              });
            }
            //          store.state.chart.chartsocket.close();
          }else if(result.code =='666'&&result.msg =="未登录"){
            sessionStorage.setItem("chartLogin", "2");
          	var routes = ["allKinds","award","noterecord","home"]
          	if(routes.indexOf(router.history.current.name)==-1){
          		router.push({
                name: "login"
              });
          	}
          }
          resolve(result)
        })
    } else if (type === 'POST') {
      axios.post(baseURL + axiosURL[name], data)
        .then(res => {
          result = res.data
          if (result.code =='666' && result.msg =='被迫下线！您的账号在异地登陆' && router.history.current.name != 'allKinds') {
            axios.get(basurl + axiosURL['chartLogout']).then(res => {
              sessionStorage.setItem("chartLogin", "2");
            })
            if(router.history.current.name != 'login'){
              alert(result.msg)
              router.push({
                name: "login"
              });
            }
            //          store.state.chart.chartsocket.close();
          }else if(result.code =='666'&&result.msg =="未登录"){
            sessionStorage.setItem("chartLogin", "2");
          	var routes = ["allKinds","award","noterecord","home"]
          	if(routes.indexOf(router.history.current.name)==-1){
          		router.push({
                name: "login"
              });
          	}
          }
          resolve(result)
        })
    }
  });

}
