<template>
  <div class="home">
    <div class="adBox">
      <mt-swipe v-if="adList.length>0" :auto="4000" continuous>
        <mt-swipe-item v-for="(item,index) in adList" :key="index">
          <img :src="item" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    
    <div class="detail" v-html="datas.contents"></div>
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
      datas: {},
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
      this.getDetail();
    },
    getDetail() {
      let questData = this.$route.query;
      console.log(questData)
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
  height: 640px;
}
</style>