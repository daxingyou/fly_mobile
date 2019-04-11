import { request } from "../../../utils/request.js"
const actions = {
	getPlayList({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
			let res = request('get', 'getGamePlayList', params).then((res) => {
				commit("SET_PLAYLIST", res.data)
				resolve(res)
			})
		})
	},
	getBetRates({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
			let res = request('post', 'getSubGames', params).then((res) => {
				commit("SET_BETRATES", res.data)
				resolve(res)
			})
		})
	},
	quickBet({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
				let res = request('post', 'chipIn', params).then((res) => {
					resolve(res)
				})
			})
	},
	getGameInfo({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
				let res = request('get', 'getWinsDragon', params).then((res) => {
					commit("SET_GAMEINFO", res.data)
					resolve(res)
				})
			})
	},
	recentOpenCode({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
				let res = request('get', 'recentOpenCode', params).then((res) => {
					resolve(res)
				})
			})
	},
	lmpbet({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
			let res = request('post', 'twoBet', params).then((res) => {
				resolve(res)
			})
		})
	},
	getTwoGameOdd({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
			let res = request('get', 'twoGameOdd', params).then((res) => {
				if(res.code == 0){
					commit("SET_LMPODDS",res.data)
				}
				resolve(res)
			})
		})
	},

	getKindList({
		commit
	}) {
		return new Promise(function(resolve, reject) {
			let res = request('get', 'kind').then((res) => {
				if(res.code==0){
					commit('SET_KINDLIST', res.data)
				}
				resolve(res)
			})
		})
	},
	updateGameType({
		commit
	}, params) {
		return new Promise(function(resolve, reject) {
			let res = request('get', 'updateGameType', params).then((res) => {
				resolve(res)
			})
		})
	},
	

};
export default actions;