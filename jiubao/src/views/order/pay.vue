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
            支付金额： ￥{{datas.total}}元
        </div>
        <div class="sellBox" v-if="isSelectSell">
            <div class="sellNameBox">
                <p v-if="datas.userFirstOrder">
                    <span>{{datas.userFirstOrder.FirstOrderName}}</span><br>
                    <em>预计减免：{{datas.userFirstOrder.Amount}}元</em>
                </p>
                <p v-if="selectSellObj.Amount">
                    <span>{{selectSellObj.couponName}}</span><br>
                    <em>预计减免：{{selectSellObj.Amount}}元</em>
                </p>
                <ul>
                    <li>预计总减免：-{{sellPrice}}元</li>
                    <li>预计减免后订单总额：{{datas.total-sellPrice}}元</li>
                </ul>
            </div>
        </div>
        <div class="selectSell" v-if="datas.userMycoupon&&datas.userMycoupon.length>0" @click="showSellList"><span>选择优惠券</span></div>
        <div class="submitBox">
            <button @click="submitPay">立即支付</button>
        </div>
    </div>
    <div class="sellListPop" @click="showSellList" :class="{now:isShowSellList}">
        <ul>
            <li v-for="(item,index) in datas.userMycoupon" :key="index" @click="getThisSell(index)">
                <img :src="item.picurls" alt="">
            </li>
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
      Id:0,
      firstId:0,
      couponId:0,
      payMode:""
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
    getThisSell(idx){
        this.selectSellObj = this.datas.userMycoupon[idx];
    },
    showSellList(){
        this.isShowSellList = !this.isShowSellList;
    },
    getPayFn(){
        Api.getPay({Id:this.Id}).then(res=>{
          this.datas = res;
          // for(let i=0;i<res.userMycoupon.length;i++){
          //     res.userMycoupon[i].Amount = Math.round(Math.random()*10)
          // }
          if(res.code==1){
            this.datas = res;
            
            if(res.userFirstOrder||res.userMycoupon&&res.userMycoupon.length>0){
                this.isSelectSell = true;
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
      if(this.datas.userFirstOrder&&this.datas.userFirstOrder.Id){
        questData.firstId = this.datas.userFirstOrder.Id
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
        if(this.datas.userFirstOrder&&this.datas.userFirstOrder.Amount){
          total +=this.datas.userFirstOrder.Amount*1
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
.sellListPop{
    position: fixed; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, .5); z-index: 10; display: none; justify-content: center; align-items: flex-end; left: 0; top: 0;
    ul{
        width: 100%; padding: 20px; display: flex; box-sizing: border-box; justify-content: flex-start; align-items: center; flex-wrap: wrap; max-height: 80vh; overflow-y: auto; background-color: #fff;
        li{
            margin-bottom: 20px;
        }
    }
}
.sellListPop.now{
    display: flex;
}
.sellBox{
    border-bottom: @bor; padding: 15px 18px; border-top: @bor; margin-top: 25px;
    .sellNameBox{
        p{
            font-size: 18px; color: #d81e06; line-height: 30px; margin-bottom: 15px;
            span{
                font-size: 24px; display: inline-block; height: 43px; line-height: 43px; padding: 0 20px; background-color: #f9dcd8; border-radius: 22px; text-indent: 0;
            }
            em{
                text-indent: 1em; display: block; font-style: normal;
            }
        }
        ul{
            font-size: 18px; color: #d81e06; line-height: 30px;
            li{
                 text-indent: 1em;
            }
        }
    }
}
.selectSell{
    border-bottom: @bor; height: 80px; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #313131;
}
.selectSell::after{
    content: ''; border: 2px solid #ccc; border-bottom: 0; border-left: 0; transform: rotate(45deg); display: block; width: 20px; height: 20px;
}
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
        text-align: right; padding: 25px 50px 0 0; font-size: 24px; color: #313131;
    }
    .submitBox{
        margin-top: 100px;
    }
}
</style>