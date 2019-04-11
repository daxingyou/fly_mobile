import { request } from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		getWinsDragon({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'getWinsDragon', params).then((res) => {
					resolve(res)
				})
			})
		},
	}
}