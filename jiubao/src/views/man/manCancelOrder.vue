<template>
  <div class="home" v-if="datas.code==1">
    <headed :tit="datas.rows.stName" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <dl class="list">
            <dd>支付方式：{{datas.rows.payName}}</dd>
            <dt>备注*：</dt>
            <dd class="payMode">
                <textarea name="" v-model="value" placeholder="请填写备注" id="" cols="30" rows="10"></textarea>
            </dd>
        </dl>
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
import { Indicator ,Toast } from 'mint-ui';
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
    submitPay(){
        // if(!this.value){
        //     Toast("请填写备注")
        //     return;
        // }
        let questData=this.questData;
        questData["Remarks"] = this.value;
        Api.submitOrderStatus(questData).then(res=>{
            Toast(res.msg)
            if(res.code==1){
                this.$router.push({
                    path:'/man'
                })
            }
            
            console.log(345,res)
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
}
</style>