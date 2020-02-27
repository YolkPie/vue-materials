<template>
    <div class="container">
        <div v-for="(item, index) in list" :key="index" class="item">
            <a :href="item.url" class="link" target="_blank" rel="noopener noreferrer">
                <img :src="item.img" class="cover" :alt="item.title" />
                <div class="title">{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EntryCard',
    data () {
        return {
            list: [
                {
                    title: '帖子',
                    img: '//gw.alicdn.com/tfscom/TB1OyT.RVXXXXcpXXXXXXXXXXXX.png',
                    url: '//www.taobao.com',
                },
                {
                    title: '宝贝清单',
                    img: '//img.alicdn.com/tfs/TB1g6cGRFXXXXa9XXXXXXXXXXXX-140-140.png',
                    url: '//www.taobao.com',
                },
                {
                    title: '图片',
                    img: '//img.alicdn.com/tfs/TB1hJ7dRFXXXXcgXFXXXXXXXXXX-140-140.png',
                    url: '//www.taobao.com',
                },
                {
                    title: '上新',
                    img: '//img.alicdn.com/tfs/TB196v1RFXXXXb6aXXXXXXXXXXX-140-140.png',
                    url: '//www.taobao.com',
                },
                {
                    title: '短视频',
                    img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',
                    url: '//www.taobao.com',
                },
                {
                    title: '短视频',
                    img: '//gw.alicdn.com/tfscom/TB1toY.RVXXXXcuXXXXXXXXXXXX.png',
                    url: '//www.taobao.com',
                },
            ]
        }
    }
}
</script>
<style>
    @import "index.css";
</style>