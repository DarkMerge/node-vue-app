import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stats: {},
    localStats: {}
  },
  mutations: {
    updateStats (state, data) {
      state.stats = data
    },
    updateLocalStats (state, data) {
      console.log('data ', data);
      state.localStats = data
    }
  }
})
