<template>
  <div class="home">
    <div class="head">
        <div class="headInner" v-if="!isSecClass">
            <div class="back" @click="backPage">
                <div class="backArrow"><span></span></div>
                <span>商品分类</span>
            </div>
            <div class="search">
                <img src="@/assets/imgs/icon_02.png" @click="goSearch" alt="">
                <input type="text" v-model="shearchText" @keyup.13="goSearch">
            </div>
        </div>
        <div class="headInner" v-else>
            <div class="backArrow" @click="backPage"><span></span></div>
            <div class="tit" @click="showSelectPop">
                <span>{{tit}}</span>
            </div>
            <img @click="backPop" src="@/assets/imgs/icon_12.png" alt="">
            <img @click="goCar" src="@/assets/imgs/icon_13.png" alt="">
        </div>
    </div>
    <div class="con">
        <ul class="leftNav secreenHei" v-if="leftNavList&&leftNavList.length>0">
            <li v-for="(item,index) in leftNavList" :class="{now:typeId==item.Id}" :key="index" @click="getAllpro(item.Id,index,item.name)">{{item.name}}</li>
        </ul>
        <ul class="rightList secreenHei" v-show="!isShowProList" v-if="rightSecClassList&&rightSecClassList.length>0">
            <li v-for="(item,index) in rightSecClassList" :key="index" @click="selectSecClass(item.bigId)">
                <img :src="item.icon" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
        <div class="rightList secreenHei" ref="proList"  v-show="isShowProList">
            <div ref="proListInner" class="proListInner">
                <img :src="picUrls" alt="">
                <div class="filterProBox">
                    <p @click="filterPrice">
                        价格 
                        <img src="@/assets/imgs/icon_42.png" alt="" v-if="questData.sort=='price'">
                        <img src="@/assets/imgs/icon_43.png" alt="" v-else>
                    </p>
                    <p @click="filterOther">
                        筛选
                        <img src="@/assets/imgs/icon_44.png" alt="">
                    </p>
                </div>
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
    <div class="secClassPop" v-show="isShowSelectPop">
        <ul>
            <li :class="{now:selectId==item.bigId}" v-for="(item,index) in rightSecClassList" :key="index" @click="selectSecClass(item.bigId)">
                <span>{{item.name}}</span>
                <img src="@/assets/imgs/icon_14.png" />
            </li>
        </ul>
    </div>
    <div class="filterPop" :class="{show:isShowFilterPop}">
        <div class="filterInner">
            <div class="filterList">
                <dl>
                    <dt>价格区间</dt>
                    <dd class="priceInp">
                        <input type="number" v-model="questData.begprice" placeholder="最低价">--
                        <input type="number" v-model="questData.endPrice" placeholder="最高价">
                    </dd>
                    <dt v-if="filterData.brand&&filterData.brand.length>0">品牌</dt>
                    <dd v-if="filterData.brand&&filterData.brand.length>0">
                        <span 
                        v-for="(item,index) in filterData.brand" 
                        :key="index"
                        :class="{now:questData.brand==item}"
                        @click="filter('brand',item)"
                        >{{item}}</span>
                    </dd>
                    <dt v-if="filterData.Netcontent&&filterData.Netcontent.length>0">净含量</dt>
                    <dd v-if="filterData.Netcontent&&filterData.Netcontent.length>0">
                        <span 
                        v-for="(item,index) in filterData.Netcontent" 
                        :key="index"
                        :class="{now:questData.jhl==item}"
                        @click="filter('jhl',item)"
                        >{{item}}</span>
                    </dd>
                    <dt v-if="filterData.Origin&&filterData.Origin.length>0">产地</dt>
                    <dd v-if="filterData.Origin&&filterData.Origin.length>0">
                        <span 
                        v-for="(item,index) in filterData.Origin" 
                        :key="index"
                        :class="{now:questData.chandi==item}"
                        @click="filter('chandi',item)"
                        >{{item}}</span>
                    </dd>
                </dl>
            </div>
            <div class="filterBtns">
                <button @click="resetFilter">重置</button>
                <button @click="confirmFilter">确定</button>
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
      leftNavList:[],
      tit:"",
      selectId:"",
      isShowSelectPop:false,
      shearchText:"",
      isSecClass:false,
      typeId:'',
      rightSecClassList:[],
      isShowProList:false,
      isType:false,
      questData:{
          page:1,
          sort:"price",
          jhl:"",
          chandi:"",
          brand:"",
          begprice:"",
          endPrice:""
      },
      scrollData:{
          isQuest:true,
          scrollBottom:100,
      },
      proList:[],
      picUrls:"",
      token:"",
      addCarData:{
        Id:"",
        tcId:0,
        Number:1,
      },
      isShowFilterPop:false,
      filterData:{}
    };
  },
  mounted() {
    this.init();
    this.typeId = this.$route.query.typeId;
    this.isType = this.$route.query.isType;
    let storage=window.localStorage;
    this.token = storage.getItem("token");
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
        this.getAllClass();
      
    },
    resetFilter(){
        this.questData.begprice = "";
        this.questData.endPrice = "";
        this.questData.chandi = "";
        this.questData.jhl = "";
        this.questData.brand = "";
    },
    confirmFilter(){
        this.changePrice();
        this.getProList();
        this.filterOther();
    },
    changePrice(){
        let price = this.questData.begprice
        if(price>this.questData.endPrice){
            this.questData.begprice = this.questData.endPrice
            this.questData.endPrice = price;
        }
        console.log(this.questData)
    },
    filter(name,tag){
        if(this.questData[name]==tag){
            this.questData[name]='';
            return;
        }
        this.questData[name] = tag
    },
    filterOther(){
        this.isShowFilterPop = !this.isShowFilterPop;
        if(this.isShowFilterPop){
            Api.filterPro({typeId:this.typeId}).then(res=>{
                this.filterData = res;
            })
        }
        
    },
    filterPrice(){
        if(this.questData["sort"]=="price"){
            this.questData["sort"]='pricedesc'
        }else{
            this.questData["sort"]="price"
        }
        this.questData.page = 1;
        this.getProList();
    },
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
    getAllClass(){//获取全部分类
        Api.getAllClass().then(res=>{
            this.leftNavList = res.rows;
            if(!this.isType){
                this.questData["big"]=this.typeId
                this.questData.page = 1;
                this.proList=[];
                this.isShowProList = true;
                this.isSecClass = true;
                this.getProList();
            }
            for(var i=0;i<this.leftNavList.length;i++){
                if(this.leftNavList[i].Id == this.typeId){
                    this.rightSecClassList= this.leftNavList[i].list;
                    return;
                }
            }
        })
    },
    goSearch(){
      let shearchText = this.shearchText;
      if(shearchText==""){
        this.toastObj = Toast('搜索内容不能为空');
      }else{
        this.$router.push('/product?skey='+shearchText);
      }

    },
    showSelectPop(){//显示下拉分类
        this.isShowSelectPop = !this.isShowSelectPop;
    },
    selectSecClass(id){//点击下拉分类，获取分类下产品列表
        console.log(12345,id)
        this.selectId = id;
        this.isSecClass = true;
        this.isShowProList = true;
        this.questData["sig"] = id;
        this.questData.page = 1;
        this.proList=[];
        this.getProList();
        this.isShowSelectPop = false;
    },
    getProList(){
        console.log(32,this.questData)
        Api.getSecClass(this.questData).then(res=>{
            Toast(res.msg)
            if(res.code==1){
                this.picUrls = res.picUrls
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
                }else{
                    this.proList = this.proList.concat(res.data);
                }
                this.isShowSelectPop = false;
            }else{
                this.proList=[];
            }
            this.tit = res.bigclass;
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
    getAllpro(typeId,index,name){//点击左侧分类获取分类下相应子分类
        console.log(22,typeId,index,name)
        this.questData["big"]=typeId
        this.typeId = typeId;
        this.tit = name;
        this.isShowProList = false;
        this.isSecClass = false;
        this.rightSecClassList= this.leftNavList[index].list;
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
.filterProBox{
    display: flex; justify-content: space-between; align-items: center; font-size: 24px; border-bottom: 1px solid #c1c1c1; padding: 20px 0 10px;
    p{
        flex: 1; display: flex; justify-content: center; align-items: center; height: 36px;
        img{
            width: 22px; margin-left: 10px;
        }
    }
}
.priceInp{
    display: flex; justify-content: flex-start; align-items: center;
    input{
        border: 1px solid #929292; margin: 0 10px; width: 204px; height: 50px; text-align: center; line-height: 50px; font-size: 24px; color: #313131;
    }
}
.filterPop{
    position: fixed; left: 0; top: 0; z-index: 999; background-color: rgba(0, 0, 0, .5); display: none; justify-content: flex-end; align-items: flex-start; width: 100%; height: 100%; padding-left: 125px;
    .filterInner{
        background-color: #fff; width: 100%; height: 100%; display: flex; flex-direction: column; font-size: 20px; color: #313131;
        .filterList{
            flex: 1; padding: 20px; overflow-y: auto;
            dt{
                font-size: 24px; padding-bottom: 20px; margin-top: 10px;
            }
            dd{
                display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap;
                span{
                    margin-bottom: 10px; margin-right: 10px; width: 147px; height: 50px; display: flex; justify-content: center; align-items: center; border: 1px solid #929292;
                }
                .now{
                    border-color: #2892fe; color: #2892fe;
                }
            }
        }
        .filterBtns{
            display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #c1c1c1; height: 84px; background-color: #fff;
            button{
                display: flex; flex: 1; height: 84px; justify-content: center; align-items: center; font-size: 24px; color: #929292; background: none; border: 0;
            }
            button:last-child{
                background-color: #2892fe; color: #fff;
            }
        }
    }
}
.filterPop.show{
    display: flex;
}
.rightList{
    width: 435px;
    padding-right: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li{
        width: 33.3%;
        padding: 40px 15px 10px;
        height: auto;
        text-align: center;
        font-size: 20px;
        img{
            margin-bottom: 15px;
        }
    }
}
.list{
    li{
        display: flex; justify-content: flex-start; align-items: flex-start; width: 100%; text-align: left; padding: 25px 0; border-bottom: 1px solid #f3f3f3;
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
            display: flex; justify-content: space-between; align-items: center; margin-top: 50px; font-size: 18px; color: #d81e06; font-weight: normal;
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
        width: 156px;
    }
}
.proListInner{
    width: 100%; padding-top: 20px;
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
    .tit::after{
        content: '';
        height: 0;
        width: 0;
        border: 8px solid transparent;
        border-top-color: #fff;
        margin-top: 8px;
        margin-left: 10px;
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