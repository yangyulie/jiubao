<template>
  <div class="head">
    <div class="inner">
      <div @click="returnPage"><span></span></div>
      <h2 :class="{paddingRight:!isShowRight}">{{tit}}</h2>
      <slot v-if="isShowRight" class="right"></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "headed",
  props: {
    tit:String,//标题
    isShowRight: Boolean,//是：右侧有文案；否：右侧没有文案
    isClose: Boolean,//是：关闭浮层；否：返回上一页
  },
  data() {
    return {
      
    };
  },
  methods:{
    returnPage() {//返回
      if(this.isClose){
        this.$emit('close')
      }else{
        this.$router.go(-1);
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
@hei:70px;
.head,.inner{
  height: @hei; z-index: 9;
}
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: @act_color;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  font-size: 24px;
  color: #fff;
  div{
      display: flex;
      width: 60px;
      height: 60px;
      justify-content: center;
      align-items: center;
      span{
        display: block;
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-left: 0;
        border-bottom: 0;
        transform: rotate(-135deg);
      }
  }
  h2{ 
    flex: 1;
    text-align: center;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .paddingRight{ margin-right: 60px}
  >span{
    width: 100px;
    margin-right: 20px;
    text-align: right;
  }
}

</style>
