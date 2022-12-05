<template>
  <div class="noise-control-root">
    <div class="data-container">
      <div class="chart-container">
        <Spinner v-if="isLoading" class="spinner" />

        <div v-if="!isLoading" class="description">
          라벨을 클릭하여 display 여부를 설정할 수 있습니다.
        </div>
        <LineChart
          class="chart"
          v-if="!isLoading"
          :chartData="chartData"
          :options="chartOptions"
          :height="height"
        />
      </div>
      <div class="action-container">
        <div class="input">
          <label for="com">
            가중치를 입력하세요. (1~100)
          </label>
          <input
            type="number"
            class="com-input"
            id="com"
            v-model="com"
          />
        </div>
        <div class="input">
          <label> 수행할 컬럼을 선택하세요. </label>
          <div
            v-for="(col, i) in data.column"
            :key="i"
            class="checkbox"
          >
            <input
              type="checkbox"
              :value="col"
              v-model="denoiseColList"
            />{{ col.name }}
          </div>
        </div>

        <div class="btn-container">
          <div>
            <button class="run-btn" @click="denoise">
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
import LineChart from "@/components/common/chart/lineChart.js";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["dataset", "changeDate"],
  components: {
    LineChart,
    Spinner,
  },
  computed: {
    ...mapGetters("dataset", ["getSt", "getEt"]),
  },
  data() {
    return {
      isLoading: true,
      denoiseColList: [],
      data: [],
      denoiseData: [],
      height: 200,
      com: 20,
      historyColumns: "",
      msg: "",
      colorCnt: 0,
      error: false,
      chartOptions: {
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 7,
            fontSize: 13,
            fontColor: "#e8e8e8",
            padding: 30,
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              display: true,
              offset: true,
              time: {
                displayFormats: {
                  millisecond: "DD HH:MM:SS",
                  second: "HH:MM:SS",
                  minute: "HH:MM:SS",
                  hour: "MMM DD HH:00",
                  day: "MMM DD",
                  week: "MMM DD",
                  month: "YYYY MMM",
                  quarter: "YYYY MMM",
                  year: "YYYY",
                },
              },

              gridLines: {
                display: true,
                color: "#ffffff0d",
              },
              scaleLabel: {
                display: true,
                labelString: this.dataset.dateTimeColumn,
              },
              ticks: {
                fontSize: 10,
                padding: 20,
                maxTicksLimit: 12,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: "#ffffff0d",
              },
            },
          ],
        },
      },
      colors: [
        "#37a2eb",
        "#ff6384",
        "#4cc0c0",
        "#ff9e40",
        "#9a66ff",
        "#ffcd56",
        "#c9cbcf",
        "#B9E119",
        "#EA0A9F",
        "#151BE8",
        "#C2ACEA",
      ],
      chartData: {
        labels: [],
        datasets: [],
      },
      originDatasets: [],
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATA",
      "UPDATE_DATA",
      "FETCH_DATASETS",
      "SAVE_HISTORY",
    ]),
    ...mapActions("cleaning", ["DENOISE", "VISUALIZE"]),
    getData() {
      this.msg = "";
      this.error = false;
      this.isLoading = true;
      this.originLabels = [];
      this.originDatasets = [];
      this.chartData.datasets = [];
      this.denoiseData = [];
      this.FETCH_DATA({
        datasetId: this.dataset.id,
        st: this.getSt,
        et: this.getEt,
      }).then((res) => {
        this.data = res;
        this.VISUALIZE({
          request: res,
          dateTimeColumn: this.dataset.dateTimeColumn,
        }).then((res) => {
          this.chartData.labels =
            res[this.dataset.dateTimeColumn];
          for (
            var i = 0;
            i < this.data.column.length;
            i++
          ) {
            var name = this.data.column[i].name;
            this.originDatasets.push({
              label: name,
              pointBackgroundColor:
                this.colors[i % this.colors.length],
              fill: false,
              tension: 0.1,
              borderColor:
                this.colors[i % this.colors.length],
              borderWidth: 1,
              hoverRadius: 1.2,
              pointRadius: 0.7,
              data: res[name],
            });
          }
          this.chartData.datasets =
            this.originDatasets.slice();
          this.isLoading = false;
        });
      });
    },
    denoise() {
      this.colorCnt = this.originDatasets.length;
      this.error = false;
      this.msg = "";
      this.isLoading = true;
      this.chartData.datasets = this.originDatasets.slice();
      let request = this.data;
      request["denoiseColumn"] = this.denoiseColList;
      this.DENOISE({
        request: request,
        com: this.com,
        datasetId: this.dataset.id,
      })
        .then((res) => {
          this.denoiseData = res;
          this.VISUALIZE({
            request: res,
            dateTimeColumn: this.dataset.dateTimeColumn,
          }).then((res) => {
            for (
              let i = 0;
              i < this.denoiseData.denoiseColumn.length;
              i++
            ) {
              let name =
                this.denoiseData.denoiseColumn[i].name +
                "_denoised";
              this.colorCnt++;
              this.chartData.datasets.push({
                label: name,
                pointBackgroundColor:
                  this.colors[
                    this.colorCnt % this.colors.length
                  ],
                fill: false,
                tension: 0.1,
                borderColor:
                  this.colors[
                    this.colorCnt % this.colors.length
                  ],
                borderWidth: 1,
                hoverRadius: 1.2,
                pointRadius: 0.7,
                data: res[
                  this.denoiseData.denoiseColumn[i].name
                ],
              });
            }

            this.historyColumns = this.denoiseColList
              .map((x) => x.name)
              .join(",");
            this.isLoading = false;
          });
        })
        .catch((err) => {
          this.msg = err.response.data.detail;
          this.error = true;
          this.isLoading = false;
        });
    },
    save() {
      this.isLoading = true;
      this.msg = "";
      this.error = false;
      this.UPDATE_DATA({
        datasetId: this.dataset.id,
        data: this.denoiseData.data,
      })
        .then(() => {
          let historyRequest = {
            name: "노이즈 제거",
            detail: {
              com: Number(this.com),
              columns: this.historyColumns,
            },
            startDate: this.getSt,
            endDate: this.getEt,
          };
          this.SAVE_HISTORY({
            datasetId: this.dataset.id,
            request: historyRequest,
          }).then(() => {
            this.msg = "저장 완료되었습니다.";
            this.FETCH_DATASETS();
          });
          this.getData();
        })
        .catch((err) => {
          this.msg =
            err.response.data.message.slice(0, 40) + "...";
          this.error = true;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getData();
  },
  watch: {
    changeDate: function () {
      this.getData();
    },
  },
};
</script>

<style scoped>
.noise-control-root {
  height: 100%;
}
.data-container {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 35px);
}
.chart-container {
  height: 100%;
  width: calc(100% - 320px);
  overflow: auto;
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

label {
  display: block;
  color: #e8e8e8;
  margin-bottom: 10px;
}

.com-input {
  height: 20px;
  width: 180px;
  background-color: #1b1b1b;
  border: none;
  color: #e8e8e8;
  font-size: 17px;
  padding: 3px 0px;
  padding-left: 10px;
  outline: 1px #676767a6 solid;
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
.run-btn:hover {
  background-color: #464646;
}
.save-btn {
  background-color: #3f8ae2;
}
.save-btn:hover {
  background-color: #2f6cb1;
}

.description {
  display: flex;
  justify-content: center;
  color: rgb(167, 167, 167);
  font-weight: 300;
}
.spinner {
  margin-top: 100px;
}
.checkbox {
  color: #e8e8e8;
  accent-color: #3f8ae2;
}
.checkbox input {
  margin: 10px 10px;
}
.input {
  margin-bottom: 30px;
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
