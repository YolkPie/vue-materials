<template>
  <ul class="steps-box" v-if="stepsTitle">
    <li
      class="step-li"
      :class="{'passed-step': activeStep > index}"
      v-for="(item, index) in stepsTitle">
      <div class="step-bar">
        <div class="step-bar_inner">
          <span class="step-bar_num">{{index+1}}</span>
        </div>
      </div>
      <p class="step-des">{{item}}</p>
    </li>
  </ul>
</template>
<script>
	export default{
		props: {
			stepsTitle: {
				type: Array,
				default: null
			},
			activeStep: {
				type: Number,
				default: 1
			}
		}
	}
</script>
<style scoped lang="scss">
  .steps-box {
    display: flex;
    width: 100%;
    .step-li {
      text-align: center;
      flex: 1;
    }
    .step-bar {
      position: relative;
      margin-bottom: .1rem;
      width: 100%;
      z-index: 1;
    }
    .step-bar:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 4px;
      background-color: #F1F2F5;
      transform: translateY(-50%) scaleY(0.5) translateX(-50%);
      z-index: -1;
    }
    .step-bar_inner {
      width: 100%;
    }
    .step-bar_num {
      display: inline-block;
      width: .46rem;
      height: .46rem;
      line-height: .46rem;
      border-radius: 50%;
      font-size: .32rem;
      color: #ccc;
      background-color: #F1F2F5;
    }
    .passed-step {
      .step-bar_inner:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 4px;
        background-color: #C7A26A;
        transform: translateY(-50%) scaleY(0.5) translateX(-50%);
        z-index: -1;
      }
      .step-bar_num {
        color: #fff;
        background-color: #C7A26A;
      }
    }
    .step-li:first-child {
      .step-bar:before {
        left: 50%;
        width: 50%;
        transform: translateY(-50%) scaleY(0.5) translateX(0);
      }
      .step-bar_inner:before {
        left: 50%;
        width: 50%;
        transform: translateY(-50%) scaleY(0.5) translateX(0);
      }
    }
    .step-li:last-child {
      .step-bar:before {
        left: 0;
        width: 50%;
        transform: translateY(-50%) scaleY(0.5) translateX(0);
      }
      .step-bar_inner:before {
        left: 0;
        width: 50%;
        transform: translateY(-50%) scaleY(0.5) translateX(0);
      }
    }
    .step-des {
      font-size: .22rem;
      color: #2E2D2D;
    }

  }
</style>
