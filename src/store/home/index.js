import { request } from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {
		//我的投注记录
		queryLotteryOrderOwnList: {},
		// 所有彩种
		kindList: [],
		// 所有彩种(分组)
		lotteryList: [],
		// 所以彩种名称
		lotteryNames:{},
		// 所以彩种id
		lotteryId: [],
		// 所以彩种路由id
		lotteryRouetrId: [],
		// 查看详情
		queryMemberReportOneList: [],
		// 撤单
		cancelOrderList: [],
		// 开奖历史1
		winHistoryList: [],
		// 开奖历史2(长龙)
		winsDragonList: [],
		// 开奖历史
		openRecordList: [],
		// 银行卡
		memberIfBindList: [],
		// 新增银行卡
		saveMemberOtherBankList: [],
		// 公告
		NoticeList1: [],
		NoticeList2: [],
		deleteNotice: [],
		// 今日结算
		OrderList: [],
		// 热门体育 查询余额
		balanceList: [],
		// 资金转向三方
		amountOutList: [],
		// 请求三方地址
		openList: [],
		// 三方账户注册
		registerList: [],
		// 三方转向中心
		withdrawalList: [],
		points: sessionStorage.getItem('points') ? JSON.parse(sessionStorage.getItem('points')) : [],
		alertList: [],
		_saveclassId: '3',
		kindIndex:['热门','福体彩','六合彩','时时彩','快三','11选5','PK10'],
		times:{}
	},
	getters: {

	},
	mutations: {
		//所有彩种开奖详情
		setTimes(state,data){
			state.times = data;
			state.times = Object.assign({},state.times)
		},
		// 离开开奖历史页面保存classId
		saveClassId(state, obj) {
			state._saveclassId = obj.classId
		},
		// 我的投注记录
		savequeryLotteryOrderOwn(state, obj) {
			state.queryLotteryOrderOwnList = obj;
		},
		//所有彩种
		savekind(state, obj) {
			// console.log(obj)
			state.kindList = obj.data;
			obj.data.forEach(element => {
				element.kindList.forEach(rts => {
					state.lotteryNames[rts.kindId] = rts.kindName
					state.lotteryId.push(rts.kindId)
				})
			});
			// console.log(state.lotteryName, state.lotteryId, state.lotteryRouetrId)
		},
		// 所有彩种list
		saveKindSum(state, obj){
			state.lotteryList = obj
		},
		//查看详情
		savequeryMemberReportOne(state, obj) {
			state.queryMemberReportOneList = obj;
		},
		//撤单
		savecancelOrder(state, obj) {
			state.cancelOrderList = obj;
		},
		//开奖历史1
		savewinHistory(state, obj) {
			state.winHistoryList = obj
		},
		//开奖历史2
		savewinsDragon(state, obj) {
			state.winsDragonList = obj
		},
		saveopenRecord(state, obj){
			state.openRecordList = obj
		},
		// 银行卡
		savememberIfBind(state, obj) {
			state.memberIfBindList = obj;
		},
		// 新增银行卡
		save_MemberOtherBank(state, obj) {
			state.saveMemberOtherBankList = obj
		},
		// 公告
		queryMemberNoticeList1(state, obj) {
			state.NoticeList1 = obj;
		},
		queryMemberNoticeList2(state, obj) {
			state.NoticeList2 = obj;
		},
		deleteNoticeAlert(state, obj) {
			state.deleteNotice = obj;
		},
		// 今日结算
		myOrderList(state, obj) {
			state.OrderList = obj;
		},
		// 热门体育 查询余额
		balance(state, obj) {
			state.balanceList = obj;
		},
		// 资金转向三方
		amountOut(state, obj) {
			state.amountOutList = obj;
		},
		// 请求三方地址
		open(state, obj) {
			state.openList = obj;
		},
		// 三方账户注册
		register(state, obj) {
			state.registerList = obj;
		},

		// 三方转向中心
		withdrawal(state, obj) {
			state.withdrawalList = obj;
		},
		queryApplyPoint(state, data) {
			state.points = data
		},
		_queryNoticeAlertList(state, data) {
			state.alertList = data
		}
	},
	actions: {
		nowAllKindMessage(){
			return new Promise((resolve, reject) => {
				let res = request('get', 'nowAllKindMessage').then((res) => {
					resolve(res)
				})
			})
		},
		querySlidesImg(){
			return new Promise((resolve, reject) => {
				let res = request('get', 'querySlidesImg').then((res) => {
					resolve(res)
				})
			})
		},
		signOut() {
			return new Promise((resolve, reject) => {
				let res = request('get', 'signOut').then((res) => {
					resolve(res)
				})
			})
		},
		// 获取消息
		queryNoticeAlertList({
			commit
		}, params) {
			return new Promise((resolve, reject) => {
				let res = request('get', 'queryNoticeAlertList', params).then((res) => {
					commit('_queryNoticeAlertList', res.data);
					console.log(res)
					resolve(res)
				})
			})
		},
		queryApplyPoint({
			commit
		}) {
			return new Promise((resolve, reject) => {
				let res = request('get', 'queryApplyPoint').then((res) => {
					commit('queryApplyPoint', res);
					sessionStorage.setItem('points', JSON.stringify(res));
					resolve(res)
				})
			})
		},
		chartLogin({
			commit
		}) {

		},
		//我的投注记录
		queryLotteryOrderOwn({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryLotteryOrderOwn', params).then((res) => {
					commit('savequeryLotteryOrderOwn', res.data)
					resolve(res)
				})
			})
		},
		//所有彩种
		kind({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'kind').then((res) => {
					commit('savekind', res)
					resolve(res)
				})
			})
		},
		//所有彩种
		kindSum({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'kindSum').then((res) => {
					commit('saveKindSum', res)
					resolve(res)
				})
			})
		},
		//查看投注详情
		queryMemberReportOne({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryMemberReportOne', params).then((res) => {
					commit('savequeryMemberReportOne', res)
					resolve(res)
				})
			})
		},
		//撤单
		cancelOrder({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'cancelOrder', params).then((res) => {
					commit('savecancelOrder', res)
					resolve(res)
				})
			})
		},
		//开奖历史1
		winHistory({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'winHistory', params).then((res) => {
					commit('savewinHistory', res)
					resolve(res)
				})
			})
		},
		//开奖历史2
		winsDragon({
			commit
		}, patams) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'winsDragon', patams).then((res) => {
					commit('savewinsDragon', res)
					resolve(res)
				})
			})
		},
		openRecord({
			commit
		}, patams) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'openRecord', patams).then((res) => {
					commit('saveopenRecord', res)
					resolve(res)
				})
			})
		},
		//银行卡
		memberIfBind({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'memberIfBind').then((res) => {
					commit('savememberIfBind', res)
					resolve(res)
				})
			})
		},
		// 新增银行卡
		saveMemberOtherBank({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'saveMemberOtherBank', params).then((res) => {
					commit('save_MemberOtherBank', res)
					resolve(res)
				})
			})
		},
		// 绑定首张银行卡
		saveMemberBank({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'saveMemberBank', params).then((res) => {
					commit('save_MemberBank', res)
					resolve(res)
				})
			})
		},
		// 登出
		signOut({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'signOut').then((res) => {
					// commit('save_MemberOtherBank',res);
					resolve(res)
				})
			})
		},
		//获取公告
		queryMemberNoticeList({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryMemberNoticeList', params).then((res) => {
					// 		if(params === '?notice_type=3') {
					// 	commit("queryMemberNoticeList1", res.data)
					// } else if(params === "?notice_type=2&type=1") {
					// 	commit("queryMemberNoticeList2", res.data)
					// 	resolve(res)
					// } else if(params === "?notice_type=2&type=2") {
					resolve(res)
					// }

				})
			})

		},
		// 帮助与反馈
		feedback({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'feedback', params).then((res) => {
					commit("feedback", res.data);
					resolve(res)
				})
			})
		},
		// 帮助与反馈
		helpService({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'helpService').then((res) => {
					resolve(res)
				})
			})
		},
		// 公告查询未读  
		updateNoticeAlert({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'updateNoticeAlert', params).then((res) => {
					// commit("updateNoticeAlert", res.data);
					resolve(res)
				})
			})
		},
		// 删除公告 
		deleteNoticeAlert({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'deleteNoticeAlert', params).then((res) => {
					// commit("deleteNoticeAlert", res.data);
					resolve(res)
				})
			})
		},
		// 今日结算
		myOrderList({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'myOrderList', params).then(res => {
					commit('myOrderList', res.data);
					resolve(res)
				})
			})
		},
		// 热门游戏 查询余额
		balance({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'balance', params).then(res => {
					commit('balance', res.data);
					resolve(res)
				})
			})
		},
		// 资金转向三方
		amountOut({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'amountOut', params).then(res => {
					commit('amountOut', res.data);
					resolve(res)
				})
			})
		},
		// 三方转向中心
		withdrawal({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'withdrawal', params).then(res => {
					commit('withdrawal', res.data);
					resolve(res)
				})
			})
		},
		// 请求三方地址
		open({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'open', params).then(res => {
					commit('open', res.data);
					resolve(res)
				})
			})
		},
		// 三方账户注册
		register({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'register', params).then(res => {
					commit('register', res.data);
					resolve(res)
				})
			})
		},
		// 资金转换  
		moneySwitch({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'moneySwitch', params).then(res => {
					// commit('moneySwitch',res.data);
					resolve(res)
				})
			})
		},
		// 审核申请转点    playformAll
		playformAll({
			commit
		}) {
			return new Promise((resolve, reject) => {
				let res = request('get', 'playformAll').then((res) => {
					resolve(res)
				})
			})
		},

	}
}