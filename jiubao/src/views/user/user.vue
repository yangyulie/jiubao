<template>
  <div class="home">
    <div class="wrap">
        <div class="backLogin" @click="backLogin">退出登录</div>
        <div class="topInfo">
            <img src="@/assets/imgs/icon_19.png" alt="">
            <div>
                <p>{{datas.companyName}}</p>
                <p>{{datas.userphone}}</p>
            </div>
        </div>
        <div class="dataInfo">
            <p>
                储值余额：<span>{{datas.mychuzhi}}</span>
            </p>
            <p>
                积分余额：<span>{{datas.myjifen}}</span>
            </p>
            <router-link tag="p" to="buyShopList">购买历史</router-link>
        </div>
        <div class="salesmanInfo">
            <div>
                <p>客户经理：{{datas.tuijianName}}</p>
                <p>电话：{{datas.tuijianphone}}</p>
            </div>
        </div>
    </div>
    <div class="listBox">
        <dl class="navs" :class="{navSmall:index==1}" v-for="(item,index) in list" :key="index">
            <dt>{{item.name}}</dt>
            <dd>
                <router-link :to="i.url" v-for="(i,idx) in item.listData" :key="idx">
                    <span class="tagNum" v-if="index==0&&idx==0&&datas.ywpricecount>0">{{datas.ywpricecount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==1&&datas.cwpricecount>0">{{datas.cwpricecount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==2&&datas.paycount>0">{{datas.paycount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==3&&datas.qrcount>0">{{datas.qrcount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==4&&datas.ckcount>0">{{datas.ckcount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==5&&datas.shcount>0">{{datas.shcount}}</span>
                    <img :src="i.img" alt="">
                    <p>{{i.name}}</p>
                </router-link>
            </dd>
        </dl>
    </div>
    <foot :is_now="4"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import foot from "@/components/foot.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
  },
  data() {
    return {
      list:[
        {
            name:"我的订单",
            listData:[
                {
                    img:require("@/assets/imgs/icon_20.png"),
                    name:"业务核价",
                    url:"/orderList?id=1"
                },
                {
                    img:require("@/assets/imgs/icon_21.png"),
                    name:"财务核价",
                    url:"/orderList?id=2"
                },
                {
                    img:require("@/assets/imgs/icon_22.png"),
                    name:"待付款",
                    url:"/orderList?id=3"
                },
                {
                    img:require("@/assets/imgs/icon_23.png"),
                    name:"待确认",
                    url:"/orderList?id=4"
                },
                {
                    img:require("@/assets/imgs/icon_24.png"),
                    name:"待出库",
                    url:"/orderList?id=5"
                },
                {
                    img:require("@/assets/imgs/icon_25.png"),
                    name:"待收货",
                    url:"/orderList?id=6"
                },
                {
                    img:require("@/assets/imgs/icon_26.png"),
                    name:"已完成",
                    url:"/orderList?id=7"
                },
                {
                    img:require("@/assets/imgs/icon_27.png"),
                    name:"作废订单",
                    url:"/orderList?id=8"
                },
                {
                    img:require("@/assets/imgs/icon_28.png"),
                    name:"待退货",
                    url:"/orderList?id=9"
                },
                {
                    img:require("@/assets/imgs/icon_29.png"),
                    name:"全部",
                    url:"/orderList?id=0"
                }
            ]
        },
        {
            name:"常用工具",
            listData:[
                {
                    img:require("@/assets/imgs/icon_30.png"),
                    name:"绑定账户",
                    url:"/shoperBind"
                },
                {
                    img:require("@/assets/imgs/icon_31.png"),
                    name:"地址管理",
                    url:"/address"
                },
                {
                    img:require("@/assets/imgs/icon_32.png"),
                    name:"发票管理",
                    url:"/invoice"
                },
                {
                    img:require("@/assets/imgs/icon_33.png"),
                    name:"收藏",
                    url:"/collect"
                },
                {
                    img:require("@/assets/imgs/icon_34.png"),
                    name:"资料修改",
                    url:"/userInfo"
                },
                {
                    img:require("@/assets/imgs/icon_50.png"),
                    name:"管理银行卡",
                    url:"/banks"
                },
                {
                    img:require("@/assets/imgs/icon_49.png"),
                    name:"找回密码",
                    url:"/setPassword?type=2"
                }
            ]
        }
      ],
      datas:{}
    };
  },
  mounted() {
    this.init();
    
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
      this.getUserInfoFn();
    },
    getUserInfoFn(){//获取个人中心数据
        Api.getUserInfoCen().then(res=>{
            this.datas = res.rows
        })
    },
    backLogin(){
        window.localStorage.clear();
        this.$router.push({
          path: '/',
          replace:true
        });
    },
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    
  }
};
</script>
<style lang='less' scoped>
@bor:15px solid #f4f8ff;
.wrap{
    // background: url("./../../assets/imgs/bg/bg_02.jpg") no-repeat center top/100% auto; 
    background-color: #2892fe;
    position: relative;
    .backLogin{
        position: absolute; right: 10px; top: 10px; color: #fff; font-size: 24px;
    }
    .topInfo{
        padding: 70px 25px 0; display: flex; justify-content: flex-start; align-items: flex-start;
        img{
            width: 60px;
        }
        div{
            color: #fff; font-size: 24px; margin-left: 20px;
            p{
                font-family: "黑体"; padding-bottom: 10px;
            }
        }
    }
    .dataInfo{
        display: flex; justify-content: space-between; align-items: center; padding: 15px 55px; background-color: #2075cb; margin-bottom: 15px;
        p{
            color: #ebebeb; font-size: 16px; width: 200px;
            span{
                color: #fff; font-size: 28px; display: block; margin-top: 5px;
            }
        }
        p:last-child{
            border-left: 1px solid #ebebeb; text-align: right; width: 130px;
        }
    }
    .salesmanInfo{
        display: flex; padding: 0 25px 25px; justify-content: flex-end; align-items: flex-end; font-size: 16px; font-family: "黑体";  color: #fff;
    }
}
.navs{ 
    padding: 12px 20px; border-bottom: @bor; font-size: 20px; color: #808080; font-family: "黑体"; line-height: 20px;
    dt{
        display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #444444; border-bottom: 1px solid #c1c1c1; padding: 25px 0 10px;
    }
    dt::after{
        content: ''; width: 10px; height: 10px; border: 1px solid #444444; border-left: 0; border-bottom: 0; transform: rotate(45deg);
    }
    dd{
        display: flex; justify-content: flex-start; align-items: flex-start; text-align: center; flex-wrap: wrap;
        a{
            width: 20%; margin-top: 30px; padding-bottom: 20px; position: relative;
            span{
                width: 20px; height: 20px; border-radius: 50%; color: #fff; background-color: #f00; position: absolute; right: 15px; top: 0; display: flex; justify-content: center; align-items: center; font-size: 15px;
            }
            p{
                margin-top: 10px;
            }
            img{
                width: 48px;
            }
        }
    }
}
.navSmall{
    border: 0;
    dd{
        a{
            width: 25%;
        }
    }
}
</style>