<template>
  <div class="home">
    <div class="wrap">
        <div class="backLogin" @click="backLogin">退出登录</div>
        <div class="topInfo">
            <div>
                <p>绑定用户：{{datas.companyName}}</p>
            </div>
        </div>
        <div class="salesmanInfo">
            <div>
                <img src="@/assets/imgs/icon_39.png" alt="">
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
                    <span class="tagNum" v-if="index==0&&idx==2&&datas.qrcount>0">{{datas.qrcount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==3&&datas.ckcount>0">{{datas.ckcount}}</span>
                    <span class="tagNum" v-if="index==0&&idx==4&&datas.shcount>0">{{datas.shcount}}</span>
                    <img :src="i.img" alt="">
                    <p>{{i.name}}</p>
                </router-link>
            </dd>
        </dl>
    </div>
    <foot :is_now="2"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import foot from "@/components/footMan.vue";
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
            name:"工作台",
            listData:[
                {
                    img:require("@/assets/imgs/icon_20.png"),
                    name:"业务核价",
                    url:"/manOrderList?sId=1"
                },
                {
                    img:require("@/assets/imgs/icon_21.png"),
                    name:"财务核价",
                    url:"/manOrderList?sId=2"
                },
                {
                    img:require("@/assets/imgs/icon_23.png"),
                    name:"待确认",
                    url:"/manOrderList?sId=4"
                },
                {
                    img:require("@/assets/imgs/icon_24.png"),
                    name:"待出库",
                    url:"/manOrderList?sId=5"
                },
                {
                    img:require("@/assets/imgs/icon_25.png"),
                    name:"待收货",
                    url:"/manOrderList?sId=6"
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
      this.getManInfoFn();
    },
    getManInfoFn(){//获取个人中心数据
        Api.getManInfo().then(res=>{
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
    background: #2892fe; position: relative;
    .backLogin{
        position: absolute; right: 10px; top: 10px; color: #fff; font-size: 24px;
    }
    .topInfo{
        padding: 70px 25px 0; display: flex; justify-content: flex-start; align-items: flex-start;
        img{
            width: 60px;
        }
        div{
            color: #fff; font-size: 24px; margin-left: 20px; height: 90px;
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