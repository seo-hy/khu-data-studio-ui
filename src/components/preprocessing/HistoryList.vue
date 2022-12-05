<template>
  <div class="dataset-list-root">
    <div class="table-container">
      <table>
        <thead>
          <th>데이터셋</th>
          <th>수행 전처리</th>
          <th>세부 내용</th>
          <th>사용 데이터 기간</th>
          <th>수행 일시</th>
        </thead>
        <tbody>
          <tr
            v-for="history in historyList"
            :key="history.id"
          >
            <td>{{ history.datasetName }}</td>
            <td class="small-td">{{ history.name }}</td>
            <template v-if="history.name === '결측치 처리'">
              <td class="detail-td">
                <span class="td-desc">처리 방법 : </span>
                {{ history.method }}
              </td>
            </template>
            <template v-else>
              <td class="detail-td">
                <span class="td-desc">수행 컬럼 : </span>
                {{ history.columns }}

                <br />
                <span class="td-desc">가중치 : </span>

                {{ history.com }}
              </td>
            </template>
            <td>
              {{ history.startDate }} ~
              {{ history.endDate }}
            </td>
            <td class="small-td">
              {{ history.createdDate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["datasetId"],
  components: {},
  computed: {
    ...mapGetters("dataset", ["getDatasets"]),
  },
  data() {
    return {
      historyList: "",
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_HISTORY",
      "FETCH_HISTORY_BY_DATASET_ID",
    ]),
    getHistory() {
      if (this.datasetId === 0) {
        this.FETCH_HISTORY().then((res) => {
          this.historyList = res;
        });
      } else {
        this.FETCH_HISTORY_BY_DATASET_ID({
          datasetId: this.datasetId,
        }).then((res) => {
          this.historyList = res;
        });
      }
    },
  },
  created() {
    this.getHistory();
  },
  watch: {
    datasetId: function () {
      this.getHistory();
    },
  },
};
</script>

<style scoped>
.dataset-list-root {
  height: 90%;
  display: flex;
  justify-content: center;
}
.table-container {
  display: flex;
  justify-content: center;
  height: calc(100% - 30px);
  width: calc(100% - 20px);
  margin-top: 10px;
}
table {
  justify-content: center;
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border-collapse: separate;
  border-spacing: 0;
  display: block;
  overflow: auto;
}
th {
  position: sticky;
  top: 0px;
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
  width: 300px;
}
th:first-child {
  border-right: none;
}

td {
  border: 1.5px solid #353535;
  border-top: none;
  height: 60px;
  font-size: 13px;
}
td:first-child {
  border-right: none;
}
.detail-td {
  font-size: 13px;
  text-align: left;
  padding-left: 15px;
  min-width: 220px;
}
.td-desc {
  font-size: 12px;
  color: rgb(213, 172, 49);
}
</style>
