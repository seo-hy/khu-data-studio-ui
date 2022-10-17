import manage from "@/api/manage";

const state = {
  tableInfoList: [],
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
    { name, host, port, db, userName, password, tableName }
  ) {
    return manage
      .save({
        name,
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
  FETCH_TABLE_DATA(context, id) {
    return manage.getData(id).then((res) => {
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
