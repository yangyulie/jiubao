<template>
  <div class="home">
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
          <img :src="recommendList.urls" alt>
        </dt>
        <dd>
          <div v-for="(i,idx) in recommendList.data" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img :src="i.purls" alt>
              <p>{{i.name}}</p>
            </router-link>
          </div>
        </dd>
      </dl>
    </div>
    <div class="proList" v-if="proList.length>0">
      <dl v-for="(item,index) in proList" :key="index" v-if="item.rows.length>0">
        <dt>
          <div>{{item.typeName}}</div>
          <img :src="item.picurls" alt>
        </dt>
        <dd v-if="item.rows.length>0">
          <div v-for="(i,idx) in item.rows" :key="idx">
            <router-link :to="'/detail?id='+i.Id">
              <img :src="i.purls" alt>
              <p>{{i.name}}</p>
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
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot
  },
  data() {
    return {
      recommendList: {},
      proList: [],
      adList: []
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
@padding:0 20px;
@fontSize_tit:24px;
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
  div{
    .flex();
    justify-content: flex-start;
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
</style>