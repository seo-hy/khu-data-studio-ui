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
    { name, host, port, db, username, password, table }
  ) {
    return dataset
      .saveWithDatabase({
        name,
        host,
        port,
        db,
        username,
        password,
        table,
      })
      .then((res) => {
        return res.data;
      });
  },
  SAVE_DATASET_WITH_CSV(context, { name, csv }) {
    return dataset
      .saveWithCsv({ name, csv })
      .then((res) => {
        return res.data;
      });
  },
  PREVIEW_WITH_DATABASE(
    context,
    { host, port, db, username, password, table }
  ) {
    return dataset
      .previewWithDatabase({
        host,
        port,
        db,
        username,
        password,
        table,
      })
      .then((res) => {
        return res.data;
      });
  },
  PREVIEW_WITH_CSV(context, { csv }) {
    return dataset.previewWithCsv({ csv }).then((res) => {
      return res.data;
    });
  },
  FETCH_DATASET(context, datasetId) {
    return dataset.get(datasetId).then((res) => {
      return res.data;
    });
  },
  FETCH_DATASETS(context) {
    return dataset.getList().then((res) => {
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
    }
  ) {
    return dataset
      .update({
        datasetId,
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
  DELETE_DATASET(context, { datasetId }) {
    return dataset.delete(datasetId);
  },
  PREVIEW_DATA(context, { datasetId }) {
    return dataset
      .previewData({ datasetId })
      .then((res) => {
        return res.data;
      });
  },
  FETCH_DATA(context, { datasetId }) {
    return dataset
      .getData(
        datasetId,
        context.state.st,
        context.state.et
      )
      .then((res) => {
        return res.data;
      });
  },
  FETCH_ALL_DATA(context, { datasetId }) {
    return dataset
      .getData(datasetId, "", "")
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATA(context, { datasetId, data }) {
    console.log(datasetId);
    return dataset
      .updateData({ datasetId, data })
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATA_WITH_DATABASE(
    context,
    { datasetId, host, port, db, username, password, table }
  ) {
    return dataset
      .updateWithDatabase({
        datasetId,
        host,
        port,
        db,
        username,
        password,
        table,
      })
      .then((res) => {
        return res.data;
      });
  },
  UPDATE_DATA_WITH_CSV(context, { datasetId, csv }) {
    return dataset
      .updateWithCsv({
        datasetId,
        csv,
      })
      .then((res) => {
        return res.data;
      });
  },
  DELETE_DATA_BY_DATE(context, { datasetId, dateList }) {
    return dataset
      .deleteDataByDate({ datasetId, dateList })
      .then((res) => {
        return res;
      });
  },
  SAVE_HISTORY(context, { datasetId, request }) {
    return dataset
      .saveHistory({ datasetId, request })
      .then((res) => {
        return res;
      });
  },
  FETCH_HISTORY() {
    return dataset.getHistory().then((res) => {
      return res.data;
    });
  },
  FETCH_HISTORY_BY_DATASET_ID(context, { datasetId }) {
    return dataset
      .getHistoryByDatasetId({ datasetId })
      .then((res) => {
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
