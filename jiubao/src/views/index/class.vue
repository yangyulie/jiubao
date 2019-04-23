<template>
  <div class="home">
    <div class="head">
        <div class="headInner" v-if="!isSecClass">
            <div class="back">
                <div class="backArrow"><span></span></div>
                <span>商品分类</span>
            </div>
            <div class="search">
                <img src="@/assets/imgs/icon_02.png" @click="goSearch" alt="">
                <input type="text" v-model="shearchText" @keyup.13="goSearch">
            </div>
        </div>
        <div class="headInner" v-else>
            <div class="backArrow"><span></span></div>
            <div class="tit" @click="showSelectPop">
                <span>{{tit}}</span>
            </div>
            <img src="@/assets/imgs/icon_12.png" alt="">
            <img src="@/assets/imgs/icon_13.png" alt="">
        </div>
    </div>
    <div class="con">
        <ul class="leftNav secreenHei">
            <li v-for="(item,index) in leftNavList" :class="{now:typeId==item.Id}" :key="index" @click="getAllpro(item.Id,index,item.name)">{{item.name}}</li>
        </ul>
        <ul class="rightList secreenHei" v-if="!isShowProList">
            <li v-for="(item,index) in rightSecClassList" :key="index" @click="selectSecClass(item.bigId)">
                <img :src="item.icon" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
        <div class="rightList secreenHei" v-else>
            <ul>
                <li v-for="(item,index) in datas.data" :key="index">
                    <img :src="item.purls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd>
                            <p>
                                <span>{{item.jhl}} x {{item.guige}}</span>
                                <em>{{item.chandi}}</em>
                            </p>
                            <div>
                                <em>{{item.price}}</em>
                                <p>
                                    <span v-if="item.DisCount*1">满赠</span>
                                    <img @click.stop="addCar" :data-id="item.Id" :data-tcId="item.tcId?item.tcId:0" src="@/assets/imgs/icon_10.png" alt="">
                                </p>
                            </div>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
        
    </div>
    <div class="secClassPop" v-show="isShowSelectPop">
        <ul>
            <li :class="{now:selectId==item.bigId}" v-for="(item,index) in rightSecClassList" :key="index" @click="selectSecClass(item.bigId)">
                {{item.name}}
                <img src="@/assets/imgs/icon_14.png" />
            </li>
        </ul>
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import foot from "@/components/foot.vue";
import search from "@/components/search.vue";
import { Toast } from 'mint-ui';
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
      questData:{}
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
  methods: {
    init() {
      this.getAllClass();
      
    },
    addCar(e){//添加购物车
      let isLogin = this.isLogin();
      if(!isLogin) return;
      let id=e.target.getAttribute("data-id");
      let tcId = e.target.getAttribute("data-tcId");
      console.log(id,tcId)
    },
    getAllClass(){//获取全部分来
        Api.getAllClass().then(res=>{
            this.leftNavList = res.rows;
            if(!this.isType){
                this.questData={
                    big:this.typeId
                }
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
        this.selectId = id;
        this.isSecClass = true;
        this.isShowProList = true;
        this.questData = {
            sig:id
        }
        this.getProList();
    },
    getProList(){
        Api.getSecClass(this.questData).then(res=>{
            this.datas = res;
            this.tit = res.bigclass;
            this.isShowSelectPop = false;
        })
    },
    getAllpro(typeId,index,name){//点击左侧分类获取分类下相应子分类
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
.rightList{
    width: 420px;
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
        img{
            display: none;
        }
    }
    .now{
        color: #2892fe;
        img{
            display: inline-block;
            width: 24px;
            margin-left: 20px;
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
    font-size: 30px;
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