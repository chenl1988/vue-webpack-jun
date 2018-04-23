 <template>
    <div class="body_box">
        <div class="tit_box">
            <div class="return_box font_size_28"><router-link :to="{ path:'rankingList' }"><span></span>&nbsp;返回</router-link></div>
        </div>
        <div class="content_box">
            <div class="reco_list">
                <div v-if="recommendList.length > 0" class="reco_item clearfix font_size_26" v-for="(itme, index) in recommendList">
                    <div class="num fl" v-text="index+1"></div>
                    <div class="text_box">
                        <p>推荐用户：{{ itme.re_username }}</p>
                        <p>推荐时间：{{ itme.starttime | timeFormat }}</p>
                        <p>推荐状态：<span>{{ status[itme.re_status] }}</span></p>
                    </div>
                </div>
                <div v-if="recommendList.length == 0" class="no_data font_size_26">您还没有推荐好友</div>
            </div>
        </div>
        <div class="my_recommend font_size_32 z_index_6" @click="siteRecom"><router-link :to="{ path:'sceneRecommend' }"> 继续推荐 </router-link></div>
        <loading-page :load_active="loadStatus"></loading-page> 
        <alert-box :alert_status="alertStatus" :btn_status="btnStatus" :alert_data="alertData" :btn_link="btnLink" :btn_text="btnText"></alert-box>

    </div>
</template>

<script>
import { ERR_OK } from "api/config";
import { checkMyrankinglist, checkScene } from "api/interface";
import loadingPage from "components/loading-page/loading-page";
import alertBox from "components/alert-box/alert-box";

export default {
  components: {
    "loading-page": loadingPage,
    "alert-box": alertBox,
  },
  data() {
    return {
      recommendList: [],
      status: { 0: "未购车", 1: "已购车" },
      loadStatus: true,

      alertStatus: true,
      alertData: "",
      btnStatus: false,
      btnText: '去认证',
      btnLink: AUTH_LINK,
    };
  },
  created() {
    this.loadStatus = false;
    checkMyrankinglist().then(res => {
      if (res.success === ERR_OK) {
        this.recommendList = res.data;
      }
      this.loadStatus = true;
    });
  },
  mounted() {},
  methods: {
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
  },
  filters:{  
      timeFormat(val){
        let date = new Date(val * 1000);
        let y = date.getFullYear() + '-';
        let m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let d = date.getDate();
        return y + m + d;
      },
  },
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
}
.tit_box {
  width: 100%;
  height: 0.55rem;
  padding: 0.13rem 0 0.16rem;
  background: url("@{imgSrc}assets/tj_bg.png") no-repeat center;
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
.reco_list {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 0.22rem;
  padding-bottom: 0.6rem;
}
.reco_list .reco_item {
  width: 100%;
  padding: 0.22rem 0;
  border-bottom: 0.01rem solid @Colorebebeb;

  &:first-child {
    padding: 0 0 0.22rem;
  }
}
.no_data{
  text-align: center;
}
.num {
  width: 0.43rem;
  height: 0.48rem;
  color: @Color5a8ac2;
  font-weight: 600;
  text-indent: 0.07rem;
}
.text_box p {
  height: 0.18rem;
  line-height: 0.18rem;
}
.text_box p span {
  color: @Color9f9f9f;
}
.my_recommend {
  width: 3.75rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: linear-gradient(-188deg, #616cc7 0%, #3e8fc8 100%);
  opacity: 0.87;
}
.my_recommend a {
  color: @Colofff;
}
</style>