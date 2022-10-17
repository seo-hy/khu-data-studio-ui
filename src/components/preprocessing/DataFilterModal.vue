<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div>데이터 선택</div>
        </div>
        <div class="modal-body">
          <div>
            <div class="label">데이터 범위 선택</div>
            <div class="condition-box">
              <div class="selected-data">
                데이터 : smartplant sensor data
              </div>
              <div class="input-query">
                <label for="query">Query : </label>
                <input
                  type="text"
                  id="query"
                  autocomplete="off"
                  v-model="query"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="next-btn" @click="previous">
            이전
          </button>
          <button class="next-btn" @click="close">
            완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      numOfCondition: 0,
      query:
        "created_at>'2022-07-01'&created_at<'2022-07-03'",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    previous() {
      this.$emit("previous");
    },
    select(id) {
      this.selected = id;
    },
  },
  computed: {
    ...mapGetters("manage", ["getTableInfoList"]),
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.modal-body {
  padding: 10px 20px;
  font-size: 15px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-top: 0.2px #969696 solid;
}

.modal-footer button {
  width: 60px;
  height: 30px;
  font-size: 17px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.next-btn {
  background-color: #3f8ae2;
}
.next-btn:hover {
  background-color: #2f6cb1;
}
.label {
  margin-left: 10px;
}
.condition-box {
  margin-top: 10px;
  border: 1.5px solid #545454;
}
.add-btn {
  display: flex;
  justify-content: center;
}
.add-btn button {
  background-color: rgb(199, 199, 199);
  border: 1px #676767a6 solid;
  font-size: 16px;
  height: 30px;
  width: 100px;
  border-radius: 5px;
}

.selected-data {
  margin: 10px;
}

input {
  display: block;
  height: 18px;
  width: 75%;
  background-color: #1f1f1f;
  border: none;
  color: #e8e8e8;
  padding: 3px 5px;
  outline: 1px #676767a6 solid;
  margin-left: 5px;
}
.input-query {
  display: flex;
  padding-left: 10px;
  margin-bottom: 15px;
}
</style>
