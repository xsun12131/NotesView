import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./utils/meta.js";
import "./utils/infiniteScroll.js";
import "./utils/commonUtils.js";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
