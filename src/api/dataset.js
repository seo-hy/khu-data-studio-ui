import axios from "axios";

const dataset = {
  save({
    name,
    host,
    port,
    db,
    userName,
    password,
    tableName,
    dateTimeColumn,
  }) {
    return axios.post("/dataset-api/datasets", {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    });
  },
  get(datasetId) {
    return axios.get("/dataset-api/datasets/" + datasetId);
  },
  getList() {
    return axios.get("/dataset-api/datasets");
  },
  update({
    datasetId,
    name,
    host,
    port,
    db,
    userName,
    password,
    tableName,
    dateTimeColumn,
  }) {
    return axios.put("/dataset-api/datasets/" + datasetId, {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    });
  },
  delete(datasetId) {
    return axios.delete(
      "/dataset-api/datasets/" + datasetId
    );
  },
  connect({
    host,
    port,
    userName,
    password,
    db,
    tableName,
    dateTimeColumn,
  }) {
    return axios.post("/dataset-api/datasets/connect", {
      host,
      port,
      db,
      userName,
      password,
      tableName,
      dateTimeColumn,
    });
  },
  getData(datasetId, limit, st, et) {
    return axios.get(
      "/dataset-api/datasets/" +
        datasetId +
        "/data?limit=" +
        limit +
        "&st=" +
        st +
        "&et=" +
        et
    );
  },
  getColumn(datasetId) {
    return axios.get(
      "/dataset-api/datasets/" + datasetId + "/column"
    );
  },
  updateData(datasetId, request) {
    return axios.put(
      "/dataset-api/datasets/" + datasetId + "/data",
      request
    );
  },
};

export default dataset;
