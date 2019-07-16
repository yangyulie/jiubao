<template>
  <div class="home">
    <headed :tit="'支付'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <dl class="list">
            <dt>支付方式</dt>
            <dd class="payMode">
                <label :class="{show:payMode==item.Id}" class="isChecked" v-for="(item,index) in datas.rows" :key="index">
                    <span><img src="@/assets/imgs/icon_15.png" alt=""></span>
                    <input type="radio" v-model="payMode" :value="item.Id">{{item.payName}}
                    <div v-show="payMode==5&&item.Id==5" v-html="item.remarks"></div>
                </label>
            </dd>
        </dl>
        <div class="payTotal">
            支付金额： ￥{{datas.total}}元
        </div>
        <div class="submitBox">
            <button @click="submitPay">立即支付</button>
        </div>
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
      Id:0,
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
      this.getPayFn()
    },
    getPayFn(){
        Api.getPay({Id:this.Id}).then(res=>{
          this.datas = res;
          if(res.code==1){
            this.datas = res;
          }
        })
    },
    ali_pay(){
      //Toast("支付宝支付暂未开放")
      
      let test = location.href;
      if(/test/.test(test)){
        // this.$router.push({
        //   path:'/aliPay?id='+this.Id+'&type=1'
        // })
        //location.href='https://m.jiubao519.com/Default/payZfb?Id='+this.Id
        window.location = "jiubao519://host/payZfb?Id="+this.Id; 
        // Api.ali_pay({orderId:this.Id}).then(res=>{
        //   console.log(res,999)
        // })
      }else{
        Toast("支付宝支付暂未开放")
      }
      
    },
    wx_pay(){
      // Toast("微信支付暂未开放")
      location.href='https://m.jiubao519.com/Default/paywx?Id='+this.Id
      // let test = location.href;
      // if(/test/.test(test)){
      //   location.href='https://m.jiubao519.com/Default/paywx?Id='+this.Id
      //   // this.$router.push({
      //   //   path:'/aliPay?id='+this.Id+'&type=2'
      //   // })
      // }else{
      //   Toast("微信支付暂未开放")
      // }
      
    },
    bank_pay(){
      this.$router.push({
        path:'/banks?id='+this.Id+'&totalPrice='+this.datas.total
      })
    },
    submitPay(){
        if(!this.payMode){
            Toast("请选择支付方式")
            return;
        }
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
            this.submitPayFn();
            break;
          case 5:
            console.log("线下转账支付")
            this.submitPayFn();
            break;
          case 6:
            console.log("货到付款")
            this.submitPayFn();
            break;
          case 7:
            console.log("滚结")
            this.submitPayFn();
            break;
          case 8:
            console.log("按合同协议结款")
            this.submitPayFn();
            break;
          default:
            console.error('未知支付方式')
        }
        
    },
    submitPayFn(){//内部支付方式
      Indicator.open();
      let questData={
          Id:this.Id,
          payId:this.payMode
      }
      Api.submitPay(questData).then(res=>{
        if(res.code==1){
          Indicator.close();
          this.$router.replace({
            path:'/paySuc?orderId='+this.id
          })
        }else{
          Toast(res.msg)
        }
      })
    },
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    
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
        width: 100%; flex-wrap: wrap;
        div{
          width: 100%; padding-left: 50px;
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