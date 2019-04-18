<template>
  <img :src="list[is_now-1]" alt="">
</template>

<script>
export default {
  name: "proTag",
  props: {
    is_now: Number
  },
  data() {
    return {
      list: [
          require("@/assets/imgs/icon_07.png"),
          require("@/assets/imgs/icon_08.png"),
          require("@/assets/imgs/icon_09.png"),
          require("@/assets/imgs/icon_06.png"),
      ]
    };
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
img{ width: 42px; position: absolute; right: 5px; top: 5px;}
</style>
