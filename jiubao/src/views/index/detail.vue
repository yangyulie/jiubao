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
    
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    
  },
  data() {
    return {
      list: [1, 2, 3],
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
      this.getIndex();
      this.getAd();
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
    }
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
  }
};
</script>
<style lang='less' scoped>
.adBox {
  height: 355px;
}
</style>