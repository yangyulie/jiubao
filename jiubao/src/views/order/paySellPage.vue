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
                      <input type="radio" v-model="payMode" :value="item.Id">{{item.payment}}
                    </div>
                    <span><img src="@/assets/imgs/icon_15.png" alt=""></span>
                </label>
            </dd>
        </dl>
        <div class="payTotal">
            支付金额： ￥{{datas.amount}}元
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
import { decode } from 'punycode';
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
        Api.paySell({Id:this.Id}).then(res=>{
          this.datas = res;
          if(res.code==1){
            this.datas = res;
          }
        })
    },
    bank_pay(){
      if(this.datas.total*1>5000){
        Toast("支付金额超出银行卡上限5000元")
        return;
      }
      this.$router.push({
        path:'/banks?id='+this.Id+'&totalPrice='+this.datas.total+'&typeId='+this.payMode
      })
    },
    submitPay(){
        if(!this.payMode){
            Toast("请选择支付方式")
            return;
        }
        this.submitPayFn()
    },
    submitPayFn(){//内部支付方式
      Indicator.open();
      let questData={
          Id:this.Id,
          payId:this.payMode
      }
      Api.buySell(questData).then(res=>{
        if(res.code==1){
            Indicator.close();
            let url = decodeURIComponent(res.urls);
            if(res.payId==3){
                this.$router.push({
                    path:url
                })
            }else{
                location.href = url
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
        text-align: right; padding: 25px 50px 0 0; font-size: 24px; color: #313131;
    }
    .submitBox{
        margin-top: 100px;
    }
}
</style>