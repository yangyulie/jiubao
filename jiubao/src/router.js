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
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('./views/order/orderDetail.vue'),
      meta: { title: '订单详情' },
    },
    {
      path: '/orderLog',
      name: 'orderLog',
      component: () => import('./views/order/orderLog.vue'),
      meta: { title: '订单日志' },
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('./views/user/collect.vue'),
      meta: { title: '我的收藏' },
    },
    {
      path: '/buyShopList',
      name: 'buyShopList',
      component: () => import('./views/user/buyShopList.vue'),
      meta: { title: '购买历史' },
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('./views/user/userInfo.vue'),
      meta: { title: '资料更新' },
    },
    {
      path: '/man',
      name: 'man',
      component: () => import('./views/man/man.vue'),
      meta: { title: '业务员中心' },
    },
    {
      path: '/surePay',
      name: 'surePay',
      component: () => import('./views/man/surePay.vue'),
      meta: { title: '确认收款' },
    },
    {
      path: '/manOrderList',
      name: 'manOrderList',
      component: () => import('./views/man/manOrderList.vue'),
      meta: { title: '业务员订单列表' },
    },
    {
      path: '/myUser',
      name: 'myUser',
      component: () => import('./views/man/myUser.vue'),
      meta: { title: '我的客户' },
    },
    {
      path: '/setOrderProList',
      name: 'setOrderProList',
      component: () => import('./views/man/setOrderProList.vue'),
      meta: { title: '代理下单产品列表' },
    },
    {
      path: '/myCar',
      name: 'myCar',
      component: () => import('./views/man/myCar.vue'),
      meta: { title: '购物车' },
    },
    {
      path: '/myCarList',
      name: 'myCarList',
      component: () => import('./views/man/myCarList.vue'),
      meta: { title: '购物车商家列表' },
    },
    {
      path: '/manOrder',
      name: 'manOrder',
      component: () => import('./views/man/manOrder.vue'),
      meta: { title: '代理下单' },
    },
    {
      path: '/manOrderDetail',
      name: 'manOrderDetail',
      component: () => import('./views/man/manOrderDetail.vue'),
      meta: { title: '订单详情' },
    },
    {
      path: '/manAddress',
      name: 'manAddress',
      component: () => import('./views/man/manAddress.vue'),
      meta: { title: '地址列表' },
    },
    {
      path: '/manInvoice',
      name: 'manInvoice',
      component: () => import('./views/man/manInvoice.vue'),
      meta: { title: '发票列表' },
    },
    {
      path: '/manAddAddress',
      name: 'manAddAddress',
      component: () => import('./views/man/manAddAddress.vue'),
      meta: { title: '新建修改地址' },
    },
    {
      path: '/manAddInvoice',
      name: 'manAddInvoice',
      component: () => import('./views/man/manAddInvoice.vue'),
      meta: { title: '新建修改发票信息' },
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('./views/order/pay.vue'),
      meta: { title: '支付' },
    },
    {
      path: '/cancelOrder',
      name: 'cancelOrder',
      component: () => import('./views/order/cancelOrder.vue'),
      meta: { title: '取消订单' },
    }
  ],
});
