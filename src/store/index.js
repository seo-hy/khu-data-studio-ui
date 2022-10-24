import Vue from "vue";
import Vuex from "vuex";
import dataset from "./modules/dataset";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dataset,
  },
});

export default store;
