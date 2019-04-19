<template>
  <div class="home">
    <div class="head">
        <div class="headInner">
            <div class="backArrow"><span></span></div>
            <div class="tit" @click="showSelectPop">
                <span>{{tit}}</span>
            </div>
            <img src="@/assets/imgs/icon_12.png" alt="">
            <img src="@/assets/imgs/icon_13.png" alt="">
        </div>
    </div>
    <div class="con">
        <ul class="leftNav">
            <li v-for="(item,index) in leftNavList" :key="index" @click="getAllpro(item.id)">{{item.className}}</li>
        </ul>
    </div>
    <div class="secClassPop" v-show="isShowSelectPop">
        <ul>
            <li :class="{now:selectId==item.id}" v-for="(item,index) in secClassList" :key="index" @click="selectSecClass(item.id)">
                {{item.className}}
                <img src="@/assets/imgs/icon_14.png" />
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    
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
    };
  },
  mounted() {
    this.init();
    this.typeId = this.$route.query.typeId;
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  methods: {
    init() {
      this.getDetail();
      this.getAllpro(this.typeId);
    },
    showSelectPop(){
        this.isShowSelectPop = !this.isShowSelectPop;
    },
    selectSecClass(id){
        console.log(id);
        this.selectId = id;
        Api.getSecClass({sig:id}).then(res=>{
            console.log('商品列表：',res)
            this.showSelectPop();
        })
    },
    getAllpro(typeId){
        Api.getSecClass({big:typeId}).then(res=>{
            console.log('全部商品列表：',res)
        })
        Api.getClassSec({typeId:typeId}).then(res=>{
          this.secClassList = res.rows;
          this.tit = res.bigclass;
          console.log("当前二级类：",res)
      })
    },
    getDetail() {//获取页面数据
      let questData = this.$route.query;
      Api.getClassSec(questData).then(res=>{
          this.secClassList = res.rows;
          this.tit = res.bigclass;
          console.log("当前二级类：",res)
      })
      Api.getClassSec({typeId:0}).then(res=>{
          this.leftNavList = res.rows;
          console.log("全部二级类：",res)
      })
      console.log(questData)
    }
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
</style>