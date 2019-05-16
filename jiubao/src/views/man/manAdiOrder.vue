<template>
  <div class="home">
    <headed :tit="'价格审核'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap secreenHei">
        <ul class="lists">
            <li>
                <span>商品库存</span><input type="text" v-model="submitData.Stock" disabled>
            </li>
            <li>
                <span>库存阀值</span><input type="text" v-model="submitData.threshold" disabled>
            </li>
            <li>
                <span>白名单</span><input type="text" v-model="submitData.Whitelist" disabled>
            </li>
            <li>
                <span>商品名称</span><input type="text" v-model="submitData.productsName" disabled>
            </li>
            <li>
                <span>商品规格</span><input type="text" v-model="submitData.guige" disabled>
            </li>
            <li>
                <span>二批价</span><input type="text" v-model="submitData.Eprice" disabled>
            </li>
            <li>
                <span>供店价</span><input type="text" v-model="submitData.Gprice" disabled>
            </li>
            <li>
                <span>开票价</span><input type="text" v-model="submitData.Kprice" disabled>
            </li>
            <li>
                <span>默认价格</span><input type="text" v-model="submitData.oldprice" disabled>
            </li>
            <li>
                <span>审核价格</span><input type="text" v-model="submitData.newprice" @blur="setPriceProFn" class="red">
            </li>
            <li>
                <span>订购数量</span><input type="text" v-model="submitData.number"  @blur="setPriceProFn" class="red">
            </li>
        </ul>
        <div class="total">
            <div class="totalBox">
            </div>
            <button @click="confirm">确认</button>
        </div>
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import headed from "@/components/headed.vue";
import foot from "@/components/footMan.vue";
import districts from "@/assets/districts.json";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
    foot
  },
  data() {
    return {
      
      submitData:{},
      allChecked:true,
      cartIds:'',
      id:0,
      orderId:0
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.orderId = this.$route.query.orderId;
    this.init();
    console.log(this.cartIds,this.submitData)
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
        this.getPriceFn();
    },
    setPriceProFn(){
        let questData={
            price:this.submitData.newprice,
            number:this.submitData.number,
            sId:this.submitData.Id
        }
        Api.setPricePro(questData).then(res=>{
            console.log(res)
            Toast(res.msg)
        })
    },
    confirm(){
        console.log(this.submitData)
        Api.setPricing({Id:this.orderId}).then(res=>{
            Toast(res.msg)
            if(res.code==1){
                this.$router.go(-1)
            }
        })
    },
    getPriceFn(){
        Api.getPricePro({Id:this.id}).then(res=>{
            this.submitData = res.rows
        })
    },
    save(){
        this.allChecked?this.submitData.states=1:this.submitData.states=0;
        let obj = this.submitData;
        let str=""
        for(let i in obj){
            if(i=='Id'||i=="states"||i=="address"||i=="tel"||i=="bankName"||i=="bankNo") {

            }else{
                console.log(i)
                if(obj[i]==""){
                    if(i=="CompanyName"){
                        str = "公司名称不能为空"
                    }
                    if(i=="CompanyNo"){
                        str = "纳税人识别号不能为空"
                    }
                    Toast(str)
                    return;
                }
            };
        }
        Api.addInvoice(obj).then(res=>{
            Toast(res.msg);
            if(res.code==1){
                this.$router.go(-1)
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
@bor:15px solid #f4f8ff;
.wrap{
    display: flex; flex-direction: column;
    .lists{
        padding: 10px; border-bottom: @bor; font-size: 24px; flex: 1;
        li{
            border-bottom: 1px solid #c1c1c1; padding: 10px; display: flex; justify-content: flex-start; align-items: center;
            input{
                flex:1; height: 50px; line-height: 50px; font-size: 24px;
            }
            span{
                width: 200px; font-size: 24px; color: #313131;
            }
        }
        li:last-child{
            border-bottom: 0;
        }
    }
    .red{
        color: #d81e06;
    }
    .isChecked{
       position: relative; display: flex; justify-content: flex-start; align-items: center; font-size: 24px; color: #6e6e6e; width: 250px;
       margin: 20px auto;
      span{
        width: 32px; height: 32px; border-radius: 50%; border: 1px solid #ccc; overflow: hidden; display: block; margin-right: 10px;
      }
      img{
        display: none;
      }
    }
    input[type="checkbox"]{
        border: 0; background: none; opacity: 0; position: absolute; left: 0; top: 0;
    }
    .isChecked.show img{
      display: block;
    }
}
.mint-popup{
    width: 100%;
}
.picker-toolbar-title{
    display: flex; height: 56px;
    div{
        flex: 1; font-size: 24px; text-align: center; line-height: 56px;
    }
}
</style>