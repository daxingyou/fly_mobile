import Picker from './picker.vue';
import Vue from 'vue';

const VueIosPickers = {
  install() {
    Vue.component(Picker.name, Picker);
  }
};

// if (typeof window !== 'undefined' && window.Vue) {
//   Vue.use(VueIosPickers);
// }

export default VueIosPickers;
