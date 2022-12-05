<template>
  <div class="root">
    <div class="header">
      <div class="title">전처리 이력</div>
    </div>
    <div class="content">
      <div class="select-container">
        <div class="select-label">
          데이터셋을 선택하세요.
        </div>
        <select v-model="datasetId" class="method-select">
          <option :value="0">전체 데이터셋</option>
          <option
            v-for="dataset in getDatasets"
            :value="dataset.id"
            :key="dataset.id"
          >
            {{ dataset.name }}
          </option>
        </select>
      </div>
      <HistoryList :datasetId="datasetId" />
    </div>
  </div>
</template>

<script>
import HistoryList from "@/components/preprocessing/HistoryList";
import { mapGetters } from "vuex";
export default {
  components: {
    HistoryList,
  },
  computed: {
    ...mapGetters("dataset", ["getDatasets"]),
  },
  data() {
    return {
      datasetId: 0,
    };
  },
};
</script>

<style scoped>
.root {
  width: calc(100% - 220px);
}

.header {
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 90px;
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

.btn-container {
  margin: 10px 20px;
  width: 100%;
}

.add-btn {
  width: 190px;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
  margin-right: 30px;
}

.add-btn:hover {
  background-color: #2f6cb1;
}
.select-label {
  color: #e8e8e8;
  padding: 10px;
}
select {
  margin-left: 10px;
  margin-bottom: 5px;
  padding: 5px;
  width: 150px;
  background-color: rgb(39, 39, 39);
  color: #e8e8e8;
  font-size: 15px;
}
</style>
