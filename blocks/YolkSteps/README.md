# yolkSteps

### 简介
Steps 步骤条

![截图](https://img12.360buyimg.com/imagetools/jfs/t1/132981/17/4063/27307/5f07d06eEd748031b/82c21dc9b66b82d1.png)

### 使用方法
```
import YolkSteps from '@components/YolkSteps/src'

components: {
   YolkSteps
}

 <YolkSteps :stepsTitle="stepsTitle" :activeStep="activeStep"/>

```

### 传参介绍
* stepsTitle: 步骤条的内容，数组类型，必传。比如 stepsTitle: ['步骤1', '步骤2', '步骤3', '步骤4']；
* activeStep: 当前步骤的索引，非必传，默认从 1 起计；


