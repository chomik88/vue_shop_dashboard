import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
Vue.use(VueCompositionAPI);
Vue.use(BootstrapVue);
Vue.use(Vuex);

const store = new Vuex.Store({
  // state: {
  //   refreshNeeded: false,
  // },
  // mutations: {
  //   triggerRefresh(state) {
  //     state.refreshNeeded = !state.refreshNeeded;
  //   },
  // },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
