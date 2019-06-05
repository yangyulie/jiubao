<template>
  <div class="home">
    <headed :tit="'订单核价'" :isShowRight="false" :isClose="false">
    </headed>
    <div class="wrap secreenHei" v-if="isShow">
        <div class="proListBox">
            <dl class="prolist">
                <dd v-for="(item,index) in datas" :key="index">
                    <img :src="item.purls" alt="">
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd class="gray">{{item.jhl}} x {{item.guige}}</dd>
                        <dd class="price"><span>￥{{item.price}}</span><span> x {{item.Number}}</span></dd>
                        <dd class="totalS">小计：<span>￥{{item.total}}</span></dd>
                    </dl>
                    <div class="consoleBtns">
                        <button @click="ediFn(item.Id)" v-if="item.tcId==0">
                            <img src="@/assets/imgs/icon_40.png" alt=""> 编辑
                        </button>
                        <button @click="deleteFn(item.Id)">
                            <img src="@/assets/imgs/icon_41.png" alt=""> 删除
                        </button>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="total">
            <div class="totalBox">
            总计：￥<span>{{total}}</span>
            </div>
            <button @click="goOrder">审核通过</button>
        </div>
    </div>
    
    <foot :is_now="1"></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/man.js";
import foot from "@/components/footMan.vue";
import headed from "@/components/headed.vue";
import { Indicator ,Toast ,MessageBox} from 'mint-ui';
import { mapActions, mapState } from "vuex";
export default {
  components: {
    foot,
    headed
  },
  data() {
    return {
      datas:{},
      isShow:false,
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
        this.id= this.$route.query.id;
        this.getOrderPricingFn();
    },
    ediFn(id){
        this.$router.push({
            path:'/manAdiOrder?orderId='+this.id+'&id='+id
        })
    },
    goOrder(){
        Api.setPricing({Id:this.id}).then(res=>{
            if(res.code==1){
                this.$router.go(-1)
            }else{
                Toast(res.msg)
            }
        })
    },
    deleteFn(id){
        console.log(id)
        MessageBox.confirm("确认删除？").then(res=>{
            Api.delete({Id:id}).then(res=>{
                Toast(res.msg)
                this.init();
            });
        }).catch(res=>{
            
        })
        
    },
    getOrderPricingFn(){
        let questData={
            Id:this.id
        };
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        Api.getOrderPricing(questData).then(res=>{
            console.log(2223,res)
            Indicator.close();
            if(res.code==1){
                this.datas = res.rows;
                this.isShow = true;
            }
        })
      
    },
    
    //...mapActions(["setData"])
  },
  computed: {
    // ...mapState(['app','app2',"data"])
    total(){
        return this.datas.reduce((item,index)=>{
            console.log(item,index,item+index.total)
            return item+index.total
        },0)
    }
  }
};
</script>
<style lang='less' scoped>
@bor:10px solid #f4f8ff;
.wrap{
    display: flex; flex-direction: column;
}
.address{
    padding: 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: @bor; font-size: 20px; color: #929292; background-color: #f4f8ff;
    dl{
        flex: 1; margin: 0 20px;
        dt{
            color: #313131; font-size: 24px; padding-bottom: 5px;
        }
    }
}
.notAddress{
    height: 80px; background-color: #fff;
}
.orderInfo{
    padding: 30px 35px; font-size: 18px; color: #929292; border-bottom: @bor;
    dt{
        margin-bottom: 10px; color: #313131;
    }
    dd{
        margin-bottom: 6px; padding-left: 20px;
        .red{
            color: #ff4344;
        }
    }
    .orderInfoPrice{
        border-top: 1px solid #c1c1c1; margin: 10px 0 0 0 ; padding: 20px 0 0 20px; color: #d81e06;
    }
}
.submitBox{
    padding: 15px 65px; 
    button{
        display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff; border-radius: 10px; background-color: #2892fe; height: 80px; width: 100%; outline: none; border: 0;
    }
}
.sumBox{
    font-size: 18px; color: #d81e06; padding-bottom: 5px; margin-top: 15px;
}
.markBox{
    padding: 35px; border-bottom: @bor; font-size: 20px; color: #313131;
    p{
        margin-bottom: 8px;
    }
    textarea{
        resize: none; border: 1px solid #c1c1c1; padding: 5px; font-size: 20px; color: #313131; width: 100%; height: 120px; outline: none;
    }
}
.proListBox{
    flex: 1; overflow-y: auto; position: relative; z-index: 1;
    >dl{
        >dt{
            display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c1c1c1; padding-bottom: 10px;
            span{
                color: #fff; background-color: #e6593b; height: 26px; line-height: 26px; padding: 0 10px; font-size: 16px;
            }
        }
        >dd{
            display: flex; justify-content: flex-start; align-items: flex-start; font-size: 18px; color: #313131; padding: 25px 20px 0; flex-wrap: wrap; border-bottom: @bor;
            img{
                width: 132px; margin-right: 27px;
            }
            dl{ 
                width: 400px; padding-top: 20px; padding-bottom: 25px;
                dd{
                    margin-top: 5px;
                }
                .gray{ color: #929292}
            }
            .allPro{ 
                 width: 100%;
                >dl{
                    width: 100%;
                    >dt{
                        border-bottom: 1px dashed #929292; font-size: 18px; color: #313131; padding: 0 0 15px 0;
                    }
                    >dd{
                        div{
                            display: flex; align-items: flex-start;
                        }
                        
                    }
                }
            }
            >div{
                width: 100%; border-top:1px solid #929292; display: flex; justify-content: flex-end; align-items: center; padding: 25px 0;
                button{
                    border: 1px solid #929292; width: 110px; height: 50px; display: flex; justify-content: center; align-items: center; margin-left: 25px; background-color: #fff; outline: none; font-size: 20px; color: #929292;
                    img{
                        margin-right: 10px; width:32px;
                    }
                }
            }
        }
    }
    .allProTop{
        background-color: #f4f8ff;
        >img{
            display: none;
        }
        >dl{
            display: none;
        }
        .allPro{
            >dl{
                >dt{
                    display: flex; justify-content: space-between; align-items: center;
                }
            }
        }
    }
}
.totalPriceBox{
    border-bottom: @bor; height: 75px; padding: 0 35px; display: flex; justify-content: flex-start; align-items: center; font-size: 24px;
    span{
        color: #d81e06; font-weight: bold;
    }
}
.disContBox{
    display: flex; justify-content: flex-start; align-items: flex-start; font-size: 18px; color: #929292;
    p{
        margin-top: 40px; line-height: 30px; width: 100px;
    }
    div{
        display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex: 1;
        span{
            border: 1px solid #929292; margin-left: 40px; padding: 15px 35px; line-height: 18px; margin-top: 30px;
        }
    }
}
.prolistTotal{
    line-height: 65px; border-top: 1px solid #c1c1c1; color: #d81e06; font-size: 18px; text-align: right; padding-right: 40px; margin-top: 20px;
}
.price{ 
    display: flex; justify-content: space-between; align-items: center;
}
.totalS{
    span{
        font-weight: bold; color: #d81e06;
    }
}
</style>