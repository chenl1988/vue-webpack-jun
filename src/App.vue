<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  background-color: rgb(17, 39, 98);
}
#app {
  width: 100%;
}

.picker .confirm {
  color: #4275d9 !important;
}

/*关于浮动*/

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

/* text-align */

.text_align_l {
  text-align: left;
}

.text_align_r {
  text-align: right;
}

.text_align_c {
  text-align: center;
}

/*字体大小*/

.font_size_14 {
  font-size: 0.07rem;
}

.font_size_18 {
  font-size: 0.09rem;
}

.font_size_20 {
  font-size: 0.1rem;
}

.font_size_26 {
  font-size: 0.13rem;
}

.font_size_28 {
  font-size: 0.14rem;
}

.font_size_30 {
  font-size: 0.15rem;
}

.font_size_32 {
  font-size: 0.16rem;
}

.font_size_34 {
  font-size: 0.17rem;
}

/*文本溢出*/

.text_overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* display */

.dis_block {
  display: block;
}

.dis_none {
  display: none;
}

.dis_inline {
  display: inline-block;
}

/*cursor*/

.pointer {
  cursor: pointer;
}

/*定位*/

.fixed {
  position: fixed;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/*z-index*/

.z_index_1 {
  z-index: 1;
}

.z_index_2 {
  z-index: 2;
}

.z_index_3 {
  z-index: 3;
}

.z_index_4 {
  z-index: 4;
}

.z_index_5 {
  z-index: 5;
}

.z_index_6 {
  z-index: 6;
}

/*overflow*/

.hidden {
  overflow: hidden;
}

/*通用圆角、阴影、模糊等样式*/

.radius {
  border-radius: 100%;
}

.shadow {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/*透明度*/

.opacity0 {
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
}

/*box-sizing*/

.border_box {
  box-sizing: border-box;
}

.Animation {
  transition: all 0.4s;
}
</style>
