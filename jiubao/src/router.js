import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index/index.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/index/detail.vue'),
      meta: { title: '产品详情' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/index/login.vue'),
      meta: { title: '登录' },
    },
  ],
});
