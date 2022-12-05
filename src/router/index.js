import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Manage from "@/views/dataset/Manage";
import Visualize from "@/views/status/Visualize";
import Statistic from "@/views/status/Statistic";
import MissingValue from "@/views/preprocessing/MissingValue";
import Noise from "@/views/preprocessing/Noise";
import History from "@/views/preprocessing/History";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/dataset/manage",
    name: "manage",
    component: Manage,
  },
  {
    path: "/status/visualize",
    name: "visualize",
    component: Visualize,
  },
  {
    path: "/status/statistic",
    name: "statistic",
    component: Statistic,
  },
  {
    path: "/preprocessing/missing-value",
    name: "missing-value",
    component: MissingValue,
  },
  {
    path: "/preprocessing/noise",
    name: "noise",
    component: Noise,
  },
  {
    path: "/preprocessing/history",
    name: "history",
    component: History,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
