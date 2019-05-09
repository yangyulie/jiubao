<template>
  <div class="home">
    <headed :tit="'提交订单'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap" v-if="isShow">
        <div class="addressBox" v-if="datas.addessinfo">
            <router-link to="/address" class="notAddress address" v-if="datas.addessinfo.address.length==0">
                <span>请选择收货地址</span>
            </router-link>
            <router-link to="/address" tag="div" class="address" v-else>
                <img src="@/assets/imgs/icon_36.png" alt="">
                <dl>
                    <dt>{{datas.addessinfo.linkName}} <span>{{datas.addessinfo.Phone}}</span></dt>
                    <dd>{{datas.addessinfo.address}}</dd>
                </dl>
            </router-link>
        </div>
        <div class="invoiceBox">
            <router-link to="/invoice" class="notAddress address" v-if="!datas.invoiceinfo">
                <span>请设置开票信息</span>
            </router-link>
            <div class="notAddress address" v-else>
                <span>本次不开具发票</span>
            </div>
        </div>
        <div class="proListBox" v-if="datas.DiscartList">
            <dl class="prolist">
                <dt>参与满减活动商品</dt>
                <dd v-for="(item,index) in datas.DiscartList" :key="index">
                    <img :src="item.picurls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd class="gray">{{item.jhl}} x {{item.guige}}</dd>
                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                    </dl>
                </dd>
            </dl>
            <div class="prolistTotal">
                <div>满减活动商品总计： <span>{{datas.DiscartListSum}}</span></div>
            </div>
        </div>
        <div class="proListBox" v-if="datas.AcartList.length>0">
            <dl class="prolist">
                <dt>其他商品</dt>
                <dd v-for="(item,index) in datas.AcartList" :key="index" :class="{allProTop:item.tcList&&item.tcList.length>0}">
                    <img :src="item.picurls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd class="gray">{{item.jhl}} x {{item.guige}}</dd>
                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                    </dl>
                    <div v-if="item.tcList&&item.tcList.length>0" class="allPro">
                        <dl>
                            <dt><span>{{item.name}}套餐</span> <span>￥{{item.price}}</span><span> x {{item.Number}}</span></dt>
                            <dd v-for="(i,idx) in item.tcList" :key="idx">
                                <div>
                                    <img :src="i.picurls" alt="">
                                    <dl>
                                        <dt>{{i.name}}</dt>
                                        <dd class="gray">{{item.jhl}} x {{i.guige}}</dd>
                                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                                    </dl>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </dd>
            </dl>
            <div class="prolistTotal">
                <div>其他商品总计： <span>￥{{datas.AcartListSum}}</span></div>
            </div>
        </div>
        <div class="totalPriceBox">
            订单金额总计： <span>{{}}</span>
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
      isShow:false,
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
      this.getOrder()
    },
    getOrder(){
        let questData={};
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        questData.cartIds = this.$route.query.cartIds;
        Api.submitCarList(questData).then(res=>{
            console.log(2223,res)
            Indicator.close();
            if(res.code==1){
                this.datas = res.rows;
                this.isShow = true;
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
.address::after{
    content: ''; border: 1px solid #444; border-left: 0; border-bottom: 0; transform: rotate(45deg); width: 10px; height: 10px;
}
.proListBox{
    padding: 20px; border-bottom: @bor;
    >dl{
        >dt{
            font-size: 18px; color: #ff4344; height: 50px; border-bottom: 1px solid #c1c1c1; line-height: 50px;
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

.prolistTotal{
    height: 65px; line-height: 65px; border-top: 1px solid #c1c1c1; color: #d81e06; font-size: 18px; text-align: right; padding-right: 40px; margin-top: 20px;
}
.price{ 
    display: flex; justify-content: space-between; align-items: center;
}
</style>