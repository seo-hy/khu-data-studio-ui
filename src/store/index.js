import Vue from "vue";
import Vuex from "vuex";
import manage from "./modules/manage";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    manage,
  },
});

export default store;
