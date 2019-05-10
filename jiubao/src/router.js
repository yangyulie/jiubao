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
      component: () => import('./views/user/user.vue'),
      meta: { title: '会员中心' },
    },
    {
      path: '/shoperBind',
      name: 'shoperBind',
      component: () => import('./views/user/shoperBind.vue'),
      meta: { title: '商户绑定' },
    },
    {
      path: '/addShoperBind',
      name: 'addShoperBind',
      component: () => import('./views/user/addShoperBind.vue'),
      meta: { title: '新增商户绑定' },
    },
    {
      path: '/shoppingList',
      name: 'shoppingList',
      component: () => import('./views/order/shoppingList.vue'),
      meta: { title: '商品清单' },
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/order/order.vue'),
      meta: { title: '提交订单' },
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('./views/user/address.vue'),
      meta: { title: '收货地址' },
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('./views/user/invoice.vue'),
      meta: { title: '发票信息' },
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import('./views/user/addAddress.vue'),
      meta: { title: '新增收货地址' },
    },
    {
      path: '/addInvoice',
      name: 'addInvoice',
      component: () => import('./views/user/addInvoice.vue'),
      meta: { title: '新增发票信息' },
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: () => import('./views/order/orderList.vue'),
      meta: { title: '订单列表' },
    }
  ],
});
