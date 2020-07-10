# SubTitle

### 简介
子标题组件

![截图](https://img12.360buyimg.com/imagetools/jfs/t1/142171/25/2549/11544/5f07d90bEaa373669/18ad6fba48bc9323.png)

### 使用方法
```
import SubTitle from '@components/SubTitle/src'

components: {
   SubTitle,
}

<subTitle title="楼盘信息" :isShowHandleBtn="true" @clickTitleHandleBtn="xxx" />

```

### 传参介绍
* title: 子标题内容，必传；
* isShowHandleBtn: 是否展示右边的操作按钮，非必传，默认是false，即不展示；
* handleBtnText：右边操作按钮名称，非必传，默认是详情


