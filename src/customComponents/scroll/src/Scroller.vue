<template>
  <div ref="container" class="_v-container" :id="containerId"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
    @mouseWheel="mouseWheel($event)"
  >
    <div class="_v-content" :id="contentId">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="css" >

  ._v-container {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  ._v-container > ._v-content {
    /*width: 100%;*/
    /*  width: 1000px;*/
    -webkit-transform-origin: left top;
    -webkit-transform: translateZ(0);
    -moz-transform-origin: left top;
    -moz-transform: translateZ(0);
    -ms-transform-origin: left top;
    -ms-transform: translateZ(0);
    -o-transform-origin: left top;
    -o-transform: translateZ(0);
    transform-origin: left top;
    transform: translateZ(0);
  }

  ._v-container > ._v-content > .pull-to-refresh-layer {
    width: 100%;
    height: 60px;
    margin-top: -60px;
    text-align: center;
    font-size: 16px;
    color: #AAA;
  }

  ._v-container > ._v-content > .loading-layer {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    color: #AAA;
    position: relative;
  }

  ._v-container > ._v-content > .loading-layer > .no-data-text
  {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  ._v-container > ._v-content > .loading-layer > .spinner-holder,
  ._v-container > ._v-content > .loading-layer > .no-data-text
  {
    opacity: 0;
    transition: opacity .15s linear;
    -webkit-transition: opacity .15s linear;
  }

  ._v-container > ._v-content > .loading-layer > .spinner-holder.active,
  ._v-container > ._v-content > .loading-layer > .no-data-text.active
  {
    opacity: 1;
  }

  ._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder,
  ._v-container > ._v-content > .loading-layer .spinner-holder {
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }

  ._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .arrow,
  ._v-container > ._v-content > .loading-layer .spinner-holder .arrow {
    width: 20px;
    height: 20px;
    margin: 8px auto 0 auto;

    -webkit-transform: translate3d(0,0,0) rotate(0deg);
    transform: translate3d(0,0,0) rotate(0deg);

    -webkit-transition: -webkit-transform .2s linear;
    transition: transform .2s linear;
  }

  ._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .text,
  ._v-container > ._v-content > .loading-layer .spinner-holder .text {
    display: block;
    margin: 0 auto;
    font-size: 14px;
    line-height: 20px;
    color: #aaa;
  }

  ._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .spinner,
  ._v-container > ._v-content > .loading-layer .spinner-holder .spinner {
    margin-top: 14px;
    width: 32px;
    height: 32px;
    fill: #444;
    stroke: #69717d;
  }

  ._v-container > ._v-content > .pull-to-refresh-layer.active .spinner-holder .arrow {
    -webkit-transform: translate3d(0,0,0) rotate(180deg);
    transform: translate3d(0,0,0) rotate(180deg);
  }
  ._v-container .scroll-bar-v {
    top: 2px;
    right: 3px;
    bottom: 2px;
    width: 3px;
}
._v-container .scroll-bar {
    position: absolute;
    z-index: 9999;
}

.scroll-bar-indicator {
    position: absolute;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.3);
    opacity: 1;
    -webkit-transition: opacity 0.3s linear;
    transition: opacity 0.3s linear;
}
.scroll-bar-v .scroll-bar-indicator {
    width: 100%;
}
.scroll-bar-indicator.scroll-bar-fade-out {
    opacity: 0;
}
</style>
<script>
  import Scroller from './core'
  import getContentRender from './render'

  const re = /^[\d]+(\%)?$/

  const widthAndHeightCoerce = (v) => {
    if (v[v.length - 1] != '%') return v + 'px'
    return v
  }

  const widthAndHeightValidator = (v) => {
    return re.test(v)
  }

  export default {

    props: {
      width: {
        type: String,
        default: '100%',
        validator: widthAndHeightValidator
      },

      height: {
        type: String,
        default: '100%',
        validator: widthAndHeightValidator
      },

      snapping: {
        type: Boolean,
        default: false
      },
      scrollingX: {
        type: Boolean,
        default: false
      },
      scrollingY: {
        type: Boolean,
        default: true
      },
      snapWidth: {
        type: Number,
        default: 100
      },

      snapHeight: {
        type: Number,
        default: 100
      },

      animating: {
        type: Boolean,
        default: true
      },

      animationDuration: {
        type: Number,
        default: 250
      },

      bouncing: {
        type: Boolean,
        default: true
      },
      cssClass: String, // content css class
      minContentHeight: {
        type: Number,
        default: 0 // px
      }
    },

    computed: {
      w: function () {
        return widthAndHeightCoerce(this.width)
      },

      h: function () {
        return widthAndHeightCoerce(this.height)
      },

      showInfiniteLayer () {
        let contentHeight = 0 
        this.content
          ? contentHeight = this.content.offsetHeight
          : void 666

        return this.onInfinite
          ? contentHeight > this.minContentHeight
          : false
      }
    },

    data() {
      return {
        containerId: 'outer-' + Math.random().toString(36).substring(3, 8),
        contentId: 'inner-' + Math.random().toString(36).substring(3, 8),


        container: undefined,
        content: undefined,
        scroller: undefined,
        mousedown: false,
        infiniteTimer: undefined,
        resizeTimer: undefined
      }
    },

    mounted () {
      this.container = document.getElementById(this.containerId)
      this.container.style.width = this.w
      this.container.style.height = this.h

      this.content = document.getElementById(this.contentId)
      if (this.cssClass) this.content.classList.add(this.cssClass)

      let render = getContentRender(this.content)

      this.scroller = new Scroller(render, {
      	el:this.$refs.container,
        scrollingX: this.scrollingX,
        scrollingY:this.scrollingY,
        snapping: this.snapping,
        animating: this.animating,
        animationDuration: this.animationDuration,
        bouncing: this.bouncing
      })



      // setup scroller
      let rect = this.container.getBoundingClientRect()
      this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop)

      // snapping
      if (this.snapping) {
        // console.log(this.snapWidth, this.snapHeight)
        this.scroller.setSnapSize(this.snapWidth, this.snapHeight)
      }

      // onContentResize
      const contentSize = () => {
        return {
          width: this.content.offsetWidth,
          height: this.content.offsetHeight
        }
      }

      let { content_width, content_height } = contentSize()
      
      this.resizeTimer = setInterval(() => {
        let {width, height} = contentSize()
        if (width !== content_width || height !== content_height) {
          content_width = width
          content_height = height
          this.resize()
        }
      }, 10);
    },

    destroyed () {
      clearInterval(this.resizeTimer);
      if (this.infiniteTimer) clearInterval(this.infiniteTimer);
    },

    methods: {
      resize() {
        let container = this.container;
        let content = this.content;
        this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
      },
      scrollTo(x, y, animate) {
        this.scroller.scrollTo(x, y, animate)
      },

      scrollBy(x, y, animate) {
        this.scroller.scrollBy(x, y, animate)
      },

      touchStart(e) {
        // Don't react if initial down happens on a form element
        if (e.target.tagName.match(/input|textarea|select/i)) {
          return
        }
        this.scroller.doTouchStart(e.touches, e.timeStamp)
      },

      touchMove(e) {
        e.preventDefault()
        this.scroller.doTouchMove(e.touches, e.timeStamp)
      },

      touchEnd(e) {
        
        this.scroller.doTouchEnd(e.timeStamp)
      },

      mouseDown(e) {
        // Don't react if initial down happens on a form element
        if (e.target.tagName.match(/input|textarea|select/i)) {
          return
        }
        this.scroller.doTouchStart([{
          pageX: e.pageX,
          pageY: e.pageY
        }], e.timeStamp)
        this.mousedown = true
      },

      mouseMove(e) {
        if (!this.mousedown) {
          return
        }
        this.scroller.doTouchMove([{
          pageX: e.pageX,
          pageY: e.pageY
        }], e.timeStamp)
        this.mousedown = true
      },

      mouseUp(e) {
        if (!this.mousedown) {
          return
        }
        this.scroller.doTouchEnd(e.timeStamp)
        this.mousedown = false
      },
      

      // 获取位置
      getPosition() {
        let v = this.scroller.getValues()
        return {
          left: parseInt(v.left),
          top: parseInt(v.top)
        }
      },
    }
  }
</script>
