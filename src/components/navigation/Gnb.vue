<template>
  <div class="main">
    <router-link :to="{ name: 'Home' }" class="logo">
      KHU Data Studio
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-regular fa-folder-open" />
      학습 데이터
    </div>
    <router-link :to="{ name: 'Data' }" class="menu">
      데이터 관리
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-solid fa-chart-column" />
      데이터 현황
    </div>
    <router-link
      :to="{ name: menuList.visualize.name }"
      class="menu"
    >
      {{ menuList.visualize.title }}
    </router-link>
    <router-link :to="{ name: 'Data' }" class="menu">
      데이터 통계
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-solid fa-wrench" />
      데이터 전처리
    </div>
    <router-link :to="{ name: 'Data' }" class="menu">
      데이터 정제
    </router-link>
    <router-link :to="{ name: 'Data' }" class="menu">
      데이터 통합
    </router-link>
    <router-link :to="{ name: 'Data' }" class="menu">
      데이터 증강
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: {
        home: {},
        visualize: {
          name: "visualize",
          title: "시각화",
          isOpen: false,
        },
        statistics: {
          name: "statistics",
          title: "통계",
          isOpen: false,
        },
      },
    };
  },
};
</script>

<style scoped>
.main {
  background-color: #2c2c2c;
  width: 220px;
  min-height: 450px;
  height: 100vh;
  box-shadow: 4px 0px 30px 3px rgba(0, 0, 0, 0.26);
  justify-content: center;
}
.logo {
  margin-top: 20px;
  display: block;
  text-decoration: none;
  color: #d8d8d8;
  width: 100%;
  text-align: center;
  font-size: 21px;
  text-align: center;
  font-family: "Noto Sans Mono", monospace;
  letter-spacing: -0.5px;
  word-spacing: -4px;
}
.menu-title {
  color: #8fa8c4;
  font-size: 14px;
  width: 100%;
  font-weight: 400;
  padding-top: 30px;
  padding-left: 20px;
  padding-bottom: 5px;
}
.menu-title > svg {
  padding-right: 3px;
}

.menu {
  display: block;
  text-decoration: none;
  color: #e8e8e8;
  font-size: 15px;
  font-weight: 300;
  width: 100%;
  padding-left: 45px;
  padding-top: 8px;
  cursor: pointer;
  transition: all 0.5s;
}
.menu:hover {
  color: #8fa8c4;
}
</style>
