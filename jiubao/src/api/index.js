import request from "@/utils/request.js";
export default {
    index(data,url){
        console.log(333,data,url)
        return request({
            url: url,
            method: 'post',
            data
        })
    },
}