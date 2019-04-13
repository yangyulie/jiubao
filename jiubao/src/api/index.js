import request from "@/utils/request.js";
export default {
    index(data) {
        return request({
            url: "/apis/ApisDefault/porductsList",
            method: 'post',
            data
        });
    },
    indexAd(data) {
        return request({
            url: "/apis/ApisDefault/IndexAdv",
            method: 'post',
            data
        });
    },
    recommend(data) {
        return request({
            url: "/apis/ApisDefault/Indextuijian",
            method: 'post',
            data
        });
    },
}