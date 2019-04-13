import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MINT from 'mint-ui';
Vue.config.productionTip = false;
Vue.use(MINT)
router.afterEach((to, from) => {
  window.document.title = to.meta.title
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
