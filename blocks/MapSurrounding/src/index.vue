<template>
  <div class="house-location">
    <!--不要直接在地图盒子上通过@click设置点击事件，可能会执行多次点击事件-->
    <!--直接给添加地图点击事件-->
    <div
      class="map-box"
      id="map-box"
    ></div>

    <div class="tab-box">
      <ul class="tab-ul flex-row">
        <li
          class="tab-li flex-one"
          :class="{'selected-li': slectedIndex == index}"
          v-for="(item, index) in tabs"
          :key="'mapTab_'+index"
          @click="switchTab(item.name, index)"
        >{{item.name}}
        </li>
      </ul>
      <div class="info-box">
        <ul class="info-ul border-bottom" v-if="displayedPoiList && displayedPoiList.length">
          <li class="info-li" v-for="(item, index) in displayedPoiList" :key="'infoLi_'+index">
            <span class="label-name">{{item.customLabelName}}</span>
            <span class="info-details">{{item.name}}</span>
            <span class="distance">{{item.customDist}}</span>
          </li>
        </ul>
        <div class="no-info border-bottom" v-else>
          <p class="tip-info">抱歉，3公里内没有{{tabs[slectedIndex].name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import TMap from './map'

	export default {
		props: ['mapInfo', 'mapKey'],
		data() {
			return {
				map: '',
				marker: '',
				tabs: [
					{
						name: '公交',
					}, {
						name: '地铁',
					}, {
						name: '商场',
					}, {
						name: '学校',
					}, {
						name: '医院',
					}, {
						name: '银行',
					}
				],
				slectedIndex: 0,
				addressOverlay: null, // 地图上的信息覆盖物
				displayedPoiList: [] // 展示在页面上的poi信息
			}
		},
		created() {
			this.initMap()
		},
		activated() {
			this.initSearchService()
		},
		methods: {
			initMap() {
				const { addressLat: lat, addressLon: lng, mapTitle, mapAddress } = this.mapInfo
        const locationIconUrl = 'https://img13.360buyimg.com/imagetools/jfs/t1/122736/18/3158/1064/5ece1822E5338665c/ab2190c296ea5f01.png'
				TMap(this.mapKey || '').then(qq => {
					let latLng = new qq.maps.LatLng(lat, lng)
					this.map = new qq.maps.Map(document.getElementById("map-box"), {
						center: new qq.maps.LatLng(lat + 0.0015, lng - 0.0025),
						zoom: 15,
						draggable: false,
						scrollwheel: false,
						disableDoubleClickZoom: false,
						zoomControl: false,
						panControl: false,
						mapTypeControl: false
					})
					this.marker = new qq.maps.Marker({
						icon: new qq.maps.MarkerImage(locationIconUrl, '', '', '', new qq.maps.Size(24, 32)),
						position: latLng,
						map: this.map
					})
          // 设置地图覆盖物
          if (mapTitle) {
						const addressOverlayClass = this.getAddressOverlay(this)
						this.addressOverlay = new addressOverlayClass(latLng, mapTitle || '', mapAddress || '')
						this.map && this.addressOverlay.setMap(this.map)
					}
					this.initSearchService()
					this.searchService.searchNearBy(this.tabs[0].name, latLng, 3000)
					qq.maps.event.addListener(
						this.map,
						'click',
						() => {
							this.toClickMap()
						}
					);
				})
			},
      // 初始化地图服务
			initSearchService() {
        const { cityName = '' } = this.mapInfo
				this.searchService = new qq.maps.SearchService({
					location: cityName,
					pageCapacity: 5,
					autoExtend: false,
					complete: (results) => {
						this.displayedPoiList = []
						let displayedPoiList = []
						var pois = results.detail.pois
						for (var i = 0, l = pois.length; i < l; i++) {
							var poi = pois[i]
							if (poi.dist <= 3000) {
								poi.customDist = this.getUnifiedDist(poi.dist)
								poi.customLabelName = this.getLabelName(this.tabs[this.slectedIndex].name, poi.address)
								displayedPoiList.push(poi)
							}
						}
						if (displayedPoiList.length) {
							displayedPoiList = displayedPoiList.sort((poiA, poiB) => {
								let distA = poiA.dist
								let distB = poiB.dist
								return distA - distB
							})
							this.displayedPoiList = displayedPoiList.slice(0, 3)
						}
					},
					error: (err) => {
						this.displayedPoiList = []
						console.log(err, 'searchService err!')
					}
				})
			},
			// 切换tab标签
			switchTab(item, index) {
				this.slectedIndex = index
				let {addressLat, addressLon} = this.mapInfo
				let region = new qq.maps.LatLng(addressLat, addressLon)
				this.searchService && this.searchService.searchNearBy(item, region, 3000)
			},
			// 定义小区地图上位置信息覆盖物
			getAddressOverlay() {
				function addressOverlay(position, title, address) {
					this.position = position
					this.title = title
					this.address = address
				}
				addressOverlay.prototype = new qq.maps.Overlay()
				//定义construct,实现这个接口来初始化自定义的Dom元素
				addressOverlay.prototype.construct = function () {
					var addressBoxDiv = this.addressBoxDiv = document.createElement("div")
					addressBoxDiv.setAttribute("class", "address-box")
					//将dom添加到覆盖物层
					var panes = this.getPanes()
					//设置panes的层级，overlayMouseTarget可接收点击事件
					panes.overlayMouseTarget.appendChild(addressBoxDiv)
					var addressContanierHtml = '<div class="address-contanier"><p class="address-title">' + this.title + '</p><p class="address-details">' + this.address + '</p></div>'
					var arrowHtml = '<div class="address-arrow"></div>'
					addressContanierHtml += arrowHtml
					addressBoxDiv.innerHTML = addressContanierHtml
				}
				//实现draw接口来绘制和更新自定义的dom元素
				addressOverlay.prototype.draw = function () {
					var overlayProjection = this.getProjection()
					//返回覆盖物容器的相对像素坐标
					var pixel = overlayProjection.fromLatLngToDivPixel(this.position)
					var divStyle = this.addressBoxDiv.style
					divStyle.left = pixel.x + "px"
					divStyle.top = pixel.y - 36 + "px"
				}
				//实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
				addressOverlay.prototype.destroy = function () {
					this.addressBoxDiv.parentNode.removeChild(this.addressBoxDiv)
					this.addressBoxDiv = null
				}
				return addressOverlay
			},
      // 将距离规范化，不超过1000m整数展示；超过1000米就按公里数展示，例如1.2公里
			getUnifiedDist(dist = 0) {
				let unifiedDist = 0
				dist = Math.abs(Number(dist))
				if (dist <= 1000) {
					unifiedDist = parseInt(dist) + 'm'
				} else {
					unifiedDist = Math.floor(dist / 100) / 10 + 'km'
				}
				return unifiedDist
			},
			getLabelName(keyword, address = '') {
				let labelName = ''
				switch (keyword) {
					case '公交':
						labelName = '站点'
						break
					case '地铁':
						labelName = address.replace(/地铁/ig, '')
						break
					default:
						labelName = keyword
				}
				return labelName
			},
			toClickMap() {
				this.$emit('toClickMap')
			}
		}
	}
</script>
<style scoped lang="scss">
  .house-location {
    margin-top: .2rem;
    background: #fff;
  }
  .map-box {
    margin-bottom: .1rem;
    height: 3.6rem;
  }
  /*tab标签 start*/
  .tab-box {
    margin-top: .33rem;
  }
  .tab-ul {
    text-align: center;
    .tab-li {
      height: .46rem;
      font-size: .28rem;
      color: #848484;
    }
    .selected-li {
      position: relative;
      color: #C7A26A;
      font-weight: bold;
    }
    .selected-li:after {
      position: absolute;
      top: .43rem;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      content: '';
      width: .24rem;
      height: .04rem;
      background-color: #C7A26A;
    }
  }
  .info-box {
    padding: 0 .4rem;
  }
  .info-ul {
    padding-bottom: .4rem;
    .info-li {
      display: flex;
      margin-top: .26rem;
      height: .4rem;
      font-size: .28rem;
      color: #2E2D2D;

      .label-name {
        padding: 0 .1rem;
        height: .36rem;
        line-height: .36rem;
        text-align: center;
        background-color: #ECF1F9;
        border-radius: .04rem;
        font-size: .24rem;
      }
      .info-details {
        flex: 1;
        margin-left: .1rem;
        margin-right: .4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .no-info {
    display: flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    height: 1.34rem;
    .tip-info {
      padding-left: .48rem;
      font-size: .28rem;
      color: #B7B7B8;
      background: url('https://img11.360buyimg.com/imagetools/jfs/t1/124452/25/3178/600/5ece1822E493677f3/f1d1f431a4960b1b.png') no-repeat 0 center;
      background-size: .28rem;
    }
  }
  /*tab标签 end*/
</style>

<style lang="scss">
  /*地图模块 start*/
  .address-box {
    position: relative;
    width: 0;
    height: 0;
    z-index: 1;
    .address-contanier {
      position: absolute;
      left: 50%;
      top: -1rem;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      padding: .14rem .2rem 0;
      width: 3.44rem;
      height: .86rem;
      border-radius: .04rem;
      box-shadow: 0 .02rem .06rem 0 rgba(0, 0, 0, 0.30);
      background-color: #fff;
      .address-title {
        line-height: .37rem;
        font-size: .26rem;
        color: #2E2D2D;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .address-details {
        margin-top: .03rem;
        line-height: .33rem;
        font-size: .24rem;
        color: #848484;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .address-arrow {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: .12rem solid transparent;
      border-right: .12rem solid transparent;
      border-top: .16rem solid #fff;
    }
  }
  /*地图模块 end*/
</style>
