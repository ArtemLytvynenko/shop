import Vue from "vue"
import App from "./App.vue"
import store from "./vuex/store"
import router from "./router/router";
import reactiveStorage from "vue-reactive-storage";

Vue.use(reactiveStorage, {
    "cart": []
});
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    router
}).$mount("#app");
