<template>
  <div class="home">
    <headed :tit="'订单日志'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <dl>
                    <dt>
                        <strong>{{item.actName}}</strong>
                        <p>{{item.Remarks}}</p>
                    </dt>
                    <dd>
                        <div>
                            <p>{{item.actUser}}</p>
                        </div>
                        <p>{{item.addtime}}</p>
                        
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
    <foot :is_now="2"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/order.js";
import foot from "@/components/foot.vue";
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
      id:0,
      list:[]
    };
  },
  mounted() {
    this.id = this.$route.query.id
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
      this.getOrderLogFn();
    },
    getOrderLogFn(){
    console.log(this.id)
        Api.getOrderLog({Id:this.id}).then(res=>{
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
            border-bottom: @bor; padding: 30px 15px; font-size: 22px; color: #313131;
            dt{
                border-bottom: 1px solid #c1c1c1; padding-bottom: 10px;
                strong{
                    color: #e6593b; height: 26px; line-height: 26px;font-size: 22px;
                }
                p{
                    margin-top: 5px;
                }
            }
            dd{
                display: flex; justify-content: space-between; align-items: center; padding-top: 20px;
                div{
                    p{
                        padding-bottom: 8px;
                    }
                }
                >p{
                    text-align: right;
                }
            }
        }
    }
}
</style>