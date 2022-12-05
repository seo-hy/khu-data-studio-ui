<template>
  <div class="main">
    <div class="header">
      <div>
        <div class="title">결측치 처리</div>
        <SelectedData
          v-if="showContent"
          :datasetId="datasetId"
          @changeDataset="changeDataset"
        />
      </div>
      <SelectPeriod @selectPeriod="selectPeriod" />
    </div>
    <div class="content">
      <MissingValueControl
        v-if="showContent"
        :dataset="dataset"
        :changeDate="changeDate"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
      :datasetId="datasetId"
    >
      <template slot="description">
        <div class="description">
          전처리할 데이터셋을 선택하세요.
        </div>
      </template>
    </DatasetSelectModal>
  </div>
</template>

<script>
import SelectedData from "@/components/common/SelectedData";
import DatasetSelectModal from "@/components/common/DatasetSelectModal";
import MissingValueControl from "@/components/preprocessing/MissingValueControl";
import SelectPeriod from "@/components/common/SelectPeriod";

import { mapActions } from "vuex";
export default {
  components: {
    DatasetSelectModal,
    MissingValueControl,
    SelectedData,
    SelectPeriod,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      datasetId: 0,
      dataset: {},
      showContent: false,
      changeDate: "",
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASET",
      "FETCH_DATASETS",
    ]),
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.FETCH_DATASET(this.datasetId).then((res) => {
        this.dataset = res;
        this.showContent = true;
      });
    },
    changeDataset() {
      this.showDatasetSelectModal = true;
      this.showData = false;
    },
    selectPeriod(timestamp) {
      this.changeDate = timestamp;
    },
  },
  created() {
    this.FETCH_DATASETS();
  },
};
</script>

<style scoped>
.main {
  width: calc(100% - 220px);
}
.header {
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 90px;
}
.header > div:first-child {
  display: flex;
  align-items: center;
}
.title {
  color: #bcbcbc;
  font-size: 25px;
}
.content {
  width: 95%;
  height: calc(100vh - 110px);
  background-color: #1e1e1e;
  border-radius: 10px;
  margin: 20px auto;
  margin-top: 0px;
  box-sizing: border-box;
  padding: 15px;
}

.content-header {
  margin: 10px 20px;
  display: flex;
  justify-content: right;
}
</style>
