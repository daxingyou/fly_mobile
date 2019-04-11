import Keyboard from './keyboard';


const install = function (Vue) {
    Vue.prototype.$showKeyboard = Keyboard
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};
