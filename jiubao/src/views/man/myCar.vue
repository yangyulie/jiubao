<template>
  <div class="home">
    <headed :tit="'购物车'" :isShowRight="true" :isClose="false">
        <span @click="delate">删除</span>
    </headed>
    <div class="wrap secreenHei">
        <ul class="list" v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
                <label :class="{show:item.checked}" class="isChecked" @click="checkedFn(index)"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" :value="item.Id" v-model="item.checked"></label>
                <img :src="item.picurls" alt="">
                <dl class="proInfoBox">
                    <dt>
                        {{item.name}}
                        <p>{{item.JHL}} x {{item.guige}}</p>
                    </dt>
                    <dd>
                        <span>￥{{item.price}}</span>
                        <div>
                            <span class="reduce" @click="reduceFn(index)"></span>
                            <input type="number" v-model="item.number" @input="changeFn(index)">
                            <span class="add" @click="addFn(index)"></span>
                        </div>
                    </dd>
                </dl>
            </li>
        </ul>
        <div class="list notData" v-else>
          <div>
            <span><img src="@/assets/imgs/icon_16.png" alt=""></span>
            购物车还是空的
          </div>
          <router-link :to="'/setOrderProList?typeId=17&isType=true&cId='+cId">马上去选购</router-link>
        </div>
        <div class="total">
          <label :class="{show:allChecked}" class="isChecked"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" v-model="allChecked" @change="allCheckedFn">{{allChecked?"取消全选":"全选"}}</label>
          <div class="totalBox">
            总计：<span>{{total}}</span>
          </div>
          <button @click="goOrder">去结算</button>
        </div>
    </div>
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import ApiOrder from "@/api/order.js";
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
      datas:{},
      submitData:[],
      allChecked:false,
      list:[],
      handleData:[],
      cId:''
    };
  },
  mounted() {
    this.cId = this.$route.query.cId;
    this.init();
    
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  watch:{
    list:{//监听购物车列表选中状态，并返回到待操作数组
      handler(n,o){
        
        if(n&&n.length<1){
          this.allChecked = false;
        }else{
          this.handleData = n.filter((item,index)=>{
            return item.checked
          })
          this.allChecked = n.every((item,index)=>{
            return item.checked
          })
        }
      },
      deep:true
    }
  },
  methods: {
    init() {
      let storage=window.localStorage;
      this.token = storage.getItem("token");
      this.getCarListFn()
    },
    goOrder(){
      
      let ids = [];
      if(this.handleData.length==0){
        Toast("请选择需要购买的商品")
        return
      }
      for(let j=0;j<this.handleData.length;j++){
        ids.push(this.handleData[j].id)
      }
      this.$router.push({
        path: '/manOrder?cId='+this.cId+'&cartIds='+ids.join(',')
      });
      
    },
    delate(){
      console.log(this.handleData)
      let ids = [];
      let questData={
        Id:''
      }
      for(let j=0;j<this.handleData.length;j++){
        ids.push(this.handleData[j].id)
      }
      questData.Id = ids.join(',');
      console.log(questData)
      ApiOrder.delCarList(questData).then(res=>{
        if(res.code==1){
          Toast(res.msg)
          let arr = this.list;
          for(let i=0;i<arr.length;i++){
            if(arr[i].checked){
              console.log(i)
              arr.splice(i,1)
              i--
              //this.$set(this.list, i, this.list[i]);
            }
          }
        }
        console.log(res.msg)
      })
    },
    allCheckedFn(){
      let arr = this.list;
      for(let i=0;i<arr.length;i++){
        arr[i].checked = this.allChecked
        this.$set(this.list, i, this.list[i]);
      }
    },
    changeNumFn(obj,num,index){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let questData = {
        Id:obj.id,
        tcId:obj.tcId,
        Number:num
      }
      ApiOrder.carListNumUpdate(questData).then(res=>{
        Indicator.close();
        if(res.code==1){
          obj.number = num;
          obj.checked = true;
          this.$set(this.list, index, obj);
        }else{
          Toast(res.msg)
        }
      })
    },
    changeFn(index){
      let obj = this.list[index];
      let num = obj.number*1;
      this.changeNumFn(obj,num,index)
    },
    checkedFn(index){
      this.list[index].checked = !this.list[index].checked;
      if(!this.list[index].checked){
        this.allChecked=false
      }
      this.$set(this.list, index, this.list[index]);
    },
    addFn(index){
      let obj = this.list[index];
      let num = obj.number*1+1;
      this.changeNumFn(obj,num,index)
      
    },
    reduceFn(index){
      let num = this.list[index].number*1-1;
      if(num<=0){
        return;
      }
      this.list[index].number = num;
      this.list[index].checked = true;
      this.$set(this.list, index, this.list[index]);
    },
    handleDataFn(data){
      let idx = this.handleData.indexOf(data.id);
      if(idx>-1){
        this.handleData.splice(idx,1)
      }else{
        this.handleData.push(index.id);
      }
      console.log(2,this.handleData)
    },
    getCarListFn(){
        Api.getCarList({cId:this.cId}).then(res=>{
          this.datas = res;
          if(res.code==1){
            this.list = res.rows;
          }
        })
    },
    
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    total(){
      if(this.list&&this.list.length>0){
        return this.list.reduce((item,index)=>{
          if(index.checked){
            return index.number*index.price+item
          }else{
            
            return item
          }
          
        },0)
      }else{
        return 0;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.wrap{
    display: flex; flex-direction: column;
    .list{ 
        flex: 1; overflow-y: auto; position: relative; z-index: 1;
        li{
            display: flex; justify-content: flex-start; align-items: center; padding: 20px; border-bottom: 15px solid #f4f8ff;
            >img{
              width: 132px; margin: 0 20px 0 0; z-index: 1;
            }
            .isChecked{ width: auto;}
            
        }
        li:last-child{
          border: 0;
        }
    }
    .total{
        background-color: #fff; border-top: 1px solid #c1c1c1; height: 85px; display: flex; justify-content: space-between; align-items: center; padding-left: 20px; z-index: 9999; position: relative;
        button{
          width: 195px; height: 86px; background-color: #2892fe; color: #fff; font-size: 24px; text-align: center; line-height: 86px; border: 0;
        }
    }
    .isChecked{
       position: relative; display: flex; justify-content: flex-start; align-items: center; font-size: 24px; color: #6e6e6e; width: 148px;
      span{
        width: 32px; height: 32px; border-radius: 50%; border: 1px solid #ccc; overflow: hidden; display: block; margin-right: 20px;
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
    .totalBox{
      font-size: 18px; color: #6e6e6e; margin: 0 20px; flex: 1;
      span{
        color: #d81e06; font-size: 24px; font-weight: bold;
      }
      span:before{
        content: "￥"
      }
    }
    .notData{
      font-size: 30px; color: #6e6e6e; text-align: center;
      div{
        span{
          width: 216px; height: 216px; border-radius: 50%; display: flex; justify-content: center; align-items: center; background-color: #f4f8ff; margin: 180px auto 35px;
          img{
            width: 134px;
          }
        }
      }
      a{
        color: #2892fe; font-size: 24px; text-decoration: underline; margin-top: 25px; display: inline-block;
      }
    }
}
</style>