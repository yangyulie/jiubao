<template>
  <div class="home">
    <headed :tit="'商品详情'" :isShowRight="true" :isClose="false">
        <div @click="goCar"><img src="@/assets/imgs/icon_13.png" alt=""></div>
    </headed>
    <div class="adBox">
      <!-- <mt-swipe v-if="adList.length>0" :auto="4000" continuous>
        <mt-swipe-item v-for="(item,index) in adList" :key="index">
          <img :src="item" alt>
        </mt-swipe-item>
      </mt-swipe> -->
      <img :src="datas.purls" alt>
    </div>
    <dl class="proInfoBox">
      <dt>
          {{datas.name}}
          <p>{{datas.jhl}} x {{datas.guige}}</p>
      </dt>
      <dd>
          <span >￥{{datas.price}}</span>
          <!-- <span v-else>{{fanwei}}</span> -->
          <div>
              <span class="reduce" @click="reduceFn"></span>
              <input type="number" v-model="number" @input="changeFn">
              <span class="add" @click="addFn"></span>
          </div>
      </dd>
    </dl>
    <ul class="proInfoList">
      <li>规格/单位：{{datas.guige}}</li>
      <li>品牌：{{datas.brand}}</li>
      <li v-if="datas.chandi">国家：{{datas.chandi}}</li>
      <li>净含量：{{datas.jhl}}</li>
      <li>酒精度：{{datas.VOL}}</li>
      <li v-if="!datas.setmealBool">价格：{{datas.price}}</li>
      <li v-else>价格区间：{{fanwei}}</li>
      <li>保质期：{{datas.baozhiqi}}</li>
    </ul>
    <div class="selectBale" @click="selectBale" v-if="datas.setmealBool">
      <span>{{tcText==''?'请选择套餐':tcText}}</span>
    </div>
    <div class="balePop" @click="selectBale" :class="{show:isShowBalePop}">
      <dl>
        <dt>
          <img :src="datas.purls" alt="">
          <span v-show="tcId!=-1">￥{{datas.price}}</span>
        </dt>
        <dd v-for="(item,index) in datas.stmList" :key="index" @click.stop="getTC(item)">
          <span :class="{now:tcId==item.Id}">{{item.name}}</span>
        </dd>
      </dl>
    </div>
    <dl class="detail">
      <dt>产品详情</dt>
      <dd v-html="datas.contents"></dd>
    </dl>
    <div class="footer">
      <div class="footerInner">
        <span @click="handleCollectFn(datas.collectionState)">
          <img src="@/assets/imgs/icon_17.png" alt="" v-if="datas.collectionState==0">
          <img src="@/assets/imgs/icon_18.png" alt="" v-else>
        </span>
        <div @click="goCar" class="goCar">
          <div>
            <img src="@/assets/imgs/car_1.png" alt="">
            <span>购物车</span>
          </div>
          
        </div>
        <p @click="addCar">加入购物车</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import ApiOrder from "@/api/order.js";
import ApiMan from "@/api/man.js";
import { mapActions, mapState } from "vuex";
import { Indicator ,Toast } from 'mint-ui';
import headed from "@/components/headed.vue";
export default {
  components: {
    headed
  },
  data() {
    return {
      datas: {},
      adList: [],
      token:"",
      number:1,
      id:'',
      isShowBalePop:false,
      tcText:'',
      fanwei:'',
      tcId:''
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.cId = this.$route.query.cId;
    if(this.$route.query.tcId*1){

      this.tcId = this.$route.query.tcId*1;
    }
    console.log(555,this.tcId)
    this.init();
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  methods: {
    init() {
      let storage=window.localStorage;
      this.token = storage.getItem("token");
      console.log(window)
      window.scrollTo(0,0)
      this.getDetail();
    },
    getTC(item){
      this.tcId = item.Id;
      this.tcText = item.name;
      this.datas.price = item.price;
      this.datas.name = item.name;
      this.datas.contents = item.contents;
      this.datas.purls = item.picurls;
      this.isShowBalePop = false;
    },
    //TODO：套餐功能未完善
    handleCollectFn(state){//添加或取消收藏
      console.log(state)
      let isLogin = this.isLogin();
      if(!isLogin) return;
      let questData={
        Id:this.id,
        states:0
      }
      if(state==1){
        questData.states = 0
      }else{
        questData.states = 1
      }
      ApiOrder.handleCollect(questData).then(res=>{
        Toast(res.msg)
        if(res.code==1){
          if(state==1){
            this.datas.collectionState = 0
          }else{
            this.datas.collectionState = 1
          }
        }
        
      })
    },
    selectBale(){//选择套餐，打开或者关闭选择浮层
      this.isShowBalePop = !this.isShowBalePop;
    },
    // changeNumFn(num){//改变数量时，发起数量库存验证
    //   console.log(this.tcId)
    //   if(this.tcId==-1){
    //     Toast("选完套餐才可以~")
    //     return;
    //   }
    //   Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    //   });

    //   let questData = {
    //     Id:this.id,
    //     tcId:this.tcId,
    //     Number:num
    //   }
    //   ApiOrder.carListNumUpdate(questData).then(res=>{
    //     Indicator.close();
    //     if(res.code==1){
    //       this.number = num;
    //     }else{
    //       Toast(res.msg)
    //     }
    //   })
    // },
    changeFn(){//手动输入购买数量
      let num = this.number*1;
      if(this.datas.setmealBool&&!this.tcId){
        Toast("选完套餐才可以更改数量~")
        return;
      }
      this.number = num;
      //this.changeNumFn(num)
    },
    addFn(){//增加购买数量
      let num = this.number*1+1;
      if(this.datas.setmealBool&&!this.tcId){
        Toast("选完套餐才可以更改数量~")
        return;
      }
      this.number = num;
      //this.changeNumFn(num)
      
    },
    reduceFn(){//减少购买数量
      let num = this.number*1-1;
      if(num<=0){
        return;
      }
      this.number = num;
    },
    goCar(){//去购物车
      let isLogin = this.isLogin();
      if(!isLogin) return;
      this.$router.push({
        path: '/myCarList'
      });
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
      if(this.datas.setmealBool&&!this.tcId){
        this.selectBale();
        return;
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let addCarData={};
      addCarData.Id=this.id;
      addCarData.cId=this.cId;
      addCarData.tcId = this.tcId;
      addCarData.Number = this.number;
      ApiMan.addCarFn(addCarData).then(res=>{
        Indicator.close();
        Toast(res.msg)
        console.log(123,res)
      })
    },
    getDetail() {//获取产品详情数据
      let questDataId = this.id;
      Api.indexDetail({ Id: questDataId }).then(res => {
        //res.data.stmList=["百威330x12套餐买5送2加赠苏打水1件","百威330x12套餐买5送2加赠苏打水1件"]
        this.datas = res.data;
        if(res.data.setmealBool){
          // this.tcId = -1;
          let min = res.data.stmList[0].price;
          let max = res.data.stmList[0].price;
          for(let i=0;i<res.data.stmList.length;i++){
            console.log(i)
            if(res.data.stmList[i].Id==this.tcId){
              this.getTC(res.data.stmList[i])
            }
            if(res.data.stmList[i].price*1<min){
              min=res.data.stmList[i].price
            }
            if(res.data.stmList[i].price*1>max){
              max=res.data.stmList[i].price
            }
            console.log(min,max)
          }
          if(min==max){
            this.fanwei = ' ￥'+min;
          }else{
            this.fanwei = ' ￥'+min +' - ￥'+ max
          }
          console.log(this.fanwei)
        }else{
          this.tcId = 0
        }
        this.adList.push(res.data.purls);
        console.log(this.adList,res.data.purls)
      });
    }
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
  }
};
</script>
<style lang='less' scoped>
@bor:20px solid #f4f8ff;
.adBox {
   text-align: center;
}
.goCar{
  display: flex; justify-content: flex-end; align-items: center; padding-right: 20px; text-align: center;
  img{
    width: 40px;
  }
}

.balePop{
  display: flex; visibility: hidden; justify-content: flex-start; align-items: flex-end; position: fixed; width: 100%; height: 100%; left: 0; bottom: 0; z-index: 10; background-color: rgba(0, 0, 0, .5); transform: translateY(100%); transition: all .2s;
  dl{
    background-color: #fff; width: 100%; min-height: 400px; padding-bottom: 100px;
    dt{
       padding: 20px; border-bottom: 1px solid #c1c1c1;
       img{
         border: 1px solid #c1c1c1; margin-top: -60px; width: 210px;
       }
       span{
         color: #d81e06; padding: 25px; font-size: 24px;
       }
    }
    dd{
      padding: 20px 35px 0; display: flex; justify-content: flex-start; align-items: center;
      span{
        padding: 15px 10px 10px; border: 1px solid #313131; color: #000000; line-height: 18px; font-size: 18px;
      }
      .now{
        border-color: #2892fe; color: #2892fe;
      }
    }
  }
}
.balePop.show{
  visibility: visible; transform: translateY(0);
}
.selectBale{
  display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #929292; padding: 25px; border-bottom: @bor;;
}
.selectBale::after{
  content: ''; width: 10px; height: 10px; border: 1px solid #929292; border-left: 0; border-bottom: 0; transform: rotate(45deg);
}
.detail{
  padding: 25px 0;
  dt{
    padding: 0 25px 20px; font-size: 24px; color: #929292;
  }
  dd{
    text-align: center; font-size: 24px;
  }
}
.proInfoList{
  padding: 35px 35px 35px 0; border-bottom: @bor; display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; font-size: 22px; color: #929292;
  li{
    line-height: 48px; width: 50%; padding-left: 35px;
  }
}
.proInfoBox{
  padding: 35px; border-bottom: @bor; height: auto;
  dd{
    margin-top: 10px;
    span{
      font-weight: normal;
    }
  }
}
.footer,.footerInner{
  height: 86px;
  background-color: #fff;
}
.footerInner{
  position: fixed; width: 100%; z-index: 10; left: 0; bottom: 0; border-top: 1px solid #c1c1c1; display: flex; justify-content: space-between;
  span{
    width: 105px; height: 100%; display: flex; justify-content: center; align-items: center;
    img{ width: 42px;}
  }
  >div{
    flex: 1;
  }
  p{
    width: 195px; background-color: #2892fe; color: #fff; font-size: 24px; display: flex; justify-content: center; align-items: center;
  }
}
</style>