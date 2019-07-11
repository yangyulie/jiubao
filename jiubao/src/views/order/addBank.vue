<template>
  <div class="home">
    <headed :tit="'绑定银行卡'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li class="selectBox">
                <span>选择银行</span><input type="text" placeholder="选择银行" v-model="bank.acctname" @focus="onShowPopup">
            </li>
            <li class="selectBox">
                <span>选择卡类型</span><input type="text" v-model="banktype" placeholder="卡类型" @focus="onShowPopupCard">
            </li>
            <li>
                <span>银行卡号</span><input type="number" v-model="submitData.acctno" placeholder="请输入银行卡号">
            </li>
            <li v-if="submitData.accttype=='02'">
                <span>cvv2码</span><input type="number" v-model="submitData.cvv2" placeholder="请输入信用卡背后三位数">
            </li>
            <li v-if="submitData.accttype=='02'">
                <span>有效期</span><input type="text" v-model="submitData.validdate" placeholder="请输入有效期月/年">
            </li>
            <li>
                <span>证件号</span><input type="text" v-model="submitData.idno" placeholder="请输入身份证号">
            </li>
            <li>
                <span>户名</span><input type="text" v-model="submitData.acctname" placeholder="请输入银行开户名">
            </li>
            <li>
                <span>手机号码</span><input type="number" v-model="submitData.mobile" placeholder="请输入银行预留手机号码">
            </li>
        </ul>
    </div>
    <div class="pop" v-show="isShowPop" @click="closePop">
        <dl class="popInner">
            <dt>验证电话号码</dt>
            <dd>我们已将验证码发送至“{{submitData.mobile}}”,请输入验证码进行验证，验证码{{endTime}}秒内有效。</dd>
            <dd class="testCode">验证码：<input @click.stop type="number" v-model="testCode"></dd>
            <dd class="btns">
                <span @click.stop="testCodeFn">确认</span>
            </dd>
        </dl>
    </div>
    <mt-popup
        v-model="popupVisible"
        position="bottom">
        <mt-picker  :slots="slots" @change="onDistricts" :itemHeight="70" value-key="acctname" showToolbar>
            <div class="picker-toolbar-title">
                <div class="usi-btn-cancel" @click="cancle">取消</div>
                <div class="usi-btn-sure" @click="sure">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
    <mt-popup
        v-model="isShowCard"
        position="bottom">
        <mt-picker  :slots="cardSlots" @change="onCard" :itemHeight="70" value-key="name" showToolbar>
            <div class="picker-toolbar-title">
                <div class="usi-btn-cancel" @click="cancleCard">取消</div>
                <div class="usi-btn-sure" @click="cancleCard">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
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
        slots:[
            {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
            }
        ],
        cardSlots:[
            {
            flex: 1,
            values: [],
            className: 'slot2',
            textAlign: 'center'
            }
        ],
        testCode:'',
        isShowCard:false,
        popupVisible:false,
        banksList:[],
        payInfo:{},
        bank:{
            Id:0,
            acctname:'',
            acctno:0
        },
        banktype:'',
        submitData:{
            acctcode:'',
            accttype:'',
            acctno:"",
            cvv2:"",
            validdate:"",
            mobile:"",
            idno:'',
            acctname:''
        },
        endTime:120,
        timer:null,
        cardList:[
            {
                accttype:'00',
                name:'储蓄卡'
            },
            {
                accttype:'02',
                name:'信用卡'
            }
        ],
        isShowPop:false
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
        this.getBanks();
    },
    closePop(){
        this.isShowPop = false;
    },
    testCodeFn(){//提交绑定银行卡验证
        Indicator.open();
        let questData={
            codes:this.testCode,
            orderNumber:this.payInfo.orderNumber,
            payId:this.payInfo.payId
        }
        Api.setBindBankSubmit(questData).then(res=>{
            Indicator.close();
            if(res.code==1){
                // Toast(res.msg)
                if(res.row==0){
                    MessageBox({
                        title: '提示',
                        message: '您还没有设置支付密码，是否立即设置?',
                        showCancelButton: true,
                        confirmButtonText:"立即设置",
                        cancelButtonText:"稍候设置"
                    }).then(res=>{
                        this.$router.replace({
                            path:'/setPassword?type=1'
                        })
                    }).catch(res=>{
                        this.$router.go(-1)
                    })
                }else{
                    this.$router.go(-1)
                }
            }else{
                Toast(res.msg)
            }
        })
    },
    getBanks(){
        Api.getBanks().then(res=>{
            this.banksList=res.rows
        })
    },
    onShowPopup() {
        this.sure();
        this.slots[0].values = this.banksList;
    },
    onShowPopupCard(){
        this.cancleCard();
        this.cardSlots[0].values = this.cardList;
    },
    save(){
        let obj = this.submitData;
        let str=""
        for(let i in obj){
            if(obj[i]==""){
                
                if(i=="cvv2"&&this.submitData.accttype=='02'){
                    str = "请填写信用卡背后三位数"
                    Toast(str)
                    return;
                }
                if(i=="validdate"&&this.submitData.accttype=='02'){
                    str = "请输入信用卡有效期"
                    Toast(str)
                    return;
                }
                
                if(i=="acctcode"){
                    str = "请选择银行"
                    Toast(str)
                    return;
                }
                if(i=="accttype"){
                    str = "请选择银行卡类型"
                    Toast(str)
                    return;
                }
                if(i=="acctno"){
                    str = "请填写银行卡卡号"
                    Toast(str)
                    return;
                }
                if(i=="idno"){
                    str = "请填写证件号码"
                    Toast(str)
                    return;
                }
                if(i=="acctname"){
                    str = "请填写开户名称"
                    Toast(str)
                    return;
                }
                if(i=="mobile"){
                    str = "请填写银行预留手机号码"
                    Toast(str)
                    return;
                }
                
            }
            if(i=="mobile"){
                let reg = /1\d{10}/;
                if(!reg.test(obj[i])){
                    Toast('收货人联系电话格式错误');
                    return;
                }
            }
        }
        Indicator.open();
        clearInterval(this.timer);
        this.endTime = 120;
        Api.addBank(obj).then(res=>{
            Indicator.close();
            if(res.code==1){
                this.isShowPop = true;
                this.payInfo = res.row;
                this.timer=setInterval(()=>{
                    this.endTime = this.endTime-1;
                    if(this.endTime<=0){
                        clearInterval(this.timer)
                        this.closePop();
                    }
                },1000)
            }else{
                Toast(res.msg);
            }
            
            
        })
    },
    sure(){
        this.popupVisible = !this.popupVisible
    },
    cancleCard(){
        this.isShowCard = !this.isShowCard
    },
    cancle(){
        this.sure();
    },
    onDistricts(picker, values){
        if(!!values[0]){
            picker.setSlotValues(values[0]);
            this.bank = values[0];
            this.submitData.acctcode = values[0].acctno;
        }
    },
    onCard(picker,values){
        if(!!values[0]){
            picker.setSlotValues(values[0]);
            this.card = values[0];
            this.submitData.accttype = values[0].accttype;
            this.banktype = values[0].name;
            if(values[0].accttype=='00'){
                this.submitData.cvv2="";
                this.submitData.validdate="";
            }
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
.pop{
    position: fixed; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: flex-start; align-items: flex-end; top: 0; left: 0; width: 100%; height: 100%;
    .popInner{
        background-color: #fff; padding: 35px 30px 280px; color: #929292; font-size: 24px; line-height: 36px;
        dt{
            color: #313131; line-height: 26px; margin-bottom: 35px;
        }
        .testCode{
            padding-top: 70px; display: flex; justify-content: center; align-items: center; font-size: 30px; color: #2892fe;
            input{
                border: 1px solid #2892fe; height: 56px; width: 162px; margin-left: 20px; font-size: 26px; text-indent: 1em; color: #2892fe;
            }
        }
        .btns{
            display: flex; justify-content: flex-end; align-items: center; padding-top: 120px;
            span{
                background-color: #dcdcdc; height: 71px; border-radius: 10px; color: #fff; margin-right: 10px; width: 201px; display: flex; justify-content: center; align-items: center;
            }
            span:last-child{
                background-color: #2892fe;
            }
        }
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