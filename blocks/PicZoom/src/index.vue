<template>
    <div class="zoombox">
        <div id="bidimg">
            <p>分开配置大小图片地址</p>
            <div class="pic-box">
                <pic-zoom url="//weiliicimg1.pstatp.com/weili/sm/804699824190390426.webp" big-url="//weiliicimg1.pstatp.com/weili/sm/804699824190390426.webp" :scale="2" ></pic-zoom>
            </div>
        </div>
        <div class="box">
            <pic-zoom :url="imgUrl" :scale="1.7" :scalebox="1.2" :scroll="true"></pic-zoom>
        </div>
        <div class="list">
            <div class="list-swiper">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in imagesList" :key="index + '_imgswiper_item'">
                        <div class="img-wrapper" :class="{borderred:index==hoverIndex}" @mouseenter="changeImage(index)">
                            <img class="swiper-img" :src="item"/>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="swiper-button-prev myprev"></div>
            <div class="swiper-button-next mynext"></div>
        </div>
    </div>
</template>
<script>
    import PicZoom from './PicZoom'
    export default {
        name: 'action',
        data () {
            return {
                imagesList: [
                    'https://storage.jd.com/pharos-court/62-1585046419856-2000.png?Expires=1588646419&AccessKey=52f5OEDwzTdtPHPe&Signature=ZbyVVZVOxNvSgVFcumrrOPEp5VQ%3D',
                    'https://img11.360buyimg.com/da/jfs/t1/96224/36/13679/224381/5e5a0446E33967fa4/c606fa8a59909df3.jpg',
                    '//img.tuguaishou.com/ips_templ_preview/w432_q100/a1/46/83/lg_2948246_1586328656_5e8d7450e1246.jpg?auth_key=2218809600-0-0-d035c3824ec25f154990686e76f33d61',
                    '//weiliicimg9.pstatp.com/weili/sm/238634000859791603.webp',
                    '//icweiliimg1.pstatp.com/weili/sm/457195626647257499.webp',
                    'https://img11.360buyimg.com/da/s300x300_jfs/t1/94757/37/13969/150681/5e60b196E059e60e5/80061c9442295812.jpg'
                ],
                imgUrl: '',
                hoverIndex: 0,
                swiperOption: {
                    loop: false,
                    direction: 'horizontal',
                    autoHeight: true,
                    slidesPerView: 5,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        created () {

        },
        props: [],
        components: {
            PicZoom
        },
        mounted () {
            this.imgUrl = this.imagesList[0]
        },
        methods: {
            changeImage (index) {
                this.hoverIndex = index
                this.imgUrl = this.imagesList[index]

            }
        }
    }
</script>
<style lang="scss" scoped>
    /*@import "./css/mixin";*/
    #bidimg {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
        padding-bottom: 100px;
    }
    .pic-box{
        width:300px;
        height:300px;
        border:1px solid #eee;
    }
    //放大镜
    .zoombox {
        float: left;
        position: relative;
        z-index: 99;
        width: 390px;
        padding: 20px;
        .box{
            height: 390px;
            width: 390px;
        }
        .list{
            margin-top: 20px;
            height: 60px;
            overflow: hidden;
            position: relative;
            padding: 0 35px;
        }
        .list .list-swiper{
            width: 320px;
        }
        .list .img-wrapper{
            width:54px;
            height: 54px;
            border:1px solid transparent;
        }
        .list .swiper-img{
            width: 54px;
            height: 54px;
        }
        .list .myprev{
            position: absolute;
            top:37px;
            left:10px;
            width: 15px;
            height: 26px;
            background-size: 15px 26px;
        }
        .list .mynext{
            position: absolute;
            top:37px;
            right: 10px;
            width: 15px;
            height: 26px;
            background-size: 15px 26px;
        }
        .list .borderred{
            border:1px solid rgb(199, 22, 34);
        }
    }
</style>
