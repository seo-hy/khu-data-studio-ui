<template>
  <div class="main">
    <div class="title">데이터 정제</div>
    <div class="content">
      <div class="menu">
        <div>결측치 처리</div>
        <div>노이즈 제거</div>
      </div>
      <DataList v-if="showData" :datasetId="datasetId" />
    </div>
    <DataSelectModal
      v-if="showDataSelectModal"
      @close="closeDataSelectModal"
    />
  </div>
</template>

<script>
import DataSelectModal from "@/components/preprocessing/DataSelectModal";
import DataList from "@/components/preprocessing/DataList";

export default {
  components: {
    DataSelectModal,
    DataList,
  },
  data() {
    return {
      showDataSelectModal: true,
      datasetId: 0,
      showData: false,
      data: {},
    };
  },
  methods: {
    closeDataSelectModal(selected) {
      this.showDataSelectModal = false;
      this.datasetId = selected;
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
  margin: 24px;
}
.content {
  width: 95%;
  height: calc(100% - 120px);
  margin: auto;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.content-header {
  margin: 10px 20px;
  display: flex;
  justify-content: right;
}
</style>
