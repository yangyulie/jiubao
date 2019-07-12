<template>
  <div class="home">
    <search></search>
    <div class="adBox">
      <mt-swipe v-if="adList.length>0" :auto="4000" continuous>
        <mt-swipe-item v-for="(item,index) in adList" :key="index">
          <router-link :to="item.urls">
            <img v-lazy="item.picurls" alt>
            <p>{{item.remarks}}</p>
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="classly">
      <li v-for="(item,index) in classList" :key="index">
        <router-link :to="item.urls">
          <img v-lazy="item.picurls" alt="">
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
    <div class="act">
      <dl>
        <dt class="tit">
          <div>活动酒水</div>
        </dt>
        <dd class="pro">
          <div class="list" v-for="(i,idx) in actList" :key="idx">
            <router-link :to="i.urls">
              <img class="proImg" v-lazy="i.picurls" alt>
            </router-link>
          </div>
        </dd>
      </dl>
    </div>
    <div class="brand">
      <dl>
        <dt class="tit">
          <div><img src="@/assets/imgs/icon_11.png" alt=""></div>
          <p>
            <router-link :to="i.urls" v-for="(i,idx) in brandListAd" :key="idx">
              <img v-lazy="i.picurls" alt>
            </router-link>
          </p>
        </dt>
        <dd class="pro">
          <div class="list" v-for="(i,idx) in brandList" :key="idx">
            <router-link :to="i.urls">
              <p class="name">{{i.name}}</p>
              <p class="remarks">{{i.remarks}}</p>
              <img class="proImg" v-lazy="i.picurls" alt>
            </router-link>
          </div>
        </dd>
      </dl>
    </div>
    <div class="recommend" v-if="recommendList.data&&recommendList.data.length>0">
      <dl>
        <dt class="tit">
          <div><router-link to="/class?typeId=0">{{recommendList.name}} <span></span> </router-link></div>
          <router-link :to="recommendList.urls">
            <img v-lazy="recommendList.urls" v-if="recommendList.urls!='#'" alt>
            <img src="@/assets/imgs/pic/pic_01.jpg" v-else alt>
          </router-link>
        </dt>
        <dd class="pro">
          <div class="list" v-for="(i,idx) in recommendList.data" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img class="proImg" v-lazy="i.purls" alt>
              <proTag :is_now="i.indexs" ></proTag>
              <p class="name">{{i.name}}</p>
              <div class="norms">
                <span>{{i.jhl}}x{{i.guige}}</span>
                <em v-if="i.chandi">{{i.chandi}}</em>
              </div>
              <div class="price">
                <span>￥{{i.price}}</span>
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
    <div class="proList" v-if="proList&&proList.length>0">
      <dl v-for="(item,index) in proList" :key="index" v-if="item.rows.length>0">
        <dt class="tit">
          <div><router-link :to="'/class?typeId='+item.typeId">{{item.typeName}} <span></span> </router-link></div>
          <router-link :to="'/class?typeId='+item.typeId"><img v-lazy="item.picurls" alt></router-link>
        </dt>
        <dd v-if="item.rows.length>0"  class="pro">
          <div class="list" v-for="(i,idx) in item.rows" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img class="proImg" v-lazy="i.purls" alt>
              <proTag :is_now="i.indexs" ></proTag>
              <p class="name">{{i.name}}</p>
              <div class="norms">
                <span>{{i.jhl}}x{{i.guige}}</span>
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
    <foot :is_now="0"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import foot from "@/components/foot.vue";
import search from "@/components/search.vue";
import proTag from "@/components/proTags.vue";
import { Indicator ,Toast } from 'mint-ui';
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
      classList:[],
      actList:[],
      brandList:[],
      brandListAd:[],
      adRecommend:[],
      token:'',
      addCarData:{
        Id:"",
        tcId:0,
        Number:1,
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
  methods: {
    init() {
      let storage=window.localStorage;
      this.token = storage.getItem("token");
      this.getIndex(); //获取商品列表
      this.getAd(); //获取顶部广告
      this.getRecommend(); //获取推荐商品
    },
    isLogin(){//判断是否登录
      
      if(!this.token){
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
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.addCarData.Id=e.target.getAttribute("data-id");
      this.addCarData.tcId = e.target.getAttribute("data-tcId");
      Api.addCarFn(this.addCarData).then(res=>{
        Indicator.close();
        Toast(res.msg)
        console.log(123,res)
      })
    },
    getIndex() {
      Api.index({ Number: 6 }).then(res => {
        this.proList = res.data;
      });
    },
    getAd() {
      Api.indexAd({ tid: 1 }).then(res => {//顶部轮播广告
        this.adList = res.data;
      });
      Api.indexAd({ tid: 2 }).then(res => {//分类导航
        this.classList = res.data;
      });
      Api.indexAd({ tid: 3 }).then(res => {//活动酒水
        this.actList = res.data;
      });
      Api.indexAd({ tid: 4 }).then(res => {//品牌馆广告
        this.brandListAd = res.data;
      });
      Api.indexAd({ tid: 5 }).then(res => {//品牌列表
        this.brandList = res.data;
      });
      Api.indexAd({ tid: 6 }).then(res => {//推荐广告
        this.adRecommend = res.data;
      });
    },
    getRecommend() {
      Api.recommend().then(res => {
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
.brand{
  padding: @padding;
  .tit{
    div::before{
        display: none;
      }
    div{
      img{
        width: 92px;
        margin-bottom: 0;
      }
    }
    p{
      .flex();
      justify-content: space-between;
      a{
        flex: 1;
      }
    }
  }
  .list{
    width: 25%;
    text-align: center;
    .name{
      height: auto; font-size: 24px; color: #313131;
    }
    .remarks{
      font-size: 18px;
      color: #f39128;
      margin-bottom: 25px;
    }
    .proImg{
      margin-bottom: 0px;
    }
  }
}
.act{
  padding: @padding;
  .list{ 
    width: 50%;
    border: 0;
    padding: 0;
    .proImg{
      width: 100%;
      margin: 0;
    }
  }
}
.classly{
  .flex();
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 30px 25px;
  li{
    .flex();
    justify-content: center;
    text-align: center;
    width: 20%;
    padding: 30px 10px 0;
    box-sizing: border-box;
    a{
      font-size: 22px;
      color: #232323;
      img{ width: 96px; margin-bottom: 10px;}
    }
  }
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
    a{
      .flex();
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #ff6600;
      span{
        border: 1px solid #ff6600;
        border-left: 0;
        border-bottom: 0;
        transform: rotate(45deg);
        width: 15px;
        height: 15px;
      }
    
    }
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
          color: @colorBlue;
          span{
            border-color: @colorBlue;
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