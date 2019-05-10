<template>
  <div class="hello">
    <ul v-if="new_list.length==0">
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="{now:is_now==index}"
      >
        <div @click="isLogin(item)">
          <img :src="item.img" class="defImg" v-if="is_now!=index" alt>
          <img :src="item.actImg" class="actImg" v-else alt>
          <p>{{item.name}}</p>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(item,index) in new_list" :key="index" :class="{now:is_now==index}">
        <router-link :to="item.url">
          <img :src="item.img" class="defImg" v-if="is_now!=index" alt>
          <img :src="item.actImg" class="actImg" v-else alt>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "foot",
  props: {
    new_list: {
      type:Array,
      default: ()=>[]
    },
    is_now: Number
  },
  data() {
    return {
      list: [
        {
          name: "首页",
          url: "/",
          img: require("@/assets/imgs/navbar/index.png"),
          actImg: require("@/assets/imgs/navbar/index_1.png"),
          isLogin:false
        },
        {
          name: "商品分类",
          url: "/class?typeId=17&isType=true",
          img: require("@/assets/imgs/navbar/class.png"),
          actImg: require("@/assets/imgs/navbar/class_1.png"),
          isLogin:false
        },
        {
          name: "我的订单",
          url: "/orderList?id=0",
          img: require("@/assets/imgs/navbar/order.png"),
          actImg: require("@/assets/imgs/navbar/order_1.png"),
          isLogin:true
        },
        {
          name: "购物车",
          url: "/car",
          img: require("@/assets/imgs/navbar/car.png"),
          actImg: require("@/assets/imgs/navbar/car_1.png"),
          isLogin:true
        },
        {
          name: "会员中心",
          url: "/user",
          img: require("@/assets/imgs/navbar/my.png"),
          actImg: require("@/assets/imgs/navbar/my_1.png"),
          isLogin:true
        }
      ]
    };
  },
  methods:{
    isLogin(data){
      let isLogin = data.isLogin;
      let storage=window.localStorage;
      console.log(isLogin,!storage.getItem("token"))
      if(isLogin&&!storage.getItem("token")){
        this.$router.push({
          path: '/login'
        });
      }else{
        this.$router.push({
          path: data.url
        });
      }
    },
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@act_color: #2892fe;
@color: #6e6e6e;
@bgColor: #f4f8ff;
@borderColor: #c1c1c1;
@hei:95px;
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.between {
  .center();
  justify-content: space-between;
}
.around {
  .center();
  justify-content: space-around;
}
.hello,ul{
  height: @hei;
}
ul {
  .around();
  background-color: @bgColor;
  border-top: 1px solid @borderColor;
  height: 95px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 9;
}
li {
  font-family: "微软雅黑";
  font-size: 16px;
  text-align: center;
  flex: 1;
  .center();
  p {
    color: @color;
  }
}
.now {
  p {
    color: @act_color;
  }
}
</style>
