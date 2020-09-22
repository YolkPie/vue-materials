const DateUtils = {
  /**
   * 获取指定位数的年份
   * @param {*} yearCount
   */
  getRecentYears (yearCount = 5) {
    // 获取最近几年的年份
    const current = new Date()
    const currentYear = current.getFullYear()
    let years = []
    for (let i = currentYear - yearCount + 1; i <= currentYear; i++) {
      years.push(i)
    }
    return years
  },
  /**
   * 获取月份
   * @param {*} year
   * @param {*} isHistory 是否为历史月份(最大为当前月)
   */
  getMonths (year, isHistory = true) {
    const current = new Date()
    const currentYear = current.getFullYear()
    const currentMonth = current.getMonth() + 1
    const maxMonth = (year === currentYear && isHistory) ? currentMonth : 12
    let months = []
    for (let i = 1; i <= maxMonth; i++) {
      months.push(i)
    }
    return months
  },
  /**
   * 获取指定年月的日期
   * @param {*} year
   * @param {*} month
   * @param {*} isHistory 是否为历史日期（最大为昨天）
   */
  getDates (year, month, isHistory = true) {
    const current = new Date()
    const currentYear = current.getFullYear()
    const currentMonth = current.getMonth() + 1
    const currentDate = current.getDate()
    const maxDate = currentYear === year && currentMonth === month && isHistory ? currentDate - 1 : new Date(year, month, 0).getDate()
    let days = []
    for (let i = 1; i <= maxDate; i++) {
      days.push(i)
    }
    return days
  },
  /**
   * 获取格式化后的时间
   * @param {*} timestamp
   */
  getFormatTime (timestamp) {
    if (timestamp) {
      let time = new Date(timestamp)
      let array = []
      array.push(time.getFullYear())
      array.push(time.getMonth() + 1)
      array.push(time.getDate())
      array.push(time.getHours())
      array.push(time.getMinutes())
      array.push(time.getSeconds())
      return array.map((value) => {
        return value > 9 ? value.toString() : '0' + value
      })
    } else {
      return []
    }
  },
  /**
   * 获取昨天时间
   */
  getYesterdayTimeStamp () {
    const now = Date.now()
    return now - 24 * 60 * 60000
  },
  /**
   * 获取天（2020-08-24）
   * @param {*} timestamp
   */
  getTimeStrByDay (timestamp) {
    const timeArr = this.getFormatTime(timestamp)
    if (timeArr.length) {
      return `${timeArr[0]}-${timeArr[1]}-${timeArr[2]}`
    }
    return ''
  },
  /**
   * 获取月（2020-08）
   * @param {*} timestamp
   */
  getTimeStrByMonth (timestamp) {
    const timeArr = this.getFormatTime(timestamp)
    if (timeArr.length) {
      return `${timeArr[0]}-${timeArr[1]}`
    }
    return ''
  },
  /**
   * 获取周（2020-01）
   * @param {*} timestamp
   */
  getTimeStrByWeek (timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    let week = this.getWeekOfYear(timestamp)
    if (week <= 9) {
      week = '0' + week
    }
    return `${year}-${week}`
  },
  /**
   * 获取天（2020.08.24）
   * @param {*} timestamp
   * @param {*} withYear
   */
  getTimeStrByDay_Dotted (timestamp, withYear = true) {
    const timeArr = this.getFormatTime(timestamp)
    if (timeArr.length) {
      return `${withYear ? (timeArr[0] + '.') : ''}${timeArr[1]}.${timeArr[2]}`
    }
    return ''
  },
  /**
   * 获取是第几周
   * @param {*} timetamp
   */
  getWeekOfYear (timetamp) {
    const date = new Date(timetamp)
    let date2 = new Date(date.getFullYear(), 0, 1)
    let day1 = date.getDay()
    if (day1 === 0) day1 = 7
    let day2 = date2.getDay()
    if (day2 === 0) day2 = 7
    const d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000)
    return Math.ceil(d / 7) + 1
  },
  /**
   * 获取指定日期所在周的起止日期
   * @param {*} timestamp
   */
  getWeekDateRange (timestamp) {
    const beginDate = this.getNextDate(timestamp, 1)
    const endDate = this.getNextDate(timestamp, 7)
    return [beginDate, endDate]
  },
  /**
   * 获取所在周周几的日期
   * @param {*} timestamp
   * @param {*} weekDay 周几
   */
  getNextDate (timestamp, weekDay) {
    const nowDate = new Date(timestamp)
    let day = nowDate.getDay()
    if (day === 0) {
      day = 7
    }
    let time = nowDate.getTime()
    // 先计算与今天差了几天
    const sub = weekDay - day
    time += sub * 24 * 3600000
    nowDate.setTime(time)
    return nowDate.valueOf()
  }
}

export {
  DateUtils
}
