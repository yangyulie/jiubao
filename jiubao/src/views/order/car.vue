<template>
  <div class="home">
    <headed :tit="'购物车'" :isShowRight="true" :isClose="false">
        <span @click="delate">删除</span>
    </headed>
    <div class="wrap secreenHei">
        <ul class="list">
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
        <div class="total">
          <label :class="{show:allChecked}" class="isChecked"><span><img src="@/assets/imgs/icon_15.png" alt=""></span><input type="checkbox" v-model="allChecked" @change="allCheckedFn">{{allChecked?"取消全选":"全选"}}</label>
          <div class="totalBox">
            总计：<span>{{total}}</span>
          </div>
          <button>去结算</button>
        </div>
    </div>
    <foot :is_now="3"></foot>
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
      datas:{},
      submitData:[],
      allChecked:false,
      list:[]
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
      let storage=window.localStorage;
      this.token = storage.getItem("token");
      this.getCarListFn()
    },
    delate(){},
    allCheckedFn(){
      let arr = this.list;
      for(let i=0;i<arr.length;i++){
        arr[i].checked = this.allChecked
        this.$set(this.list, i, this.list[i]);
      }
    },
    changeFn(index){
      this.list[index].checked = true;
      this.$set(this.list, index, this.list[index]);
    },
    checkedFn(index){
      this.list[index].checked = !this.list[index].checked;
      if(!this.list[index].checked){
        this.allChecked=false
      }
      this.$set(this.list, index, this.list[index]);
    },
    addFn(index){
      let num = this.list[index].number*1+1;
      this.list[index].number = num;
      this.list[index].checked = true;
      this.$set(this.list, index, this.list[index]);
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
    getCarListFn(){
        Api.getCarList().then(res=>{
            this.datas = res;
            this.list = res.rows;
        })
    },
    
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    total(){
      if(this.list&&this.list.length>0){
        return this.list.reduce((item,index)=>{
          console.log(23,index.checked)
          if(index.checked){
          console.log(123,index.number*index.price,item)
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
        flex: 1; overflow-y: auto;
        li{
            display: flex; justify-content: flex-start; align-items: center; padding: 20px; border-bottom: 15px solid #f4f8ff;
            .proInfoBox{
              font-size: 22px; color: #313131; display: flex; flex-direction: column; height: 132px; flex: 1;
              dt{
                flex: 1;
                p{
                  color: #929292; font-size: 18px; padding-top: 5px;
                }
              }
              dd{
                display: flex; justify-content: space-between; align-items: center;
                >span{
                  color: #d81e06; font-size: 24px; font-weight: bold;
                }
                >div{
                  border: 1px solid #c1c1c1; display: flex; justify-content: center; align-items: center; height: 44px;
                  span{
                    display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; position: relative;
                  }
                  input{
                    width: 59px; border-left:1px solid #c1c1c1; border-right: 1px solid #c1c1c1; height: 44px; text-align: center; font-size: 26px; 
                  }
                  .reduce::after{
                    content: ''; width: 50%; height: 2px; background-color: #c1c1c1;
                  }
                  .add::after,.add::before{
                    content: ''; width: 50%; height: 2px; background-color: #2892fe;
                  }
                  .add::before{
                    position: absolute; left: 50%; margin-left: -25%; transform: rotate(90deg);
                  }
                }
              }
            }
            
            >img{
              width: 132px; margin: 0 20px 0 0;
            }
            .isChecked{ width: auto;}
            
        }
        li:last-child{
          border: 0;
        }
    }
    .total{
        background-color: #fff; border-top: 1px solid #c1c1c1; height: 85px; display: flex; justify-content: space-between; align-items: center; padding-left: 20px;
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
}
</style>