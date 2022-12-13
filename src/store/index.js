import Vue from "vue";
import Vuex from "vuex";
import dataset from "./modules/dataset";
import preprocessing from "./modules/preprocessing";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dataset,
    preprocessing,
  },
});

export default store;
