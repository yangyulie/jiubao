import request from "@/utils/request.js";
export default {
    getUserInfoCen(data={}){//获取个人中心数据
        return request({
            url:"/apis/order/MyUser",
            method:"post",
            data
        })
    },
    getShoperBind(data={}){//获取商户绑定手机列表
        return request({
            url:"/apis/order/Mybinding",
            method:"post",
            data
        })
    },
    delShoperBind(data={}){//删除商户绑定手机
        return request({
            url:"/apis/order/MybindingDelPost",
            method:"post",
            data
        })
    },
    addShoperBind(data={}){//新增商户绑定手机
        return request({
            url:"/apis/order/MybindingPost",
            method:"post",
            data
        })
    },
    getAddressList(data={}){//收货地址列表
        return request({
            url:"/apis/order/MyAddess",
            method:"post",
            data
        })
    },
    addAddress(data={}){//新增或编辑收货地址
        return request({
            url:"/apis/order/MyAddessPost",
            method:"post",
            data
        })
    },
    defaultAddress(data={}){//设置默认或取消默认，删除收货地址
        return request({
            url:"/apis/order/MyAddessStates",
            method:"post",
            data
        })
    },
    getInvoiceList(data={}){//获取发票信息列表
        return request({
            url:"/apis/order/Myinvoice",
            method:"post",
            data
        })
    },
    addInvoice(data={}){//获取发票信息列表
        return request({
            url:"/apis/order/MyinvoicePost",
            method:"post",
            data
        })
    },
    defaultInvoice(data={}){//设置或取消默认发票
        return request({
            url:"/apis/order/invoiceStates",
            method:"post",
            data
        })
    },
    getCollect(data={}){//获取收藏列表
        return request({
            url:"/apis/order/MyCollection",
            method:"post",
            data
        })
    },
    getBuyShopList(data={}){//获取购买历史
        return request({
            url:"/apis/order/MyhistoryList",
            method:"post",
            data
        })
    },
    getUserInfo(data={}){//获取商家信息
        return request({
            url:"/apis/order/MyEdit",
            method:"post",
            data
        })
    },
    setUserInfo(data={}){//设置商家信息
        return request({
            url:"/apis/order/EndCompany",
            method:"post",
            data
        })
    },
    getMySellList(data={}){//设置商家信息
        return request({
            url:"/apis/CouponUser/Mycoupon",
            method:"post",
            data
        })
    },
    getSellCenterList(data={}){//优惠券礼包列表
        return request({
            url:"/apis/CouponUser/couponList",
            method:"post",
            data
        })
    },
}