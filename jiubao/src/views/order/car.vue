<template>
  <div class="home">
    <headed :tit="'购物车'" :isShowRight="true" :isClose="false">
        <span @click="delate">删除</span>
    </headed>
    <div class="wrap secreenHei">
        <ul class="list">
            <li v-for="(item,index) in datas.rows" :key="index">
                <label :class="{show:item.checked}"><input type="checkbox" :value="item.Id" v-model="item.checked"></label>
                <img :src="item.picurls" alt="">
                <dl class="proInfoBox">
                    <dt>
                        {{item.name}}
                        <p>{{item.JHL}} x {{item.guige}}</p>
                    </dt>
                    <dd>
                        <span>￥{{item.price}}</span>
                        <div>
                            <span class="reduce"></span>
                            <input type="number" v-model="item.number">
                            <span class="add"></span>
                        </div>
                    </dd>
                </dl>
            </li>
        </ul>
        <div class="total"></div>
    </div>
    <foot :is_now="3"></foot>
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
      datas:{}
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
        let storage=window.localStorage;
        this.token = storage.getItem("token");
        this.getCarListFn()
    },
    delate(){},
    getCarListFn(){
        Api.getCarList().then(res=>{
            this.datas = res;
            console.log(111,res)
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
            display: flex; justify-content: flex-start; align-items: center;
            input[type="checkbox"]{
                border: 0; background: none; opacity: 0;
            }
        }
    }
    .total{
        background-color: #fff; border-top: 1px solid #c1c1c1; height: 85px;
    }
}
</style>