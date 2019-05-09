<template>
  <div class="home">
    <headed :tit="'商品清单'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap secreenHei">
        <ul class="list" v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
                <img :src="item.picurls" alt="">
                <dl class="proInfoBox">
                    <dt>
                        {{item.name}}
                        <p>{{item.JHL}} x {{item.guige}}</p>
                    </dt>
                    <dd>
                        <em>小计：</em>
                        <span>￥{{item.price}}</span>
                    </dd>
                </dl>
            </li>
        </ul>
        <div class="total">
          <div class="totalBox">
            总计：<span>{{total}}</span>
          </div>
        </div>
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
      datas:{},
      list:[],
      Id:""
    };
  },
  mounted() {
    this.init();
    this.Id = this.$route.query.Id
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
      this.getShoppingListFn()
    },
    getShoppingListFn(){
        Api.getShoppingList({
            Id:this.Id
        }).then(res=>{
          this.datas = res;
          if(res.code==1){
            this.list = res.rows;
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
.wrap{
    display: flex; flex-direction: column;
    .list{ 
        flex: 1; overflow-y: auto;
        li{
            display: flex; justify-content: flex-start; align-items: center; padding: 20px; border-bottom: 15px solid #f4f8ff;
            >img{
              width: 132px; margin: 0 20px 0 0;
            }
            .isChecked{ width: auto;}
            
        }
        li:last-child{
          border: 0;
        }
    }
    .total{
        background-color: #fff; border-top: 1px solid #c1c1c1; height: 85px; display: flex; justify-content: space-between; align-items: center; padding-left: 20px;
        button{
          width: 195px; height: 86px; background-color: #2892fe; color: #fff; font-size: 24px; text-align: center; line-height: 86px; border: 0;
        }
    }
    .isChecked{
       position: relative; display: flex; justify-content: flex-start; align-items: center; font-size: 24px; color: #6e6e6e; width: 148px;
      span{
        width: 32px; height: 32px; border-radius: 50%; border: 1px solid #ccc; overflow: hidden; display: block; margin-right: 20px;
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
    .totalBox{
      font-size: 18px; color: #6e6e6e; margin: 0 20px; flex: 1;
      span{
        color: #d81e06; font-size: 24px; font-weight: bold;
      }
      span:before{
        content: "￥"
      }
    }
    .notData{
      font-size: 30px; color: #6e6e6e; text-align: center;
      div{
        span{
          width: 216px; height: 216px; border-radius: 50%; display: flex; justify-content: center; align-items: center; background-color: #f4f8ff; margin: 180px auto 35px;
          img{
            width: 134px;
          }
        }
      }
      a{
        color: #2892fe; font-size: 24px; text-decoration: underline; margin-top: 25px; display: inline-block;
      }
    }
}
</style>