import request from "@/utils/request.js";
export default {
    getCarList(data={}) {//购物车列表
        return request({
            url: "/apis/order/shopUserList",
            method: 'post',
            data
        });
    },
    
}