<template>
  <div class="visualize-content-root">
    <div class="chart-contianer">
      <Spinner v-if="isLoading" class="spinner" />

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
  data() {
    return {
      isLoading: true,
      data: [],
      labels: [],
      height: 200,
      chartOptions: {},
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
    ...mapActions("cleaning", ["VISUALIZE"]),
    ...mapGetters("dataset", ["getSt", "getEt"]),

    getData() {
      this.isLoading = true;
      this.FETCH_DATA({
        datasetId: this.dataset.id,
        st: this.getSt(),
        et: this.getEt(),
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
              backgroundColor: "rgb(255,255,255, 0)",
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
  margin-top: 40px;
}
</style>
