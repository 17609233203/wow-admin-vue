<template>
    <div class="layout">
        <div class="layout_left">
            <slider></slider>
        </div>
        <div class="layout_right"></div>
    </div>
</template>
<script lang="ts" setup>
import slider from './compontents/slider.vue';
</script>
<style lang="scss">
    .layout {
        display: flex;
        background: #fff;
        width: 100%;
        height: 100%;
        overflow: hidden;
        &_left {
            width: 225px;
            overflow: hidden;
            height: 100%;
            transition: left .2s;
        }
        &_right {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: calc(100% - 225px);
        }
    }
</style>
