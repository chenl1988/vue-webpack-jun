<template>
  <div class="load_box" :class="{alert_status: alert_status}">
    <div class="view">
      <h4>提示：</h4>
      <p class="prompt" v-text="alert_data"></p>

      <div class="btn_box btn_line clearfix" :class="{btn_status: btn_status}">
        <div class="fl" @click="changeAlert">取消</div>
        <div class="fr" v-text="btn_text" @click="confirm"></div>
      </div>

      <div class="btn_box clearfix" :class="{btn_status: !btn_status}">
        <div class="fr" v-text="btn_text" @click="changeAlert"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alert_status: {
      type: Boolean,
      required: true
    },  //false 显示弹框
    btn_status: {
      type: Boolean,
      default: true
    },  //false 显示取消按钮
    btn_confirm: {
      type: String,
      default: "sit_1"
    },  
    alert_data: {
      type: String,
      required: true
    },
    btn_text: {
      type: String,
      default: "确认"
    },
    btn_link: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      // alert_status:
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeAlert(){
      this.$parent.alertStatus = true;
      if(this.btn_confirm == "sit_2"){
        this.$router.push({ path: this.btn_link });
      }else if(this.btn_confirm == "sit_3"){
        window.location.href = this.btn_link;
      }else if(this.btn_confirm == "sit_4"){
        
      }
    },
    confirm(){
      if(this.btn_text == "去认证"){
        window.location.href = this.btn_link;
      }
    },
  }
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
  background-color: rgba(0, 0, 0, .3 );
}
.view {
  width: 3rem;
  height: 1.8rem;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1.5rem;
  margin-top: -1.2rem;
  border-radius: 0.05rem;  
  h4{
    font-size: 0.15rem;
    width: 2.7rem;
    line-height: 0.3rem;
    height: 0.3rem;
    margin: 0.1rem auto;
  }
}
.prompt{
  font-size: 0.14rem;
  margin: 0 auto;
  text-align: center;
  width: 2.7rem;
  line-height: 0.24rem;
  height: 0.72rem;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.btn_box{
  width: 100%;
  height: 0.52rem;
  font-size: 0.15rem;
  margin-top:  0.06rem;
  div{
    width: 50%;
    line-height: 0.52rem;
    text-align: center;
  }
}
.btn_line{
  border-top: 0.01rem solid @Colorc8c8c8;
  div:first-child{
    border-right: 0.01rem solid @Colorc8c8c8;
  }
}
.alert_status {
  display: none;
}
.btn_status {
  display: none;
}
</style>
