import axios from "axios";

const manage = {
  get(id) {
    return axios.get("/manage/database/" + id);
  },
  getList() {
    return axios.get("/manage/database");
  },
  save({
    dataName,
    host,
    port,
    db,
    userName,
    password,
    tableName,
  }) {
    return axios.post("/manage/database", {
      dataName,
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
    return axios.post("/manage/database/connect-test", {
      host,
      port,
      db,
      userName,
      password,
      tableName,
    });
  },
};

export default manage;
