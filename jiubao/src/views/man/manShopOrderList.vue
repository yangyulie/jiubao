<template>
  <div class="home">
    <headed :tit="companyName" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <div class="tabListBox">
            <ol class="tabList" ref="tabList">  
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
                    <dd class="proPicList" v-if="item.shopList&&item.shopList.length>0">
                      <div>
                        <div class="proPicListBox" v-for="(i,idx) in item.shopList" :key="idx" v-show="idx<2||item.isShowMore">
                          <img :src="i.picurls" alt="">
                          <p>{{i.name}}</p>
                        </div>
                        <div class="proPicListBtn" v-if="item.shopList.length>=2" @click.stop="showMorePro(index)">
                          <p :class="{roate:item.isShowMore}">{{item.isShowMore?"收起":"查看"}}全部（商品共 {{item.shopList.length}}）</p>
                        </div>
                      </div>
                    </dd>
                    <dd>
                        <div>
                            <p><span>商品数量：{{item.Number}}</span><span class="red">支付状态：{{item.payId==0?"未支付":item.payName}}</span></p>
                            <p><span>支付金额：<span>￥{{item.total}}</span></span><span class="red">收款状态：{{!item.paystates?"未收款":"已收款"}}</span></p>
                            <p><span>商家名称：{{item.companyName}}</span><span>{{item.addtime}}</span></p>
                        </div>
                        <!-- <p>{{item.addtime}}</p> -->
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
    <foot :is_now="1"></foot>
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
      titleList:[
          "全部订单","业务待审核","财务核价订单","待支付订单","待确认订单","待出库订单","待收货订单","已完成订单","作废订单","待退货订单","取消订单"
      ],
      tabList:[
        {
          name:"全部",
          id:0
        },
        {
          name:"业务核价",
          id:1
        },
        {
          name:"财务核价",
          id:2
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
        },
        {
          name:"已完成",
          id:7
        },
        {
          name:"已作废",
          id:8
        },
        {
          name:"待退货",
          id:9
        }
      ],
      id:0,
      list:[],
      isQuest:true,
      companyName:'',
      questData:{
        page:1,
        cId:0,
        Id:0,
        pageSize:10
      }
    };
  },
  mounted() {
    // this.id = this.$route.query.cId
    this.companyName = this.$route.query.companyName
    console.log(this.companyName,999)
    this.questData.cId = this.$route.query.cId
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
      this.getShopOrderListFn();
      window.addEventListener('scroll',this.pageFn,false)
    },
    showMorePro(idx){
      this.$set(this.list[idx],'isShowMore',!this.list[idx].isShowMore);
    },
    goOrderDetail(id){
      console.log(123,id)
      this.$router.push({
          path:'/manOrderDetail?id='+id
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
        this.getShopOrderListFn();
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
    orderTab(id){
      this.questData.page = 1;
      this.questData.id = id;
      this.id = id;
      window.scrollTop = 0;
      this.getShopOrderListFn();
    },
    getShopOrderListFn(){
    console.log(this.id)
        Api.getShopOrderList(this.questData).then(res=>{
          
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
            
            }else if(res.code==-12){

            }else{
                this.list =[];
                // Toast(res.msg)
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
.red{
    color: #f00;
}
.tabListBox{
    height: 70px; border-bottom: @bor;
  }
  .tabList{
    display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: #313131; position: fixed; z-index: 9; left: 0; top: 70px; width: 100%; background-color: #fff; overflow-x: scroll;
    li{
      flex: 1; display: flex; justify-content: center; align-items: center; white-space: nowrap;
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
.wrap{
    .proPicList{
      border-bottom: 1px solid #eee;
      >div{
        width: 100%;
        .proPicListBox{
          display: flex; justify-content: flex-start; align-items: flex-start; padding-bottom: 20px;
          img{
            width: 70px; margin-right: 20px;
          }
          p{
            font-size: 22px; flex: 1; margin-top: 30px;
          }
        }
        .proPicListBtn{
          text-align: center; font-size: 20px; color: #313131;
          p::after{
            content: ''; width: 10px; height: 10px; border: 1px solid #313131; border-left: 0; border-top: 0; margin: 15px auto; display: block; transform: rotate(45deg);
          }
          .roate::after{
            transform: rotate(-135deg)
          }
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
                    flex: 1;
                    p{
                        padding-bottom: 8px; display: flex; justify-content: space-between;
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