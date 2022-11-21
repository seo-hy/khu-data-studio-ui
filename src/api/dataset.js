import axios from "axios";

const dataset = {
  saveWithDatabase({
    name,
    host,
    port,
    db,
    username,
    password,
    table,
    dateTimeColumn,
  }) {
    return axios.post("/dataset-api/datasets/database", {
      name,
      host,
      port,
      db,
      username,
      password,
      table,
      dateTimeColumn,
    });
  },
  saveWithCsv({ name, dateTimeColumn, csv }) {
    let formData = new FormData();
    formData.append("csv", csv);
    let request = {
      name,
      dateTimeColumn,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );
    return axios.post(
      "/dataset-api/datasets/csv",
      formData
    );
  },
  previewWithDatabase({
    host,
    port,
    db,
    username,
    password,
    table,
    dateTimeColumn,
  }) {
    return axios.post(
      "/dataset-api/datasets/preview/database",
      {
        host,
        port,
        db,
        username,
        password,
        table,
        dateTimeColumn,
      }
    );
  },
  previewWithCsv({ dateTimeColumn, csv }) {
    let formData = new FormData();
    formData.append("csv", csv);
    let request = {
      dateTimeColumn,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );
    return axios.post(
      "/dataset-api/datasets/preview/csv",
      formData
    );
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
