<template>
    <div id="iddrag" class="drag" ref="dragDiv">
        <div class="drag_bg"></div>
        <div class="drag_text">{{confirmWords}}</div>
        <div ref="moveDiv"
         @touchstart="mousedownFn($event)" 
         :class="{'handler_ok_bg':confirmSuccess}" 
         class="handler handler_bg" 
         style="position: absolute;top: 0px;left: 0px;"></div>
         <div class="bigPng" ref="bigPng_dragDiv">
             <div class="bigPng_drag_bg drag_bg"></div>
             <div class="bigPng_drag_text drag_text">
                <img id='imga' class="drag_imgs" src="" alt="">
                <i class="fa fa-repeat"  @click="_validateImgCode()"></i>
             </div>
             <div ref="bigPng_moveDiv" 
               
                :class="{'handler_ok_bg':confirmSuccess}" 
                class="handler handler_bg bigPng_handler" 
                style="position: absolute;top: 0px;left: 0px;">
                <img id='imgb' class="drag_imgs" src="" alt=""></div>
                
         </div>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from "vuex";

    export default {
        data(){
            return {
                beginClientX:0,           /*距离屏幕左端距离*/
                mouseMoveStata:false,     /*触发拖动状态  判断*/
                maxwidth:'',               /*拖动最大宽度，依据滑块宽度算出来的*/
                confirmWords:'向右拖动滑块填充拼图',   /*滑块文字*/
                confirmSuccess:false,           /*验证成功判断*/
                Y:'',
            }
        },
        props:['show_Png','username','password'],
        computed: {
			...mapState('login', [
				'userDetails','loginpuzzleShow'
			]),
		},
        created(){
            // console.log(this.show_Png,this.username,this.password,'321')
            this._validateImgCode()
        },
        methods: {
            ...mapActions('login', [
                'validateImgCode',
                'memberLogin',
                'getIp'
            ]),
            ...mapMutations('login', [
				"saveUserDetails",'setLoginpuzzleShow'
            ]),
            ...mapMutations(['showPng','setIsLogin','setService_b']),
            // 请求图片地址
            _validateImgCode(){
                this.validateImgCode().then( res => {
                    this.Y = res.data.Y;
                    document.getElementById('imgb').style.top = res.data.Y+'px';
                    document.getElementById('imga').setAttribute( 'src', 'data:image/png;base64,'+res.data.oriCopyImage );
                    document.getElementById('imgb').setAttribute( 'src', 'data:image/png;base64,'+res.data.newImage );
                })

            },
            mousedownFn:function (e) {
                // this._validateImgCode()
                this.showPng = true;
                if(!this.confirmSuccess){
                    e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
                    this.mouseMoveStata = true;
                    this.beginClientX = e.changedTouches[0].clientX;
                }
            },        //mousedoen 事件
            successFunction(){
                this.confirmSuccess = true;
                
                this.confirmWords = '验证通过';
                if(window.addEventListener){
                    document.getElementById('iddrag').addEventListener('touchmove',this.mouseMoveFn);
                    document.getElementsByClassName('handler')[0].addEventListener('touchend',this.moseUpFn)
                    // document.getElementsByTagName('html')[0].removeEventListener('touchmove',this.mouseMoveFn);
                    // document.getElementsByTagName('html')[0].removeEventListener('touchend',this.moseUpFn);
                }else {
                    document.getElementsByTagName('html')[0].removeEventListener('touchend',()=>{});
                }
                document.getElementsByClassName('drag_text')[0].style.color = '#2061b3'
                // document.getElementsByClassName('bigPng_drag_text')[0].style.color = '#2061b3'
                this.showPng = false;
            },                //验证成功函数
            mouseMoveFn(e){
                if(this.mouseMoveStata){
                    let width = e.changedTouches[0].clientX - this.beginClientX;
                    // console.log(width,this.maxwidth)
                    if(width>0 && width<=this.maxwidth){
                        document.getElementsByClassName('handler')[0].style.left = width + 'px';
                        document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
                        
                        document.getElementsByClassName('bigPng_handler')[0].style.left = width + 'px';
                        document.getElementsByClassName('bigPng_drag_bg')[0].style.width = width + 'px';
                    }else if(width>this.maxwidth){
                        // this.successFunction();
                    }
                }
            },                   //mousemove事件
            moseUpFn(e){
                this.mouseMoveStata = false;
                var width = e.changedTouches[0].clientX - this.beginClientX;
                this.slildLogin(width)
                if(width<0){
                    document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                    document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
                    document.getElementsByClassName('bigPng_handler')[0].style.left = 0 + 'px';
                    document.getElementsByClassName('bigPng_drag_bg')[0].style.width = 0 + 'px';
                }
            } ,
            // 验证码登录
            slildLogin(leftX){
                this.memberLogin({
                    username: this.username,
					password: hex_md5(this.password),
                    loginFrom: "3",
                    X:leftX,
                    Y:this.Y,
                }).then( res => {
                    if(res.code === 0){
                        this.successFunction();
                        const params = {
								"type": res.data.type,
								"loginWay": 3
							}
							this.getIp(params)
							this.saveUserDetails(res.data)
							sessionStorage.setItem('password', hex_md5(this.password));
							this.setIsLogin(true);
							this.$router.push({
								name: "allKinds"
                            })
                            this.setLoginpuzzleShow(false)
                    }else if(res.code === 303){
                        this.$dialog.toast({
                            mes: res.msg,
                            timeout: 1500
                        });
                        this.setLoginpuzzleShow(false)
                    }else{
                        this.$dialog.toast({
                            mes: res.msg,
                            timeout: 1500
					    });
                        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
                        document.getElementsByClassName('bigPng_handler')[0].style.left = 0 + 'px';
                        document.getElementsByClassName('bigPng_drag_bg')[0].style.width = 0 + 'px';
                        this._validateImgCode();
                    }
                })
            },                      //mouseup事件
        },
        mounted(){
            this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
            document.getElementById('iddrag').addEventListener('touchmove',this.mouseMoveFn);
            document.getElementsByClassName('handler')[0].addEventListener('touchend',this.moseUpFn)
        },
        watch:{
            showPng(){

            }
        }
    }
</script>

<style scoped>
    .drag{
        position: relative;
        background-color: #f7f9fa;
        width: 260px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        z-index: 3;
    }
    .handler{
        width: 50px;
        height: 100%;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff url("../../../static/img/go_right.png") no-repeat center;
    }
    .handler_ok_bg{
        background: #fff url("../../../static/img/login_gou.png") no-repeat center;
    }
    .drag_bg{
        background-color: #d1e9fe;
        border-color: #1991fa !important;
        height: 100%;
        width: 0px;
    }
    .drag_text{
        position: absolute;
        top: 0px;
        width: 100%;text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
        border: 1px solid #c5cad0;
        height: 100%;
        line-height: 50pxss;
        color: #45494c;
    }
    .bigPng{
        height: 116px;
        width: 260px;
        position: absolute;
        top: -130px;
        left: 0;
        z-index: 10;
    }
    .drag_imgs{
        width: 100%;
        height: 100%;
    }

    .bigPng_drag_text .fa{
        position: absolute;
        right: 0.15rem;
        top: 0.15rem;
        height: 0.6rem;
        font-size: 0.4rem;
        color: #ccc;
        z-index: 4;
    }
    #imgb{
        width: 50px;
        height: 50px;
        position: absolute;
        left: 0;
        
    }
    .bigPng_handler{
        background-color: rgba(255,255,255,0.1) !important;
        border: 0 !important;
    }
</style>