# YolkTabs

### 简介
Tab 标签页

[使用步骤地址](https://yolkpie.net/yolkworks-list/#/detail/vue-yolkTabs-block)
![截图](https://img12.360buyimg.com/imagetools/jfs/t1/118585/23/11924/25757/5f07d647E5aa14b9e/691db6bdec3d4e91.png)

### 使用方法
```
import YolkTabs from '@components/YolkTabs/src'

components: {
   YolkTabs
}

<YolkTabs :tabs="tabs"/>
```

### 传参介绍
* tabs: 标签内容，数组类型，必传。比如 tabs: [{ title: '标签1' }, {	title: '标签2'	}, { title: '标签3' }, {	title: '标签4'	}, {	title: '标签5' }]；
* scrollable: 是否可滚动，非必传，默认宽度超出容器宽度，滚动；
* duration：动画时间，单位秒，非必传，默认0.2；
* navStyle：tabs导航条的样式，可以定义高度、颜色等，非必传；
* tabItemStyle：每个tab项的样式，可以定义字体大小和颜色等，非必传；
* lineStyle：选中'线条'的样式，包括位置、颜色等，非必传；
* clickTabItemFunc：点击tab项执行的方法，非必传


