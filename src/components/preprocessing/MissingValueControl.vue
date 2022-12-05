<template>
  <div class="missing-value-control">
    <div class="data-description">
      결측치가 포함된 행을 나열합니다.
    </div>
    <div class="data-container">
      <Spinner v-if="isLoading" class="spinner" />
      <div class="table-container" v-if="!isLoading">
        <table>
          <thead>
            <th>
              {{ missingValueData.dateTimeColumn }}
            </th>
            <th
              v-for="(col, i) in missingValueData.column"
              :key="i"
            >
              {{ col.name }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in missingValueData.data"
              :key="i"
            >
              <td class="datetime-td">
                {{ row.date }}
              </td>
              <td
                v-for="(col, j) in missingValueData.column"
                :key="j"
                :class="{ 'na-td': isNaIdx(i, j) }"
              >
                {{ row.value[col.name] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="action-container">
        <div class="method-label">
          결측치 처리 방법을 선택하세요.
        </div>
        <select
          v-model="selectedMethod"
          class="method-select"
        >
          <option
            v-for="method in methods"
            :value="method.value"
            :key="method.value"
          >
            {{ method.text }}
          </option>
        </select>
        <div class="btn-container">
          <div>
            <button class="run-btn" @click="run">
              수행
            </button>
            <button class="save-btn" @click="save">
              저장
            </button>
          </div>
          <div class="msg" :class="{ 'error-msg': error }">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["dataset", "changeDate"],
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters("dataset", ["getSt", "getEt"]),
  },
  data() {
    return {
      missingValueData: {},
      saveData: [],
      deleteDate: [],
      data: [],
      isLoading: true,
      naIdxList: [],
      selectedMethod: "0",
      saveMethod: "",
      msg: "",
      error: false,
      methods: [
        {
          text: "VAR모델 기반 예측값으로 대체",
          value: "0",
        },
        {
          text: "전,후 데이터 평균값으로 대체",
          value: "1",
        },
        {
          text: "결측치 포함 행 제거",
          value: "2",
        },
      ],
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATA",
      "UPDATE_DATA",
      "DELETE_DATA_BY_DATE",
      "SAVE_HISTORY",
      "FETCH_DATASETS",
    ]),
    ...mapActions("cleaning", [
      "FIND_NA",
      "RUN_NA",
      "DELETE_MISSING_VALUE",
      "INTERPOLATE",
      "PREDICT",
    ]),

    findNa() {
      this.saveMethod = "";
      this.msg = "";
      this.error = false;
      this.isLoading = true;
      this.FETCH_DATA({
        datasetId: this.dataset.id,
        st: this.getSt,
        et: this.getEt,
      }).then((res) => {
        this.data = res;
        this.FIND_NA({
          request: res,
        })
          .then((res) => {
            this.saveData = res;
            this.missingValueData = res;
            this.isLoading = false;
            this.updateNaIdx();
          })
          .catch((err) => {
            this.msg = err.response.data.detail;
            this.error = true;
            this.isLoading = false;
          });
      });
    },
    updateNaIdx() {
      this.naIdxList = [];
      for (
        var i = 0;
        i < this.missingValueData.data.length;
        i++
      ) {
        for (
          var j = 0;
          j < this.missingValueData.column.length;
          j++
        ) {
          if (
            this.missingValueData.data[i].value[
              this.missingValueData.column[j].name
            ] === null
          ) {
            this.naIdxList.push({ i, j });
          }
        }
      }
    },
    isNaIdx(iIdx, jIdx) {
      let isContain = this.naIdxList.filter(
        (e) => e.i === iIdx && e.j === jIdx
      );
      return isContain.length > 0;
    },

    run() {
      this.msg = "";
      this.error = false;
      this.deleteDate = [];
      this.isLoading = true;
      if (this.selectedMethod === "0") {
        this.PREDICT({ request: this.data })
          .then((res) => {
            this.missingValueData = res;
            this.saveData = res;
            this.saveMethod = this.selectedMethod;
            this.isLoading = false;
          })
          .catch((err) => {
            this.msg = err.response.data.detail;
            this.error = true;
            this.isLoading = false;
          });
      } else if (this.selectedMethod === "1") {
        this.INTERPOLATE({ request: this.data })
          .then((res) => {
            this.missingValueData = res;
            this.saveData = res;
            this.saveMethod = this.selectedMethod;
            this.isLoading = false;
          })
          .catch((err) => {
            this.msg = err.response.data.detail;
            this.error = true;
            this.isLoading = false;
          });
      } else if (this.selectedMethod === "2") {
        this.DELETE_MISSING_VALUE({
          request: this.data,
        })
          .then((res) => {
            this.missingValueData = res.run;
            this.deleteDate = res.deleteDate;
            this.saveMethod = this.selectedMethod;
            this.isLoading = false;
          })
          .catch((err) => {
            this.msg = err.response.data.detail;
            this.error = true;
            this.isLoading = false;
          });
      }
      // this.RUN_NA({
      //   method: this.selectedMethod,
      //   idxCol: this.idxCol,
      //   request: this.originData,
      // }).then((res) => {
      //   this.data = res.run;
      //   this.saveData = res.save;
      //   this.isLoading = false;
      // });
    },
    save() {
      this.msg = "";
      this.error = false;
      this.isLoading = true;
      if (this.saveMethod === "0") {
        this.UPDATE_DATA({
          datasetId: this.dataset.id,
          data: this.saveData.data,
        })
          .then(() => {
            let historyRequest = {
              name: "결측치 처리",
              detail: {
                method: "VAR모델 기반 예측값으로 대체",
              },
              startDate: this.getSt,
              endDate: this.getEt,
            };
            this.SAVE_HISTORY({
              datasetId: this.dataset.id,
              request: historyRequest,
            }).then(() => {
              this.FETCH_DATASETS();
              this.findNa();
              this.msg = "저장 완료되었습니다.";
            });
          })
          .catch((err) => {
            this.msg = err.response.data.message;
            this.error = true;
            this.isLoading = false;
          });
      } else if (this.saveMethod === "1") {
        this.UPDATE_DATA({
          datasetId: this.dataset.id,
          data: this.saveData.data,
        })
          .then(() => {
            let historyRequest = {
              name: "결측치 처리",
              detail: {
                method: "전,후 데이터 평균값으로 대체",
              },
              startDate: this.getSt,
              endDate: this.getEt,
            };
            this.SAVE_HISTORY({
              datasetId: this.dataset.id,
              request: historyRequest,
            }).then(() => {
              this.FETCH_DATASETS();
              this.findNa();
              this.msg = "저장 완료되었습니다.";
            });
          })
          .catch((err) => {
            this.msg = err.response.data.message;
            this.error = true;
            this.isLoading = false;
          });
      } else if (this.saveMethod === "2") {
        this.DELETE_DATA_BY_DATE({
          datasetId: this.dataset.id,
          dateList: this.deleteDate,
        })
          .then(() => {
            let historyRequest = {
              name: "결측치 처리",
              detail: {
                method: "결측치 포함 행 제거",
              },
              startDate: this.getSt,
              endDate: this.getEt,
            };
            this.SAVE_HISTORY({
              datasetId: this.dataset.id,
              request: historyRequest,
            }).then(() => {
              this.FETCH_DATASETS();

              this.findNa();
              this.msg = "저장 완료되었습니다.";
            });
          })
          .catch((err) => {
            this.msg = err.response.data.message;
            this.error = true;
            this.isLoading = false;
          });
      } else {
        this.msg = "Run before save";
        this.error = true;
        this.isLoading = false;
      }
    },
  },
  created() {
    this.findNa();
  },
  watch: {
    changeDate: function () {
      this.findNa();
    },
  },
};
</script>

<style scoped>
.missing-value-control {
  height: 100%;
}

.data-description {
  color: #e8e8e8;
  font-weight: 300;
  margin-bottom: 5px;
}
.data-container {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 35px);
}
.table-container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: calc(100% - 350px);
}
table {
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  display: block;
  overflow: auto;
}
th {
  position: sticky;
  top: 0px;
  height: 35px;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
  padding: 0 5px;
}
td {
  border: 0.5px solid #353535;
  height: 30px;
}

.action-container {
  margin-right: 20px;
  padding: 20px;
  position: relative;
  border: 0.8px solid rgba(109, 109, 109, 0.306);
  background-color: rgba(255, 255, 255, 0.014);
  border-radius: 15px;
  min-width: 200px;
  width: 220px;
  margin-left: 10px;
}
.spinner {
  margin-top: 60px;
}
.method-label {
  color: #e8e8e8;
  margin-bottom: 10px;
}
.method-select {
  background-color: rgb(39, 39, 39);
  color: #e8e8e8;
  font-size: 15px;
  padding: 10px;
}
.btn-container {
  width: 240px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
}
.btn-container > div:first-child {
  display: flex;
  justify-content: center;
}

.btn-container button {
  width: 70px;
  font-size: 18px;
  height: 30px;
  font-size: 17px;
  margin: 0 15px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.run-btn {
  background-color: #373737;
}
.restore-btn:hover,
.run-btn:hover {
  background-color: #464646;
}
.save-btn {
  background-color: #3f8ae2;
}
.save-btn:hover {
  background-color: #2f6cb1;
}
.na-td {
  border: 1px double #ae2f2f;
}
.datetime-td {
  border: 1.5px solid #545454;
  background-color: #2c2c2c;
  border: none;
  min-width: 156px;
}
.msg {
  height: 15px;
  color: #3f8ae2;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  margin: 0 5px;
}
.error-msg {
  color: rgb(210, 29, 29);
}
</style>
