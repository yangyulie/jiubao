<template>
  <div class="home">
    <div class="head">
        <div class="headInner" v-if="!isSecClass">
            <div class="back" @click="backPage">
                <div class="backArrow"><span></span></div>
                <span>{{tit}}</span>
            </div>
            <div class="search">
                <img src="@/assets/imgs/icon_02.png" @click="goSearch" alt="">
                <input type="text" v-model="shearchText" @keyup.13="goSearch">
            </div>
        </div>
        <div class="headInner" v-else>
            <div class="backArrow" @click="backPage"><span></span></div>
            <div class="tit">
                <span>{{tit}}</span>
            </div>
            <img @click="backPop" src="@/assets/imgs/icon_12.png" alt="">
            <img @click="goCar" src="@/assets/imgs/icon_13.png" alt="">
        </div>
    </div>
    <div class="con">
        <div class="rightList secreenHei" ref="proList">
            <div ref="proListInner" class="proListInner">
                <div class="notData" v-if="proList.length==0"><img src="@/assets/imgs/not.png" alt=""></div>
                <ul class="list" v-else>
                    <router-link tag="li" :to="'/detail?id='+item.Id" v-for="(item,index) in proList" :key="index">
                        <img class="listProPic" :src="item.purls" alt="">
                        <dl>
                            <dt>{{item.name}}</dt>
                            <dd>
                                <p class="listInfo">
                                    <span>{{item.jhl}} x {{item.guige}}</span>
                                    <em v-if="item.chandi">{{item.chandi}}</em>
                                </p>
                                <div class="listPrice">
                                    <em>￥{{item.price}}</em>
                                    <p>
                                        <span v-if="item.DisCount*1">满赠</span>
                                        <img @click.stop="addCar" :data-id="item.Id" :data-tcId="item.tcId?item.tcId:0" src="@/assets/imgs/icon_10.png" alt="">
                                    </p>
                                </div>
                            </dd>
                        </dl>
                    </router-link>
                </ul> 
            </div>
        </div>
        
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import foot from "@/components/foot.vue";
import search from "@/components/search.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot
  },
  data() {
    return {
      datas: {},
      adList: [],
      secClassList:[],
      selectId:"",
      isShowSelectPop:false,
      shearchText:"",
      isSecClass:true,
      typeId:'',
      tit:"",
      rightSecClassList:[],
      isShowProList:false,
      isType:false,
      questData:{
          page:1
      },
      scrollData:{
          isQuest:true,
          scrollBottom:100,
      },
      proList:[],
      token:"",
      addCarData:{
        Id:"",
        tcId:0,
        Number:1,
      },
      keyword:{}
    };
  },
  mounted() {
    this.init();
    this.typeId = this.$route.query.typeId;
    this.isType = this.$route.query.isType;
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
      isShowProList(v,o){
        let proList = this.$refs.proList;
        console.log(444,v,o)
        if(v){
            proList.addEventListener('scroll',this.scrollFn,false);
        }else{
            proList.scrollTop=0
        }
        
      },
  },
  methods: {
    init() {
        let storage=window.localStorage;
        this.token = storage.getItem("token");
        this.questData = this.$route.query
        this.getProList();
      
    },
    //TODO:搜索功能，筛选功能待完成
    goCar(){//前往购物车列表
        let storage=window.localStorage;
        if(!storage.getItem("token")){
            this.$router.push({
                path: '/login'
            });
        }else{
            this.$router.push({
                path: '/car'
            });
        }
    },
    backPop(){//返回
        this.isShowProList = false;
        this.isSecClass = false;
    },
    backPage(){//返回上一页
        this.$router.go(-1);
    },
    isLogin(){//判断是否登录
      
      if(!this.token){
        this.$router.push({
          path: '/login'
        });
        return false;
      }else{
        return true;
      }
    },
    addCar(e){//添加购物车
      let isLogin = this.isLogin();
      if(!isLogin) return;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.addCarData.Id=e.target.getAttribute("data-id");
      this.addCarData.tcId = e.target.getAttribute("data-tcId");
      Api.addCarFn(this.addCarData).then(res=>{
        Indicator.close();
        Toast(res.msg)
        console.log(123,res)
      })
    },
    goSearch(){
      let shearchText = this.shearchText;
      if(shearchText==""){
        this.toastObj = Toast('搜索内容不能为空');
      }else{
        this.questData.skey = shearchText;
        this.questData.page = 1;
        this.isSecClass = true;
        this.isShowProList = true;
        this.getProList();
      }

    },
    getProList(){
        console.log(32,this.questData)
        Api.getSecClass(this.questData).then(res=>{
            if(res.code==1){
                if(res.page==0){
                    return;
                }
                if(res.page>=res.currentPage){
                    this.scrollData.isQuest = false;
                }else{
                    this.scrollData.isQuest = true;
                }
                if(res.page==1){
                    this.proList = res.data;
                    this.isShowProList = true;
                }else{
                    this.proList = this.proList.concat(res.data);
                }
                this.isShowSelectPop = false;
                this.tit = res.title
            }else{
              Toast(res.msg)
            }
        })
        
    },
    scrollFn(){
        let proList = this.$refs.proList;
        this.scrollData["proList"] = proList;
        this.scrollData["proListHei"] = proList.offsetHeight;
        this.scrollData["proListInner"] = this.$refs.proListInner;
        let proListInnerHei = this.scrollData.proListInner.offsetHeight;
        let scrollHei = proListInnerHei-this.scrollData.proListHei-this.scrollData.scrollBottom;
        let sTop = this.scrollData.proList.scrollTop;
        if(scrollHei<=sTop&&this.scrollData.isQuest){
            console.log(5555)
            this.questData.page = this.questData.page+1;
            this.scrollData.isQuest = false;
            this.getProList();
        }
    },
    
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
  }
};
</script>
<style lang='less' scoped>
@hei:70px;
.head,.headInner{
    height: @hei;
}
.con{ 
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.rightList{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li{
        width: 50%;
        padding: 25px 15px 10px;
        height: auto;
        text-align: center;
        font-size: 20px;
        >img{
             display: block; margin: 0 auto 15px;
        }
    }
}
.list{
  display: flex; justify-content: flex-start;  flex-wrap: wrap;
    li{
        text-align: left; border: 1px solid #f3f3f3; border-radius: 5px;
        .listProPic{
            width: 136px;
        }
        dl{
            margin-left: 20px;
            flex: 1;
        }
        dt{
            font-size: 22px; color: #313131; margin-bottom: 10px;
        }
        .listInfo{
            display: flex; justify-content: space-between; align-items: center; color: #929292; font-size: 18px;
            em{
                font-style: normal; border: 1px solid #d81e06; font-size: 14px; height: 20px; border-radius: 10px; padding: 0 15px; color: #d81e06;
            }
        }
        .listPrice{
            display: flex; justify-content: space-between; align-items: center; margin-top: 20px; font-size: 18px; color: #d81e06; font-weight: normal;
            em{
                font-style: normal;
            }
            p{
                img{
                    margin-left: 15px;
                    margin-bottom: 0;
                    width: 29px;
                }
            }
        }
    }
}
.leftNav{
    width: 188px;
    background-color: #f4f8ff;
    overflow-y: auto;
    li{
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #313131;
    }
    .now{
        background-color: #fff;
        color: #2892fe;
    }
}
.notData{
    font-size: 26px;
    text-align: center; color: #929292; font-weight: bold; padding-top: 50px; width: 100%;
    img{
        width: 216px;
    }
}
.proListInner{
    width: 100%;
}
.secClassPop{
    position: fixed;
    width: 100%;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    li{
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #f4f8ff;
        height: 63px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #313131;
        span{
            text-align: center;
            padding-right: 20px;
        }
        img{
            opacity: 0;
        }
    }
    .now{
        color: #2892fe;
        img{
            opacity: 1;
            width: 24px;
        }
    }
}
.headInner{ 
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    background-color: #2892fe;
    img{
        margin: 0 25px 0 0;
    }
    .backArrow{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 70px;
        span{
            width: 20px;
            height: 20px;
            border: 2px solid #fff;
            border-right: 0;
            border-bottom: 0;
            transform: rotate(-45deg);
        }
    }
    .tit{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px; 
        font-weight: bold;
        margin-right: 20px;
    }
    
}
.back{ 
    display: flex; 
    justify-content: flex-start; 
    align-items: center; 
    font-size: 24px;
    padding-left: 15px;
    .backArrow{ 
        width: auto; 
        height: auto;
        span{
            margin-top: 6px;
        }
    }
    >span{
      width: 130px;
    }
}
.search{
    flex: 1;
    margin-left: 25px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin-right: 60px;
    border-radius: 25px;
    img{
        width: 31px;
        margin: 0 15px;
    }
    input{
        flex: 1;
        height: 100%;
        font-size: 26px;
    }
}
</style>