import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.prototype.axios = axios;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  actions: {
    loadUsers({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(result => {
          commit("SAVE_USERS", result.data);
        })
        .catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  mutations: {
    SAVE_USERS(state, users) {
      state.users = users;
    }
  }
});
