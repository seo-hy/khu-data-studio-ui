<template>
  <div>
    <table>
      <thead>
        <th v-for="(col, i) in data.column" :key="i">
          {{ col.name }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in top100Data" :key="i">
          <td v-for="(col, j) in data.column" :key="j">
            {{ row[col.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["datasetId"],
  data() {
    return {
      data: [],
    };
  },
  computed: {
    top100Data() {
      if (this.data.length === 0) {
        return this.data;
      } else {
        if (this.data.data.lenth < 100) {
          return this.data.data;
        } else {
          return this.data.data.slice(0, 100);
        }
      }
    },
  },
  methods: {
    ...mapActions("manage", ["FETCH_TABLE_DATA"]),
  },
  created() {
    this.FETCH_TABLE_DATA(this.datasetId).then((res) => {
      this.data = res;
    });
  },
};
</script>

<style scoped>
table {
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  width: 50%;
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
</style>
