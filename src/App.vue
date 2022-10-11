<template>
  <div id="app">
    <Gnb />
    <router-view></router-view>
  </div>
</template>

<script>
import Gnb from "@/components/navigation/Gnb";
export default {
  components: { Gnb },
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
