import manage from "@/api/manage";

const state = {
  databaseList: [],
};

const getters = {
  getDatabaseList(state) {
    return state.databaseList;
  },
};

const mutations = {
  SET_DATABASE_LIST(state, payload) {
    state.databaseList = payload;
  },
};

const actions = {
  GET_LIST(context) {
    return manage.getList().then((res) => {
      context.commit("setDatabaseList", res.data);
    });
  },
  SAVE(
    context,
    {
      dataName,
      host,
      port,
      db,
      userName,
      password,
      tableName,
    }
  ) {
    return manage
      .save({
        dataName,
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
  CONNECT_TEST(
    context,
    { host, port, db, userName, password, tableName }
  ) {
    return manage
      .connectTest({
        host,
        port,
        db,
        userName,
        password,
        tableName,
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
