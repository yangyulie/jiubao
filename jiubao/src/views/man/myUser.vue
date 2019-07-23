<template>
  <div class="home">
    <headed :tit="'我的客户'" :isShowRight="true" :isClose="false">
      <div class="search">
          <img src="@/assets/imgs/icon_02.png" @click="goSearch" alt="">
          <input type="text" v-model="shearchText" @keyup.13="goSearch">
      </div>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <span class="tag">{{item.Settlement}}</span>
                <div @click="goOrderList(item)">
                    <p>{{item.companyName}}</p>
                    <span>{{item.address}}</span>
                </div>
                <em @click="goSetOrder(item.Id)">代下单</em>
            </li>
        </ul>
    </div>
    <foot :is_now="0"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import foot from "@/components/footMan.vue";
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
      list:[],
      shearchText:'',
      questData:{
        page:1,
        skey:''
      },
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
      this.getMyUserListFn();
      window.addEventListener('scroll',this.pageFn,false)
    },
    goOrderList(data){
      console.log(data,8989)
      this.$router.push({
        path:"/manShopOrderList?cId="+data.Id+"&companyName="+data.companyName
      })
    },
    goSearch(){
      this.questData.skey = this.shearchText;
      this.questData.page = 1;
      this.getMyUserListFn();
    },
    pageFn(){
      let sTop = this.getScrollTop();
      let clientHeight = this.getClientHeight();
      let getScrollHeight = this.getScrollHeight();
      let questHeight = getScrollHeight-clientHeight-100;
      if(sTop>=questHeight&&this.isQuest){
        this.questData.page = this.questData.page*1+1
        this.isQuest = false;
        this.getMyUserListFn();
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
    goSetOrder(id){
        this.$router.push({
          path:"/setOrderProList?typeId=17&isType=true&cId="+id
        })
    },
    getMyUserListFn(){
        Api.getMyUserList(this.questData).then(res=>{
            //this.list = res.rows
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
        li{
            border-bottom: @bor; padding: 30px 15px; font-size: 18px; color: #313131; display: flex; justify-content: space-between;
            >span{
                font-size: 18px; color: #ff6600; border: 1px solid #ff6600; height: 40px; line-height: 40px; border-radius: 20px; padding: 0 20px;
            }
            div{
                flex: 1; margin: 0 30px; font-size: 24px; color: #313131;
                span{
                    font-size: 20px; color: #929292;
                }
            }
            >em{
                font-style: normal; border: 1px solid #929292; color: #929292; font-size: 20px; width: 110px; height: 48px; text-align: center; line-height: 48px; align-self: flex-end;
            }
        }
    }
}
.inner .search{
    flex: 1;
    margin-left: 25px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin-right: 20px;
    border-radius: 25px;
    img{
        width: 31px;
        margin: 0 15px;
    }
    input{
        flex: 1;
        height: 100%;
        font-size: 26px;
    }
}
</style>