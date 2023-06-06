import { createWebHistory, createRouter } from "vue-router";

import ThreeLists from "../components/ThreeLists.vue";
import EditItem from "../components/EditItem.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ThreeLists,
  },
  {
    path: "/edit/:id",
    name: "EditItem",
    component: EditItem,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
