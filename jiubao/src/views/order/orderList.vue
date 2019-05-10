<template>
  <div class="home">
    <headed :tit="titleList[id]" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <dl>
                    <dt>
                        <p>
                            <img src="@/assets/imgs/icon_38.png" alt="">
                            {{item.orderId}}
                        </p>
                        <span>{{item.orderactionName}}</span>
                    </dt>
                    <dd>
                        <div>
                            <p>商品数量：{{item.Number}}</p>
                            支付金额：<span>{{item.payName}}</span>
                        </div>
                        <p>{{item.addtime}}</p>
                    </dd>
                </dl>
            </li>
        </ul>
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
      titleList:[
          "全部订单","待核价订单","财务核价订单","待支付订单","待确认订单","待出库订单","待收货订单","已完成订单","作废订单","待退货订单","取消订单"
      ],
      id:0,
      list:[]
    };
  },
  mounted() {
    this.id = this.$route.query.id
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
      this.getOrderListFn();
    },
    getOrderListFn(){
    console.log(this.id)
        Api.getOrderList({Id:this.id}).then(res=>{
            this.list = res.rows
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
@bor:15px solid #f4f8ff;
.wrap{
    .lists{
        li{
            border-bottom: @bor; padding: 30px 15px; font-size: 18px; color: #313131;
            dt{
                display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; padding-bottom: 10px;
                span{
                    color: #fff; background-color: #e6593b; height: 26px; line-height: 26px; padding: 0 10px; font-size: 16px;
                }
            }
            dd{
                display: flex; justify-content: space-between; align-items: center; padding-top: 20px;
                div{
                    p{
                        padding-bottom: 8px;
                    }
                }
                >p{
                    text-align: right;
                }
            }
        }
    }
}
</style>