<template>
  <div class="home">
    <headed :tit="'新增商户绑定'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li>
                <div>
                    ＊手机号码：<input type="number" v-model="phone" placeholder="请输入绑定手机号码">
                </div>
                <p>注：绑定手机号，须在酒堡519注册会员</p>
            </li>
        </ul>
        <button class="addShoperBind" @click="addShoperBind">确定</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      phone:""
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
      
    },
    
    addShoperBind(){//新增绑定商户手机号
        let reg = /1\d{10}/;
        if(!reg.test(this.phone)){
            Toast("手机号格式有误")
            return false;
        }
        Api.addShoperBind({phone:this.phone}).then(res=>{
            Toast(res.msg)
            if(res.code==1){
                this.$router.push({
                    path: '/shoperBind'
                });
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
@bor:15px solid #f4f8ff;
.wrap{
    .lists{
        font-size: 24px; color: #313131;
        li{
            margin-top: 4px; padding: 26px 18px 0 10px; border-bottom: @bor;
            div{
                display: flex; justify-content: space-between; align-items: center; padding: 0 16px 20px 12px; border-bottom: 1px solid #c1c1c1;
                input{
                    flex: 1; height: 30px; font-size: 24px;
                }
            }
            p{
                color: #ff6600; font-size: 18px; text-align: right; line-height: 80px;
            }
        }
    }
    .addShoperBind{
      width: 582px; height: 72px; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 24px; background-color: #2892fe; border-radius: 10px; margin: 70px auto; outline: none;
    }
}

</style>