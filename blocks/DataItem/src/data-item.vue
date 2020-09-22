<template>
 <div class="data-item">
   <p class="data-item__title">{{title}}</p>
   <div class="data-item__value" v-if="value !== ''" :style="{color: color && color.length ? color : 'rgba(0,0,0,0.85)'}">
      <span :class="`data-item__intValue ${intValue && intValue.length > 7 ? 'data-item__intValue--mini' : ''}`">{{intValue}}</span>
      <span :class="`data-item__floatValue ${intValue && intValue.length > 7 ? 'data-item__intValue--mini' : ''}`">{{floatValue}}</span>
    </div>
    <div class="data-item__value" v-else :style="{color: color && color.length ? color : 'rgba(0,0,0,0.85)'}">--</div>
 </div>
</template>

<script>
// 数据项格式说明：
// 1. 金额分为整数和小数部分 999,999,999.00
// 2. 整数位数6位数以下时，整数字号19，小数字号12
// 3. 整数位数6位数以上时，整数字号16，小数字号10
export default {
  name: 'DataItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 整数部分
    intValue () {
      const valueStr = '' + this.value
      if (valueStr && valueStr.indexOf('.') !== -1) {
        return valueStr.substr(0, valueStr.indexOf('.'))
      }
      return '' + this.value
    },
    // 小数点部分
    floatValue () {
      const valueStr = '' + this.value
      if (valueStr && valueStr.indexOf('.') !== -1) {
        return valueStr.substr(valueStr.indexOf('.'), valueStr.length)
      }
      return ''
    }
  }
}
</script>
