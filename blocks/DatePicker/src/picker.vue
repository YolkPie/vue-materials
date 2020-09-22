<template>
  <v-picker
    :data="pickerData"
    :layer="defaultIndex[0] === 2 ? 3 : 4"
    :defaultIndex="defaultIndex"
    :showToolbar="true"
    :visible.sync="isVisible"
    confirmText="完成"
    @cancel="pickerCancelHandle"
    @confirm="pickerConfirmHandle"
  >
  </v-picker>
</template>

<script>
import VuePicker from 'vue-pickers'
import {
  DateUtils
} from './dateUtils'

let data = [] // 日期选择器数据
const current = new Date()
export default {
  name: 'Picker',
  components: {
    'v-picker': VuePicker
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultData: {
      type: Array,
      default: () => [0, current.getFullYear(), current.getMonth() + 1, current.getDate()]
    }
  },
  data () {
    return {
      isVisible: false,
      pickerData: [],
      defaultIndex: [null, null, null, null]
    }
  },
  created () {
    this.initData()
  },
  watch: {
    visible (newVal) {
      this.isVisible = newVal
    }
  },
  methods: {
    // 初始化数据
    initData () {
      this.initType()
      this.initYear()
      this.initMonth()
      this.initDate()
      this.pickerData = data.slice()
    },
    // 获取选定对象的index
    getSelectedObjIndex (objs, value) {
      for (let i = 0; i < objs.length; i++) {
        if (objs[i].value === value) {
          return i
        }
      }
      return 0
    },
    // 获取类型对象
    getTypeObjs () {
      return [{
        label: '按天展示',
        value: 0
      }, {
        label: '按周展示',
        value: 1
      }, {
        label: '按月展示',
        value: 2
      }]
    },
    // 获取年份对象
    getYearObjs () {
      const years = DateUtils.getRecentYears(5)
      let yearObjs = []
      years.forEach(year => {
        yearObjs.push({
          label: `${year}年`,
          value: year
        })
      })
      return yearObjs
    },
    // 获取月份对象
    getMonthObjs (year) {
      const months = DateUtils.getMonths(year)
      let monthObjs = []
      months.forEach(month => {
        monthObjs.push({
          label: `${month}月`,
          value: month
        })
      })
      return monthObjs
    },
    // 获取日期对象
    getDateObjs (year, month) {
      const dates = DateUtils.getDates(year, month)
      let dateObjs = []
      dates.forEach(date => {
        dateObjs.push({
          label: `${date}日`,
          value: date
        })
      })
      return dateObjs
    },
    // 初始化选择类型
    initType () {
      const defaultType = this.defaultData[0]
      const typeObjs = this.getTypeObjs()
      const defaultTypeIndex = this.getSelectedObjIndex(typeObjs, defaultType)
      this.defaultIndex[0] = defaultTypeIndex
      data = JSON.parse(JSON.stringify(typeObjs))
    },
    // 初始化年
    initYear () {
      const defaultYear = this.defaultData[1]
      const yearObjs = this.getYearObjs()
      const defaultYearIndex = this.getSelectedObjIndex(yearObjs, defaultYear)
      this.defaultIndex[1] = defaultYearIndex
      data.forEach(typeItem => {
        typeItem['children'] = JSON.parse(JSON.stringify(yearObjs))
      })
    },
    // 初始化月
    initMonth () {
      const defaultMonth = this.defaultData[2]
      const monthObjs = this.getMonthObjs()
      const defaultMonthIndex = this.getSelectedObjIndex(monthObjs, defaultMonth)
      this.defaultIndex[2] = defaultMonthIndex
      data.forEach(typeItem => {
        typeItem.children.forEach(yearItem => {
          yearItem['children'] = JSON.parse(JSON.stringify(this.getMonthObjs(yearItem.value)))
        })
      })
    },
    // 初始化日期
    initDate () {
      const defaultDate = this.defaultData[3]
      data.forEach(typeItem => {
        const type = typeItem.value
        typeItem.children.forEach(yearItem => {
          const year = yearItem.value
          yearItem.children.forEach(monthItem => {
            const month = monthItem.value
            if (type !== 2) {
              // 按月展示不需要日期的数据
              const dateObjs = this.getDateObjs(year, month)
              const defaultDateIndex = this.getSelectedObjIndex(dateObjs, defaultDate)
              this.defaultIndex[3] = defaultDateIndex
              monthItem['children'] = JSON.parse(JSON.stringify(dateObjs))
            }
          })
        })
      })
    },
    // picker组件confirm事件
    pickerConfirmHandle (res) {
      let obj = JSON.parse(JSON.stringify(res))
      if (obj[0].children) {
        delete obj[0].children
      }
      if (obj[1].children) {
        delete obj[1].children
      }
      if (obj[2].children) {
        delete obj[2].children
      }
      if (obj[3].children) {
        delete obj[3].children
      }
      this.isVisible = false
      this.$emit('confirm', obj)
    },
    /**
     * 取消操作
     */
    pickerCancelHandle () {
      this.isVisible = false
      this.$emit('cancel')
    }
  }
}
</script>
