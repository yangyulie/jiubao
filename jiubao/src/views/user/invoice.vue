<template>
  <div class="home">
    <headed :tit="'开票信息'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <div>
                  <div>
                    <p>单位名称：{{item.CompanyName}}</p>
                    <p>纳税人识别号：{{item.CompanyNo}}</p>
                    <p>公司地址：{{item.address}}</p>
                    <p>联系电话：{{item.tel}}</p>
                    <p>开户银行：{{item.bankName}}</p>
                    <p>银行账号：{{item.bankNo}}</p>
                  </div>
                </div>
                <p>
                  <span class="defaultTag" v-if="item.states==1">默认</span>
                  <span class="useAddress" v-if="cartIds" @click="goUseAddress(item.Id)">使用发票信息</span>
                  <em>
                    <span @click="defaultAddress(item.states==1?0:1,item.Id)">{{item.states==1?"取消默认":"设为默认"}}</span>
                    <img src="@/assets/imgs/icon_37.png" @click="edtAddress(item)" alt="">
                    <img src="@/assets/imgs/icon_35.png" @click="defaultAddress(-1,item.Id)" alt="">
                  </em>
                  
                </p>
            </li>
        </ul>
        <router-link class="addShoperBind" :to="'/addInvoice?cartIds='+cartIds+'&addressId='+ addressId">新建发票信息</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      list:[],
      datas:{},
      cartIds:"",
      addressId:""
    };
  },
  mounted() {
    this.init();
    this.cartIds = this.$route.query.cartIds;
    this.addressId = this.$route.query.AddressId;
    console.log(this.addressId)
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
      this.getInvoiceListFn();
    },
    goUseAddress(id){
      this.$router.push({
          path:'/order?cartIds='+this.cartIds+'&invoiceId='+ id+'&addressId='+ this.addressId,
          replace:true
      })
    },
    defaultAddress(status,id){
      let questData={
        Id:id,
        states:status
      }
      Api.defaultInvoice(questData).then(res=>{
        Toast(res.msg)
        if(res.code==1){
          this.init();
        }
      })
    },
    edtAddress(obj){
      console.log(obj)
      this.$router.push({
          path:'/addInvoice?cartIds='+this.cartIds+'&obj='+ JSON.stringify(obj)+'&addressId='+ this.addressId,
          replace:true
      })
    },
    getInvoiceListFn(){//获取个人中心数据
        Api.getInvoiceList().then(res=>{
            this.list= res.rows;
            this.datas = res;
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
        font-size: 24px; color: #313131;
        li{
             margin-top: 4px; margin-bottom: 6px; border-bottom: @bor; padding: 0 20px 20px 0;
            >div{
              border-left: 4px solid #2892fe; padding: 26px 0 0 10px;
              
              >div{
                  display: flex; justify-content: space-between; flex-direction: column; align-items: flex-start; padding: 0 16px 20px 12px; border-bottom: 1px solid #c1c1c1;
                  p{
                      width: 100%; margin-bottom: 5px;
                      
                  }
                  em{
                      flex: 1; text-align: left; font-style: normal; 
                      span{
                        display: block; font-size: 20px; color: #929292; margin-top: 10px;
                      }
                  }
                  
                  img{
                      width: 46px;
                  }
              }
            }
            >p{
              display: flex; justify-content: space-between; align-items: center; padding: 15px 15px 0;
              .defaultTag{
                  display: block; border: 1px solid #2892fe; color: #2892fe; font-size: 18px; width: 52px; height: 33px; text-align: center; line-height: 33px; margin-top: 5px; align-self: flex-start;
              }
              .useAddress{
                  border: 1px solid #2892fe; border-radius: 5px; width: 160px; height: 40px; text-align: center; line-height: 40px; color: #2892fe;
                }
              em{
                font-style: normal;
                *{
                  margin-left: 20px;
                }
              }
              img{
                width: 40px;
              }
            }
        }
        li:last-child{
          border-bottom: 0;
        }
    }
    .addShoperBind{
      width: 582px; height: 72px; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 24px; background-color: #2892fe; border-radius: 10px; margin: 70px auto;
    }
}

</style>