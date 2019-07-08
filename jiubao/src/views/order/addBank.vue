<template>
  <div class="home">
    <headed :tit="'新建收货地址'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li class="selectBox">
                <input type="text" placeholder="选择银行" v-model="bank.acctname" @focus="onShowPopup">
            </li>
            <li class="selectBox">
                <input type="text" v-model="submitData.accttype" placeholder="卡类型" @focus="onShowPopupCard">
            </li>
            <li>
                <input type="text" v-model="submitData.linkName" placeholder="姓名">
            </li>
            <li>
                <input type="number" v-model="submitData.Phone" placeholder="手机号码">
            </li>
        </ul>
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
import { Indicator ,Popup ,Toast,Picker  } from 'mint-ui';
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
        isShowCard:false,
        popupVisible:false,
        banksList:[],
        bank:{
            Id:0,
            acctname:'',
            acctno:0
        },
        submitData:{
            accttype:'',
            districts:"",
            address:"",
            linkName:"",
            Phone:"",
            states:0,
            Id:0
        },
        cardList:[
            {
                accttype:'00',
                name:'储蓄卡'
            },
            {
                accttype:'02',
                name:'信用卡'
            }
        ]
    };
  },
  mounted() {
    this.init();
    this.id = this.$route.query.id;
    
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
        this.getBanksList();
        if(this.id){
            this.getBankInfo();
        }
        
    },
    getBanksList(){
        Api.getBanks().then(res=>{
            this.banksList = res.rows;
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
    getBankInfo(){
        Api.getBankInfo({Id:this.id}).then(res=>{
            this.submitData=res.rows
            this.submitData.bank={
                Id:res.rows.Id,
                acctname:res.rows.acctname,
                acctno:res.rows.acctno
            }
        })
    },
    save(){
        this.allChecked?this.submitData.states=1:this.submitData.states=0;
        let obj = this.submitData;
        let str=""
        for(let i in obj){
            if(i=='Id'||i=="states") {

            }else{
                console.log(i)
                if(obj[i]==""){
                    if(i=="districts"){
                        str = "请选择省市区"
                    }
                    if(i=="address"){
                        str = "请填写详细地址"
                    }
                    if(i=="linkName"){
                        str = "请填写收货人姓名"
                    }
                    if(i=="Phone"){
                        str = "请填写收货人联系电话"
                    }
                    Toast(str)
                    return;
                }
                if(i=="Phone"){
                    let reg = /1\d{10}/;
                    if(!reg.test(obj[i])){
                        Toast('收货人联系电话格式错误');
                        return;
                    }
                }
            };
        }
        Api.addAddress(obj).then(res=>{
            Toast(res.msg);
            if(res.code==1){
                setTimeout(()=>{
                    this.$router.go(-1)
                },1000)
            }
            // if(this.cartIds=="undefined"){
            //     this.$router.push({
            //         path:'/address',
            //         replace:true
            //     })
            // }else{
            //     this.$router.push({
            //         path:'/address?cartIds='+this.cartIds+'&invoiceId='+ this.invoiceId,
            //         replace:true
            //     })
            // }
            
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
            this.submitData.accttype = values[0].name;
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
            border-bottom: 1px solid #c1c1c1; padding: 10px;
            input{
                width: 100%; height: 50px; line-height: 50px; font-size: 24px;
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