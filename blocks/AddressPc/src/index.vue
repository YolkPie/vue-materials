<template>
    <div class="mainlist" @click="showAddrClick('none')">
        <div class="main-con">
            <div class="search-header">
                <div class=" jOtehy">
                    <dl class="addr-box">
                        <dt class="addr-head">所在地区:</dt>
                        <dd class="addr-con">
                            <!--一级地址-->
                            <dl class="addritem-box">
                                <dt  class="addritem-dt" :class="{'activedt-addr':showAddr=='F'}" @click.stop="showAddrClick('F')">{{addrFText}}</dt>
                                <dd class="addritem-dd" :class="{'activedd-addr':showAddr=='F'}">
                                    <span class="addrs-item" v-for="(item,index) in addrFList" :key="index+'_addrFList'" @click="fristAddrClick(item)" >{{item.name}}</span>
                                </dd>
                            </dl>
                            <!--二级（直辖市结束）地址-->
                            <dl class="addritem-box" v-show="addrSList.length">
                                <dt class="addritem-dt" :class="{'activedt-addr':showAddr=='S'}" @click.stop="showAddrClick('S')">{{addrSText}}</dt>
                                <dd class="addritem-dd" :class="{'activedd-addr':showAddr=='S'}">
                                    <span class="addrs-item" v-for="(item,index) in addrSList" :key="index+'_addrSList'" @click="seconAddrClick(item,true)" >{{item.name}}</span>
                                </dd>
                            </dl>
                            <!--三级（非直辖市）地址-->
                            <dl class="addritem-box" v-show="addrTList.length">
                                <dt class="addritem-dt" :class="{'activedt-addr':showAddr=='T'}" @click.stop="showAddrClick('T')">{{addrTText}}</dt>
                                <dd class="addritem-dd" :class="{'activedd-addr':showAddr=='T'}">
                                    <span class="addrs-item" v-for="(item,index) in addrTList" :key="index+'_addrTList'" @click="threeAddrClick(item)" >{{item.name}}</span>
                                </dd>
                            </dl>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { jsonpAdapter } from '@yolkpie/utils'
    import HttpRequest from './axios'
    const baseUrl = ''
    const axios = new HttpRequest(baseUrl)

    const Addr = (id) => {
        const params = {
            fid: id
        }
        return axios.request({
            url: 'https://d.jd.com/area/get',
            params,
            adapter: jsonpAdapter
        }).then((res = {}) => {
            if (res.status === 200) {
                return res
            } else {
                return Promise.reject(new Error('获取数据失败'))
            }
        })
    }
    // axios.get('../list.json').then(response => {
    //     return res
    // }, response => {
    //     console.log("get data error")
    // });

    export default {
        data () {
            return {
                topBox: '100px',
                addrFText: '不限',
                addrSText: '',
                addrTText: '',
                addrFId: 9999,
                addrSId: 9999,
                addrTId: 9999,
                searchDataList: [],
                showAddr: 'none',
                addrFList: [
                    { 'name': '不限', 'id': 9999 },
                    { 'name': '北京', 'id': 1 },
                    { 'name': '上海', 'id': 2 },
                    { 'name': '天津', 'id': 3 },
                    { 'name': '重庆', 'id': 4 },
                    { 'name': '河北', 'id': 5 },
                    { 'name': '山西', 'id': 6 },
                    { 'name': '河南', 'id': 7 },
                    { 'name': '辽宁', 'id': 8 },
                    { 'name': '吉林', 'id': 9 },
                    { 'name': '黑龙江', 'id': 10 },
                    { 'name': '内蒙古', 'id': 11 },
                    { 'name': '江苏', 'id': 12 },
                    { 'name': '山东', 'id': 13 },
                    { 'name': '安徽', 'id': 14 },
                    { 'name': '浙江', 'id': 15 },
                    { 'name': '福建', 'id': 16 },
                    { 'name': '湖北', 'id': 17 },
                    { 'name': '湖南', 'id': 18 },
                    { 'name': '广东', 'id': 19 },
                    { 'name': '广西', 'id': 20 },
                    { 'name': '江西', 'id': 21 },
                    { 'name': '四川', 'id': 22 },
                    { 'name': '海南', 'id': 23 },
                    { 'name': '贵州', 'id': 24 },
                    { 'name': '云南', 'id': 25 },
                    { 'name': '西藏', 'id': 26 },
                    { 'name': '陕西', 'id': 27 },
                    { 'name': '甘肃', 'id': 28 },
                    { 'name': '青海', 'id': 29 },
                    { 'name': '宁夏', 'id': 30 },
                    { 'name': '新疆', 'id': 31 },
                    { 'name': '台湾', 'id': 32 },
                    { 'name': '钓鱼岛', 'id': 84 },
                    { 'name': '港澳地区', 'id': 52993 },
                    { 'name': '海外地区', 'id': 53283 }
                ],
                addrSList: [],
                addrTList: []
            }
        },
        created () {
            alert('在代码里传值控制显示到二级还是三级地址')
        },
        mounted () {
        },
        methods: {
            showAddrClick (flag) {
                this.showAddr == flag ? this.showAddr = 'none' : this.showAddr = flag
            },
            fristAddrClick (item) {
                if (this.addrFId != item.id) {
                    this.addrFText = item.name
                    this.addrFId = item.id
                    if (item.id != 9999) {
                        Addr(item.id).then(data => {
                            data.data.unshift({ 'name': '不限', 'id': 9999 })
                            this.addrSList = data.data
                            this.addrSText = this.addrSList[0].name
                            this.addrSId = 9999
                            this.addrTList = []
                            this.addrTText = ''
                            this.addrTId = 9999
                            this.getNewData()
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.addrSList = []
                        this.addrSId = 9999
                        this.addrSText = ''
                        this.addrTList = []
                        this.addrTText = ''
                        this.addrTId = 9999
                        this.getNewData()
                    }
                }
                this.showAddr = 'none'
            },
            seconAddrClick (item, showthree) {
                this.addrSText = item.name
                this.addrSId = item.id
                if (this.addrFId < 5 || item.id == 9999) {
                    this.addrTList = []
                    this.addrTId = 9999
                    this.addrTText = ''
                    this.getNewData()
                } else {
                    if (showthree) {
                        Addr(item.id).then(data => {
                            data.data.unshift({ 'name': '不限', 'id': 9999 })
                            this.addrTList = data.data
                            this.addrTText = this.addrTList[0].name
                            this.addrTId = 9999
                            this.getNewData()
                        }).catch(err => {
                            console.log(err)
                            this.showAddr = 'none'
                        })
                    } else {
                        this.addrTList = []
                        this.addrTId = 9999
                        this.addrTText = ''
                        this.getNewData()
                    }
                }
            },
            threeAddrClick (item) {
                this.addrTText = item.name
                this.addrTId = item.id
                this.getNewData()
            },
            getNewData () {
                this.showAddr = 'none'
                alert(this.addrFText+this.addrSText+this.addrTText)
                var bodyitem = {
                    provinceId: this.addrFId == 9999 ? '' : this.addrFId,
                    cityId: this.addrSId == 9999 ? '' : this.addrSId,
                    countyId: this.addrTId == 9999 ? '' : this.addrTId,
                    provinceName: this.addrFText,
                    cityName: this.addrSText,
                    countyName: this.addrTText
                }
                console.log(bodyitem)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./css/mixin";
    .mainlist {
        background: rgb(248, 247, 247);
    }
    .mainlist .main-con{
        width: 1210px;
        margin: 0 auto;
        .search-data{
            overflow: hidden;
            min-height: 300px;
            background: #fff;
        }
    }

    .jOtehy {
        margin-bottom: 10px;
        padding: 0px 20px;
        background: rgb(255, 255, 255);
    }
    /*地址*/
    .addr-box {
        height: 50px;
        overflow: visible;
        border-top: 1px dashed rgb(241, 241, 241);
        .addr-head{
            float: left;
            padding: 10px 20px 10px 0;
            height: 30px;
            width: 60px;
            line-height: 30px;
            text-align: right;
            color: rgb(153, 153, 153);
        }
        .addr-con {
            float: left;
            padding: 10px 0 10px 20px;
            height: 30px;
            width: 1060px;
            .addritem-box {
                position: relative;
                float: left;
                margin-right: 10px;
                min-width: 100px;
                white-space: nowrap;
                height: 30px;
                cursor: pointer;
                .addritem-dt::after {
                    content: "";
                    position: absolute;
                    right: 10px;
                    top: 12px;
                    width: 9px;
                    height: 6px;
                    /*background: url(../../assets/img/arrow.png) no-repeat right center;*/
                    /*background-size: 8px;*/
                }
                .addritem-dt {
                    position: absolute;
                    z-index: 4;
                    left: 0px;
                    top: 0px;
                    box-sizing: border-box;
                    min-width: 100%;
                    height: 30px;
                    line-height: 30px;
                    color: rgb(51, 51, 51);
                    padding: 0px 28px 0 16px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(224, 224, 224);
                    border-image: initial;
                    background: #fff;
                }
                .activedt-addr {
                    border-bottom-color: rgb(255, 255, 255);
                }
                .addritem-dd {
                    display: none;
                    position: absolute;
                    z-index: 3;
                    top: 29px;
                    left: 0px;
                    width: 300px;
                    background-color: rgb(255, 255, 255);
                    padding: 15px 0px 15px 15px;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(224, 224, 224);
                    border-image: initial;
                }
                .activedd-addr {
                    display: block;
                    width:828px;
                }
                .addrs-item {
                    float: left;
                    margin-right: 20px;
                    height: 24px;
                    line-height: 24px;
                    color: rgb(67, 62, 51);
                    padding: 0px 6px;
                    background: none;
                }
                .addrs-item:hover {
                    color:#C71622;
                }
            }
        }
    }

    /*地址结束*/
</style>
