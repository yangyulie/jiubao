<template>
  <div class="home">
    <headed :tit="'购买历史'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <div class="proList" v-if="list&&list.length>0">
            <dl v-if="list.length>0">
                <dd v-if="list.length>0"  class="pro">
                    <div class="list" v-for="(i,idx) in list" :key="idx">
                        <router-link :to="'/detail?id='+i.Id">
                            <img class="proImg" :src="i.picUrl" alt>
                            <proTag :is_now="i.indexs" ></proTag>
                            <p class="name">{{i.name}}</p>
                            <div class="norms">
                                <!-- <span>{{i.jhl}}x{{i.guige}}</span> -->
                                <em v-if="i.chandi">{{i.chandi}}</em>
                            </div>
                            <div class="price">
                                <span>￥{{i.price}}</span>
                                <p>
                                <em v-if="i.DisCount*1">满赠</em>
                                <a href="javascript:;"><img @click.stop="addCar" :data-id="i.Id" :data-tcId="i.tcId?i.tcId:0" src="@/assets/imgs/icon_10.png" alt=""></a>
                                </p>
                                
                            </div>
                        </router-link>
                    </div>
                </dd>
            </dl>
            </div>
    </div>
    <foot :is_now="4"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import ApiIndex from "@/api/index.js";
import headed from "@/components/headed.vue";
import foot from "@/components/foot.vue";
import proTag from "@/components/proTags.vue";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
    foot,
    proTag
  },
  data() {
    return {
        list:[],
        addCarData:{
            Id:0,
            tcId:0,
            Number:1
        }
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
        this.getBuyShopListFn();
    },
    getBuyShopListFn(){
        Api.getBuyShopList().then(res=>{
            this.list = res.rows;
            console.log(123,res)
        })
    },
    addCar(e){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.addCarData.Id=e.target.getAttribute("data-id");
      this.addCarData.tcId = e.target.getAttribute("data-tcId");
      ApiIndex.addCarFn(this.addCarData).then(res=>{
        Indicator.close();
        Toast(res.msg)
        console.log(123,res)
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
@padding:20px;
@fontSize_tit:24px;
@border:1px solid #e1e1e1;
@colorBlue:#2892fe;
.flex{
  display: flex;
  align-items: center;
}
.pro{ 
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.list{
  width: 198px;
  border: @border;
  position: relative;
  padding: 13px;
  .proImg{
    margin-bottom: 20px;
    width: 100%;
  }
  .name{
    font-size: 18px;
    color: #313131;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 30px;
    height: 60px;
  }
  .norms{
    .flex();
    justify-content: space-between;
    font-size: 14px;
    color: #929292;
    padding-bottom: 15px;
    em{ border: 1px solid #d81e06; height: 20px; line-height: 18px; border-radius: 10px; color: #d81e06; padding: 0 15px; font-style: normal;}
  }
  .price{
    .flex();
    justify-content: space-between;
    font-size: 20px;
    color: #d81e06;

  }
}
.wrap{
    .proList{ 
  background-color: #f4f8ff; 
  padding: @padding;
  dl{
    margin-bottom: 20px;
    .tit{
      
      div{
        a{
          .flex();
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          color: @colorBlue;
          span{
            border: 1px solid @colorBlue;
            border-left: 0;
            border-bottom: 0;
            transform: rotate(45deg);
            width: 15px;
            height: 15px;
          }
        
        }
      }
      div::before{
        background-color: @colorBlue;
      }
    }
    .list{
      background-color: #fff;
      border-radius: 10px;
      border: 0; margin-right: 9px;
      margin-bottom: 10px;
      width: 295px;
    }
    .list:nth-child(2n){
      margin-right: 0;
    }
  }
}
}

</style>