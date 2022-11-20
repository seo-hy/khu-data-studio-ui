<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 등록</div>
        </div>
        <div class="modal-body">
          <div class="method-menu">
            <div
              class="method"
              :class="{ unselected: selected !== 0 }"
              @click="select(0)"
            >
              데이터베이스 테이블
            </div>
            <div
              class="method"
              :class="{ unselected: selected !== 1 }"
              @click="select(1)"
            >
              CSV 파일
            </div>
          </div>
          <div class="content">
            <div
              v-if="selected === 0"
              class="input-container"
            >
              <div class="input">
                <div class="large-input">
                  <label for="name">Dataset Name</label>
                  <input
                    type="text"
                    id="name"
                    autocomplete="off"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="input">
                <div>
                  <label for="host">Data Source</label>
                  <select v-model="dataSource">
                    <option
                      v-for="ds in dataSourceList"
                      :key="ds.value"
                      :value="ds.value"
                    >
                      {{ ds.text }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="host">Host</label>
                  <input
                    type="text"
                    id="host"
                    autocomplete="off"
                    v-model="host"
                  />
                </div>
                <div>
                  <label for="port">Port</label>
                  <input
                    type="text"
                    id="port"
                    autocomplete="off"
                    v-model="port"
                  />
                </div>
              </div>
              <div class="input">
                <div>
                  <label for="user">User</label>
                  <input
                    type="text"
                    id="user"
                    autocomplete="off"
                    v-model="userName"
                  />
                </div>
                <div>
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    autocomplete="off"
                    v-model="password"
                  />
                </div>
                <div>
                  <label for="db">Database</label>
                  <input
                    type="text"
                    id="db"
                    autocomplete="off"
                    v-model="db"
                  />
                </div>
              </div>
              <div class="input">
                <div>
                  <label for="table">Table</label>
                  <input
                    type="text"
                    id="table"
                    autocomplete="off"
                    v-model="tableName"
                  />
                </div>
                <div>
                  <label for="dateTimeColumn"
                    >Datetime Column</label
                  >
                  <input
                    type="text"
                    id="dateTimeColumn"
                    autocomplete="off"
                    v-model="dateTimeColumn"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="selected === 1"
              class="input-container"
            >
              <div class="input">
                <div class="large-input">
                  <label for="name">Dataset Name</label>
                  <input
                    type="text"
                    id="name"
                    autocomplete="off"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="input">
                <div class="large-input">
                  <label for="dateTimeColumn"
                    >Datetime Column</label
                  >
                  <input
                    type="text"
                    id="dateTimeColumn"
                    autocomplete="off"
                    v-model="dateTimeColumn"
                  />
                </div>
              </div>
              <div class="input">
                <div class="csv-input">
                  <label for="csv">CSV</label>
                  <input
                    type="file"
                    id="csv"
                    accept=".csv"
                  />
                </div>
              </div>
            </div>
            <div class="preview">
              <button class="preview-btn" @click="connect">
                Preview
              </button>
              <div class="label">Preview</div>
              <Spinner class="spinner" v-if="isLoading" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="save-btn" @click="save">
            저장
          </button>
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      isLoading: true,
      dataSource: 0,
      name: "",
      host: "",
      port: "",
      db: "",
      username: "",
      password: "",
      table: "",
      dateTimeColumn: "",
      selected: 0,
      methodList: [
        { value: 0, text: "데이터베이스 테이블 " },
        { value: 1, text: "csv 파일" },
      ],
      dataSourceList: [{ value: 0, text: "MySQL" }],
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "SAVE_DATASET",
      "CONNECT",
    ]),
    close() {
      this.$emit("close");
    },
    save() {
      this.SAVE_DATASET({
        name: this.name,
        host: this.host,
        port: this.port,
        db: this.db,
        userName: this.userName,
        password: this.password,
        tableName: this.tableName,
        dateTimeColumn: this.dateTimeColumn,
      }).then(() => {
        this.FETCH_DATASETS();
        this.$emit("close");
      });
    },
    select(value) {
      this.selected = value;
    },
    connect() {
      this.isSucceeded = false;
      this.isFailed = false;
      this.CONNECT({
        host: this.host,
        port: this.port,
        db: this.db,
        userName: this.userName,
        password: this.password,
        tableName: this.tableName,
        dateTimeColumn: this.dateTimeColumn,
      }).then((res) => {
        if (res.isConnected) {
          this.isSucceeded = true;
          setTimeout(() => {
            this.isSucceeded = false;
          }, 800);
        } else {
          this.isFailed = true;
          setTimeout(() => {
            this.isFailed = false;
          }, 800);
        }
      });
    },
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
  width: 550px;
  height: 600px;
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
.method-menu {
  display: flex;
  justify-content: center;
}
.method {
  padding: 10px 40px;
  width: 100%;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background-color: #1f1f1f;
  cursor: pointer;
  color: #3f8ae2;
}

.method:first-child {
  border-right: 4px solid #252525;
}
.unselected {
  border-bottom: 2px solid #252525;
  background-color: #505050;
  color: rgb(173, 173, 173);
  box-shadow: inset 0px -8px 7px 2px rgba(25, 25, 25, 0.306);
}
.unselected:hover {
  background-color: #424242;
}
.content {
  background-color: #1f1f1f;
  height: 420px;
  border-radius: 0 0 10px 10px;
}
.input-container {
  padding-top: 10px;
  height: 240px;
}

.input div {
  margin: 0px 13px;
}
.input label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  padding: 5px 0px;
}
.input {
  display: flex;
  margin-bottom: 3px;
  margin-left: 20px;
}
.input input {
  display: block;
  margin: auto;
  height: 18px;
  width: 120px;
  background-color: #1b1b1b;
  border: none;
  color: #e8e8e8;
  padding: 3px 0px;
  padding-left: 10px;
  outline: 1px #676767a6 solid;
}
.input select {
  background-color: #1b1b1b;
  color: #e8e8e8;
  width: 130px;
  height: 25px;
  padding: 0px 10px;
  border: none;
  outline: 1px #676767a6 solid;
}
.large-input input {
  width: 432px;
}
.csv-input input {
  width: 432px;
  height: 35px;
  line-height: 35px;
}
.preview {
  margin: 0px 20px;
  border-top: 1px solid #494949a4;
  position: relative;
}

.preview-btn {
  position: absolute;
  right: 14px;
  top: -40px;
  background-color: transparent;
  border: 1px #2f6cb1 solid;
  color: #2f6cb1;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  height: 25px;
}
.preview-btn:hover {
  background-color: #2f6cb134;
}
.preview .label {
  margin-top: 5px;
}
.modal-footer {
  display: flex;
  justify-content: right;
  padding: 15px 20px;
  height: 20px;
  border-top: 0.2px #969696 solid;
}
input::file-selector-button {
  width: 70px;
  height: 20px;
  border-radius: 2px;
  color: #e8e8e8;
  font-weight: 400;
  border: 0.5px #b4b4b4a6 solid;
  cursor: pointer;
  background-color: #2374d0;
}

.test {
  margin-top: 20px;
  margin-bottom: 5px;
  display: flex;
}

.test-msg {
  margin: 0px 10px;
}
.test-succeeded {
  color: #42a45e;
}
.test-failed {
  color: #b54949;
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

.save-btn {
  background-color: #3f8ae2;
}
.save-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.spinner {
  margin-top: 40px;
  font-size: 5px;
}
</style>
