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
  }) {
    return axios.post("/dataset-api/datasets", {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
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
  }) {
    return axios.put("/dataset-api/datasets/" + datasetId, {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
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
  }) {
    return axios.post("/dataset-api/datasets/connect", {
      host,
      port,
      db,
      userName,
      password,
      tableName,
    });
  },
  getData(datasetId, limit) {
    return axios.get(
      "/dataset-api/datasets" +
        datasetId +
        "/data?limit=" +
        limit
    );
  },
};

export default dataset;
