<template>
  <div class="home">
    <headed :tit="'商品收藏'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <img :src="item.picUrl" alt="">
                <dl>
                    <dt>{{item.name}}</dt>
                    <dd class="delCollect">
                        <span @click="handleCollectFn(item.pid)">取消收藏</span>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
    <foot :is_now="4"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import ApiOrder from "@/api/order.js";
import headed from "@/components/headed.vue";
import foot from "@/components/foot.vue";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
    foot
  },
  data() {
    return {
        list:[],
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
        this.getCollectFn();
    },
    getCollectFn(){
        Api.getCollect().then(res=>{
            this.list = res.rows;
            console.log(123,res)
        })
    },
    handleCollectFn(id){//添加或取消收藏
      let questData={
        Id:id,
        states:0
      }
      ApiOrder.handleCollect(questData).then(res=>{
        Toast(res.msg)
        if(res.code==0){
          this.init()
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
        font-size: 24px;
        li{
            padding: 25px; display: flex; justify-content: flex-start; border-bottom: @bor;
            img{
                width: 136px; margin-right: 20px; height: 136px;
            }
            dl{
                flex: 1; display: flex; flex-direction: column; justify-content: space-between;
                .delCollect{
                    align-self: flex-end;
                    span{
                        width: 110px; height: 49px; border: 1px solid #929292; display: flex; justify-content: center; align-items: center; color: #929292;
                    }
                }
            }
        }
        li:last-child{
            border-bottom: 0;
        }
    }
}

</style>