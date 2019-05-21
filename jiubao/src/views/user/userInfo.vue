<template>
  <div class="home">
    <headed :tit="'资料更新'" :isShowRight="true" :isClose="false">
        <span @click="save">保存</span>
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li>
                <span>商家名称</span><input type="text" v-model="submitData.companyName" placeholder="请输入单位名称">
            </li>
            <li>
                <span>业务员</span><input type="text" v-model="submitData.fullname" disabled placeholder="请输入业务员名称">
            </li>
            <li>
                <span>联系人</span><input type="text" v-model="submitData.linksName" placeholder="请输入联系人名称">
            </li>
            <li>
                <span>手机</span><input type="number" v-model="submitData.phone" placeholder="请输入联系人手机号">
            </li>
            <li>
                <span>电话</span><input type="text" v-model="submitData.tel" placeholder="请输入联系电话">
            </li>
            <li>
                <span>地址</span><input type="text" v-model="submitData.address" placeholder="请输入地址">
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
import { Indicator ,Popup ,Toast } from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      
      submitData:{
          linksName:"",
          tel:"",
          phone:"",
          address:"",
          Id:0,
          companyName:"",
          fullname:"",
          tuijian:""
      },
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
        this.getUserInfoFn();
    },
    getUserInfoFn(){
        Api.getUserInfo().then(res=>{
            this.submitData = res.rows
        })
    },
    save(){
        console.log(this.submitData)
        Api.setUserInfo(this.submitData).then(res=>{
            Toast(res.msg);
            this.$router.go(-1)
            
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
        padding: 10px; border-bottom: @bor; font-size: 24px;
        li{
            border-bottom: 1px solid #c1c1c1; padding: 10px; display: flex; justify-content: flex-start; align-items: center;
            input{
                flex:1; height: 50px; line-height: 50px; font-size: 24px;
            }
            span{
                width: 200px; font-size: 24px; color: #313131;
            }
        }
        li:last-child{
            border-bottom: 0;
        }
    }
    .isChecked{
       position: relative; display: flex; justify-content: flex-start; align-items: center; font-size: 24px; color: #6e6e6e; width: 250px;
       margin: 20px auto;
      span{
        width: 32px; height: 32px; border-radius: 50%; border: 1px solid #ccc; overflow: hidden; display: block; margin-right: 10px;
      }
      img{
        display: none;
      }
    }
    input[type="checkbox"]{
        border: 0; background: none; opacity: 0; position: absolute; left: 0; top: 0;
    }
    .isChecked.show img{
      display: block;
    }
}
.mint-popup{
    width: 100%;
}
.picker-toolbar-title{
    display: flex; height: 56px;
    div{
        flex: 1; font-size: 24px; text-align: center; line-height: 56px;
    }
}
</style>