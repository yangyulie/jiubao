<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/index.js"
import HelloWorld from '@/components/HelloWorld.vue';
import {mapActions,mapState} from 'vuex';
export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data(){
    return {
      list:[1,2,3]
    }
  },
  mounted(){
      this.init();
    // const {setData} = this;
    // console.log(this.data)
    // setData(this.app)
    // console.log(this.data)
  },
  methods:{
      init(){
          this.getIndex();
      },
      getIndex(){
          console.log(12,Api)
          Api.index({id:1},"/list/list").then(res=>{
            console.log(111)
          })
      },
    //...mapActions(["setData"])
  },
  computed:{
    // ...mapState(['app','app2',"data"])
  }
};

</script>
