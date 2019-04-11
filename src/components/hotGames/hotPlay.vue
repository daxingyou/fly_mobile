<template>
    <div class="hotPlay">
        <yd-navbar title="热门游戏">
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
        <div slot="right" @click="toPath('/hotChange')" >
				额度转换
			</div>
    </yd-navbar>
    <div class="hotPlay_nav" v-if="shows">
        <!-- <iframe NAME="content_frame" width=100% height=100% marginwidth=0 marginheight=0 :src = "src" ></iframe>  -->
        <iframe :src="game_url" class="content" ></iframe>
    </div>
    </div>
</template>
<script>
import hotBues from './hotBues.js';
export default {
    data(){
        return {
            game_url:'',
            shows:false,
        }
    },
    created(){
         hotBues.$on("myFun",(message)=>{   //这里最好用箭头函数，不然this指向有问题
        //  console.log(message,11)
         this.game_url = message;
                    //  this.bbtn(message);   
            })
       
    },
    methods:{
    //    bbtn(message){
    //        this.shows = true;
    //     //    this.src = message;
                 
    //              console.log(this.src)
    //    }
    }
}
</script>
<style lang="less">
.hotPlay{
    height: 100%;
    text-align: left;
    font-size: 0.3rem;
    .yd-navbar{
        background: #011935 !important;
        }
    .yd-navbar .yd-navbar-item i{
        color: #ffffff !important;
    }
    .yd-navbar span{
        color: #ffffff !important;
    }
    .hotPlay_nav{
        // overflow: hidden;
        
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem 0;
        // margin-top: 0.2rem;
    }
}
</style>


