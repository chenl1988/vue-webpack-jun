 <template>
    <div class="body_box">
        <div class="mask">
            <div class="ico_close"><router-link :to="{ path:'/' }"></router-link></div>
            <div class="view">
                <router-link tag="div" class="item item_1" :to="{ path:'rankingList' }"></router-link>
                <router-link tag="div" class="item item_2" :to="{ path:'interactionIndex' }"></router-link>
                <div class="item item_3" @click=" alertStatus = false; alertData = '敬请期待'; "></div>
            </div>
        </div>

        <alert-box :alert_status="alertStatus" :alert_data="alertData" :btn_confirm="btnConfirm" ></alert-box>
    </div>
</template>

<script>
import alertBox from "components/alert-box/alert-box";
export default {
  components: {
    "alert-box": alertBox,
  },
  data() {
    return {
      alertStatus: true,
      alertData: "",
      btnConfirm: "sit_1",
    };
  },
  created() {
    if( Date.parse(new Date()) >= 1524787200000 ){
      this.btnConfirm = "sit_4";
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~style/variables.less";

.body_box {
  width: 3.75rem;
  height: 100vh;
  min-height: 6.2rem;
  background: url("@{imgSrc}assets/index_bg.jpg") no-repeat;
  background-size: 100% auto;
  padding-top: 0.1rem;
  margin: 0 auto;
}
.mask {
  width: 3.6rem;
  height: 5.95rem;
  margin: 0 auto;
  background: url("@{imgSrc}assets/fc.png") no-repeat center;
  background-size: 100% auto;
//   position: relative;
  position: absolute;
  left: 50%;
  top: 0.3rem;
  transform: translate(-50%, 0);
}
.ico_close {
  width: 0.27rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/close.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 0.18rem;
  right: 0.18rem;
}
.ico_close a {
  width: 100%;
  height: 100%;
}
.view {
  width: 2.26rem;
  margin: 0 auto;
  padding-top: 1rem;
}
.item {
  width: 100%;
  height: 0.58rem;
  margin-bottom: 0.33rem;
}
.item a {
  width: 100%;
  height: 100%;
}
.item_1 {
  background: url("@{imgSrc}assets/phb.png") no-repeat center;
  background-size: 100% 100%;
}
.item_2 {
  background: url("@{imgSrc}assets/hdwd.png") no-repeat center;
  background-size: 100% 100%;
}
.item_3 {
  background: url("@{imgSrc}assets/xczb.png") no-repeat center;
  background-size: 100% 100%;
}
</style>