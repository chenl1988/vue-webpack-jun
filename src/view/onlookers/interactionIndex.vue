 <template>
    <div class="body_box">
        <div class="tit_box">
            <div class="return_box font_size_28"><router-link :to="{ path:'onlookersIndex' }"><span></span>&nbsp;返回</router-link></div>
        </div>
        <div class="content_box">
            <ul class="inte_list">
                  <li v-for="(item, index) in answerList" @click="saveAnswer(index)">
                    <div class="int_tit clearfix">
                        <div class="pic fl"><img :src="item.headimgurl" alt=""></div>
                        <p class="name fl font_size_28" v-text="item.nickname"></p>
                    </div>
                    <p class="text_box font_size_26" v-text="item.content"></p>
                  </li>
            </ul>
        </div>

        <div class="my_recommend font_size_32 z_index_4 clearfix">
            <div class="fl" @click="askDis=false;"> 去提问 </div>
            <div class="fl"><router-link :to="{ path:'myInteraction' }"> 我的提问 </router-link></div>
        </div>

        <div class="mask_box" :class="{ask_dis: askDis}">
            <div class="ask">
                <div class="ask_tit clearfix">
                    <p class="fl font_size_28">提问：</p>
                    <div class="fr ico_close" @click="askDis=true;"></div>
                </div>
                <div class="area_box">
                    <textarea name="" id="" cols="30" rows="10" maxlength="50" v-model="problem"></textarea>
                </div>
                <div class="submit_box">
                    <input type="submit" value="提交" @click="subProblem">
                </div>
            </div>
        </div>
        <loading-page :load_active="loadStatus"></loading-page> 
        <alert-box :alert_status="alertStatus" :alert_data="alertData"></alert-box>
    </div>
</template>

<script>
import { ERR_OK } from "api/config";
import { checkAnswer, checkProblem } from "api/interface";
import loadingPage from "components/loading-page/loading-page";
import alertBox from "components/alert-box/alert-box";

export default {
  components: {
    // 注册组件
    "loading-page": loadingPage,
    "alert-box": alertBox,
  },
  data() {
    return {
      askDis: true,
      answerList: [],
      problem: '',
      loadStatus: true,

      alertStatus: true,
      alertData: "",
    };
  },
  created() {
    checkAnswer().then(res => {
      this.answerList = res.data;
    }).catch(err => {

    })
  },
  mounted() {},
  methods: {
    saveAnswer(index){
      this.$router.push({ path: "interactionInfor" });
      localStorage.setItem("answer", JSON.stringify(this.answerList[index]));
    },
    subProblem(){
      if(!this.problem){
        this.alertStatus = false;
        this.alertData = "请输入提问内容！";
      }else{
        let parameter = { "content": this.problem };
        this.loadStatus = false;
        checkProblem(parameter).then(res => {
          if(res.success === ERR_OK){
            this.alertStatus = false;
            this.alertData = res.data;
            this.askDis = true;
            this.loadStatus = true;
            this.problem = '';
          }else{
            this.alertStatus = false;
            this.alertData = res.errormsg;
            this.loadStatus = true;
          }
        }).catch(() => {
          this.loadStatus = true;
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~style/variables.less";

.body_box {
  width: 3.75rem;
  height: 100vh;
  background: url("@{imgSrc}assets/public_bg.png");
  background-size: 3.75rem auto;
  padding: 0 0.11rem;
  margin: 0 auto;
  overflow: hidden;
}
.tit_box {
  width: 100%;
  height: 0.55rem;
  padding: 0.13rem 0 0.16rem;
  background: url("@{imgSrc}assets/hd_tit.png") no-repeat center;
  background-size: 0.79rem 0.2rem;
}
.return_box {
  width: 0.8rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-indent: 0.15rem;
  border: 0.01rem solid @Colord1dcfa;
  border-radius: 0.3rem;
}
.return_box a {
  width: 100%;
  height: 100%;
  color: @Colofff;
}
.return_box a span {
  width: 0.1rem;
  height: 0.1rem;
  display: inline-block;
  border-left: 0.02rem solid #fff;
  border-bottom: 0.02rem solid #fff;
  transform: rotate(45deg);
}
.content_box {
  width: 100%;
  height: calc(~"100vh - .55rem");
  background-color: @Colofff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  padding: 0 0.13rem;
}
.inte_list {
  width: 3.35rem;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  display: block;
  padding-bottom: .5rem;
}
.inte_list li {
  width: 100%;
  padding: 0.13rem 0.07rem 0.17rem;
  border-bottom: 0.01rem solid @Colorebebeb;
}
.int_tit {
  width: 100%;
  height: 0.38rem;
  margin-bottom: 0.16rem;
}
.pic {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 100%;
  border: 0.01rem solid @Colord1d1d1;
  overflow: hidden;
}
.pic img {
  width: 100%;
  height: 100%;
}
.name {
  text-indent: 0.12rem;
  height: 100%;
  line-height: 0.38rem;
}
.text_box {
  line-height: 0.18rem;
  min-height: 0.18rem;
  max-height: 0.72rem;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.my_recommend {
  width: 3.75rem;
  height: 0.45rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: linear-gradient(-188deg, #616cc7 0%, #3e8fc8 100%);
  opacity: 0.87;
  color: @Colofff;
}
.my_recommend div {
  flex: 1;
  line-height: 0.27rem;
}
.my_recommend div:first-child {
  border-right: 0.01rem solid @Colorb1bfe3;
  line-height: 0.27rem;
}
.my_recommend a {
  color: @Colofff;
}
.mask_box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  
}
.ask {
  width: 2.9rem;
  height: auto;
  background-color: @Colofff;
  border-radius: 0.05rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem 0.16rem 0.2rem;
  z-index: 6;
}
.ask_dis {
  display: none;
}
.ask_tit {
  width: 100%;
  height: 0.27rem;
  line-height: 0.27rem;
  margin-bottom: 0.13rem;
}
.ico_close {
  width: 0.27rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/close.png") no-repeat center;
  background-size: 100% 100%;
}
.area_box {
  width: 100%;
  height: 1.45rem;
  padding: 0.08rem;
  background-color: @Colorf2f2f2;
  border: 0.01rem solid @Colordbdbdb;
}
.area_box textarea {
  width: 100%;
  height: 100%;
}
.submit_box {
  width: 100%;
  height: 0.38rem;
  line-height: 0.38rem;
  text-align: center;
  border: 0.01rem solid @Colo5A8AC2r;
  border-radius: 0.38rem;
  margin: 0.28rem auto 0;
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