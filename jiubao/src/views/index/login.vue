<template>
  <div class="home fullHei">
    <div class="loginType fullHei" v-if="!isShowLoginForm">
      <div class="btnsBox">
        <a href="javascript:;" @click="selectLogin(1)">商户登录</a>
        <a href="javascript:;" @click="selectLogin(2)">工作人员登录</a>
        <a href="javascript:;" @click="returnPage">取消</a>
      </div>
    </div>
    <div class="loginForm fullHei" v-else>
      <div class="logo">
        <img src="@/assets/imgs/icon_03.png" alt>
      </div>
      <div class="formBox">
          <label for="tel">
              <img src="@/assets/imgs/icon_04.png" alt="">
              <p><input type="number" id="tel" v-model="tel" placeholder="请输入您的手机号"></p>
          </label>
          <label for="tel">
              <img src="@/assets/imgs/icon_05.png" alt="">
              <p>
                <input type="number" id="code" v-model="code" placeholder="请输入您的验证码">
                <a href="javascript:;" @click="sendCode">{{text}}</a>
              </p>
          </label>
          <div class="loginBtn" @click="login">登录</div>
          <router-link to="/register" class="registerBtn">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import { Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
import { setInterval, clearInterval } from 'timers';
export default {
  components: {},
  data() {
    return {
      isShowLoginForm: false,
      loginType: '',
      text:"发送验证码",
      timer:null,
      count:0,//倒计时
      toastObj:null,
      countdown:120,//倒计时初始值
      tel:"",
      code:'',
    };
  },
  mounted() {
    this.init();
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  methods: {
    init() {
      
    },
    testPhone(){
        this.closeToast();
        let reg = /1\d{10}/;
        if(!reg.test(this.tel)){
            this.toastObj = Toast('手机号格式错误');
            return false;
        }
        return true;
    },
    testCode(){
        if(!this.testPhone()||!/\d{4}/.test(this.code)){
            this.toastObj = Toast('验证码格式错误');
            return false;
        }
        return true;
    },
    login(){
        let isTest = this.testCode();
        if(!isTest) return;
        let questData={
            phone:this.tel,
            typeId:this.loginType,
            value:this.code
        }
        Api.loginFn(questData).then(res=>{
            this.toastObj = Toast(res.msg);
            let storage=window.localStorage;
            let token = storage.setItem("token",res.token);
        })
    },
    closeToast(){//关闭已有提示层
        if (this.toastObj) this.toastObj.close();
    },
    sendCode(){//点击获取验证码
        let isTest = this.testPhone();
        console.log(isTest)
        if(!isTest) return;
        if(this.timer){
            this.toastObj = Toast('倒计时结束后才可重新获取');
            return;
        }
        
        let questData={
            phone:this.tel,
            typeId:this.loginType
        }
        Api.getTestCode(questData).then(res=>{
            this.toastObj = Toast(res.msg);
            if(res.code==0){
              this.count = this.countdown;
              this.timer=setInterval(()=>{
                  this.count = this.count-1;
                  if(this.count<=0){
                      this.text = "发送验证码";
                      clearInterval(this.timer);
                      this.timer = null
                      this.count = this.countdown;
                  }else{
                      this.text=this.count+"s后重新获取";
                  }
              },1000)
            }
        })
    },
    returnPage() {//返回
      this.$router.go(-1);
    },
    selectLogin(type) {//选择登录方式：1，商户；2，工作人员
      this.isShowLoginForm = true;
      this.loginType = type;
    }
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
  }
};
</script>
<style lang='less' scoped>
@bgColor: #f5f5f5;
.home {
  background-color: @bgColor;
}
.loginType {
  background: url("../../assets/imgs/bg/bg_01.jpg") no-repeat center top/100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnsBox {
  width: 494px;
  font-size: 30px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 40px;
    background-color: rgba(40, 146, 254, 1);
    border-radius: 10px;
    color: #fff;
  }
  a:nth-child(2) {
    background-color: rgba(40, 146, 254, 0.6);
  }
  a:last-child {
    background: none;
    border: 1px solid #ccc;
    color: #333;
  }
}
.logo {
  padding: 150px 0 80px;
  text-align: center;
  img{
      width: 211px;
  }
}
.formBox{
    width: 495px;
    margin: 0 auto;
    label{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 30px;
        font-size: 24px;
        img{ 
            width: 42px;
            margin-right: 40px;
        }
        p{
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e5e5;
            display: flex; 
            justify-content: space-between;
            align-items: center;
            width: 410px;
            input{
                flex: 1;
                font-size: 24px;
            }
            *{
                height: 48px;
            }
            a{
                border: 1px solid #e5e5e5;
                font-size: 16px;
                color: #a3a3a3;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                white-space: nowrap;
            }
        }
    }
}
.loginBtn{ width: 100%; color: #fff; font-size: 24px; display: flex; justify-content: center; align-items: center; background-color: #2892fe; border-radius: 10px; margin-bottom: 40px; height: 80px;}
.registerBtn{ font-size: 18px;color: #2892fe; padding: 5px 30px;}
</style>