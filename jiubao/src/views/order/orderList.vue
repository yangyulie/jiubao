<template>
  <div class="home">
    <headed :tit="'我的订单'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
      <div class="tabListBox">
        <ol class="tabList">  
          <li v-for="(item,index) in tabList" :key="index" :class="{now:id==item.id}" @click="orderTab(item.id)"><span>{{item.name}}</span></li>
        </ol>
      </div>
        
        <ul class="lists" v-if="list&&list.length>0">
            <li v-for="(item,index) in list" :key="index" @click="goOrderDetail(item.Id)">
                <dl>
                    <dt>
                        <p>
                            <img src="@/assets/imgs/icon_38.png" alt="">
                            {{item.orderId}}
                        </p>
                        <span>{{item.orderactionName}}</span>
                    </dt>
                    <dd>
                        <div>
                            <p>商品数量：{{item.Number}}</p>
                            <p v-if="item.payName!=''">支付方式：{{item.payName}}</p>
                            支付金额：<span>￥{{item.total}}</span>
                        </div>
                        <p>{{item.addtime}}</p>
                    </dd>
                </dl>
            </li>
        </ul>
        <div class="list notData" v-else>
          <div>
            <span><img src="@/assets/imgs/icon_45.png" alt=""></span>
            暂无订单
          </div>
        </div>
    </div>
    <foot :is_now="2"></foot>
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
      titleList:[
          "我的订单","待核价订单","财务核价订单","待支付订单","待确认订单","待出库订单","待收货订单","已完成订单","作废订单","待退货订单","取消订单"
      ],
      tabList:[
        {
          name:"全部",
          id:0
        },
        {
          name:"待付款",
          id:3
        },
        {
          name:"待确认",
          id:4
        },
        {
          name:"待出库",
          id:5
        },
        {
          name:"待收货",
          id:6
        }
      ],
      id:0,
      list:[],
      isQuest:true,
      questData:{
        page:1,
        id:0
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id
    this.questData.id = this.id
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
      this.getOrderListFn();
      window.addEventListener('scroll',this.pageFn,false)
    },
    goOrderDetail(id){
      console.log(123,id)
      this.$router.push({
          path:'/orderDetail?id='+id
      })
    },
    orderTab(id){
      this.questData.page = 1;
      this.questData.id = id;
      this.id = id;
      window.scrollTop = 0;
      this.getOrderListFn();
    },
    pageFn(){
      let sTop = this.getScrollTop();
      let clientHeight = this.getClientHeight();
      let getScrollHeight = this.getScrollHeight();
      let questHeight = getScrollHeight-clientHeight-100;
      if(sTop>=questHeight&&this.isQuest){
        this.questData.page = this.questData.page*1+1
        this.isQuest = false;
        this.getOrderListFn();
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
    getOrderListFn(){
    console.log(this.id)
        Api.getOrderList(this.questData).then(res=>{
          //Toast(res.msg)
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
  .notData{
    img{
      width: 114px;
    }
  }
  .tabListBox{
    height: 70px; border-bottom: @bor;
  }
  .tabList{
    display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #313131; position: fixed; z-index: 9; left: 0; top: 70px; width: 100%; background-color: #fff;
    li{
      flex: 1; display: flex; justify-content: center; align-items: center;
      span{
        margin: 10px 15px 0; padding: 0 0 10px; text-align: center;
      } 
    }
    li.now{
      span{
        color: #2892fe; border-bottom: 4px solid #2892fe;
      }
      
    }
  }
    .lists{
        li{
            border-bottom: @bor; padding: 30px 15px; font-size: 18px; color: #313131;
            dt{
                display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; padding:0 25px 10px;
                span{
                    color: #fff; background-color: #e6593b; height: 26px; line-height: 26px; padding: 0 10px; font-size: 16px;
                }
            }
            dd{
                display: flex; justify-content: space-between; align-items: center; padding: 20px 25px 0;
                div{
                    p{
                        padding-bottom: 8px;
                    }
                }
                >p{
                    text-align: right;
                }
            }
        }
    }
}
</style>