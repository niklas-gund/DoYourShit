import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import DYSStore from "./store/localStoragePersistor";

import "./index.css";

DYSStore.loadData();
const app = createApp(App);

app.use(createPinia()); //use pinia
app.use(router); //use router
app.mount("#app");
