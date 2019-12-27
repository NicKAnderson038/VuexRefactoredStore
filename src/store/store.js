import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cloneDeep from "lodash/fp/cloneDeep";

Vue.prototype.axios = axios;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    post: {},
    loading: {}
  },
  actions: {
    async fetchData({ rootState, commit }, payload) {
      try {
        console.log(payload.method);
        // let body = { language: rootState.authStore.currentLocale.locale };
        // if (payload) {
        //   console.log('fail')
        //   body = Object.assign({}, payload.body, body);
        // }
        const response = await axios[`${payload.method}`](
          payload.url,
          payload.body
        );
        console.log(response.data);

        if (payload.property) {
          commit("mutate", {
            property: payload.property,
            with: cloneDeep(response.data)
          });
        }
        return;
      } catch (error) {
        throw error;
      }
    }
  },
  mutations: {
    mutate(state, payload) {
      state[payload.property] = payload.with;
    },
    loadingStart(state, payload) {
      state.loading[payload] = true;
    },
    loadingEnd(state, payload) {
      state.loading[payload] = false;
    }
  }
});
