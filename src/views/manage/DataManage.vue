<template>
  <div class="main">
    <div class="title">데이터 관리</div>
    <div class="content">
      <div>
        <button id="show-modal" @click="openDataAddModal">
          데이터베이스 테이블 등록
        </button>
        <DataAddModal
          v-if="showDataAddModal"
          @close="closeDataAddModal"
        >
          <h3 slot="header">custom header</h3>
        </DataAddModal>
      </div>
    </div>
  </div>
</template>

<script>
import DataAddModal from "@/components/manage/DataAddModal";
export default {
  components: {
    DataAddModal,
  },
  data() {
    return {
      showDataAddModal: false,
    };
  },
  methods: {
    openDataAddModal() {
      this.showDataAddModal = true;
    },
    closeDataAddModal() {
      this.showDataAddModal = false;
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
</style>
