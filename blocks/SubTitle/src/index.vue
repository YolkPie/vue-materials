<template>
  <div class="house-title row-center-start">
    <h3 class="house-title__text">
      <span class="house-title__split"></span>
      <span class="house-title__title-text">{{title}}</span>
    </h3>
    <div
      class="house-title__btn row-center"
      v-if="isShowHandleBtn"
      @click="clickTitleHandleBtn"
    >
      <span style="line-height: .3rem">{{handleBtnText}}</span>
      <i class="house-title__btn-arrow"></i>
    </div>
  </div>
</template>

<script>
	export default {
		props: {
			title: { // 子标题的内容
				type: String,
				required: true
			},
			isShowHandleBtn: { // 是否展示操作按钮
				type: Boolean,
				default: false
			},
			handleBtnText: { // 操作按钮名称
				type: String,
				default: '详情'
			},
		},
		methods: {
			clickTitleHandleBtn() {
				this.$emit('clickTitleHandleBtn')
			}
		}
	}
</script>

<style lang="scss" scoped>
  .row-center-start {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .house-title {
    position: relative;
    padding-left: .3rem;
    width: 100%;
    height: 1.04rem;
    background-color: #fff;
    box-sizing: border-box;
    &__text {
      flex: 1;
      line-height: normal;
      font-size: .3rem;
      color: #424854;
      font-weight: bold;
    }
    &__split {
      display: inline-block;
      vertical-align: middle;
      margin-right: .02rem;
      width: .06rem;
      height: .28rem;
      background-color: #424854;
    }
    &__title-text {
      display: inline-block;
      vertical-align: middle;
    }
    &__btn {
      padding: 0 .3rem;
      height: 100%;
      line-height: normal;
      font-size: .26rem;
      color: #848689;
    }
    &__btn-arrow {
      padding-left: .08rem;
      width: .14rem;
      height: .22rem;
      background: url(../../../assets/img/common/light_gray_right_arrow.png) no-repeat right center/contain;
    }
  }
</style>
