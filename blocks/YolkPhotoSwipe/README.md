# YolkTabs

### 简介
Tab 标签页

[使用步骤地址](https://yolkpie.net/yolkworks-list/#/detail/vue-yolkTabs-block)
![截图](https://img10.360buyimg.com/imagetools/jfs/t1/124603/1/6764/189709/5f080bffE7a6559ed/9feef1062bebdba3.png)

### 说明
* 在原版[photoswipe](https://photoswipe.com)
基础上，添加以下优化点：
1. 取消了photoswipe图片需设定尺寸的要求；
2. 支持slot扩展头部和尾部内容；
3. 解决两张图片不能循环轮播的问题；
4. 解决图片渲染失败时错误提示不居中的问题

### 使用方法
```
import YolkPhotoSwipe from '@components/YolkPhotoSwipe/src'

components: {
   YolkPhotoSwipe
}

<YolkPhotoSwipe
  ref="photoSwipe"
  :imgList="imgList" :options="photoSwipeOptions"
  :pswpStyle="pswpStyle"
>
  <div slot="header">
   
  </div>
  <div slot="footer" class="view-img__footer">
    
  </div>
</YolkPhotoSwipe>
```

### 传参介绍
* imgList：图片列表数据，数组类型，必传。；比如imgList: [{ src: xxx;}, { src: xxx }];
* options: 轮播图属性设置，非必传；
* pswpStyle: 自定义轮播图的样式，非必传



