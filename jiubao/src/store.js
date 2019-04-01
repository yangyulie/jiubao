import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data:"ceshi",
    app:123,
    app2:234
  },
  mutations: {
    SET_DATA(state,data){
      state.data=data;
    }
  },
  actions: {
    setData({commit},data){
      commit("SET_DATA",data);
    }
  },
});
