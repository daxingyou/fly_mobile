// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import store from './store/index.js'
import 'babel-polyfill'
import $actionSheet from '@/components/common/actionsheet/index.js'
import '@/components/common/actionsheet/css/_actionsheet.scss'
import VueClipboard2 from 'vue-clipboard2'
import Picker from './components/common/picker/index.js'
import VueScroller from './customComponents/scroll'
import VueAwesomeSwiper from 'vue-awesome-swiper'
//import 'flex.css'
// import VConsole from 'vconsole'
// let vConsole = new VConsole()

// require styles
import 'swiper/dist/css/swiper.css'

//import 'lib-flexible'
//自定义组件
import Keyboard from "@/customComponents";
Vue.use(Keyboard)
// import numberInput from "@/customComponents/numberInput/numberInput"; 
// import {Spinner} from "@/customComponents/spinner/index.js";

import Tab from 'vant/lib/tab';
import Tabs from 'vant/lib/tabs';
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'
Vue.component(Tabs.name, Tabs)
Vue.component(Tab.name, Tab)
// Vue.component('keyboard', keyboard)
// Vue.component('numberInput', numberInput)
// Vue.component('Spinner', Spinner)
Vue.use(VueClipboard2)
Vue.use(Picker)
Vue.use(VueScroller)

Vue.prototype.$actionSheet = window.$actionSheet = $actionSheet

import 'vue-ydui/dist/ydui.flexible.js';
import '@/directives';
// 定义了全局变量和方法包括 时间格式化
import common from './common.vue';
Vue.prototype.global=common;

import 'vue-ydui/dist/ydui.base.css';

// 提示框
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};



Vue.config.productionTip = false
Vue.use(YDUI)
//获取当前时间
//sessionStorage.setItem("currentDate",(moment().format('YYYY-MM-DD HH:mm:ss')).split(" ")[0]);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
