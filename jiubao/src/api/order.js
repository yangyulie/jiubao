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
    }
}