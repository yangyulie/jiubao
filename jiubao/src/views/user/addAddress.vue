<template>
  <div class="home">
    <headed :tit="'新建收货地址'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li>
                <input type="text" v-model="submitData.districts" placeholder="省份、城市、区县" @focus="showPopup">
            </li>
            <li>
                <input type="text" v-model="submitData.address" placeholder="详细地址，如街道、楼牌号等">
            </li>
            <li>
                <input type="text" v-model="submitData.linkName" placeholder="姓名">
            </li>
            <li>
                <input type="number" v-model="submitData.Phone" placeholder="手机号码">
            </li>
        </ul>
        <label :class="{show:allChecked}" class="isChecked"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" v-model="allChecked">设为默认地址</label>
    </div>
    <mt-popup
    v-model="popupVisible"
    position="bottom">
        <mt-picker  :slots="districtsData" @change="onDistricts" :itemHeight="60" value-key="name" showToolbar>
            <div class="picker-toolbar-title">
                <div class="usi-btn-cancel" @click="cancle">取消</div>
                <div class="usi-btn-sure" @click="sure">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import districts from "@/assets/districts.json";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
import { setTimeout } from 'timers';
export default {
  components: {
    headed,
  },
  data() {
    return {
      popupVisible:false,
      districtsData:[
        {
            flex: 1,
            defaultIndex: 0,
            values:[],
            className: 'slot1',
            textAlign: 'center',
        }, {
            pider: true,
            content: '-',
            // className: 'slot2'
        }, {
            flex: 1,
            values:[],
            className: 'slot3',
            textAlign: 'center'
        }, {
            pider: true,
            content: '-',
            // className: 'slot4'
        }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
        }
      ],
      submitData:{
          districts:"",
          address:"",
          linkName:"",
          Phone:"",
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
    this.invoiceId = this.$route.query.invoiceId;
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
    cancle(){
        this.sure();
        this.submitData.districts = ''
    },
    showPopup(){
        this.sure();
        this.districtsData[0].values = districts
        this.districtsData[2].values = districts[0].child
        this.districtsData[4].values = districts[2].child;
    },
    onDistricts(picker, values){
        if(!!values[0]){
            picker.setSlotValues(2, values[0].child);
            picker.setSlotValues(4, values[2].child);
            this.submitData.districts = values[0].name+values[2].name+values[4].name
        }
    }
    
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