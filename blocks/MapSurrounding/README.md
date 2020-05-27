# mapSurrounding

### 简介
地图周边组件
![使用步骤地址](http://yolkpie.net/yolkworks-list)
![截图](https://img12.360buyimg.com/imagetools/jfs/t1/130041/1/474/245604/5ece1e0bEfffeda60/f88b1401b65b28cb.png)

### 使用方法
```
import MapSurrounding from '@components/MapSurrounding/src'

components: {
   MapSurrounding,
}

<MapSurrounding :mapInfo="mapInfo" :mapKey="mapKey"/>

```

### 传参介绍
* mapKey: 腾讯地图key，必传，否则地图会展示错误；
* mapInfo: 包含必填项addressLat、addressLon和非必填项cityName、mapTitle和mapAddress，例如:
```
const mapInfo = {
	addressLat: 39.905154,
	addressLon: 116.191787,
	cityName: '北京',
    mapTitle: '长安九里 2020年城六区新入市 纯商品房 北京新房房产',
    mapAddress: '古城街道古城地铁站向南400米'
}
```
