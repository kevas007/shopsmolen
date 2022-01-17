import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shop:null,
    token:null,
    users:null,
    personalShop:null,
  },
  mutations: {
    setShop(state,shop){
      state.shop = shop
    },
    // addUsers(state,shop){
    //   state.shop = shop
    // },
    userConnected(state,tokens){
      state.token = tokens
      console.log(state.token);
    },
    logout(state){
      state.token = null
      this.$route.push('/login')
      localStorage.clear()
    },
    userGet(state ){
      state.users = JSON.parse(localStorage.getItem('users'));
      console.log(JSON.parse(localStorage.getItem('users')));

      console.log(state.users);
    },
    setShopPersonal(state,personalShop){
      state.personalShop = personalShop
    }
  },
  actions: {
      getShop({commit}){
        // const headers = {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //   "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // };
        axios.get('https://api-moshop.molengeek.pro/api/v1/mg/shop',{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        }
        })
    .then(res=>{
          commit('setShop',res.data.data)
          console.log(res.data.data)
        }
        )
      },
      // addUser({commit},user){
      //   axios.post('https://api-moshop.molengeek.pro/api/v1/register',user)
      //   .then(res=>{
      //     console.log(res.data)
      //     commit('addUsers',res.data)
      //   })
      // },
      // userConnected({commit, state}, user){

      //   axios.post('https://api-moshop.molengeek.pro/api/v1/login',user)
      //   .then(function (res){
      //     state.token = res.data.data.token
      //     commit('userConnected',res.data)
      //       console.log(state.token = res.data.data.token)
      //   })

      // },
    async getUser({commit, state}){
   
      await  axios.get('https://api-moshop.molengeek.pro/api/v1/user',{
          headers: {
            "Authorization": "Bearer " + state.token,
          }
        })
        .then(function (res){
          localStorage.setItem('users',JSON.stringify(res.data.data))
          commit('userGet')
          console.log(res.data)
        })
      },
      getPersShop({commit, state}){
        axios.get('https://api-moshop.molengeek.pro/api/v1/shop',{
          headers: {
            "Authorization": "Bearer " + state.token,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          }
        })
        .then(res=>{
          commit('setShopPersonal',res.data.data)
          console.log(res.data.data)
        })
      },
      userConnected({commit}){
          console.log((localStorage.getItem('token')));
          if(localStorage.getItem('token')){
            commit('userConnected', JSON.parse(localStorage.getItem('token')))
            console.log("vous êtes connecté");
          }
        }
      },

  modules: {},
  getters: {
    setShops: function (state) {
      return state.shop
    },
    setUsers: function (state) {
      return state.users
    },
    setShopPersonals : function (state) {

      return state.personalShop
    }
  }
})
