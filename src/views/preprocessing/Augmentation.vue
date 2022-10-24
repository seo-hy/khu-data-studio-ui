<template>
  <div class="main">
    <div class="title">데이터 증강</div>
    <div class="content">
      <div class="content-header"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showDataAddModal: false,
    };
  },
  methods: {
    openDataAddModal() {
      this.showDataAddModal = true;
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
