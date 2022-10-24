import dataset from "@/api/dataset";

const state = {
  datasets: [],
};

const getters = {
  getDatasets(state) {
    return state.datasets;
  },
};

const mutations = {
  SET_DATASETS(state, payload) {
    state.datasets = payload;
  },
};

const actions = {
  SAVE_DATASET(
    context,
    { name, host, port, db, userName, password, tableName }
  ) {
    return dataset
      .save({
        name,
        host,
        port,
        db,
        userName,
        password,
        tableName,
      })
      .then((res) => {
        return res.data;
      });
  },
  FETCH_DATASETS(context) {
    return dataset.getList().then((res) => {
      context.commit("SET_DATASETS", res.data);
    });
  },
  CONNECT(
    context,
    { host, port, db, userName, password, tableName }
  ) {
    return dataset
      .connect({
        host,
        port,
        db,
        userName,
        password,
        tableName,
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {});
  },
  FETCH_DATA(context, datasetId, limit) {
    return dataset.getData(datasetId, limit).then((res) => {
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
