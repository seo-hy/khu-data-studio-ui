import cleaning from "@/api/cleaning";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  FIND_NA(context, request) {
    return cleaning.find(request).then((res) => {
      return res.data;
    });
  },
  PROCESS_NA(context, { method, request }) {
    return cleaning.process(method, request).then((res) => {
      return res.data;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
