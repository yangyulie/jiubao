<template>
  <div class="home">
    <headed :tit="'地址管理'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <div>
                  <div>
                      <p>
                          {{item.linkName}}
                          <span v-if="item.states==1">默认</span>
                      </p>
                      <em>
                        {{item.Phone}}
                        <span>{{item.address}}</span>
                      </em>
                      <span class="useAddress" v-if="cartIds" @click="goUseAddress(item.Id)">使用地址</span>
                  </div>
                </div>
                <p>
                  <span @click="defaultAddress(item.states==1?0:1,item.Id)">{{item.states==1?"取消默认":"设为默认"}}</span>
                  <img src="@/assets/imgs/icon_37.png" @click="edtAddress(item)" alt="">
                  <img src="@/assets/imgs/icon_35.png" @click="defaultAddress(-1,item.Id)" alt="">
                </p>
            </li>
        </ul>
        <router-link class="addShoperBind" :to="'/addAddress?cartIds='+cartIds+'&invoiceId='+ this.invoiceId">新建收货地址</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import { Indicator ,Toast,MessageBox } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      list:[],
      datas:{},
      cartIds:"",
      invoiceId:""
    };
  },
  mounted() {
    this.init();
    this.cartIds = this.$route.query.cartIds;
    this.invoiceId = this.$route.query.invoiceId;
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    
  },
  methods: {
    init() {
      this.getAddressFn();
    },
    goUseAddress(id){
      this.$router.replace({
          path:'/order?cartIds='+this.cartIds+'&addressId='+ id+'&invoiceId='+ this.invoiceId
      })
    },
    defaultAddress(status,id){
      let questData={
        Id:id,
        states:status
      }
      MessageBox({
          title:'提示',
          message:'是否确定删除？',
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          showCancelButton:true
      }).then(action => {
        if(action == 'confirm'){

            Api.defaultAddress(questData).then(res=>{
              Toast(res.msg)
              if(res.code==1){
                this.init();
              }
            })

        }
        
      })
    },
    edtAddress(obj){
      console.log(obj)
      this.$router.push({
          path:'/addAddress?cartIds='+this.cartIds+'&obj='+ JSON.stringify(obj)+'&invoiceId='+ this.invoiceId,
          replace:true
      })
    },
    getAddressFn(){//获取地址列表
        Api.getAddressList().then(res=>{
            this.list= res.rows;
            this.datas = res;
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
        font-size: 24px; color: #313131;
        li{
             margin-top: 4px; margin-bottom: 6px; border-bottom: @bor; padding: 0 20px 20px 0;
            >div{
              border-left: 4px solid #2892fe; padding: 26px 0 0 10px;
              div{
                  display: flex; justify-content: space-between; align-items: flex-start; padding: 0 16px 20px 12px; border-bottom: 1px solid #c1c1c1;
                  p{
                      width: 150px;
                      span{
                          display: block; border: 1px solid #2892fe; color: #2892fe; font-size: 18px; width: 52px; height: 33px; text-align: center; line-height: 33px; margin-top: 5px;
                      }
                  }
                  em{
                      flex: 1; text-align: left; font-style: normal; 
                      span{
                        display: block; font-size: 20px; color: #929292; margin-top: 10px;
                      }
                  }
                  .useAddress{
                    border: 1px solid #2892fe; border-radius: 5px; width: 120px; height: 40px; text-align: center; line-height: 40px; color: #2892fe; margin-top: 15px;
                  }
                  img{
                      width: 46px;
                  }
              }
            }
            >p{
              display: flex; justify-content: flex-end; align-items: center; padding: 15px 0 0;
              *{
                margin-left: 20px;
              }
              img{
                width: 40px;
              }
            }
        }
        li:last-child{
          border-bottom: 0;
        }
    }
    .addShoperBind{
      width: 582px; height: 72px; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 24px; background-color: #2892fe; border-radius: 10px; margin: 70px auto;
    }
}

</style>