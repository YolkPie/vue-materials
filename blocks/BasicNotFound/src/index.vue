<template>
    <div class="basic-not-found">
        <div class={exceptionContent}>
            <img :src="require('./images/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png')"
                 class="imgException"
                 alt="页面不存在"
            />
            <div class="prompt">
                <h3 class="title">
                    抱歉，你访问的页面不存在
                </h3>
                <p class="description">
                    您要找的页面没有找到，请返回<a href="#">首页</a>继续浏览
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BasicNotFound'
}
</script>
<style>
    @import "index.scss";
</style>