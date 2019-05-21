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
    }
}