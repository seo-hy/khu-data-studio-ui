import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Manage from "@/views/dataset/Manage";
import Visualize from "@/views/status/Visualize";
import Statistics from "@/views/status/Statistics";
import MissingValue from "@/views/cleaning/MissingValue";
import Noise from "@/views/cleaning/Noise";
import Jittering from "@/views/augmentation/Jittering";
import MagnitudeWarping from "@/views/augmentation/MagnitudeWarping";

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
    path: "/status/statistics",
    name: "statistics",
    component: Statistics,
  },
  {
    path: "/cleaning/missing-value",
    name: "missing-value",
    component: MissingValue,
  },
  {
    path: "/cleaning/noise",
    name: "noise",
    component: Noise,
  },
  {
    path: "/augmentation/jittering",
    name: "jittering",
    component: Jittering,
  },
  {
    path: "/augmentation/magnitude-warping",
    name: "magnitude-warping",
    component: MagnitudeWarping,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
