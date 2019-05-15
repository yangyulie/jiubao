import request from "@/utils/request.js";
export default {
    getManInfo(data={}){//业务员获取个人中心信息
        return request({
            url:"/apis/Apiswork/MyUser",
            method:"post",
            data
        })
    },
    getManOrderList(data={}){//业务员获取订单列表
        return request({
            url:"/apis/Apiswork/MyYwOrder",
            method:"post",
            data
        })
    },
    getMyUserList(data={}){//获取我的客户列表
        return request({
            url:"/apis/Apiswork/Mycustomer",
            method:"post",
            data
        })
    },
    getOrderProList(data={}){//获取代理下单产品列表
        return request({
            url:"/apis/Apiswork/AgencyOrder",
            method:"post",
            data
        })
    },
    addCarFn(data={}){//代理下单添加购物车
        return request({
            url:"/apis/Apiswork/Addshop",
            method:"post",
            data
        })
    },
    getMyCarList(data={}){//代理下单购物车商家列表
        return request({
            url:"/apis/Apiswork/getsmplist",
            method:"post",
            data
        })
    },
    getCarList(data={}){//代理下单购物车列表
        return request({
            url:"/apis/Apiswork/shopUserList",
            method:"post",
            data
        })
    },
    submitOrder(data={}){//代理下单提交订单
        return request({
            url:"/apis/Apiswork/orderAdd",
            method:"post",
            data
        })
    },
    submitCarList(data={}){//代理下单提交购物车
        return request({
            url:"/apis/Apiswork/subOrderByCart",
            method:"post",
            data
        })
    },
    getInvoiceList(data={}){//代理下单获取商家发票列表
        return request({
            url:"/apis/Apiswork/Myinvoice",
            method:"post",
            data
        })
    },
    getAddressList(data={}){//代理下单获取商家地址列表
        return request({
            url:"/apis/Apiswork/MyAddess",
            method:"post",
            data
        })
    },
    addAddress(data={}){//修改添加收货地址
        return request({
            url:"/apis/Apiswork/MyAddessPost",
            method:"post",
            data
        })
    },
    addInvoice(data={}){//修改添加发票信息
        return request({
            url:"/apis/Apiswork/MyinvoicePost",
            method:"post",
            data
        })
    },
}