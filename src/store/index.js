import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInformation:[]
  },
  mutations: {
    saveUser (state,user){
      state.userInformation = user
    }
  },
  actions: {
  },
  modules: {
  }
})
