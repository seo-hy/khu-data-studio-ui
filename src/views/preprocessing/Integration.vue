<template>
  <div class="main">
    <div class="title">데이터 통합</div>
    <div class="content">
      <div class="content-header"></div>
    </div>
    <DataSelectModal
      v-if="showDataSelectModal"
      @close="closeDataSelectModal"
    />
  </div>
</template>

<script>
import DataSelectModal from "@/components/preprocessing/DataSelectModal";
export default {
  components: {
    DataSelectModal,
  },
  data() {
    return {
      showDataSelectModal: false,
    };
  },
  methods: {
    openDataAddModal() {
      this.showDataSelectModal = true;
    },
    closeDataAddModal() {
      this.showDataSelectModal = false;
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
