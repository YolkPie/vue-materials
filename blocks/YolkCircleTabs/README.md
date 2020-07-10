# YolkTabs

### 简介
Tab 标签页

![截图](https://img10.360buyimg.com/imagetools/jfs/t1/142311/13/2558/24817/5f081055E7a8babc0/55c1fba583825cee.png)

### 使用方法
```
import YolkCircleTabs from '@components/YolkCircleTabs/src'

components: {
   YolkCircleTabs
}

<YolkCircleTabs :tabs="tabs" :curActive="1"/>
```

### 传参介绍
* tabs: 标签内容，数组类型，必传。比如 tabs: [{ title: '标签1', type: 1 }, {	title: '标签2', type: 2	}, { title: '标签3', type: 3 }, {	title: '标签4', type: 4	}, {	title: '标签5', type: 4 }]；
* curActive: 当前激活的tab标签，与tabs中的type相对应，必传；
* scrollable: 是否可滚动，非必传，默认宽度超出容器宽度，滚动；
* duration：动画时间，单位秒，非必传，默认0.2；
* navStyle：tabs导航条的样式，可以定义高度、颜色等，非必传；
* tabItemStyle：每个tab项的样式，可以定义字体大小和颜色等，非必传；
* lineStyle：选中'线条'的样式，包括位置、颜色等，非必传；
* clickTabItemFunc：点击tab项执行的方法，非必传


