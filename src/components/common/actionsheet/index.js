import Vue from 'vue'
import ActionSheet from './ActionSheet'

// import {createElement} from '../utils'

const createElement = (marker, tag) => {
  let el = document.createElement(tag || 'div')
  el.setAttribute(marker, '')
  document.body.appendChild(el)
}

class VonicActionSheet {
  constructor() {
    this._vm = undefined
  }

  show(option) {
    createElement('von-action-sheet')

    this._vm = new Vue(ActionSheet)
    this._vm.$mount('[von-action-sheet]')

    setTimeout(() => {
      this._vm.show(option)
    })
  }

  hide(buttonIndex) {
    this._vm.hide(buttonIndex)
  }

  getState() {
    return this._vm ? this._vm.getState() : 0
  }
}
console.log(new VonicActionSheet())
export default new VonicActionSheet()
