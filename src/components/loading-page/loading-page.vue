<template>
  <div class="load_box" :class="{active: load_active}">
    <div class="view"></div>
  </div>
</template>

<script>
export default {
  props: {
    load_active: {}
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~style/variables.less";
.load_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.view {
  width: 100%;
  height: 100%;
  background: url("@{imgSrc}assets/loading.gif") no-repeat center;
  background-size: 0.16rem 0.16rem;
}
.active {
  display: none;
}
</style>
