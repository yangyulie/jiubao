<template>
  <div class="hello">
    <div class="searchBox">
      <img class="scan" src="@/assets/imgs/icon_01.png" alt="">
      <div class="searchInner">
        <img src="@/assets/imgs/icon_02.png" @click="goSearch" alt="">
        <input type="text" v-model="shearchText" @keyup.13="goSearch">
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "search",
  props: {
    
  },
  data() {
    return {
      toastObj:null,
      shearchText:""
      
    };
  },
  methods: {
    closeToast(){//关闭已有提示层
        if (this.toastObj) this.toastObj.close();
    },
    goSearch(){
      let shearchText = this.shearchText;
      if(shearchText==""){
        this.closeToast()
        this.toastObj = Toast('手机号格式错误');
      }else{
        this.$router.push('/product?skey='+shearchText);
      }

    },
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@colorBlue:#2892fe;
.flex{
  display: flex;
  align-items: center;
}
.hello,.searchBox{
    height: 80px;
}
.searchBox{
  background-color: @colorBlue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 74px 15px 25px;
  z-index: 9;
  .flex();
  justify-content: space-between;
  .scan{ width: 48px;}
  div{
    width: 472px;
    height: 49px;
    .flex();
    justify-content: space-between;
    border-radius: 25px;
    background-color: #fff;
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
}
</style>
