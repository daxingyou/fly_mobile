import Vue from 'vue';
import KeyboardVue from './Keyboard.vue'
const KeyboardConstructor = Vue.extend(KeyboardVue);


const instance = new KeyboardConstructor({
    el: document.createElement('div')
});

KeyboardConstructor.prototype.closeKeyboard = function () {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
    typeof this.callback === 'function' && this.callback();
};

const Keyboard = (options = {}) => {
    instance.val = options.val;
    instance.show = options.show;
    instance.callback = options.callback;
    instance.closeCallback = options.closeCallback;
    
    document.getElementById("bet").appendChild(instance.$el);
//  options.el.appendChild(instance.$el);
};

export default Keyboard;
