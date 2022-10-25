<template>
  <div class="main">
    <div class="title">데이터 정제 - 결측치 처리</div>
    <div class="content">
      <MissingValueControl
        v-if="showData"
        :datasetId="datasetId"
      />
    </div>
    <DatasetSelectModal
      v-if="showDatasetSelectModal"
      @close="closeDatasetSelectModal"
    />
  </div>
</template>

<script>
import DatasetSelectModal from "@/components/cleaning/common/DatasetSelectModal";
import MissingValueControl from "@/components/cleaning/MissingValueControl";

export default {
  components: {
    DatasetSelectModal,
    MissingValueControl,
  },
  data() {
    return {
      showDatasetSelectModal: true,
      datasetId: 0,
      showData: false,
    };
  },
  methods: {
    closeDatasetSelectModal(datasetId) {
      this.showDatasetSelectModal = false;
      this.datasetId = datasetId;
      this.showData = true;
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
