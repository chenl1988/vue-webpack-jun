 <template>
    <div class="body_box">
        <div class="tit_box">
            <div class="return_box font_size_28"><router-link :to="{ path:'interactionIndex' }"><span></span>&nbsp;返回</router-link></div>
        </div>
        <div class="content_box">
            <ul class="inte_list">
                  <li v-for="(item, index) in myAnswerList" @click="saveAnswer(index)">
                    <div class="int_tit clearfix">
                        <div class="pic fl"><img :src="item.headimgurl" alt=""></div>
                        <p class="name fl font_size_28" v-text="item.nickname"></p>
                    </div>
                    <p class="text_box font_size_26" v-text="item.content"></p>
                  </li>
            </ul>
        </div>
        <loading-page :load_active="loadStatus"></loading-page> 
        <alert-box :alert_status="alertStatus" :alert_data="alertData"></alert-box>
    </div>
</template>

<script>
import { ERR_OK } from "api/config";
import { checkMyanswer } from "api/interface";
import loadingPage from "components/loading-page/loading-page";
import alertBox from "components/alert-box/alert-box";
export default {
  components: {
    "loading-page": loadingPage,
    "alert-box": alertBox,
  },
  data() {
    return {
      myAnswerList: [],
      problem: '',
      loadStatus: true,
      alertStatus: true,
      alertData: "",
    };
  },
  created() {
    this.loadStatus = false;
    checkMyanswer().then(res => {
      if(res.success === ERR_OK){
        this.myAnswerList = res.data;
      }else{
        this.alertStatus = false;
        this.alertData = res.errormsg;
      }
      this.loadStatus = true;
    }).catch(err => {
      this.loadStatus = true;
      this.alertStatus = false;
      this.alertData = "服务器网络忙，请稍后再试！";
    })
  },
  mounted() {},
  methods: {
    saveAnswer(index){
      this.$router.push({ path: "interactionInfor" });
      localStorage.setItem("answer", JSON.stringify(this.myAnswerList[index]));
    },
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


</style>