import request from "@/utils/request.js";
export default {
    getUserInfo(data={}){//获取个人中心数据
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
    defaultInvoice(data={}){//获取发票信息列表
        return request({
            url:"/apis/order/invoiceStates",
            method:"post",
            data
        })
    }
}