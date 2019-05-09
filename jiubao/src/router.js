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
    {
      path: '/product',
      name: 'product',
      component: () => import('./views/index/product.vue'),
      meta: { title: '产品列表' },
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('./views/index/class.vue'),
      meta: { title: '分类列表' },
    },
    {
      path: '/car',
      name: 'car',
      component: () => import('./views/order/car.vue'),
      meta: { title: '购物车' },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/order/user.vue'),
      meta: { title: '会员中心' },
    }
  ],
});
