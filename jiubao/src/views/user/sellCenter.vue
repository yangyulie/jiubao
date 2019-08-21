<template>
  <div class="home">
    <headed :tit="'优惠券礼包'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
      <div v-if="list&&list.length>0">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <img :src="item.picUrls" alt="">
            <div>
                <span>￥{{item.amount}}</span>
                <router-link :to="'/paySellPage?id='+item.Id" tag="a">立即购买</router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="notData" v-else>
        <img src="@/assets/imgs/icon_53.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      questData:{
          page:1
      },
      list:[],
      isQuest:true
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
      this.getSellCenterList();
      window.addEventListener('scroll',this.pageFn,false)
    },
    getSellCenterList(){
        Api.getSellCenterList(this.questData).then(res=>{
          if(res.code==1){
            if(res.page==0){
                return;
            }
            if(res.page>=res.currentPage){
                this.isQuest = false;
            }else{
                this.isQuest = true;
            }
            if(this.questData.page==1){
              this.list = res.rows
            }else{
              this.list = this.list.concat(res.rows)
            }
            
          }else{
            this.list = []
          }
        })
    },
    pageFn(){
      let sTop = this.getScrollTop();
      let clientHeight = this.getClientHeight();
      let getScrollHeight = this.getScrollHeight();
      let questHeight = getScrollHeight-clientHeight-100;
      if(sTop>=questHeight&&this.isQuest){
        this.questData.page = this.questData.page*1+1
        this.isQuest = false;
        this.getSellCenterList();
      }
    },
    getScrollHeight(){  //获取文档内容实际高度
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);  
    },
    getClientHeight(){  //获取窗口可视范围的高度
        var clientHeight=0;  
        if(document.body.clientHeight&&document.documentElement.clientHeight){  
            var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }else{  
            var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
        }  
        return clientHeight;  
    },
    getScrollTop(){  //获取窗口滚动条高度
        var scrollTop=0;  
        if(document.documentElement&&document.documentElement.scrollTop){  
            scrollTop=document.documentElement.scrollTop;  
        }else if(document.body){  
            scrollTop=document.body.scrollTop;  
        }
        return scrollTop;  
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
  padding: 25px 30px;
  ul{
      display: flex; justify-content: flex-start; flex-wrap: wrap;
    li{
      margin-bottom: 25px; margin-right: 35px; width: 264px;
      div{
          padding-top: 18px; display: flex; justify-content: space-between; align-items: center;
          span{
              font-size: 24px; color: #d81e06;
          }
          a{
              width: 128px; height: 45px; background-color: #2892ff; color: #fff; font-size: 24px; display: flex; justify-content: center; align-items: center;
          }
      }
    }
    li:nth-child(2n){
        margin-right: 0;
    }
  }
  .btnBox{
    height: 100px;
    p{
      height: 100px; position: fixed; background-color: #fff; display: flex; justify-content: center; align-items: center; width: 100%; left: 0; bottom: 0; z-index: 2;
      a{
        width: 582px; height: 72px; border-radius: 10px; background-color: #2892ff; color: #fff; font-size: 24px; display: flex; justify-content: center; align-items: center;
      }
    }
  }
}
.notData{
    font-size: 26px;
    text-align: center; color: #929292; font-weight: bold; padding-top: 180px; width: 100%;
    img{
        width: 216px;
    }
    a{
      color: #2892ff; font-size: 24px; text-decoration: underline; margin-top: 25px; line-height: 26px; display: block;
    }
}
</style>