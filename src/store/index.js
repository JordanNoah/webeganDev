import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInformation:[],
    otherSocialNetwork:[{"idSocialNetwork":1,"icon":"facebook.jpg","title":"Facebook","color":"background:#3b5998;","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null},{"idSocialNetwork":2,"icon":"instagram.jpg","title":"Instagram","color":"background: linear-gradient(90deg, rgba(221,42,123,1) 0%, rgba(129,52,175,1) 50%, rgba(81,91,212,1) 100%);","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null},{"idSocialNetwork":3,"icon":"google.jpg","title":"Google","color":"background:#ff4a35;","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null},{"idSocialNetwork":4,"icon":"twitter.jpg","title":"Twitter","color":"background:#1DA1F2;","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null},{"idSocialNetwork":5,"icon":"youtube.jpg","title":"Youtube","color":"background:#FF0000;","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null},{"idSocialNetwork":6,"icon":"whatsapp.jpg","title":"Whatsapp","color":"background:#00bb2d;","createdAt":"2020-07-20T22:59:38.000Z","updatedAt":"2020-07-20T22:59:38.000Z","link":null}]
  },
  mutations: {
    saveUser (state,user){
      state.userInformation = user
    },
    saveSocialNetwork (state,socialNetworks){
      state.otherSocialNetwork = socialNetworks
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
  }
})
