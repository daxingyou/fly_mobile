import initialState from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'
export default{
	namespaced: true,
	state:initialState,
    getters: {
    },
    mutations: mutations,
  actions:actions
}