<template>
  <!--1. 取消了photoswipe图片需设定尺寸的要求-->
  <!--2. 支持slot扩展头部和尾部内容-->
  <div
    ref="scaler" class="pswp"
    :style="pswpStyle"
    tabindex="-1" role="dialog">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="yolk-pswp__header">
        <slot name="header"></slot>
      </div>
      <div class="yolk-pswp__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
	import PhotoSwipe from './photoswipe'
	import './photoswipe.css'
	export default {
		props: {
			imgList: {
				type: Array,
				default: []
      },
			options: {
				type: Object,
				default () {
					return {}
				}
			},
			pswpStyle: {
				type: Object,
				default () {
					return {}
				}
      }
    },
    data() {
			return {
				photoSwipe: null
      }
    },
    methods: {
			initImgs(imgs) {
				return imgs.map(item => {
					if (item.w === undefined) {
						item.w = 0
						item.h = 0
					}
					return item
				})
			},
			init(options, imgs) {
				const self = this
				this.imgs = imgs
				this.photoswipe = new PhotoSwipe(this.$el, false, this.imgs, options)
				this.photoswipe.listen('gettingData', function (index, item) {
					if (!item.w || !item.h) {
						const img = new Image()
						img.onload = function () {
							item.w = this.width
							item.h = this.height
							self.photoswipe.updateSize(true)
						}
						img.src = item.src
					}
				})
				this.photoswipe.init()

      },
			show(index) {
				return new Promise((resolve) => {
					this.$nextTick(() => {
						const options = {
							...this.options,
							index
						}
						console.log(this.imgList, 'this.imgList')
						this.init(options, this.initImgs(this.imgList))
						resolve(this.photoswipe)
					})
				})

			},
    }
	}
</script>

<style scoped lang="scss">
  .yolk-pswp {
    &__header {
      position: absolute;
      top: 0;
      width: 100%;
    }
    &__footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      min-height: 44px;
    }
  }
</style>
