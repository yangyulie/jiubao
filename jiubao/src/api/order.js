import request from "@/utils/request.js";
export default {
    getCarList(data={}) {//购物车列表
        return request({
            url: "/apis/order/shopUserList",
            method: 'post',
            data
        });
    },
    delCarList(data={}){//删除购物车列表
        return request({
            url:"/apis/order/shopDel",
            method:'post',
            data
        })
    },
    carListNumUpdate(data={}){//更新购买数量验证库存
        return request({
            url:"/apis/order/shopUpdate",
            method:"post",
            data
        })
    },
    handleCollect(data={}){//添加或取消收藏
        return request({
            url:"/apis/order/MyCollectionPost",
            method:"post",
            data
        })
    },
    getShoppingList(data={}){//获取商品清单
        return request({
            url:"/apis/order/MyorderProducts",
            method:"post",
            data
        })
    },
    submitCarList(data={}){//提交购物车
        return request({
            url:"/apis/order/subOrderByCart",
            method:"post",
            data
        })
    },
    submitOrder(data={}){//提交订单
        return request({
            url:"/apis/order/orderAdd",
            method:"post",
            data
        })
    },
    getOrderList(data={}){//获取订单列表
        return request({
            url:"/apis/order/MyOrder",
            method:"post",
            data
        })
    },
    getOrderDetail(data={}){//获取订单详情
        return request({
            url:"/apis/order/MyOrderDetailed",
            method:"post",
            data
        })
    },
    getOrderLog(data={}){//获取订单日志
        return request({
            url:"/apis/order/Myorderloglist",
            method:"post",
            data
        })
    },
    getPay(data={}){//获取支付信息
        return request({
            url:"/apis/order/payInfo",
            method:"post",
            data
        })
    },
    submitPay(data={}){//提交支付信息
        return request({
            url:"/apis/order/PayPost",
            method:"post",
            data
        })
    },
    cancelOrder(data={}){//取消订单
        return request({
            url:"/apis/order/OrderStatus",
            method:"post",
            data
        })
    },
    quick(data={}){//催单
        return request({
            url:"/apis/order/ReminderPost",
            method:"post",
            data
        })
    },
    submitOrderStatus(data={}){//提交订单状态
        return request({
            url:"/apis/order/OrderStatusPost",
            method:"post",
            data
        })
    },
    submitGoOrder(data={}){//提交出库状态
        return request({
            url:"/apis/Apiswork/OutstockPost",
            method:"post",
            data
        })
    },
    getMyBanks(data={}){//获取我的银行卡列表
        return request({
            url:"/apis/mypay/geilistBanks",
            method:"post",
            data
        })
    },
    getMyBankPay(data={}){//使用银行卡支付
        return request({
            url:"/apis/mypay/postBanks",
            method:"post",
            data
        })
    },
    setMyBankSubmit(data={}){//提交银行卡支付确认
        return request({
            url:"/apis/mypay/postBanksEnd",
            method:"post",
            data
        })
    },
    getBankInfo(data={}){//获取编辑银行卡信息
        return request({
            url:"/apis/mypay/getBankModel",
            method:"post",
            data
        })
    },
    getBanks(data={}){//获取银行列表
        return request({
            url:"/apis/mypay/getBanks",
            method:"post",
            data
        })
    },
    addBank(data={}){//添加银行卡
        return request({
            url:"/apis/mypay/addbank",
            method:"post",
            data
        })
    },
    setBindBankSubmit(data={}){//绑定银行卡
        return request({
            url:"/apis/mypay/postBanksEnd",
            method:"post",
            data
        })
    },
    delBank(data={}){//解除绑定银行卡
        return request({
            url:"/apis/mypay/geilistDelBanks",
            method:"post",
            data
        })
    },
    setPassword(data={}){//设置支付密码
        return request({
            url:"/apis/mypay/setMM",
            method:"post",
            data
        })
    },
    getPhone(data={}){//获取手机号码
        return request({
            url:"/apis/mypay/getPhone",
            method:"post",
            data
        })
    },
    eduPassword(data={}){//修改支付密码
        return request({
            url:"/apis/mypay/againMM",
            method:"post",
            data
        })
    },
    ali_pay(data={}){//支付宝支付
        return request({
            url:"/apis/mypay/alipayPost",
            method:"post",
            data
        })
    },
    wx_pay(data={}){//微信支付
        return request({
            url:"/apis/mypay/wxpayPost",
            method:"post",
            data
        })
    },
    paySucess(data={}){//支付是否成功
        return request({
            url:"/apis/mypay/paySucess",
            method:"post",
            data
        })
    },
    paySell(data={}){//优惠券购买方式
        return request({
            url:"/apis/CouponUser/couponPayInfo",
            method:"post",
            data
        })
    },
    buySell(data={}){//优惠券购买
        return request({
            url:"/apis/CouponUser/couponPayOrder",
            method:"post",
            data
        })
    }
}