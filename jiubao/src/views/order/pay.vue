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
                </label>
            </dd>
        </dl>
        <div class="payTotal">
            支付金额： ￥{{datas.total}}元
        </div>
        <div class="submitBox">
            <button @click="submitPay">提交订单</button>
        </div>
    </div>
    <foot :is_now="2"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import foot from "@/components/foot.vue";
import headed from "@/components/headed.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
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
          console.log(1234,res)
          if(res.code==1){
            this.datas = res;
          }
        })
    },
    submitPay(){
        if(!this.payMode){
            Toast("请选择支付方式")
            return;
        }
        let questData={
            Id:this.Id,
            payId:this.payMode
        }
        Api.submitPay(questData).then(res=>{

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
        width: 210px;
    }
    .payTotal{
        text-align: right; padding: 25px 50px 0 0; font-size: 24px; color: #313131;
    }
    .submitBox{
        margin-top: 100px;
    }
}
</style>