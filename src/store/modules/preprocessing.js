import preprocessing from "@/api/preprocessing";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  FIND_NA(context, { request }) {
    return preprocessing.find(request).then((res) => {
      return res.data;
    });
  },
  RUN_NA(context, { method, idxCol, request }) {
    return preprocessing
      .run(method, idxCol, request)
      .then((res) => {
        return res.data;
      });
  },
  DELETE_MISSING_VALUE(context, { request }) {
    return preprocessing
      .deleteMissingValue(request)
      .then((res) => {
        return res.data;
      });
  },
  PEARSON_CORRELATION(context, { request }) {
    return preprocessing
      .pearsonCorrelation(request)
      .then((res) => {
        return res.data;
      });
  },
  STD(context, { request }) {
    return preprocessing.std(request).then((res) => {
      return res.data;
    });
  },
  MEAN(context, { request }) {
    return preprocessing.mean(request).then((res) => {
      return res.data;
    });
  },
  VISUALIZE(context, { request, dateTimeColumn }) {
    return preprocessing
      .visualize(request, dateTimeColumn)
      .then((res) => {
        return res.data;
      });
  },
  DENOISE(context, { request, com, datasetId }) {
    return preprocessing
      .denoise(request, com, datasetId)
      .then((res) => {
        return res.data;
      });
  },
  INTERPOLATE(context, { request }) {
    return preprocessing
      .interpolate(request)
      .then((res) => {
        return res.data;
      });
  },
  PREDICT(context, { request }) {
    return preprocessing.predict(request).then((res) => {
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
