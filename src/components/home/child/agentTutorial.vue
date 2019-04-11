<template>
    <div class="agentTutorial">
        <div>
            <yd-navbar title="全民代理教程">
                <!-- <router-link to="/" slot="left"> -->
                <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
                <!-- </router-link> -->
                <div slot="right"></div>
            </yd-navbar>
        </div>
        <div class="agentTutorial_nav">
            <yd-tab>
                <yd-tab-panel label="推广教程">
                    <div class="agency-tab">
                        <div class='clou'>
                            全民代理是一款高频彩票竞猜平台。所有玩家均享有代理超级权限，推广新增下级代理享受赚取任您自由设置的赔率差，下级用户进行收付款由您自己亲自操作，免去出入款通知平台的人员。
                        </div>
                        <p>第一步：账号登录，进入到个人中心》代理中心》推广链接，进入到个推广链接页面。</p>
                        <img src="../../../../static/img/dljc/dljc_1.png" alt="">
                        <p>代理中心</p>
                        <img src="../../../../static/img/dljc/dljc_2.png" alt="">
                        <p>进入到推广链接</p>
                        <img src="../../../../static/img/dljc/dljc_3.png" alt="">
                        <p>说明：点击复制按钮可分别直接复制推广链接地址和邀请码</p>
                        <img src="../../../../static/img/dljc/dljc_4.png" alt="">
                        <img src="../../../../static/img/dljc/dljc_5.png" alt="">
                        <p>说明：根据实际情况可设置下级是否有代理功能和赔率模式</p>
                        <img src="../../../../static/img/dljc/dljc_6.png" alt="">
                        <p>说明：点击保存按钮才可以设置成功</p>
                        <img src="../../../../static/img/dljc/dljc_7.png" alt="">
                        <p>第二步：将复制的链接地址在浏览器地址打开。</p>
                        <img src="../../../../static/img/dljc/dljc_8.png" alt="">
                        <p>第三步：进入到全全民代理注册页面，填写注册相关信息，并填入上述复制的邀请码</p>
                        <p>说明：填写新账号无误后点击注册按钮</p>
                        <img src="../../../../static/img/dljc/dljc_9.png" alt="">
                        <p>第四步：注册成功自动登录 如下</p>
                        <img src="../../../../static/img/dljc/dljc_10.png" alt="">
                        <p> <span class="telit"> 注：</span> 推广链接功能是全民代理的代理会员享有，一般普通会员不享有。如果您的账号是普通会员账号， 您可以在个人中心》个人信息(详细信息页面)下，点击联系上级按钮，根据上级信息联系上级，让上级修改您当前账号的会员等级！ 相关操作帮助可进入 <i @click="toHelp">帮助中心</i> 去查看。
                        </p>
                    </div>
                </yd-tab-panel>
                <yd-tab-panel label="提现教程">
                    <div class="agency-tab">
                        <div class='clou'>
                            全民代理是一款高频彩票竞猜平台。所有玩家均享有代理超级权限，推广新增下级代理享受赚取任您自由设置的赔率差，下级用户进行收付款由您自己亲自操作，免去出入款通知平台的人员。
                        </div>
                        <h1>会员提现</h1>
                        <p>第一步：账号登录，进入到个人中心》提现，进入到提现页面。</p>
                        <img src="../../../../static/img/dljc/withdraw1.png">
                        <p>如果没有绑定银行卡，请点击绑定按钮进行绑定银行卡操作，反之直接进入第二步操作。</p>
                        <img src="../../../../static/img/dljc/withdraw2.png">
                        <p>填写所有信息，点击绑定。</p>
                        <img src="../../../../static/img/dljc/withdraw3.png">
                        <p>绑定成功，点击确认，进入到账变中心，返回到个人中心》提现，进行第二步操作。</p>
                        <img src="../../../../static/img/dljc/withdraw4.png">
                        <p>第二步：填写表中信息，点击提交，显示提现成功。</p>
                        <img src="../../../../static/img/dljc/withdraw5.png">
                    </div>
                </yd-tab-panel>
                <yd-tab-panel label="修改赔率">
                    
                    <div class="agency-tab">
                        <div class='clou'>
                            全民代理是一款高频彩票竞猜平台。所有玩家均享有代理超级权限，推广新增下级代理享受赚取任您自由设置的赔率差，下级用户进行收付款由您自己亲自操作，免去出入款通知平台的人员。
                        </div>
                        <p>第一步：账号登录，进入到个人中心》代理中心》赚水设置，进入到赚水设置页面。</p>
                        <img src="../../../../static/img/dljc/dljc_1.png">
                        <p>代理中心</p>
                        <img src="../../../../static/img/dljc/odds4.png">
                        <p>第二步：选择彩种。</p>
                        <img src="../../../../static/img/dljc/odds5.png">
                        <p>第三步：点击修改按钮，修改赔率。</p>
                        <p>说明：设置赚取差价的时候，每个模式设置不能超过该账户的最高赔率，否则会出现会员盈利负数。（例如：赔率1.992设置赚取大于0.992时，例如赚取1，会出现-0.008）</p>
                        <img src="../../../../static/img/dljc/odds1.png">
                        <p>第四步：点击完成按钮。</p>
                        <img src="../../../../static/img/dljc/odds2.png">
                        <p>修改成功</p>
                        <img src="../../../../static/img/dljc/odds6.png">
                        <p>说明：修改成功后，该账号所属所有下级均以修改的赔率进行赔率计算。</p>
                        <p>说明：如果出现下图提示信息，表示您的下级当前彩种有尚未结算的注单，所以当前还不能修改该彩种的赔率，您可以等待结算完成后再行修改。</p>
                        <img src="../../../../static/img/dljc/odds3.png">
                    </div>
                </yd-tab-panel>
                <yd-tab-panel label="联系上下级">
                    <div class="agency-tab">
                        <div class='clou'>
                            全民代理是一款高频彩票竞猜平台。所有玩家均享有代理超级权限，推广新增下级代理享受赚取任您自由设置的赔率差，下级用户进行收付款由您自己亲自操作，免去出入款通知平台的人员。
                        </div>
                        <p>说明：一级代理没有上级，可以联系下级；非一级代理有上级和下级，可以联系上下级；一般会员没有下级，可以联系上级。</p>
                        <h1>联系上级</h1>
                        <p>第一步：账号登录，进入到个人中心》个人信息，进入到详细信息页面。</p>
                        <img src="../../../../static/img/dljc/contact1.png">
                        <p>第二步：点击查看上级按钮。</p>
                        <img src="../../../../static/img/dljc/contact2.png">
                        <p>显示上级资料。</p>
                        <img src="../../../../static/img/dljc/contact3.png">
                        <p>说明：点击复制按钮可以复制相应的上级联系方式，如果相应联系方式显示空白，则表示上级未绑定此联系方式。</p>
                        <h1>联系下级</h1>
                        <p>第一步：账号登录，进入到个人中心》代理中心》代理会员，进入到代理会员页面。</p>
                        <img src="../../../../static/img/dljc/dljc_1.png">
                        <p>代理中心</p>
                        <img src="../../../../static/img/dljc/contact4.png">
                        <p>第二步：点击各个会员相应的详情按钮，进入到会员详情页面。</p>
                        <img src="../../../../static/img/dljc/contact5.png">
                        <p>第三步：查看会员详细信息。</p>
                        <img src="../../../../static/img/dljc/contact6.png">
                        <p>说明：点击修改按钮可以修改会员模式、转点以及转点补贴。</p>
                    </div>
                </yd-tab-panel>
            </yd-tab>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from "vuex";
    import Assistant from '../dome/assistant.vue';
    export default {
        data() {
            return {
            }
        },
        components: {
            Assistant,
        },
        created() {
        },
        methods: {
            toHelp() {
                this.$router.push({
                    path: "/help"
                });
            }
        }
    }
</script>
<style>
    .agentTutorial .yd-navbar-center-box {
        height: 45px !important;
    }
    .agentTutorial {
        height: 100%;
        text-align: center;
        background-color: #f9f9f9;
        display: flex;
        flex-direction: column;
    }
    .agentTutorial_nav {
        overflow: scroll;
        position: absolute;
        top: 1rem;
        left: 0;
        height: 100%;
        width: 100%;
        background: #f9f9f9;
        box-sizing: border-box;
        flex: 1;
        -webkit-overflow-scrolling: touch;
    }
    .agentTutorial .yd-navbar {
        z-index: 100;
    }
    .agentTutorial .yd-navbar .yd-navbar-item i {
        color: #ffffff !important;
    }
    .agentTutorial .yd-navbar span {
        color: #ffffff !important;
    }
    .agentTutorial_nav h1 {
        height: 0.6rem;
        box-sizing: border-box;
        line-height: 0.6rem;
        font-size: 0.35rem;
        text-align: left;
        padding-left: 0.3rem;
    }
    .agentTutorial_nav p {
        box-sizing: border-box;
        line-height: 0.45rem;
        font-size: 0.3rem;
        text-align: left;
        background: #ccc;
        margin-bottom: 0.1rem;
        padding: 0.1rem;
    }
    .agentTutorial_nav img {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 0.2rem;
    }
    .agentTutorial_nav i {
        color: blue;
    }
    .agentTutorial_nav .telit {
        font-size: 0.35rem;
    }
    .agency-tab {
        padding: 0.2rem 0.2rem 0.35rem;
    }
    .clou{
        border: 1px solid rgb(255, 94, 83);
        color:rgb(255, 94, 83);
        height:1.2rem;
        margin-bottom:0.2rem;
        border-radius: 0.08rem;
        line-height: 0.4rem;
        text-align: left;
        box-sizing: border-box;
        padding:0 5px;
    }
</style>


