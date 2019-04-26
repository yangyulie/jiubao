import request from "@/utils/request.js";
export default {
    indexDetail(data={}) {//产品详情页
        return request({
            url: "/apis/ApisDefault/productsinfo",
            method: 'post',
            data
        });
    },
    index(data={}) {//首页产品列表
        return request({
            url: "/apis/ApisDefault/porductsList",
            method: 'post',
            data
        });
    },
    indexAd(data={}) {//首页顶部广告
        return request({
            url: "/apis/ApisDefault/IndexAdv",
            method: 'post',
            data
        });
    },
    recommend(data={}) {//首页推荐商品
        return request({
            url: "/apis/ApisDefault/Indextuijian",
            method: 'post',
            data
        });
    },
    getTestCode(data={}){//登录页获取验证码
        return request({
            url:"/apis/loginR/SendMsg",
            method:"post",
            data
        })
    },
    loginFn(data={}){//登录
        return request({
            url:"/apis/loginR/uLogin",
            method:"post",
            data
        })
    },
    register(data={}){//注册
        return request({
            url:"/apis/loginR/register_post",
            method:"post",
            data
        })
    },
    getClassSec(data={}){//获取分类
        return request({
            url:"/apis/typeA/gettypeSige",
            method:"post",
            data
        })
    },
    getSecClass(data={}){//获取二级分类下的产品列表
        return request({
            url:"/apis/ApisDefault/productsListPage",
            method:"post",
            data
        })
    },
    getAllClass(data={}){//获取全部分类
        return request({
            url:"/apis/typeA/getTypeList",
            method:"post",
            data
        })
    },
    addCarFn(data={}){//添加购物车
        return request({
            url:"/apis/order/Addshop",
            method:"post",
            data
        })
    }
}