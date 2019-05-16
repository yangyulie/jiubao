<template>
  <div class="home">
    <headed :tit="titleList[id]" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index" @click="goOrderDetail(item.Id)">
                <dl>
                    <dt>
                        <p>
                            <img src="@/assets/imgs/icon_38.png" alt="">
                            {{item.orderId}}
                        </p>
                        <span v-if="item.paystates">{{item.paystates}}</span>
                        <span v-else>{{item.payId}}</span>
                    </dt>
                    <dd>
                        <div>
                            <p>商品数量：{{item.Number}}</p>
                            支付金额：<span>￥{{item.total}}</span>
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
import Api from "@/api/man.js";
import foot from "@/components/footMan.vue";
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
          "全部订单","业务待审核","财务核价订单","待支付订单","待确认订单","待出库订单","待收货订单","已完成订单","作废订单","待退货订单","取消订单"
      ],
      id:0,
      list:[]
    };
  },
  mounted() {
    this.id = this.$route.query.sId
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
    goOrderDetail(id){
      console.log(123,id)
      this.$router.push({
          path:'/manOrderDetail?id='+id
      })
    },
    getOrderListFn(){
    console.log(this.id)
        Api.getManOrderList({sId:this.id}).then(res=>{
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
                display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; padding:0 25px 10px;
                span{
                    color: #fff; background-color: #e6593b; height: 26px; line-height: 26px; padding: 0 10px; font-size: 16px;
                }
            }
            dd{
                display: flex; justify-content: space-between; align-items: center; padding: 20px 25px 0;
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