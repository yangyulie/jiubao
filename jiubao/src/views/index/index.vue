<template>
  <div class="home">1
    <search></search>
    <div class="adBox">
      <mt-swipe v-if="adList.length>0" :auto="4000" continuous>
        <mt-swipe-item v-for="(item,index) in adList" :key="index">
          <router-link :to="item.urls">
            <img :src="item.picurls" alt>
            <p>{{item.remarks}}</p>
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="recommend" v-if="recommendList.data&&recommendList.data.length>0">
      <dl>
        <dt class="tit">
          <div>{{recommendList.name}}</div>
          <img :src="recommendList.urls" v-if="recommendList.urls!='#'" alt>
          <img src="@/assets/imgs/pic/pic_01.jpg" v-else alt>
        </dt>
        <dd class="pro">
          <div class="list" v-for="(i,idx) in recommendList.data" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img class="proImg" :src="i.purls" alt>
              <proTag :is_now="i.indexs" ></proTag>
              <p class="name">{{i.name}}</p>
              <div class="norms">
                <span>{{i.jhl}}x{{i.guige}}</span>
                <em>{{i.chandi}}</em>
              </div>
              <div class="price">
                <span>{{i.price}}</span>
                <p>
                  <em v-if="i.DisCount*1">满赠</em>
                  <a href="javascript:;"><img @click.stop="addCar($event)" :data-id="i.Id" :data-tcId="i.tcId?i.tcId:0" src="@/assets/imgs/icon_10.png" alt=""></a>
                </p>
                
              </div>
            </router-link>
          </div>
        </dd>
      </dl>
    </div>
    <div class="proList" v-if="proList.length>0">
      <dl v-for="(item,index) in proList" :key="index" v-if="item.rows.length>0">
        <dt class="tit">
          <div><router-link :to="'/class'">{{item.typeName}} <span></span> </router-link></div>
          <img :src="item.picurls" alt>
        </dt>
        <dd v-if="item.rows.length>0"  class="pro">
          <div class="list" v-for="(i,idx) in item.rows" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img class="proImg" :src="i.purls" alt>
              <proTag :is_now="i.indexs" ></proTag>
              <p class="name">{{i.name}}</p>
              <div class="norms">
                <span>{{i.jhl}}x{{i.guige}}</span>
                <em>{{i.chandi}}</em>
              </div>
              <div class="price">
                <span>{{i.price}}</span>
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
    <foot :is_now="0"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import foot from "@/components/foot.vue";
import search from "@/components/search.vue";
import proTag from "@/components/proTags.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
    proTag,
    search
  },
  data() {
    return {
      recommendList: {},
      proList: [],
      adList: [],
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
      this.getIndex(); //获取商品列表
      this.getAd(); //获取顶部广告
      this.getRecommend(); //获取推荐商品
    },
    closeToast(){//关闭已有提示层
        if (this.toastObj) this.toastObj.close();
    },
    goSearch(){
      let shearchText = this.shearchText;
      if(shearchText==""){
        this.closeToast()
        this.toastObj = Toast('手机号格式错误');
      }else{
        console.log(shearchText)
      }

    },
    isLogin(){//判断是否登录
      let storage=window.localStorage;
      let token = storage.getItem("token");
      if(!token){
        this.$router.push({
          path: '/login'
        });
        return false;
      }else{
        return true;
      }
    },
    addCar(e){
      let isLogin = this.isLogin();
      if(!isLogin) return;
      let id=e.target.getAttribute("data-id");
      let tcId = e.target.getAttribute("data-tcId");
      console.log(id,tcId)
    },
    getIndex() {
      Api.index({ Number: 6 }).then(res => {
        this.proList = res.data;
      });
    },
    getAd() {
      Api.indexAd({ tid: 1 }).then(res => {
        this.adList = res.data;
      });
    },
    getRecommend() {
      Api.recommend({ token: "" }).then(res => {
        this.recommendList = res;
      });
    }
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
  }
};
</script>
<style lang='less' scoped>
@padding:20px;
@fontSize_tit:24px;
@border:1px solid #e1e1e1;
@colorBlue:#2892fe;

.flex{
  display: flex;
  align-items: center;
}

.adBox {
  height: 355px;
}
.recommend{ padding: @padding;}
.tit{
  font-size: @fontSize_tit;
  color: #ff6600;
  img{ width: 100%; margin-bottom: 15px;}
  div{
    .flex();
    justify-content: flex-start;
    padding-bottom: 25px;
  }
  div::before{
    content: '';
    width: 6px;
    height: 27px;
    border-radius: 3px;
    background-color: #ff6600;
    margin-right: 15px;
  }
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
    width: 172px;
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
    font-size: 16px;
    color: #d81e06;

  }
}
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
      width: 193px;
    }
    .list:nth-child(3n){
      margin-right: 0;
    }
  }
}
</style>