import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import DataManage from "@/views/manage/DataManage";
import Visualize from "@/views/status/Visualize";
import Statistics from "@/views/status/Statistics";
import Cleaning from "@/views/preprocessing/Cleaning";
import Integration from "@/views/preprocessing/Integration";
import Augmentation from "@/views/preprocessing/Augmentation";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/manage/data-manage",
    name: "dataManage",
    component: DataManage,
  },
  {
    path: "/status/visualize",
    name: "visualize",
    component: Visualize,
  },
  {
    path: "/status/statistics",
    name: "statistics",
    component: Statistics,
  },
  {
    path: "/preprocessing/cleaning",
    name: "cleaning",
    component: Cleaning,
  },
  {
    path: "/preprocessing/integration",
    name: "integration",
    component: Integration,
  },
  {
    path: "/preprocessing/augmentation",
    name: "augmentation",
    component: Augmentation,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
