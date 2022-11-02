<template>
  <div>
    <div class="pearson-container">
      <div class="pearson-container-header">
        <div class="sub-title">피어슨 상관계수</div>
        <div class="pearson-threshold-input">
          <div class="label">임계값을 입력하세요(0~1)</div>
          <input type="number" />
          <button>확인</button>
        </div>
      </div>
      <div v-if="isLoading" class="loading">
        <Spinner />
      </div>

      <div class="table-container" v-if="!isLoading">
        <table>
          <thead>
            <th></th>
            <th
              v-for="(key, i) in Object.keys(pearson)"
              :key="i"
            >
              {{ key }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in Object.keys(pearson)"
              :key="i"
            >
              <td class="th-style">{{ row }}</td>
              <td
                v-for="(col, j) in Object.keys(pearson)"
                :key="j"
              >
                {{ pearson[row][col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div>시각화</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["datasetId"],
  components: {
    Spinner,
  },
  data() {
    return {
      data: [],
      pearson: [],
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATA"]),
    ...mapActions("cleaning", ["PEARSON_CORRELATION"]),
    get_pearson_correlation() {
      this.FETCH_DATA({
        datasetId: this.datasetId,
        limit: 0,
      }).then((res) => {
        this.data = res;
        this.PEARSON_CORRELATION({
          request: res,
        }).then((res) => {
          this.pearson = res;
          this.isLoading = false;
        });
      });
    },
  },
  created() {
    this.get_pearson_correlation();
  },
};
</script>

<style scoped>
.pearson-container-header {
  display: flex;
  justify-content: space-between;
}
.sub-title {
  color: #e8e8e8;
  font-weight: 400;
  font-size: 20px;
  margin: 5px;
}
table {
  width: 100%;
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  border-collapse: collapse;
}
th {
  border: 1.5px solid #545454;
  height: 35px;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
}
td {
  border: 0.5px solid #353535;
  height: 30px;
  width: 12%;
}
.table-container {
  padding-top: 10px;
  overflow: auto;
  width: 100%;
}
.th-style {
  border: 1.5px solid #545454;
  background-color: #2c2c2c;
  height: 35px;
  font-size: 17px;
  font-weight: 400;
}
</style>
