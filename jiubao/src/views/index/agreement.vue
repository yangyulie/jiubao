<template>
  <div class="home fullHei">
    <headed :tit="'用户协议'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="agreementBox">
        <div v-html="datas"></div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import headed from "@/components/headed.vue";
import { Toast,Checklist  } from 'mint-ui';
import { mapActions, mapState } from "vuex";
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
  components: {
    headed
  },
  data() {
    return {
      datas:""
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
      this.getAgreement();
    },
    getAgreement(){
        Api.getAgreement().then(res=>{
            if(res.code==1){
                this.datas = res.data
            }else{
                Toast(res.msg);
                setTimeout(()=>{
                    this.$router.go(-1);
                },2000)
            }
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
.agreementBox{
    padding: 25px;
}
</style>
<style>
.agreementBox p{
    font-size: 1.5em; line-height: 34px;
}
</style>
