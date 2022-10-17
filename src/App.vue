<template>
  <div id="app">
    <Gnb />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Gnb from "@/components/navigation/Gnb";
export default {
  components: { Gnb },
  methods: {
    ...mapActions("manage", ["FETCH_TABLE_INFO_LIST"]),
  },
  created() {
    this.FETCH_TABLE_INFO_LIST();
  },
};
</script>

<style>
html,
body {
  background-color: #252525;
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-family: "Noto Sans KR", sans-serif;
}
#app {
  display: flex;
}
</style>
