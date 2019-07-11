<template>
  <div class="home">
    <headed :tit="'支付'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <div ref="aliData"></div>
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
      Id:0,
      data:''
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
      let type = this.$route.query.type;
      if(type==1){
          this.ali_pay();
      }
      if(type==2){
          this.wx_pay();
      }
    },
    wx_pay(){
        // var result = new code.model.aliPay().wxpayPost("215");
        // JObject obj = JObject.Parse(JsonConvert.SerializeObject(result));
        // uls = obj["msg"].ToString();
        // Response.Write("<meta http-equiv='Refresh' content='0; URL=" + uls + "' />");
        // Response.End();
        
        location.href='https://m.jiubao519.com/Default/paywx?Id='+this.Id
        // Api.wx_pay({orderId:this.Id}).then(res=>{
        //     console.log(res,90909)
        // })
    },
    ali_pay(){
      //Toast("支付宝支付暂未开放")
      Api.ali_pay({orderId:this.Id}).then(res=>{
        this.$refs.aliData.innerHTML = res;
        document.forms['alipaysubmit'].submit();
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
    form{
        width: 100%; height: 100vh;
    }
}
</style>