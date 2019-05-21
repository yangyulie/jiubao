<template>
  <div class="home">
    <headed :tit="'商户绑定'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap">
        <ul class="lists">
            <li v-for="(item,index) in list" :key="index">
                <div>
                    <p>
                        {{item.fullName}}
                        <span v-if="item.indexs==1">默认</span>
                    </p>
                    <em>{{item.userbinding}}</em>
                    <img src="@/assets/imgs/icon_35.png" @click="deleteFn(item.Id,index)" alt="">
                </div>
            </li>
        </ul>
        <router-link class="addShoperBind" to="/addShoperBind">新建用户绑定</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/user.js";
import headed from "@/components/headed.vue";
<<<<<<< HEAD
import { Indicator ,Toast } from 'mint-ui';
=======
import { Indicator ,Toast ,MessageBox} from 'mint-ui';
>>>>>>> 4d549404c8e3bfa2b846cd4c6d3bcf221b17a91f
import { mapActions, mapState } from "vuex";
export default {
  components: {
    headed,
  },
  data() {
    return {
      list:[],
      datas:{},
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
      this.getShoperBindFn();
    },
    deleteFn(id,index){
<<<<<<< HEAD
=======
      MessageBox.confirm("确定删除？").then(res=>{
>>>>>>> 4d549404c8e3bfa2b846cd4c6d3bcf221b17a91f
        Api.delShoperBind({Id:id}).then(res=>{
            Toast(res.msg)
            if(res.code==1){
                this.list.splice(index,1)
            }
        })
<<<<<<< HEAD
=======
      }).catch(res=>{})
        
>>>>>>> 4d549404c8e3bfa2b846cd4c6d3bcf221b17a91f
    },
    getShoperBindFn(){//获取个人中心数据
        Api.getShoperBind().then(res=>{
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
            border-left: 4px solid #2892fe; margin-top: 4px; padding: 26px 18px 0 10px;
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
                }
                img{
                    width: 46px;
                }
            }
        }
    }
    .addShoperBind{
      width: 582px; height: 72px; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 24px; background-color: #2892fe; border-radius: 10px; margin: 70px auto;
    }
}

</style>