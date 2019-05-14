<template>
  <div class="home">
    <headed :tit="'代理下单'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <span class="tag">{{item.Settlement}}</span>
                <div>
                    <p>{{item.companyName}}</p>
                    <span>x {{item.countS}}</span>
                </div>
                <em @click="goSetOrder(item.Id)">查看购物车</em>
            </li>
        </ul>
    </div>
    <foot :is_now="0"></foot>
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
      list:[]
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
      this.getMyCarListFn();
    },
    goSetOrder(id){
        this.$router.push({
          path:"/myCar?cId="+id
        })
    },
    getMyCarListFn(){
        Api.getMyCarList().then(res=>{
            this.list = res.rows
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
        li{
            border-bottom: @bor; padding: 30px 15px; font-size: 18px; color: #313131; display: flex; justify-content: space-between;
            >span{
                font-size: 18px; color: #ff6600; border: 1px solid #ff6600; height: 40px; line-height: 40px; border-radius: 20px; padding: 0 20px;
            }
            div{
                flex: 1; margin: 0 30px; font-size: 24px; color: #313131;
                span{
                    font-size: 20px; color: #929292;
                }
            }
            >em{
                font-style: normal; border: 1px solid #929292; color: #929292; font-size: 20px; width: 110px; height: 48px; text-align: center; line-height: 48px; align-self: flex-end;
            }
        }
    }
}
</style>