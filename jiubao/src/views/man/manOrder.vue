<template>
  <div class="home">
    <headed :tit="'提交订单'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap" v-if="isShow">
        <div class="addressBox">
            <router-link :to="'/manAddress?cId='+submitData.cId+'&cartIds='+submitData.cartIds+'&invoiceId='+submitData.invoiceId" class="notAddress address" v-if="!addressInfo">
                <span>请选择收货地址</span>
            </router-link>
            <router-link :to="'/manAddress?cId='+submitData.cId+'&cartIds='+submitData.cartIds+'&invoiceId='+submitData.invoiceId" tag="div" class="address" v-else>
                <img src="@/assets/imgs/icon_36.png" alt="">
                <dl>
                    <dt>{{addressInfo.linkName}} <span>{{addressInfo.Phone}}</span></dt>
                    <dd>{{addressInfo.address}}</dd>
                </dl>
            </router-link>
        </div>
        <div class="invoiceBox">
            <router-link :to="'/manInvoice?cId='+submitData.cId+'&cartIds='+submitData.cartIds+'&AddressId='+submitData.AddressId" class="notAddress address" v-if="isInvoice">
                <span>发票：</span>
                <dl v-if="invoiceInfo">
                    <dt>{{invoiceInfo.CompanyName}}</dt>
                    <dd>{{invoiceInfo.CompanyNo}}</dd>
                </dl>
                <span v-else>请设置开票信息</span>
            </router-link>
            <router-link  :to="'/manInvoice?cId='+submitData.cId+'&cartIds='+submitData.cartIds+'&AddressId='+submitData.AddressId" class="notAddress address" v-else>
                <span>本次不开具发票</span>
            </router-link>
        </div>
        <label :class="{show:allChecked}" class="isChecked"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" v-model="allChecked" @change="changeFn">一票通和酒类随附单</label>
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
            <div class="sumBox">
                <div>满减活动商品总计： <span>￥{{datas.DiscartListSum}}</span></div>
            </div>
            
            <div class="prolistTotal">
                <div class="disContBox" v-if="datas.DisCountList&&datas.DisCountList.length>0">
                    <p>满减规则</p>
                    <div>
                        <span v-for="(item,index) in datas.DisCountList" :key="index">{{item.DiscountName}}</span>
                    </div>
                </div>
                <div>优惠后金额总计： <span>￥{{datas.DiscountAmount}}</span></div>
            </div>
        </div>
        <div class="proListBox" v-if="datas.AcartList&&datas.AcartList.length>0">
            <dl class="prolist">
                <dt>【商品】</dt>
                <dd v-for="(item,index) in datas.AcartList" :key="index" :class="{allProTop:item.tcList&&item.tcList.length>0}">
                    <img :src="item.picurls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd class="gray">{{item.jhl}} x {{item.guige}}</dd>
                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                    </dl>
                    <div v-if="item.tcList&&item.tcList.length>0" class="allPro">
                        <dl>
                            <dt><span>{{item.name}}套餐</span> <span class="red">￥{{item.price}}</span><span> x {{item.Number}}</span></dt>
                            <dd v-for="(i,idx) in item.tcList" :key="idx">
                                <div>
                                    <img :src="i.picurls" alt="">
                                    <dl>
                                        <dt>{{i.name}}</dt>
                                        <dd class="gray">{{item.jhl}} x {{i.guige}}</dd>
                                        <dd class="price"><span>￥{{i.price}}</span><span> x {{item.Number}}</span></dd>
                                    </dl>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </dd>
            </dl>
            <div class="prolistTotal">
                <div>商品总计： <span>￥{{datas.AcartListSum}}</span></div>
            </div>
        </div>
        <div class="totalPriceBox">
            订单金额总计： <span>￥{{datas.total}}</span>
        </div>
        <div class="selectSell" v-if="datas.userFirstOrder&&datas.userFirstOrder.length>0" @click="showActList">
            <span style="flex:1">选择优惠活动</span>
            <span class="sellName" v-if="selectActObj&&selectActObj.FirstOrderName">{{selectActObj.FirstOrderName}}</span>
        </div>
        <div class="reduceBox" v-if="selectActObj&&selectActObj.FirstOrderName">
            <p>
                <em>预计减免：-{{selectActObj.Amount}}元</em>
            </p>
        </div>
        <div class="selectSell" v-if="datas.userMycoupon&&datas.userMycoupon.length>0" @click="showSellList">
            <span style="flex:1">可参加活动</span>
            <span class="sellName" v-if="selectSellObj&&selectSellObj.couponName">{{selectSellObj.couponName}}</span>
        </div>
        <div class="reduceBox" v-if="selectSellObj&&selectSellObj.couponName">
            <p>
                <em>预计减免：-{{selectSellObj.Amount}}元</em>
            </p>
        </div>
        <div class="sellBox" v-if="isSelectSell">
            <div class="sellNameBox">
                <ul>
                    <li>预计总减免：-{{sellPrice}}元</li>
                    <li><span class="black">预计减免后订单总额：{{datas.total-sellPrice}}元</span></li>
                </ul>
            </div>
        </div>
        <div class="markBox">
            <p>添加订单备注</p>
            <textarea name="" id="" cols="30" rows="10" v-model="submitData.Remarks" placeholder="请您在此添加订单备注"></textarea>
        </div>
        
        <div class="submitBox">
            <button @click="submitOrder">提交订单</button>
        </div>
    </div>
    <div class="sellListPop" @click="showSellList" :class="{now:isShowSellList}">
        <ul>
            <li style="margin-right:0" v-for="(item,index) in datas.userMycoupon" :key="index" @click="getThisSell(index)">
                <img :src="item.picurls" alt="">
            </li>
            <li class="notUseSell" @click="notUseSell"><div><span>不使用优惠券</span></div></li>
        </ul>
    </div>
    <div class="sellListPop" @click="showActList" :class="{now:isShowActList}">
        <ul>
            <li v-for="(item,index) in datas.userFirstOrder" :key="index" @click="getThisAct(index)">
                <span>{{item.FirstOrderName}}</span>
            </li>
            <li style="margin-right:0" class="notUseSell" @click="notUseAct"><div><span>不使用优惠活动</span></div></li>
        </ul>
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiMan from "@/api/man.js";
import foot from "@/components/footMan.vue";
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
      addressInfo:"",
      urlParam:{},
      submitData:{},
      invoiceInfo:false,
      isInvoice:false,
      payMode:'1',
      isSelectSell:false,
      selectSellObj:{},
      isShowSellList:false,
      isShowActList:false,
      allChecked:0,
      selectActObj:{}
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
        this.urlParam = this.$route.query;
        this.submitData={
            cartIds:this.urlParam.cartIds,
            AddressId:this.urlParam.addressId,
            invoiceId:this.urlParam.invoiceId?this.urlParam.invoiceId:0,
            Remarks:'',
            oFsUser:'',
            ptck:this.allChecked,
            pyId:0,
            cId:this.urlParam.cId
        }
        if(this.submitData.invoiceId!=0){
            this.isInvoice = true
        }
        this.getOrder();
        this.getAddressListFn()
        this.getInvoiceListFn()
    },
    notUseSell(){
        this.selectSellObj = {};
        if(!this.selectActObj.FirstOrderName){
            this.isSelectSell = false
            
        }
    },
    notUseAct(){
        this.selectActObj = {};
        if(!this.selectSellObj.couponName){
            this.isSelectSell = false
        }
    },
    getThisSell(idx){
        this.selectSellObj = this.datas.userMycoupon[idx];
        this.isSelectSell = true;
    },
    getThisAct(idx){
        this.selectActObj = this.datas.userFirstOrder[idx];
        this.isSelectSell = true;
    },
    showSellList(){
        this.isShowSellList = !this.isShowSellList;
    },
    showActList(){
        this.isShowActList = !this.isShowActList;
    },
    cancelInvoice(){
        console.log(3434434)
        this.invoiceInfo = false;
        this.urlParam.invoiceId = 0;
        return;
    },
    changeFn(){
        this.submitData.ptck = this.allChecked*1
        console.log()
    },
    submitOrder(){
        console.log(this.submitData)
        Indicator.open({
            text: '提交中...',
            spinnerType: 'fading-circle'
        });
        ApiMan.submitOrder(this.submitData).then(res=>{
            Indicator.close();
            Toast(res.msg)
            if(res.code==1){
                this.$router.push({
                    path:'/manOrderDetail?id='+res.row,
                    replace:true
                })
            }
            console.log(123456,res)
        })
    },
    getInvoiceListFn(){
        ApiMan.getInvoiceList({cId:this.submitData.cId}).then(res=>{
            if(res.rows&&res.rows.length>0){
                if(this.submitData.invoiceId){
                    for(let i=0;i<res.rows.length;i++){
                        if(this.submitData.invoiceId==res.rows[i].Id){
                            this.invoiceInfo = res.rows[i]
                        }
                    }
                }else{
                    for(let i=0;i<res.rows.length;i++){
                        if(res.rows[i].states==1){
                            this.invoiceInfo = res.rows[i]
                            this.submitData.invoiceId = this.invoiceInfo.Id
                        }
                    }
                }
            }else{
                this.invoiceInfo = false
            }
            console.log(222,this.invoiceInfo)
        })
    },
    getAddressListFn(){
        ApiMan.getAddressList({cId:this.submitData.cId}).then(res=>{
            console.log(123,res)
            if(res.rows&&res.rows.length>0){
                if(this.submitData.AddressId){
                    for(let i=0;i<res.rows.length;i++){
                        if(this.submitData.AddressId==res.rows[i].Id){
                            this.addressInfo = res.rows[i]
                        }
                    }
                }else{
                    for(let i=0;i<res.rows.length;i++){
                        if(res.rows[i].states==1){
                            this.addressInfo = res.rows[i]
                            this.submitData.AddressId = this.addressInfo.Id
                        }
                    }
                }
            }else{
                this.addressInfo = false
            }
            console.log(1111,res)
        })
    },
    getOrder(){
        let questData={};
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        questData.cartIds = this.urlParam.cartIds;
        questData.cId = this.urlParam.cId;
        ApiMan.submitCarList(questData).then(res=>{
            console.log(2223,res)
            Indicator.close();
            if(res.code==1){
                this.datas = res.rows;
                this.isShow = true;
                if(res.rows.userFirstOrder||res.rows.userMycoupon.length>0){
                    this.isSelectSell = true;
                }
                if(res.rows.userMycoupon.length>0){
                    this.selectSellObj = res.rows.userMycoupon[0]
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
        if(this.selectActObj&&this.selectActObj.Amount){
          total +=this.selectActObj.Amount*1
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

.address{
    padding: 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: @bor; font-size: 20px; color: #929292; background-color: #f4f8ff;
    dl{
        flex: 1; margin: 0 20px;
        dt{
            color: #313131; font-size: 24px; padding-bottom: 5px;
        }
    }
}
.isChecked{
    border-bottom: @bor; width: 100%; padding: 25px;
}
.notAddress{
    height: 80px; background-color: #fff;
}
.address::after{
    content: ''; border: 1px solid #444; border-left: 0; border-bottom: 0; transform: rotate(45deg); width: 10px; height: 10px;
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
.red{
    color: #d81e06;
}
</style>