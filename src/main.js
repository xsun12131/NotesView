import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Tag} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./utils/meta.js";
import "./utils/infiniteScroll.js";
import "./utils/commonUtils.js";

Vue.config.productionTip = false
Vue.use(Tag);
// Vue.use(Backtop);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
