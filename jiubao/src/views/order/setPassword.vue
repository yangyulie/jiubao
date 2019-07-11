<template>
  <div class="home">
    <headed :tit="'设置支付密码'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists" v-if="type==1">
            <li>
                <span>设置支付密码</span><input type="password" v-model="submitData.pwd" placeholder="请设置六位数字支付密码">
            </li>
            <li>
                <span>确认支付密码</span><input type="password" v-model="sureCode" placeholder="请确认支付密码">
            </li>
        </ul>
        <ul class="lists" v-else>
            <li>
                <span>设置支付密码</span><input type="password" v-model="submitResetData.pwd" placeholder="请设置六位数字新支付密码">
            </li>
            <li>
                <span>确认支付密码</span><input type="password" v-model="sureResetCode" placeholder="请确认新支付密码">
            </li>
            <li>
                <span>输入验证码</span><input type="number" v-model="submitResetData.code" placeholder="请输入手机短信验证码"><button class="getCode" @click="getCode">获取验证码</button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import ApiIndex from "@/api/index.js";
import headed from "@/components/headed.vue";
import districts from "@/assets/districts.json";
import { Indicator ,Popup ,Toast,Picker,MessageBox  } from 'mint-ui';
import { mapActions, mapState } from "vuex";
import { setTimeout } from 'timers';
export default {
  components: {
    headed,
  },
  data() {
    return {
        type:1,
        sureCode:'',
        submitData:{
            pwd:'',
        },
        phone:'',
        submitResetData:{
            pwd:'',
        },
        sureResetCode:''
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
        this.type = this.$route.query.type?this.$route.query.type:1;
        if(this.type!=1){
            this.getPhone()
        }
    },
    getCode(){
        console.log(this.phone)
        let str = "将发送验证码至"+this.phone+"的手机"
        MessageBox.confirm(str).then(res=>{
            let questData={
                phone:this.phone,
                typeId:4
            }
            ApiIndex.getTestCode(questData).then(res=>{
                if(res.code==1){
                    Toast('验证码已发送');
                }else{
                    Toast(res.msg);
                }
                
            })
        }).catch(res=>{})
    },
    getPhone(){
        Api.getPhone().then(res=>{
            this.phone = res.msg;
        })
    },
    save(){
        if(this.type==1){
            let obj = this.submitData;
            if(obj.pwd==''){
                Toast('请输入您要设置的支付密码');
                return;
            }
            
            if(obj.pwd!=this.sureCode){
                Toast('两次输入支付密码不一致')
                return;
            }
            if(!/^\d{6}$/.test(obj.pwd)){
                Toast('支付密码只能是六位数字');
                return;
            }
            Indicator.open();
            Api.setPassword(obj).then(res=>{
                Indicator.close();
                if(res.code==1){
                    this.$router.go(-1);
                }else{
                    Toast(res.msg)
                }
            })
        }else{
            let obj = this.submitResetData;
            if(obj.pwd==''){
                Toast('请输入您要设置的支付密码');
                return;
            }
            
            if(obj.code==''){
                Toast('请输入短信验证码');
                return;
            }
            if(obj.pwd!=this.sureResetCode){
                Toast('两次输入支付密码不一致')
                return;
            }
            if(!/^\d{6}$/.test(obj.pwd)){
                Toast('支付密码只能是六位数字');
                return;
            }
            Indicator.open();
            Api.eduPassword(obj).then(res=>{
                Indicator.close();
                if(res.code==1){
                    this.$router.go(-1);
                }else{
                    Toast(res.msg)
                }
            })
        }
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
                width: 100%; height: 50px; line-height: 50px; font-size: 24px; flex: 1;
            }
            span{
                width: 150px;
            }
        }
        li.selectBox{
            display: flex; justify-content: space-between; align-items: center;
        }
        li.selectBox:after{
            content: ''; border: 12px solid transparent; border-top-color: #8a8a8a; width: 0; height: 0;
        }
        li:last-child{
            border-bottom: 0;
        }
    }
    .isChecked{
       position: relative; display: flex; justify-content: flex-start; align-items: center; font-size: 24px; color: #6e6e6e; width: 208px;
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
.getCode{
    background-color: #2892fe; border: 0; height: 52px; line-height: 52px; color: #fff; font-size: 24px; padding: 0 10px; outline: none;
}
</style>