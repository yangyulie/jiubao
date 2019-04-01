<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
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
  methods:{
    ...mapActions(["setData"])
  },
  mounted(){
    const {setData} = this;
    console.log(this.data)
    setData(this.app)
    console.log(this.data)
  },
  computed:{
    ...mapState(['app','app2',"data"])
  }
};

</script>
