const state = {
  selectedTableId: 0,
};

const getters = {
  getTableInfoList(state) {
    return state.tableInfoList;
  },
};

const mutations = {
  SET_TABLE_INFO_LIST(state, payload) {
    state.tableInfoList = payload;
  },
};

const actions = {
  FETCH_TABLE_INFO_LIST(context) {
    return manage.getList().then((res) => {
      context.commit("SET_TABLE_INFO_LIST", res.data);
    });
  },
  SAVE_TABLE_INFO(
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
