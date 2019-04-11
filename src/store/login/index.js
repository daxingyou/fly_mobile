import {
	request
} from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {
		userDetails: [], //用户详情
		loginpuzzleShow: false,
	},
	getters: {},
	mutations: {
		saveUserDetails(state, obj) {
				state.userDetails = obj;
		},
		setLoginpuzzleShow(state, data) {
			state.loginpuzzleShow = data
		  },
		
	},
	actions: {
		//get线路切换网址
		getAutoUrl({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'getAutoUrl').then((res) => {
					resolve(res)
				})
			})
		},
		//游客试玩
		touristLogin({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'touristLogin', params).then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})
		},
		//会员登录
		memberLogin({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'memberLogin', params).then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})
		},
		getUserDetails({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'getUserDetails').then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})
		},
		m52Login({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'm52Login', params).then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})
		},  
		getIp({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'getIp', params).then(res => {
					resolve(res)
				})
			})
		},
		validateImgCode({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'validateImgCode').then((res) => {
					resolve(res)
				})
			})
		},
	},
}