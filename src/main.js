import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(VeeValidate, { fieldsBagName: "veeFields" });
Vue.use(VueCompositionAPI);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuex);


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
