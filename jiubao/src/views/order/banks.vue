<template>
  <div class="home">
    <headed :tit="'银行卡'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul v-if="banksList&&banksList.length>0">
            <li v-for="(item,index) in banksList" :key="index">
                <dl>
                    <dt>
                        <img v-if="item.picurls" :src="item.picurls" alt="">
                        <img v-else src="@/assets/imgs/icon_47.png" alt="">
                    </dt>
                    <dd>
                        <strong>{{item.acctcode}}</strong>
                        <p>
                            <span>{{item.accttype}}</span>
                            <span>{{item.acctno}}</span>
                        </p>
                    </dd>
                </dl>
                <div class="btns">
                    <span @click.stop="tipsUsed(item.Id,item.acctno)" v-if="id!=0">使用</span>
                    <!-- <span @click="goBindBank(item.Id)">编辑</span> -->
                    <span @click.stop="deleteBank(item.Id)">删除</span>
                </div>
            </li>
            <li class="addBankBtn" @click="goBindBank('')">添加银行卡</li>
        </ul>
        <div v-else class="notData">
            <img src="@/assets/imgs/icon_48.png" alt="">
            <p>还没有绑定银行卡</p>
            <span @click="goBindBank('')">马上去绑定</span>
        </div>
        <div class="pop" v-show="isShowPop" @click="closePop">
            <dl class="popInner">
                <dt>验证支付密码</dt>
                <dd>请输入支付密码</dd>
                <dd class="testCode">支付密码：<input @click.stop type="password" v-model="testCode"></dd>
                <dd class="btns">
                    <span>换卡</span>
                    <span @click.stop="testCodeFn">确认</span>
                </dd>
            </dl>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast,MessageBox } from 'mint-ui';
import { mapActions, mapState } from "vuex";
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
  components: {
    headed
  },
  data() {
    return {
      id:0,
      banksList:[],
      payInfo:{},
      payId:'',
      testCode:'',
      endTime:300,
      timer:null,
      totalPrice:0,
      isShowPop:false,
      payPassword:''
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
      this.id = this.$route.query.id?this.$route.query.id:0;
      this.totalPrice = this.$route.query.totalPrice;
      this.typeId = this.$route.query.typeId;
      this.getMyBanks();
    },
    goBindBank(id){//绑定银行卡
        this.$router.push({
            path:"/addBank?id="+id
        })
    },
    testCodeFn(){//提交银行卡支付验证
        Indicator.open();
        let questData={
            pwd:this.testCode,
            orderId:this.id,
            payId:this.payId,
            typeId:this.typeId||""
        }
        if(this.testCode==''){
            Toast("请输入支付密码");
            return;
        }
        Api.getMyBankPay(questData).then(res=>{
            Indicator.close();
            if(res.code==1){
                // Toast(res.msg)
                setTimeout(()=>{
                    let url = this.typeId ? this.typeId:'A01'
                    this.$router.replace({
                        path:'/paySuc?orderId='+this.id+'&typeId='+url
                    })
                },2000)
            }else{
                Toast(res.msg)
            }
        })
    },
    closePop(){
        this.isShowPop = false;
    },
    tipsUsed(id,num){
        this.payId = id
        if(this.payPassword==0){
            MessageBox.confirm("尚未设置支付密码，请设置支付密码").then(res=>{
                this.$router.push({
                    path:'/setPassword?type=1'
                })
            }).catch(res=>{})
            return;
        }
        let len = num.length-4
        let _num = num.substr(len,4)
        let msg = "确定使用银行卡尾号"+_num+"支付"+this.totalPrice+"元？";
        if(this.totalPrice>5000){
            Toast("支付金额超出银行卡上限")
            return;
        }
        MessageBox.confirm(msg).then(res=>{
            //this.used(id)
            this.isShowPop = true;
        }).catch(res=>{})
    },
    used(id){//使用银行卡
        
        Indicator.open();
        let questData={
            orderId:this.id,
            payId:id,
            pwd:this.testCode
        }
        
        Api.getMyBankPay(questData).then(res=>{
            console.log(res)
            Indicator.close();
            if(res.rows.codes=="提交成功"){
                this.closePop();
            }else{
                Toast(res.rows.codes)
            }
        })
    },
    deleteBank(id){//删除银行卡
        MessageBox.confirm("是否确定解除绑定此银行卡？").then(res=>{
            Api.delBank({Id:id}).then(res=>{
                Toast(res.msg)
                this.init()
            })
        }).catch(res=>{})
    },
    getMyBanks(){
        Api.getMyBanks().then(res=>{
            this.banksList = res.rows;
            this.payPassword=res.usm
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
.wrap{
    padding: 35px 20px 0;
    ul{
        li{
            margin-bottom: 20px; background-color: #54636a; border-radius: 10px; color: #fff; font-size: 24px; overflow: hidden;
            dl{
                padding: 30px 30px 20px; display: flex; justify-content: flex-start; align-items: center;
                dt{
                    width: 68px; height: 68px; border-radius: 50%; display: flex; justify-content: center; align-items: center; overflow: hidden; background-color: #fff; margin-right: 30px;
                    img{
                        width: 100%;
                    }
                }
                dd{
                    flex: 1;
                    strong{
                        font-size: 30px;
                    }
                    p{
                        display: flex; justify-content: space-between; align-items: center; line-height: 48px;
                    }
                }
            }
            .btns{
                background-color: #889297; height: 65px; display: flex; justify-content: flex-end; align-items: center; padding-right: 30px;
                span{
                    margin-left: 20px; padding: 0 10px;
                }
            }
        }
        .addBankBtn{
            margin: 50px 0; height: 72px; background-color: #2892fe; color: #fff; display: flex; justify-content: center; align-items: center;
        }
        .addBankBtn:before{
            content: '+'; font-size: 30px; margin-right: 20px;
        }
    }
}
.pop{
    position: fixed; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: flex-start; align-items: flex-end; top: 0; left: 0; width: 100%; height: 100%;
    .popInner{
        background-color: #fff; padding: 35px 30px 280px; color: #929292; font-size: 24px; line-height: 36px; width: 100%;
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
.notData{
    padding: 180px 30px 0; text-align: center; font-size: 30px; color: #6e6e6e;
    img{
        width: 216px;
    }
    p{
        margin: 35px 0;
    }
    span{
        color: #2892fe; font-size: 24px;
    }
}
</style>