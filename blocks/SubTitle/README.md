# mapSurrounding

### 简介
子标题组件

[使用步骤地址](https://yolkpie.net/yolkworks-list/#/detail/vue-subTitle-block)
![截图](https://img11.360buyimg.com/imagetools/jfs/t1/125652/38/3169/18606/5ece28b6E130bc50d/23f8f124ad6c82f0.png)

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


