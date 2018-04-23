<template>
    <div class="body_box">
        <div class="infor_box font_size_14" :class="{infor_1: step_1}">
            <div class="tit">
                <div class="ico_close"><router-link :to="{ path:'/' }"></router-link></div>
            </div>

            <div class="infor_form">
                <input class="input_box" type="text" v-model="user.username" placeholder="请输入您的姓名" maxlength="10" disabled="disabled">
                <input class="input_box" type="text" v-model="user.mobile" placeholder="请输入您的手机号码" maxlength="11" disabled="disabled">
                <input class="input_box" type="text" v-model="user.occup" placeholder="请输入您的职业" maxlength="15">
                <province-picker class="input_box"
                                 dataRef="province-select"
                                 dataTitle="请选择省市"
                                 :dataList="city"
                                 dataPlaceHolder="请选择您所在的省市"
                                 @selectChange="outputCity"
                                 >
                                </province-picker>
                <textarea v-model="user.detailedadd" class="txt_box" username="" cols="30" rows="10" placeholder="请输入您的家庭住址" maxlength="100"></textarea>
                <div class="submit_box" @click="inforVerificationStep1">
                    下一步
                </div>
            </div>
        </div>

        <div class="infor_box font_size_14" :class="{infor_2: step_2}">
            <div class="tit">
                <div class="ico_close" @click="step_1 = false;step_2 = true;"></div>
            </div>
            <div class="infor_form infor_step_2">
                <div class="tit_2"><div class="line"></div>工作时间选择</div>
                <label class="input_box clearfix" v-for="(each_date, index) in selectDate" :key="each_date">
                    <input type="checkbox" :id="'checkbox_' + index" :value="each_date" v-model="user.working" :disabled="!isBeiJing" @click="addWorkingDate(each_date)">
                    <div class="icon_box fl" :for="'checkbox_' + index"></div>
                    <div class="time fl" v-text="each_date" :for="'checkbox_' + index"></div>
                </label>
                <div class="submit_box">
                    <input type="submit" value="提交" @click="submitUserInfor">
                </div>
            </div>
        </div>
        <alert-box :alert_status="alertStatus" :alert_data="alertData" :btn_confirm="btnConfirm" :btn_link="btnLink"></alert-box>
        <loading-page :load_active="loadStatus"></loading-page>
    </div>
</template>

<script>
import { city } from "api/province";
import provincePicker from "components/province-picker/province-picker";
import { AUTH_LINK, ERR_OK } from "api/config";
import { checkSignupsubmit,checkSignUp } from "api/interface";
import alertBox from "components/alert-box/alert-box";
import loadingPage from "components/loading-page/loading-page";

export default {
  components: {
    provincePicker,
    "alert-box": alertBox,
    "loading-page": loadingPage,
  },
  data() {
    return {
      user: {
        username: "",
        mobile: "",
        occup: "",
        address: "",
        detailedadd: "",
        working: []
      },
      selectDate: [
        "2018年4月27日",
        "2018年4月28日",
        "2018年4月29日",
        "2018年4月30日",
        "2018年5月1日"
      ],
      step_1: false,
      step_2: true,
      city: city,
      isBeiJing: false,
      alertStatus: true,
      alertData: "",
      btnConfirm: "sit_2",
      btnLink: "",
      loadStatus: true,
    };
  },
  created() {
      checkSignUp().then(res => {
        if(res.success === ERR_OK) {

        }
        else if(res.success == 2){
          this.alertStatus = false;
          this.alertData = "您已经报名该活动了！速去围观！";
          this.btnLink = "onlookersIndex";
        } else {
          this.alertStatus = false;
          this.alertData = "您当前还不是认证车主,请先去认证！";
          this.btnConfirm = "sit_3"
          this.btnLink = this.AUTH_LINK;
        }
      });

      if (localStorage.getItem("userInfor") && localStorage.getItem("userInfor") != 'undefined') {
          this.user.username = JSON.parse(localStorage.getItem("userInfor")).username || "";
          this.user.mobile = JSON.parse(localStorage.getItem("userInfor")).mobile || "";
      }
  },
  mounted() {},
  methods: {
    outputCity(new_val) {
      this.user.address = new_val;
    },
    inforVerificationStep1() {
      if (!this.user.address) {
        this.alertStatus = false;
        this.alertData = "请输入您的职业";
      } else if (!this.user.occup) {
        this.alertStatus = false;
        this.alertData = "请选择你所在的城市";
      } else if (!this.user.detailedadd) {
        this.alertStatus = false;
        this.alertData = "请输入您的家庭地址";
      } else {
        this.step_1 = true;
        this.step_2 = false;
      }
    },
    submitUserInfor() {
      this.loadStatus = false;
      checkSignupsubmit(this.user).then(res => {
        if (res.success === ERR_OK || res.success == 5) {
          this.alertStatus = false;
          this.alertData = res.data;
          this.btnLink = "home";
        } else {
          this.alertStatus = false;
          this.alertData = res.errormsg;
          this.btnConfirm = true;
        }
        this.loadStatus = true;
      });

      pilot('track','form',{
        frmid: "FF10258",
        sid: "",
        fullname: this.user.username,
        mobile: this.user.mobile,
        profession: this.user.occup,
        cstate: this.user.address.split(" ")[0],
        ccity: this.user.address.split(" ")[1],
        address: this.user.detailedadd
      });
    },
    addWorkingDate(_date) {
      if (this.user.working.length > 3) {
        this.user.working.includes(_date) ? "" : (this.user.working.pop(), this.alertData="最多只能选择三个时间", this.alertStatus=false );
      }
    }
  },
  watch: {
    "user.address": function(val) {
      this.isBeiJing = val.slice(0, 2) == "北京";
      if (!this.isBeiJing) {
        this.user.working.splice(0, this.user.working.length);
        this.$set(this.user.working, 0, this.selectDate[0]);
        this.$set(this.user.working, 1, this.selectDate[1]);
      } else {
        this.user.working.splice(0, this.user.working.length);
      }
    },
    "user.working": function(val) {
        this.addWorkingDate(val);
    },
  }
};
</script>

<style lang="less" scoped>
@import "~style/variables.less";

.body_box {
  width: 3.75rem;
  height: 100vh;
  min-height: 6.2rem;
  background: url("@{imgSrc}assets/index_bg.jpg") no-repeat center;
  background-size: 100% auto;
  margin: 0 auto;
  overflow: hidden;
}
.infor_box {
  width: 3.35rem;
  margin: 0.2rem auto 0;
  background-color: @Colofff;
  padding-bottom: 0.47rem;
}
.tit {
  width: 3.2rem;
  height: 0.53rem;
  margin: 0 auto;
  border-bottom: 0.01rem solid @borderColor;
  background: url("@{imgSrc}assets/tit.png") no-repeat center;
  background-size: 1.07rem 0.19rem;
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
.infor_form {
  width: 100%;
}
.infor_1 {
  display: none;
}
.infor_2 {
  display: none;
}
.input_box {
  display: block;
  width: 2.65rem;
  //   height: .6rem;
  padding: 0.265rem 0 0.14rem;
  border-bottom: 0.01rem solid @borderColor;
  margin: 0 auto;
  font-size: 0.16rem;
  box-sizing: border-box;
  border-radius: 0;
}
.txt_box {
  width: 2.65rem;
  height: 1.4rem;
  background: @bgColor;
  margin: 0.2rem auto 0.46rem;
  padding: 0.1rem;
  font-size: 0.16rem;
  display: block;
  border-radius: 0;
}
.submit_box {
  width: 2.65rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  border: 0.01rem solid @Colo5A8AC2r;
  border-radius: 0.4rem;
  margin: 0 auto;
  font-size: 0.16rem;
  color: @Colo5A8AC2r;
}
.submit_box input {
  width: 100%;
  height: 100%;
  // line-height: 0.4rem;
  display: block;
  // text-align: center;
  font-size: 0.16rem;
  color: @Colo5A8AC2r;
}
.infor_form_2 .input_box {
  padding: 0.25rem 0 0.11rem;
}
.tit_2 {
  width: 2.65rem;
  height: 0.27rem;
  line-height: 0.27rem;
  margin: 0.24rem auto 0;
  position: relative;
  text-indent: 0.15rem;
  font-size: 0.15rem;
}
.tit_2 .line {
  width: 0.04rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  border-radius: 0.04rem;
  background-color: #9b9b9b;
}
.infor_step_2 .submit_box {
  margin: 0.82rem auto 0;
}

.icon_box {
  width: 0.22rem;
  height: 0.22rem;

  &:after {
    display: block;
    content: "";
    width: 0.22rem;
    height: 0.22rem;
    background: url("@{imgSrc}assets/select_off.png") no-repeat center;
    background-size: 100% 100%;
  }
}

input[type="checkbox"] {
  display: block;
  width: 100%;
  height: 100%;
  display: none;

  &:checked + .icon_box:after {
    background: url("@{imgSrc}assets/select_on.png") no-repeat center;
    background-size: 100% 100%;
  }
}

.time {
  height: 0.22rem;
  line-height: 0.22rem;
  text-indent: 0.13rem;
}
</style>