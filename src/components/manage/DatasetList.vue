<template>
  <div>
    <table>
      <thead>
        <th>Name</th>
        <th>Host</th>
        <th>Port</th>
        <th>Database</th>
        <th>Table</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr
          v-for="tableInfo in getTableInfoList"
          :key="tableInfo.id"
        >
          <td class="name">{{ tableInfo.name }}</td>
          <td>{{ tableInfo.host }}</td>
          <td>{{ tableInfo.port }}</td>
          <td>{{ tableInfo.db }}</td>
          <td>{{ tableInfo.tableName }}</td>
          <td class="action">
            <button class="show-btn">
              <font-awesome-icon
                icon="fa-solid fa-table"
              />열람
            </button>
            <button class="edit-btn">
              <font-awesome-icon icon="fa-solid fa-pen" />
              수정
            </button>
            <button class="delete-btn">
              <font-awesome-icon
                icon="fa-solid fa-trash-can"
              />삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("manage", ["getTableInfoList"]),
  },
};
</script>

<style scoped>
table {
  margin-top: 20px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  width: 100%;
}
th {
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
}
td {
  border: 1px solid #353535;
  height: 30px;
  width: 12%;
}
.name {
  width: 300px;
}
.action {
  width: 230px;
}

.action button {
  padding: 5px;
  width: 55px;
  margin: 5px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
}
.show-btn {
  border: 1px solid rgb(157, 157, 157);
  color: rgb(157, 157, 157);
}
.show-btn svg {
  margin-right: 3px;
}

.edit-btn {
  border: 1px solid rgb(48, 119, 181);
  color: rgb(48, 119, 181);
}
.delete-btn {
  color: rgb(206, 54, 54);
  border: 1px solid rgb(206, 54, 54);
}
.delete-btn svg {
  margin-right: 3px;
}

.action button:hover {
  background-color: rgba(181, 181, 181, 0.182);
}
</style>
