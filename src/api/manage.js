import axios from "axios";

const manage = {
  get(id) {
    return axios.get("/manage/dataset/" + id);
  },
  getList() {
    return axios.get("/manage/dataset");
  },
  save({
    name,
    host,
    port,
    db,
    userName,
    password,
    tableName,
  }) {
    return axios.post("/manage/dataset", {
      name,
      host,
      port,
      db,
      userName,
      password,
      tableName,
    });
  },
  connectTest({
    host,
    port,
    userName,
    password,
    db,
    tableName,
  }) {
    return axios.post("/manage/dataset/connect-test", {
      host,
      port,
      db,
      userName,
      password,
      tableName,
    });
  },
  getData(id) {
    return axios.get("/manage/dataset/" + id + "/data");
  },
};

export default manage;
