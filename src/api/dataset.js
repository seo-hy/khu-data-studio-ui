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
  update({ datasetId, name }) {
    return axios.put("/dataset-api/datasets/" + datasetId, {
      name,
    });
  },
  delete(datasetId) {
    return axios.delete(
      "/dataset-api/datasets/" + datasetId
    );
  },
  previewData({ datasetId }) {
    return axios.get(
      "/dataset-api/datasets/" + datasetId + "/data/preview"
    );
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
  updateWithDatabase({
    datasetId,
    host,
    port,
    db,
    username,
    password,
    table,
    dateTimeColumn,
  }) {
    return axios.put(
      "/dataset-api/datasets/" +
        datasetId +
        "/data/database",
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
  updateWithCsv({ datasetId, dateTimeColumn, csv }) {
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
    return axios.put(
      "/dataset-api/datasets/" + datasetId + "/data/csv",
      formData
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
