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
    return dataset
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
    return dataset
      .saveWithCsv({ name, dateTimeColumn, csv })
      .then((res) => {
        return res.data;
      });
  },
  PREVIEW_WITH_DATABASE(
    context,
    {
      host,
      port,
      db,
      username,
      password,
      table,
      dateTimeColumn,
    }
  ) {
    return dataset
      .previewWithDatabase({
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
  PREVIEW_WITH_CSV(context, { dateTimeColumn, csv }) {
    return dataset
      .previewWithCsv({ dateTimeColumn, csv })
      .then((res) => {
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
      dateTimeColumn,
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
        dateTimeColumn,
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
