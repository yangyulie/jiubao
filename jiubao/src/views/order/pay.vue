<template>
  <div class="home">
    <headed :tit="'支付'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <dl class="list">
            <dt>支付方式</dt>
            <dd class="payMode">
                <label :class="{show:payMode==item.Id}" class="isChecked" v-for="(item,index) in datas.rows" :key="index">
                    <p><img :src="item.picurls" alt=""></p>
                    <div>
                      <input type="radio" v-model="payMode" :value="item.Id">{{item.payName}}
                      <div v-if="item.Id==5&&payMode==item.Id" v-html="item.remarks"></div>
                    </div>
                    <span><img src="@/assets/imgs/icon_15.png" alt=""></span>
                </label>
            </dd>
        </dl>
        <div class="payTotal">
            <!-- <span v-if="isSelectSell">支付金额： ￥{{datas.total-sellPrice}}元</span> -->
            <span>订单总金额： ￥{{(datas.total*1).toFixed(2)}}元</span>
        </div>
        <div class="selectSell" v-if="datas.userFirstOrder&&datas.userFirstOrder.length>0" @click="showActList">
            <span style="flex:1">选择优惠活动</span>
            <span class="sellName" v-if="selectActObj&&selectActObj.FirstOrderName">{{selectActObj.FirstOrderName}}</span>
        </div>
        <div class="reduceBox" v-if="selectActObj&&selectActObj.FirstOrderName">
            <p>
                <em>活动减免：-{{selectActObj.Amount}}元</em>
            </p>
        </div>
        <div class="selectSell" v-if="datas.userMycoupon&&datas.userMycoupon.length>0" @click="showSellList">
            <span style="flex:1">选择优惠券</span>
            <span class="sellName" v-if="selectSellObj&&selectSellObj.couponName">{{selectSellObj.couponName}}</span>
        </div>
        <div class="reduceBox" v-if="selectSellObj&&selectSellObj.couponName">
            <p>
                <em>优惠券减免：-{{selectSellObj.Amount}}元</em>
            </p>
        </div>
        <div class="sellBox" v-if="isSelectSell">
            <div class="sellNameBox">
                <ul>
                    <li>总计减免：-{{sellPrice.toFixed(2)}}元</li>
                    <li><span class="black">支付金额：{{(datas.total-sellPrice).toFixed(2)}}元</span></li>
                </ul>
            </div>
        </div>
        <div class="submitBox">
            <button @click="submitPay">立即支付</button>
        </div>
    </div>
    <div class="sellListPop" @click="showSellList" :class="{now:isShowSellList}">
        <ul>
            <li style="margin-right:0" v-for="(item,index) in datas.userMycoupon" :key="index" @click="getThisSell(index)">
                <img :src="item.picurls" alt="">
            </li>
            <li class="notUseSell" style="margin-right:0" @click="notUseSell"><div><span>不使用优惠券</span></div></li>
        </ul>
    </div>
    <div class="sellListPop" @click="showActList" :class="{now:isShowActList}">
        <ul>
            <li v-for="(item,index) in datas.userFirstOrder" :key="index" @click="getThisAct(index)">
                <span>{{item.FirstOrderName}}</span>
            </li>
            <li style="margin-right:0" class="notUseSell" @click="notUseAct"><div><span>不使用优惠活动</span></div></li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed
  },
  data() {
    return {
      datas:{},
      isSelectSell:false,
      selectSellObj:{},
      isShowSellList:false,
      isShowActList:false,
      Id:0,
      firstId:0,
      couponId:0,
      payMode:"",
      selectActObj:{}
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
      this.Id = this.$route.query.id;
      this.firstId = this.$route.query.firstId;
      this.couponId = this.$route.query.couponId;
      this.getPayFn()
    },
    
    notUseSell(){
        this.selectSellObj = {};
        console.log(!this.selectActObj&&!this.selectActObj.FirstOrderName,!this.selectActObj,!this.selectActObj.FirstOrderName)
        if(!this.selectActObj.FirstOrderName){
            this.isSelectSell = false
            
        }
    },
    notUseAct(){
        this.selectActObj = {};
        console.log(!this.selectSellObj&&!this.selectSellObj.couponName,!this.selectSellObj,!this.selectSellObj.couponName)
        if(!this.selectSellObj.couponName){
            this.isSelectSell = false
            console.log(11111)
        }
    },
    getThisSell(idx){
        this.selectSellObj = this.datas.userMycoupon[idx];
        this.isSelectSell = true;
    },
    getThisAct(idx){
        this.selectActObj = this.datas.userFirstOrder[idx];
        this.isSelectSell = true;
    },
    showSellList(){
        this.isShowSellList = !this.isShowSellList;
    },
    showActList(){
        this.isShowActList = !this.isShowActList;
    },
    getPayFn(){
        Api.getPay({Id:this.Id}).then(res=>{
          this.datas = res;
          // for(let i=0;i<res.userMycoupon.length;i++){
          //     res.userMycoupon[i].Amount = Math.round(Math.random()*10)
          // }
          if(res.code==1){
            this.datas = res;
            if((res.userFirstOrder&&res.userFirstOrder.length>0)||(res.userMycoupon&&res.userMycoupon.length>0)){
                this.isSelectSell = true;
            }
            if(res.userFirstOrder&&res.userFirstOrder.length>0){
                this.selectActObj = res.userFirstOrder[0]
            }
            if(res.userMycoupon&&res.userMycoupon.length>0){
                let _this = this;
                if(this.couponId){
                  let newArr = res.userMycoupon.filter((item,index)=>{
                      return item.Id == _this.couponId;
                  })
                  this.selectSellObj = newArr[0]
                }else{
                  this.selectSellObj = res.userMycoupon[0]
                }
                console.log(this.selectSellObj,_this.couponId)
            }
          }
        })
    },
    ali_pay(){
      //Toast("支付宝支付暂未开放")
      location.href='https://m.jiubao519.com/Default/payZfb?Id='+this.Id
      
    },
    wx_pay(){
      // Toast("微信支付暂未开放")
      location.href='https://m.jiubao519.com/Default/paywx?Id='+this.Id
      
    },
    bank_pay(){
      if(this.datas.total*1>5000){
        Toast("支付金额超出银行卡上限5000元")
        return;
      }
      let total = this.datas.total-this.sellPrice;
      this.$router.push({
        path:'/banks?id='+this.Id+'&totalPrice='+total
      })
    },
    submitPay(){
        if(!this.payMode){
            Toast("请选择支付方式")
            return;
        }
        this.submitPayFn();
        
        
    },
    submitPayFn(){//内部支付方式
      Indicator.open();
      let questData={
          Id:this.Id,
          payId:this.payMode
      }
      if(this.selectActObj&&this.selectActObj.Id){
        questData.firstId = this.selectActObj.Id
      }
      if(this.selectSellObj&&this.selectSellObj.Id){
        questData.couponId = this.selectSellObj.Id
      }
      Api.submitPay(questData).then(res=>{
        if(res.code==1){
          Indicator.close();
          switch(this.payMode){
            case 1:
              console.log("支付宝支付");
              this.ali_pay();
              break;
            case 2:
              console.log("微信支付");
              this.wx_pay();
              break;
            case 3:
              console.log("网银支付");
              this.bank_pay();
              break;
            case 4:
              console.log("储值支付")
              this.$router.replace({
                path:'/paySuc?orderId='+this.Id
              })
              break;
            case 5:
              console.log("线下转账支付")
              this.$router.replace({
                path:'/paySuc?orderId='+this.Id
              })
              break;
            case 6:
              console.log("货到付款")
              this.$router.replace({
                path:'/paySuc?orderId='+this.Id
              })
              break;
            case 7:
              console.log("滚结")
              this.$router.replace({
                path:'/paySuc?orderId='+this.Id
              })
              break;
            case 8:
              console.log("按合同协议结款")
              this.$router.replace({
                path:'/paySuc?orderId='+this.Id
              })
              break;
            default:
              console.error('未知支付方式')
          }
          
        }else{
          Toast(res.msg)
        }
      })
    },
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    sellPrice:function(){
        let total = 0;
        if(this.selectActObj&&this.selectActObj.Amount){
          total +=this.selectActObj.Amount*1
        }
        if(this.selectSellObj&&this.selectSellObj.Amount){

          total += this.selectSellObj.Amount*1;
        }
        return total;
        
    },
  }
};
</script>
<style lang='less' scoped>
@bor:10px solid #f4f8ff;

.wrap{
    .list{
        border-bottom: @bor; padding: 25px;
        dt{
            font-size: 24px; color: #313131; padding: 15px; line-height: 24px; border-bottom: 1px solid #929292;
        }
        dd{
            padding: 15px;
        }
    }
    .isChecked{
        width: 100%; flex-wrap: wrap; display: flex; justify-content: space-between; align-items: flex-start;
        >p{
          width: 36px; height: 36px;
          img{
            display: inline-block; width: 100%;
          }
        }
        >div{
          flex: 1; display: flex; justify-content: flex-start; align-items: center; color: #333; font-size: 26px; margin-left: 20px; line-height: 26px; flex-wrap: wrap; 
          div{
            color: #929292; font-size: 20px; line-height: 32px;margin-top: 15px;
          }
        }
        span{
           margin: 0;
        }
    }
    .payTotal{
        text-align: right; padding: 25px 50px 25px 0; font-size: 24px; color: #313131; border-bottom: @bor;
    }
}
</style>