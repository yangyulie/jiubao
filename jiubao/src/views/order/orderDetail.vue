<template>
  <div class="home">
    <headed :tit="'订单详情'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap" v-if="isShow">
        <div class="addressBox">
            <div class="address">
                <dl>
                    <dt>{{datas.address.linkName}} <span>{{datas.address.Phone}}</span></dt>
                    <dd>{{datas.address.address}}</dd>
                </dl>
            </div>
        </div>
        <div class="proListBox" v-if="datas.shopcart">
            <dl class="prolist">
                <dt>
                    <p>
                        <img src="@/assets/imgs/icon_38.png" alt="">
                        {{datas.orderId}}
                    </p>
                    <span>{{datas.orderactionName}}</span>
                </dt>
                <dd v-for="(item,index) in datas.shopcart.shopList" :key="index">
                    <img :src="item.picurls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd class="gray">{{item.jhl}} x {{item.guige}}</dd>
                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                    </dl>
                </dd>
            </dl>
        </div>
        <dl class="orderInfo">
            <dt>订单信息</dt>
            <dd>
                商家名称：{{datas.companyName}}
            </dd>
            <dd>
                订单编号：{{datas.orderId}}
            </dd>
            <dd>
                {{datas.ptck}}
            </dd>
            <dd>
                下单时间：{{datas.addtime}}
            </dd>
            <dd class="orderInfoPrice">
                实付：￥{{datas.Total}}
            </dd>
        </dl>
        <dl class="orderInfo">
            <dt>付款信息</dt>
            <dd>
                付款方式：{{datas.payType.payment}} <span class="red">{{datas.payType.Paystates}}</span>
            </dd>
        </dl>
        <dl class="orderInfo" v-if="isSelectSell">
            <dt>优惠信息</dt>
            <dd style="padding-left:0">
                <div class="sellBox">
                    <div class="sellNameBox">
                        <p v-for="(item,index) in datas.orderDiscount" :key="index">
                            <span>{{item.DiscountName}}</span><br>
                            <em>减免：{{item.Amount}}元</em>
                        </p>
                        <ul>
                            <li>总减免：-{{sellPrice}}元</li>
                            <li>减免后订单总额：{{datas.Total}}元</li>
                        </ul>
                    </div>
                </div>
            </dd>
        </dl>
        <dl class="orderInfo">
            <dt>开票信息</dt>
            <dd>
                开票公司：{{datas.invoiceId==0?"不开票":datas.invoiceInfo.CompanyName}}
            </dd>
        </dl>
        <dl class="orderInfo">
            <dt><span>订单日志</span><router-link tag="div" :to="'/orderLog?id='+datas.Id">查看订单日志：{{datas.logcount}}</router-link></dt>
        </dl>
    </div>
    <div class="btnsOrder">
        <p v-if="datas.states==1">
            <router-link tag="button" :to="'/cancelOrder?id='+id+'&states=8'">取消订单</router-link>
            <button @click="quick">催单审核</button>
        </p>
        <p v-if="datas.states==6">
            <router-link tag="button" :to="'/cancelOrder?id='+id+'&states=7'">确认收货</router-link>
        </p>
        <p v-if="datas.states==3">
            <router-link tag="button" :to="'/pay?id='+id+'&states=3'">支付订单</router-link>
        </p>
    </div>
    <foot :is_now="2"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import ApiUser from "@/api/user.js";
import foot from "@/components/foot.vue";
import headed from "@/components/headed.vue";
import { Indicator ,Toast ,MessageBox} from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
    headed
  },
  data() {
    return {
      datas:{},
      isShow:false,
      isSelectSell:false,
      id:0
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
        this.id= this.$route.query.id;
        this.getOrderDetailFn();
    },
    quick(){
        MessageBox.confirm("是否催单？").then(action=>{
            Api.quick().then(res=>{
                Toast(res.msg)
            })
        }).catch(cancel=>{

        })
        
    },
    getOrderDetailFn(){
        let questData={
            Id:this.id
        };
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        Api.getOrderDetail(questData).then(res=>{
            console.log(2223,res)
            Indicator.close();
            if(res.code==1){
                this.datas = res.rows;
                this.isShow = true;
                if(res.rows.orderDiscount&&res.rows.orderDiscount.length>0){
                    this.isSelectSell = true;
                }
            }
        })
      
    },
    
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    sellPrice:function(){
        let total = 0;
        if(this.datas.orderDiscount&&this.datas.orderDiscount.length>0){
            total = this.datas.orderDiscount.reduce((t,i)=>{
                return t+i.Amount
            },0);
        }
        return total;
        
    },
  }
};
</script>
<style lang='less' scoped>
@bor:10px solid #f4f8ff;
.sellBox{
    padding: 15px 0;
    .sellNameBox{
        p{
            font-size: 18px; color: #d81e06; line-height: 30px; margin-bottom: 15px;
            span{
                font-size: 24px; display: inline-block; height: 43px; line-height: 43px; padding: 0 20px; background-color: #f9dcd8; border-radius: 22px; text-indent: 0; overflow: hidden; max-width: 100%; white-space: nowrap;
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
.address{
    padding: 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: @bor; font-size: 20px; color: #929292; background-color: #f4f8ff;
    dl{
        flex: 1; margin: 0 20px;
        dt{
            color: #313131; font-size: 24px; padding-bottom: 5px;
        }
    }
}
.notAddress{
    height: 80px; background-color: #fff;
}
.orderInfo{
    padding: 30px 35px; font-size: 18px; color: #929292; border-bottom: @bor;
    dt{
        margin-bottom: 10px; color: #313131; display: flex; justify-content: space-between; align-items: center;
    }
    dd{
        margin-bottom: 6px; padding-left: 20px;
        .red{
            color: #ff4344;
        }
    }
    .orderInfoPrice{
        border-top: 1px solid #c1c1c1; margin: 10px 0 0 0 ; padding: 20px 0 0 20px; color: #d81e06;
    }
}
.submitBox{
    padding: 15px 65px; 
    button{
        display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff; border-radius: 10px; background-color: #2892fe; height: 80px; width: 100%; outline: none; border: 0;
    }
}
.sumBox{
    font-size: 18px; color: #d81e06; padding-bottom: 5px; margin-top: 15px;
}
.markBox{
    padding: 35px; border-bottom: @bor; font-size: 20px; color: #313131;
    p{
        margin-bottom: 8px;
    }
    textarea{
        resize: none; border: 1px solid #c1c1c1; padding: 5px; font-size: 20px; color: #313131; width: 100%; height: 120px; outline: none;
    }
}
.proListBox{
    padding: 20px 20px 0; border-bottom: @bor;
    >dl{
        >dt{
            display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; padding-bottom: 10px;
            span{
                color: #fff; background-color: #e6593b; height: 26px; line-height: 26px; padding: 0 10px; font-size: 16px;
            }
        }
        >dd{
            display: flex; justify-content: flex-start; align-items: flex-start; font-size: 18px; color: #313131; padding: 25px 20px 0; flex-wrap: wrap;
            img{
                width: 132px; margin-right: 27px;
            }
            dl{ 
                width: 400px; padding-top: 20px;
                dd{
                    margin-top: 5px;
                }
                .gray{ color: #929292}
            }
            .allPro{ 
                 width: 100%;
                >dl{
                    width: 100%;
                    >dt{
                        border-bottom: 1px dashed #929292; font-size: 18px; color: #313131; padding: 0 0 15px 0;
                    }
                    >dd{
                        div{
                            display: flex; align-items: flex-start;
                        }
                        
                    }
                }
            }
        }
    }
    .allProTop{
        background-color: #f4f8ff;
        >img{
            display: none;
        }
        >dl{
            display: none;
        }
        .allPro{
            >dl{
                >dt{
                    display: flex; justify-content: space-between; align-items: center;
                }
            }
        }
    }
}
.totalPriceBox{
    border-bottom: @bor; height: 75px; padding: 0 35px; display: flex; justify-content: flex-start; align-items: center; font-size: 24px;
    span{
        color: #d81e06; font-weight: bold;
    }
}
.disContBox{
    display: flex; justify-content: flex-start; align-items: flex-start; font-size: 18px; color: #929292;
    p{
        margin-top: 40px; line-height: 30px; width: 100px;
    }
    div{
        display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex: 1;
        span{
            border: 1px solid #929292; margin-left: 40px; padding: 15px 35px; line-height: 18px; margin-top: 30px;
        }
    }
}
.prolistTotal{
    line-height: 65px; border-top: 1px solid #c1c1c1; color: #d81e06; font-size: 18px; text-align: right; padding-right: 40px; margin-top: 20px;
}
.price{ 
    display: flex; justify-content: space-between; align-items: center;
}
</style>