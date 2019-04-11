<template>
    <div class="flyLink">
        <div class="alert">
            <div class="tip">全民代理</div>
            <div class="content" >
                <ul class="hreder">
                    <li :class="indexid == '1'?'flyLink-actice':''" @click="changeLink('1')">我的推广</li>
                    <li :class="indexid == '2'?'flyLink-actice':''" @click="changeLink('2')">推广明细</li>
                    <li :class="indexid == '3'?'flyLink-actice':''" @click="changeLink('3')">推广教程</li>
                    <li :class="indexid == '4'?'flyLink-actice':''" @click="changeLink('4')">推广周榜</li>
                </ul>
                <div class="nav nav-1" v-if="indexid == '1'">
                    <ul>
                        <li v-for="(item,index) in myLinkList">
                            <img :src="item.imgUrl" alt="">
                            <span>{{item.linkName}}</span>
                            <i>{{item.money}}</i>
                        </li>
                    </ul>
                    <div class="reward">
                        <div class="reward_top">
                            <div>
                                <h1>历史总榜</h1>
                                <p>0.00元</p>
                            </div>
                            <div>
                                <h1>可提取奖励</h1>
                                <p>0.00元</p>
                            </div>
                        </div>
                        <div class="reward_foot">
                            <button>领取</button>
                        </div>
                    </div>
                </div>
                <div class="nav nav-2" v-else-if="indexid == '2'">
                    <div class="no_record">
                        <img src="../../../../static/img/no_record.png" alt="">
                        <p>暂时没有记录</p>
                        <p>快去分享给好友吧！</p>
                    </div>
                </div>
                <div class="nav nav-3" v-else-if="indexid == '3'">
                    <img src="../../../../static/img/Promotion_course02.png" alt="">
                    <!-- <img src="../../../../static/img/Promotion_course01.png" alt=""> -->
                    <p style="color:#cb9a78">您的返利=1级返利+2级返利+...N级返利。没级返利=对应下线*(30%)</p>
                    <p style="color:#ed824e">举例说明：</p>
                    <p>B=您的1级下线，税收为10000</p>
                    <p>B1=B的1级下线，您的2级下线，税收为20000</p>
                    <p>您的返利=10000*30%+(20000*30%)*30%</p>
                </div>
                <div class="nav nav-4" v-else>
                    <ul>
                        <li class="nav-4-tip">
                            <span>排名</span>
                            <span>玩家信息</span>
                            <span>本周返利</span>
                        </li>
                        <li v-for="(item,index) in zhouBang">
                            <span>{{index+1}}</span>
                            <span>{{item.name}}</span>
                            <p>
                                <img src="" alt="">
                                <i>{{item.profit}}</i>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="foot">
                <button @click="toParents">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                indexid:'1',
                myLinkList:[
                    {
                        imgUrl:"../../../../static/img/My_news.png",
                        linkName:"昨日总奖励",
                        money:"0.00",
                    },
                    {
                        imgUrl:"../../../../static/img/My_news.png",
                        linkName:"直属玩家人数",
                        money:"0",
                    },
                    {
                        imgUrl:"../../../../static/img/My_news.png",
                        linkName:"其他玩家人数",
                        money:"0",
                    },
                    {
                        imgUrl:"../../../../static/img/My_news.png",
                        linkName:"昨日直属玩家奖励",
                        money:"0.00",
                    },
                    {
                        imgUrl:"../../../../static/img/My_news.png",
                        linkName:"昨日其他玩家奖励",
                        money:"0.00",
                    }

                ],
                zhouBang:[
                    {
                        indexId:'1',
                        name:'xiaofei2',
                        profit:"43123"
                    },
                    {
                        indexId:'2',
                        name:'aa22222',
                        profit:"34598"
                    },
                    {
                        indexId:'3',
                        name:'asui111',
                        profit:"33005"
                    },
                    {
                        indexId:'4',
                        name:'tb6666',
                        profit:"25615"
                    },
                    {
                        indexId:'1',
                        name:'xiaofei2',
                        profit:"43123"
                    },
                    {
                        indexId:'2',
                        name:'aa22222',
                        profit:"34598"
                    },
                    {
                        indexId:'3',
                        name:'asui111',
                        profit:"33005"
                    },
                    {
                        indexId:'4',
                        name:'tb6666',
                        profit:"25615"
                    },
                    {
                        indexId:'1',
                        name:'xiaofei2',
                        profit:"43123"
                    },
                    {
                        indexId:'2',
                        name:'aa22222',
                        profit:"34598"
                    },
                    {
                        indexId:'3',
                        name:'asui111',
                        profit:"33005"
                    },
                    {
                        indexId:'4',
                        name:'tb6666',
                        profit:"25615"
                    },
                ]
            } 
        },
        created(){

        },
        methods:{
            changeLink(id){
                this.indexid = id;
            },
            toParents(){
                this.$emit('isFly',false)
            }
        }
    }
</script>
<style lang="less" scoped>
    .flyLink{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 998;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        .alert {
        background-color: rgba(255,255,255,.9);
        border-radius: .3rem;
        text-align: center;
        overflow: hidden;
        width: 80%;
        .tip {
            padding: .2rem 0;
            border-bottom: 1px solid #cccccc;
            background-color: #F5F5F5;
            font-size: 0.3rem;
            }
        .content {
            text-align: left;
            .hreder{
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 0.15rem;
                li{
                    height: 0.5rem;
                    margin: 0 0.05rem;
                    padding: 0 0.1rem;
                    line-height: 0.5rem;
                    background: #cccccc;
                    border-radius: 5px 5px 0 0;
                    font-size: 0.28rem;
                }
                .flyLink-actice{
                    background-color: #38f;
                    color: white;
                    
                }
            }
            .nav{
                height: 5rem;
                overflow: auto;
            }
            .nav-1{
                box-sizing: border-box;
                padding: 0.1rem 0.2rem;
                ul{
                    border: 1px solid #cccccd;
                    padding: 0 0.15rem;
                    padding-top: 0.1rem;
                    li{
                        height: 0.4rem;
                        padding: 0 0.1rem;
                        background: linear-gradient(to right,#fff, #cccccc,#dbc3c3 ,#bb7272, red); /* 标准的语法 */
                        margin-bottom: 0.1rem;
                        border-radius: 0 0.3rem 0.3rem 0;
                        img{
                            float: left;
                            height: 0.35rem;
                            margin-right: 0.2rem;
                        }
                        span{
                            float: left;
                            color: #000;
                        }
                        i{
                            float: right;
                            color: #fdeb78;
                            min-width: 0.8rem;
                            text-align: center;
                        }
                    }
                }
                .reward{
                    width: 100%;
                    padding-top: 0.1rem;
                    font-size: 0.28rem;
                    .reward_top{
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        div{
                            width: 48%;
                            height: 1.8rem;
                            border: 1px solid #cccccd;
                            text-align: center;
                            position: relative;
                            h1{
                                color: #fbdd95;  
                                background: linear-gradient(to top,#975c3e,#66341e;) /* 标准的语法 */
                            }
                            p{
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                width: 100%;
                                height: 0.35rem;
                                line-height: 0.35rem;
                                text-align: right;
                                padding-right: 0.1rem;
                                background: linear-gradient(to right,#fff,#000); /* 标准的语法 */
                                opacity: 0.5;
                                color: #f2e173;
                            }
                        }
                    }
                }
                .reward_foot{
                    height: 0.8rem;
                    box-sizing: border-box;
                    padding: 0.1rem;
                    button{
                        display: block;
                        width: 1.5rem;
                        height: 0.6rem;
                        margin: 0 auto;
                        box-sizing: border-box;
                    }
                }
            }
            .nav-2{
                .no_record{
                    padding-top: 1rem;
                    img{
                        display: block;
                        width: 2.5rem;
                        margin: 0 auto;
                    }
                    p{
                        text-align: center;
                    }
                }
                
            }
            .nav-3{
                width: 100%;
                box-sizing: border-box;
                padding:  0.1rem 0;
                img{
                    display: block;
                    margin: 0 auto;
                    width: 93%;
                    margin-bottom: 0.1rem;
                }
                p{
                    width: 93%;
                    margin: 0 auto;
                    padding-left: 0.2rem;
                    color: #ffe9c7;
                    background: #342012;
                }
            }
            .nav-4{
                width: 100%;
                padding: 0.1rem 0.15rem;
                ul{
                    background: #432c1c;
                    color: #f4d99a;
                    padding: 0.05rem;
                    li{
                        display: flex;
                        justify-content: space-around;
                        height: 0.4rem;
                    }
                    .nav-4-tip{
                        background: linear-gradient(to right,#876a38, #dfcc8d,#967248 ,#c9a166); /* 标准的语法 */
                        color: #512314;
                        border-radius: 3px;
                    }
                    li:nth-child(2n){
                        background: linear-gradient(to right,#3e2819, #352114,#3e281a); /* 标准的语法 */
                    }
                }
                 
            }

        }
        .foot{
                padding: .15rem 0;
                border-top: 1px solid #cccccc;
                background-color: #F5F5F5;
                font-size: 0.3rem;
                button{
                    border: 0;
                    padding: 0.1rem 0.15rem;
                    background-color: #38f;
                    color: white;
                    border-radius: 5px;
                    float: right;
                    margin-right: 0.5rem;
                    margin-bottom: 0.1rem;
                }
            }
        }
    }
</style>


