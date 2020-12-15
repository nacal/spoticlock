import Vue from "vue";
import VueRouter from "vue-router";
import NowPlaying from "@/views/NowPlaying.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "NowPlaying",
    component: NowPlaying,
    props: (route) => {
      return { routeParams: route.query };
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
