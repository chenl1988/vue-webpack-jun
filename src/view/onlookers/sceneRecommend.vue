 <template>
    <div class="body_box">
        <div class="scene_box">
            <div class="tit">
                <div class="ico_close"><router-link :to="{ path:'myRecommend' }"></router-link></div>
            </div>
            <div class="form_box">
                <div class="input_box">
                    <input type="text" placeholder="推荐者姓名" v-model="userInfor.sigin_username" disabled>
                </div>
                <div class="input_box">
                    <input type="text" placeholder="被推荐人姓名" v-model="userInfor.re_username" maxlength="10">
                </div>
                <div class="input_box">
                    <input type="text" placeholder="联系方式" v-model="userInfor.mobile" maxlength="11">
                </div>
                <div class="input_box">
                    <select v-model="userInfor.car_type">
                        <option value="">请选择购买型</option>
                        <option value="111">111</option>
                        <option value="222">222</option>
                        <option value="333">333</option>
                        <option value="444">444</option>
                        <option value="555">555</option>
                        <option value="666">666</option>
                        <option value="燃11料22电33池">燃11料22电33池</option>
                        <option value="vvvvvv型房">vvvvvv型房</option>
                        <option value="aaaaaa型房">aaaaaa型房</option>
                    </select>
                </div>
                <!--  @click="$router.push({ path:'sceneRecommendSuccess'});" -->
                <div class="submit_box">
                    <input type="submit" value="提交" @click="submitInfor">
                </div>
            </div>
        </div>
        <loading-page :load_active="loadStatus"></loading-page>
        <alert-box :alert_status="alertStatus" :alert_data="alertData" :btn_confirm="btnConfirm" :btn_link="btnLink"></alert-box>
    </div>
</template>

<script>
import { ERR_OK } from "api/config";
import { checkScene, checkScenelist } from "api/interface";
import loadingPage from "components/loading-page/loading-page";
import alertBox from "components/alert-box/alert-box";
export default {
  components: {
    "loading-page": loadingPage,
    "alert-box": alertBox,
  },
  data() {
    return {
      userInfor: {
        sigin_username: "",
        re_username: "",
        mobile: "",
        car_type: "",
      },
      loadStatus: true,
      alertStatus: true,
      alertData: "",
      btnConfirm: "sit_2",
      btnLink: "",
    };
  },
  created() {
    if (localStorage.getItem("userInfor") && localStorage.getItem("userInfor") != 'undefined') {
        this.userInfor.sigin_username = JSON.parse(localStorage.getItem("userInfor")).username || "";
    }
  },
  mounted() {},
  methods: {
    submitInfor() {
      let myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;

      if (!this.userInfor.re_username) {
        this.alertStatus = false;
        this.alertData = "请填写被推荐人姓名！";
      } else if (!this.userInfor.mobile) {
        this.alertStatus = false;
        this.alertData = "请填写联系方式！";
      } else if ( !myreg.test(this.userInfor.mobile) ){
        this.alertStatus = false;
        this.alertData = "手机号填写不正确！";
      }else if (!this.userInfor.car_type) {
        this.alertStatus = false;
        this.alertData = "请选择购买型！";
      } else {
        this.loadStatus = false;

        checkScene().then(res => {
          if (res.success === ERR_OK) {
            checkScenelist(this.userInfor).then(_res => {
              if (_res.success === 1) {
                this.$router.push({ path: "sceneRecommendSuccess" });
                this.userInfor.sigin_username = "";
                this.userInfor.re_username = "";
                this.userInfor.mobile = "";
                this.userInfor.car_type = "";
              } else {
                this.alertStatus = false;
                this.alertData = _res.errormsg;
              }
              this.loadStatus = true;
            }).catch(_err => {
              this.alertStatus = false;
              this.alertData = "服务器网络忙，请稍后再试！";
              this.loadStatus = true;
            });
          } else {
            // alert(res.errormsg);
            this.alertStatus = false;
            this.alertData = res.errormsg;
            this.btnLink = "onlookersIndex";
            this.loadStatus = true;
            // this.$router.push({ path: "onlookersIndex" });
          }
        });
      }

      pilot('track','form',{
        frmid: "FF10259",
        sid: "",
        invite_name: this.userInfor.re_username,
        fullname: this.userInfor.sigin_username,
        mobile: this.userInfor.mobile,
        series: this.userInfor.car_type
      });
    }
  }
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
  padding-top: 0.2rem;
  margin: 0 auto;
}
.scene_box {
  width: 3.35rem;
  min-height: 5.8rem;
  background-color: @Colofff;
  margin: 0 auto;
  padding: 0 0.08rem;
}
.tit {
  width: 3.2rem;
  height: 0.53rem;
  margin: 0 auto;
  border-bottom: 0.01rem solid @Colore1e1e1;
  background: url("@{imgSrc}assets/tit_scene.png") no-repeat center;
  background-size: 0.71rem 0.18rem;
  position: relative;
}
.ico_close {
  width: 0.27rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/close.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 0.12rem;
  right: 0.06rem;
}
.ico_close a {
  width: 100%;
  height: 100%;
}
.form_box {
  width: 2.64rem;
  margin: 0 auto;
}
.input_box {
  border-bottom: 0.01rem solid @Colore1e1e1;
}
.input_box select,
.input_box option {
  appearance: none;
  -webkit-appearance: none;
  background-color: @Colofff;
}
.input_box input,
.input_box select {
  padding: 0.2rem 0;
  display: block;
  width: 100%;
  font-size: 0.15rem;
}
// select {
//   color: #8f8f8f;
// }
.submit_box {
  width: 2.65rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  border: 0.01rem solid @Colo5A8AC2r;
  border-radius: 0.4rem;
  margin: 2.06rem auto 0;
  font-size: 0.16rem;
  color: @Colo5A8AC2r;
}
.submit_box input {
  width: 100%;
  height: 100%;
  display: block;
  font-size: 0.16rem;
  color: @Colo5A8AC2r;
}
</style>