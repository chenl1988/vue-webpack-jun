<template>
    <div class="body_box z_index_1">
        <div class="activity z_index_3"></div>
        <div class="text_box z_index_2"></div>
        <div class="swiper-container z_index_4">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="i in 5">
                    <div :class='"pic pic_" + i'></div>
                </div>
            </div>
        </div>

        <router-link tag="div" class="onlookers z_index_5" :to="{ path:'onlookersIndex' }"></router-link>
        <!-- <router-link tag="div" class="sign_up z_index_5" :to="{ path:'userInfor' }" @click="signUp"></router-link> -->
        <div class="sign_up z_index_5" @click="signUp" :class="{display_none: !displayNone}"></div>
        <div class="sign_up z_index_5 siteRecommendation" @click="siteRecom" :class="{display_none: displayNone}"></div>

        <loading-page :load_active="loadStatus"></loading-page> 
        <alert-box :alert_status="alertStatus" :btn_status="btnStatus" :alert_data="alertData" :btn_link="btnLink" :btn_text="btnText"></alert-box>
    </div>
</template>

<script>
/* swiper直接引入出现es6->es5转换出错问题，所以在这里指定swiper的具体文件的目录 */
// import Swiper from "swiper";
import Swiper from "swiper/dist/js/swiper.min.js";
import { ERR_OK, AUTH_LINK } from "api/config";
import { checkSignUp, checkScene } from "api/interface";
import alertBox from "components/alert-box/alert-box";
import loadingPage from "components/loading-page/loading-page";

export default {
  components: {
    "alert-box": alertBox,
    "loading-page": loadingPage,
  },
  data() {
    return {
      infor: null,
      loadStatus: true,
      alertStatus: true,
      alertData: "",
      btnStatus: false,
      btnText: '去认证',
      btnLink: AUTH_LINK,
      displayNone: true,
    };
  },
  created() {
    
      let date_041800 = 1523980800000;
      let newTime = Date.parse(new Date());
      if( newTime >= date_041800 ){
        this.displayNone = false; //改为现场推荐
      }
      checkSignUp().then(res => {
        if(res.success == ERR_OK){
          localStorage.setItem("userInfor", JSON.stringify(res.data));
        }else if(res.success == 2){
          localStorage.setItem("userInfor", JSON.stringify(res.errormsg));
        }
        this.infor = res;
      });
  },
  mounted() {
    this.$nextTick(() => {
      let mySwiper = new Swiper(".swiper-container", {
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true
      });
    });
  },
  methods: {
    signUp() {
      if (this.infor.success === ERR_OK) {
        this.$router.push({ path: "userInfor" });
      }else if(this.infor.success === 2){
        this.btnText = '确认';
        this.btnStatus = true;
        this.alertStatus = false;
        this.alertData = "您已经报名该活动了！速去围观！";
      } else {
        this.btnText = '去认证';
        this.btnStatus = false;
        this.alertStatus = false;
        this.alertData = "您当前还不是认证,请先去认证！";
      }
    },
    siteRecom(){
      let date_041800 = 1523980800000;
      let date_042700 = 1524758400000;
      let date_050100 = 1525104000000;
      let newTime = Date.parse(new Date());
      
      if(date_041800 <= newTime && newTime < date_042700){
        this.alertStatus = false;
        this.alertData = "活动还未开始哦";
        this.btnText = "确定";
        this.btnStatus = true;
      }else if(date_042700 <= newTime && newTime < date_050100){
        this.loadStatus = false;
        checkScene().then(res=>{
          if(res.success === ERR_OK){
            this.$router.push({ path: "sceneRecommend" });
          }else{
            this.alertStatus = false;
            this.alertData = res.errormsg;
            this.btnText = "确定";
            this.btnStatus = true;
          }
          this.loadStatus = true;
        }).catch(()=>{
            this.alertStatus = false;
            this.alertData = "服务器网络忙，请稍后再试";
            this.btnText = "确定";
            this.btnStatus = true;
            this.loadStatus = true;
        });
      }else if(newTime >= date_050100){
        this.alertStatus = false;
        this.alertData = "活动已经结束";
        this.btnText = "确定";
        this.btnStatus = true;
      }
    },
  }
};
</script>

<style lang="less" scoped>
@import "~style/variables.less";
@import "swiper/dist/css/swiper.min.css";
// @import "~style/swiper-4.2.2.min.css";

.body_box {
  position: relative;
  width: 3.75rem;
  height: 100vh;
  min-height: 6.2rem;
  background: url("@{imgSrc}assets/index_bg.jpg") no-repeat;
  background-size: 100% auto;
  margin: 0 auto;
}
.activity {
  position: absolute;
  top: 0.15rem;
  right: 0;
  width: 1.2rem;
  height: 0.54rem;
  background: url("@{imgSrc}assets/actions@2x.png") no-repeat center;
  background-size: 100% 100%;
}
.text_box {
  width: 3.75rem;
  height: 1.61rem;
  background: url("@{imgSrc}assets/index_text.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 0.62rem;
  left: 0;
}
.swiper-container {
  position: absolute;
  top: 2.7rem;
  left: 0;
  width: 100%;
}
.swiper-container .pic {
  width: 3.75rem;
  height: 2.15rem;

  &.pic_1 {
    background: url("@{imgSrc}assets/car_01.png") no-repeat center;
    background-size: 3.75rem 2.05rem;
  }
  &.pic_2 {
    background: url("@{imgSrc}assets/car_02.png") no-repeat center;
    background-size: 3.75rem 2.05rem;
  }
  &.pic_3 {
    background: url("@{imgSrc}assets/car_03.png") no-repeat center;
    background-size: 3.75rem 2.05rem;
  }
  &.pic_4 {
    background: url("@{imgSrc}assets/car_04.png") no-repeat center;
    background-size: 3.75rem 2.05rem;
  }
  &.pic_5 {
    background: url("@{imgSrc}assets/car_05.png") no-repeat center;
    background-size: 3.75rem 2.05rem;
  }
}

.onlookers {
  width: 1.7rem;
  height: 0.58rem;
  background: url("@{imgSrc}assets/btn_01.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0.29rem;
  left: 0.08rem;
}
.sign_up {
  width: 1.7rem;
  height: 0.58rem;
  background: url("@{imgSrc}assets/btn_02.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0.29rem;
  right: 0.08rem;
}
.siteRecommendation{
  background: url("@{imgSrc}assets/myRrecommendation.png") no-repeat center;
  background-size: 100% 100%;
}
.display_none{
  display: none;
}
</style>