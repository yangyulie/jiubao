<template>
  <div class="home" v-if="datas.code==1">
    <headed :tit="datas.rows.stName" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <div class="msg" v-if="datas.rows.usermsgList">
            <h2>业务员审核留言</h2>
            <ul>
                <li><span>业务员</span>： {{datas.rows.usermsgList.userId}}</li>
                <li><span>留言内容</span>： {{datas.rows.usermsgList.mmessage}}</li>
                <li><span>留言时间</span>： {{datas.rows.usermsgList.addtime}}</li>
            </ul>
        </div>
        <dl class="list">
            <dd>支付方式：{{datas.rows.payName}}</dd>
            <dt>备注*：</dt>
            <dd class="payMode">
                <textarea name="" v-model="value" placeholder="请填写备注" id="" cols="30" rows="10"></textarea>
            </dd>
        </dl>
        <p class="red tipsRed" v-if="datas.rows.confirmStr.length>0">注意：{{datas.rows.confirmStr}}</p>
        <div class="submitBox">
            <button @click="submitPay">提交</button>
        </div>
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import foot from "@/components/footMan.vue";
import headed from "@/components/headed.vue";
import { Indicator ,Toast,MessageBox } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
    headed
  },
  data() {
    return {
      datas:{},
      Id:0,
      value:"",
      questData:{}
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
      this.Id = this.$route.query.id;
      this.questData = this.$route.query;
      this.getPayFn()
    },
    getPayFn(){
        Api.cancelOrder(this.questData).then(res=>{
          this.datas = res;
          console.log(1234,res)
          if(res.code==1){
            this.datas = res;
          }
        })
    },
    submitFn(questData){
      Api.submitOrderStatus(questData).then(res=>{
        Toast(res.msg)
        if(res.code==1){
          this.$router.push({
              path:'/man'
          })
        }else{
          //Toast(res.msg)
        }
        
        console.log(345,res)
      })
    },
    submitPay(){
        // if(!this.value){
        //     Toast("请填写备注")
        //     return;
        // }
        let questData=this.questData;
        questData["Remarks"] = this.value;
        let str = this.datas.rows.confirmStr;
        if(str.length>0){
          MessageBox.confirm(str).then(res=>{
            this.submitFn(questData)
          }).catch(res=>{})
        }else{
          this.submitFn(questData)
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
@bor:10px solid #f4f8ff;
.wrap{
  .msg{
    padding: 25px; border-bottom: @bor;
    h2{
        margin-bottom: 15px;
    }
    textarea{
        border: 1px solid #ccc; outline: none; resize: none; width: 100%; padding: 10px; font-size: 20px; height: 100px;
    }
    ul{
        font-size: 20px;
        li{
            display: flex; justify-content: flex-start; align-items: center; line-height: 36px;
            span{
                width: 80px;
            }
        }
    }
  }
    .list{
        border-bottom: @bor; padding: 25px;
        dt{
            font-size: 24px; color: #313131; padding: 15px; line-height: 24px; border-bottom: 1px solid #929292;
        }
        dd{
            padding: 15px; font-size: 24px;
        }
    }
    .isChecked{
        width: 210px;
    }
    .payTotal{
        text-align: right; padding: 25px 50px 0 0; font-size: 24px; color: #313131;
    }
    textarea{
        width: 100%; height: 150px; padding: 10px; font-size: 24px; border: 1px solid #929292; outline: none; resize: none;
    }
    .submitBox{
        margin-top: 100px;
    }
    .tipsRed{
      padding: 15px 25px; font-size: 24px;
    }
    .red{
      color: #f00;
    }
}
</style>