<template>
  <div class="main">
    <div class="title">통계</div>
    <div class="content">
      <StatisticContent
        v-if="showContent"
        :datasetId="datasetId"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
    >
      <template slot="description">
        <div class="description">
          데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import StatisticContent from "@/components/statistic/StatisticContent";

export default {
  components: {
    DatasetSelectModal,
    StatisticContent,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      datasetId: 0,
      showContent: false,
    };
  },
  methods: {
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.showContent = true;
    },
  },
};
</script>

<style scoped>
.main {
  width: calc(100% - 220px);
}
.title {
  color: #bcbcbc;
  font-size: 25px;
  height: 50px;
  line-height: 70px;
  padding-left: 20px;
}
.content {
  width: 95%;
  height: calc(100vh - 90px);
  background-color: #1e1e1e;
  border-radius: 10px;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 15px;
}

.content-header {
  margin: 10px 20px;
  display: flex;
  justify-content: right;
}
</style>
