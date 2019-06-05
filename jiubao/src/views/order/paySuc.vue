<template>
  <div class="home">
    <headed :tit="'支付'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <div class="list notData">
          <div>
            <span><img src="@/assets/imgs/icon_46.png" alt=""></span>
            支付成功
            <div class="btns">
                <router-link to="/" replace>继续购物</router-link>
                <router-link to="/orderList" replace>查看订单</router-link>
            </div>
            <p class="tips">{{num}}秒后自动返回订单列表</p>
          </div>
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
import { setInterval, clearInterval } from 'timers';
export default {
  components: {
    foot,
    headed
  },
  data() {
    return {
        num:5,
        timer:null
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
      this.setGoOrderList();
    },
    setGoOrderList(){
        this.timer=setInterval(()=>{
            
            if(this.num<=0){
                clearInterval(this.timer)
                this.$router.replace({
                    path:'/orderList'
                })
            }else{
                this.num = this.num-1;
            }
        },1000)
    },
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    
  }
};
</script>
<style lang='less' scoped>
@bor:15px solid #f4f8ff;
.wrap{
  
  .notData{
    img{
      width: 118px;
    }
  }
  .btns{
      display: flex; justify-content: center; align-items: center; margin-bottom: 50px;
      a{
          border: 1px solid #929292; color: #929292; font-size: 18px; width: 107px; height: 49px; line-height: 49px; text-align: center; text-decoration: none;
      }
      a:first-child{
          color: #2892fe; border-color: #2892fe; margin-right: 25px;
      }
  }
  .tips{
      color: #ff6600; font-size: 18px;
  }
   
}
</style>