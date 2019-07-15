<template>
  <div class="home">
    <headed :tit="'新建收货地址'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li>
                <span>＊发票抬头</span><input type="text" v-model="submitData.CompanyName" placeholder="请输入单位名称">
            </li>
            <li>
                <span>＊纳税人识别号</span><input type="text" v-model="submitData.CompanyNo" placeholder="或统一社会信用代码">
            </li>
            <li>
                <span>公司地址</span><input type="text" v-model="submitData.address" placeholder="请输入公司地址">
            </li>
            <li>
                <span>联系电话</span><input type="number" v-model="submitData.tel" placeholder="请输入联系电话">
            </li>
            <li>
                <span>开户银行</span><input type="text" v-model="submitData.bankName" placeholder="请输入公司开户银行">
            </li>
            <li>
                <span>银行账号</span><input type="number" v-model="submitData.bankNo" placeholder="请输入银行账号">
            </li>
        </ul>
        <label :class="{show:allChecked}" class="isChecked"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" v-model="allChecked">设为默认发票信息</label>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import districts from "@/assets/districts.json";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      
      submitData:{
          CompanyName:"",
          CompanyNo:"",
          address:"",
          tel:"",
          bankName:"",
          bankNo:"",
          states:0,
          Id:0
      },
      allChecked:true,
      cartIds:'',
    };
  },
  mounted() {
    this.init();
    this.cartIds = this.$route.query.cartIds;
    this.addressId = this.$route.query.addressId;
    this.submitData = this.$route.query.obj?JSON.parse(this.$route.query.obj):this.submitData;
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
            // if(this.cartIds=="undefined"){
            //     this.$router.push({
            //         path:'/invoice',
            //         replace:true
            //     })
            // }else{
            //     this.$router.push({
            //         path:'/invoice?cartIds='+this.cartIds+'&addressId='+ this.addressId,
            //         replace:true
            //     })
            // }
            
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
        padding: 10px; border-bottom: @bor; font-size: 24px;
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