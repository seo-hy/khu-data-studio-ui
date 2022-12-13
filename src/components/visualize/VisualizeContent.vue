<template>
  <div class="visualize-content-root">
    <div class="chart-contianer">
      <Spinner v-if="isLoading" class="spinner" />
      <div v-if="!isLoading" class="description">
        라벨을 클릭하여 display 여부를 설정할 수 있습니다.
      </div>
      <LineChart
        v-if="!isLoading"
        :chartData="chartData"
        :options="chartOptions"
        :height="height"
      />
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
      data: [],
      labels: [],
      height: 180,
      chartOptions: {
        legend: {
          labels: {
            fontSize: 16,
            fontColor: "#e8e8e8",
            padding: 30,
            usePointStyle: true,
            boxWidth: 7,
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
      ],
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATA"]),
    ...mapActions("preprocessing", ["VISUALIZE"]),
    getData() {
      this.isLoading = true;
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
          this.chartData.datasets = [];
          this.labels = res[this.dataset.dateTimeColumn];
          this.chartData.labels = this.labels;
          for (
            var i = 0;
            i < this.data.column.length;
            i++
          ) {
            var name = this.data.column[i].name;

            this.chartData.datasets.push({
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
          this.isLoading = false;
        });
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
.visualize-content-root {
  height: 100%;
  overflow: auto;
}
.spinner {
  margin-top: 100px;
}
.description {
  display: flex;
  justify-content: center;
  color: rgb(167, 167, 167);
  font-weight: 300;
}
</style>
