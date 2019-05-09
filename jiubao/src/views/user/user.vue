<template>
  <div class="home">
    <div class="wrap">
        <div class="backLogin" @click="backLogin">退出登录</div>
        <div class="topInfo">
            <img src="@/assets/imgs/icon_19.png" alt="">
            <div>
                <p>{{datas.companyName}}</p>
                <span>{{datas.userphone}}</span>
            </div>
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
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_21.png"),
                    name:"财务核价",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_22.png"),
                    name:"待付款",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_23.png"),
                    name:"待确认",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_24.png"),
                    name:"待出库",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_25.png"),
                    name:"待收货",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_26.png"),
                    name:"已完成",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_27.png"),
                    name:"作废订单",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_28.png"),
                    name:"待退货",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_29.png"),
                    name:"全部",
                    url:"/"
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
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_32.png"),
                    name:"发票管理",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_33.png"),
                    name:"收藏",
                    url:"/"
                },
                {
                    img:require("@/assets/imgs/icon_34.png"),
                    name:"资料修改",
                    url:"/"
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
        Api.getUserInfo().then(res=>{
            this.datas = res.rows
        })
    },
    backLogin(){
        window.localStorage.clear();
        this.$router.push({
          path: '/'
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
    background: url("./../../assets/imgs/bg/bg_02.jpg") no-repeat center top/100% auto; position: relative;
    .backLogin{
        position: absolute; right: 10px; top: 10px; color: #fff; font-size: 24px;
    }
    .topInfo{
        padding: 70px 25px; display: flex; justify-content: flex-start; align-items: flex-start;
        img{
            width: 60px;
        }
        div{
            color: #fff; font-size: 24px; margin-left: 20px;
            p{
                font-family: "黑体"; padding-bottom: 20px;
            }
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
            width: 20%; margin-top: 30px; padding-bottom: 20px;
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