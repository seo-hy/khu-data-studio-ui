import dataset from "@/api/dataset";

const state = {
  datasets: [],
  st: "",
  et: "",
};

const getters = {
  getDatasets(state) {
    return state.datasets;
  },
  getSt(state) {
    return state.st;
  },
  getEt(state) {
    return state.et;
  },
};

const mutations = {
  SET_DATASETS(state, payload) {
    state.datasets = payload;
  },
  SET_ST(state, payload) {
    state.st = payload;
  },
  SET_ET(state, payload) {
    state.et = payload;
  },
};

const actions = {
  SAVE_DATASET_WITH_DATABASE(
    context,
    {
      name,
      host,
      port,
      db,
      username,
      password,
      table,
      dateTimeColumn,
    }
  ) {
    dataset
      .saveWithDatabase({
        name,
        host,
        port,
        db,
        username,
        password,
        table,
        dateTimeColumn,
      })
      .then((res) => {
        return res.data;
      });
  },
  SAVE_DATASET_WITH_CSV(
    context,
    { name, dateTimeColumn, csv }
  ) {
    dataset
      .saveWithCsv({ name, dateTimeColumn, csv })
      .then((res) => {
        return res.data;
      });
  },
  FETCH_DATASET(context, datasetId) {
    dataset.get(datasetId).then((res) => {
      return res.data;
    });
  },
  FETCH_DATASETS(context) {
    dataset.getList().then((res) => {
      context.commit("SET_DATASETS", res.data);
    });
  },
  UPDATE_DATASET(
    context,
    {
      datasetId,
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    }
  ) {
    dataset
      .update({
        datasetId,
        name,
        host,
        port,
        db,
        userName,
        password,
        tableName,
        dateTimeColumn,
      })
      .then((res) => {
        return res.data;
      });
  },
  DELETE_DATASET(context, { datasetId }) {
    dataset.delete(datasetId).then((res) => {
      return res;
    });
  },
  CONNECT(
    context,
    {
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    }
  ) {
    dataset
      .connect({
        host,
        port,
        db,
        userName,
        password,
        tableName,
        dateTimeColumn,
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {});
  },
  FETCH_DATA(context, { datasetId, limit }) {
    dataset
      .getData(datasetId, limit, "", "")
      .then((res) => {
        return res.data;
      });
  },
  FETCH_DATA_RANGE(context, { datasetId, limit }) {
    dataset
      .getData(
        datasetId,
        limit,
        context.state.st,
        context.state.et
      )
      .then((res) => {
        return res.data;
      });
  },
  FETCH_COLUMN(context, { datasetId }) {
    dataset.getData(datasetId).then((res) => {
      return res.data;
    });
  },
  UPDATE_DATA(context, { datasetId, request }) {
    dataset.updateData(datasetId, request).then((res) => {
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
