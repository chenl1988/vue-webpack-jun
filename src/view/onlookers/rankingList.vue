 <template>
    <div class="body_box">
        <div class="tit_box">
            <div class="return_box font_size_28"><router-link :to="{ path:'onlookersIndex' }"><span></span>&nbsp;返回</router-link></div>
        </div>
        <div class="tab_box clearfix font_size_28">
            <div class="item line_right fl" @click="tabSwitch.lineBottom1 = true; tabSwitch.lineBottom2 = false; tabSwitch.marLeft=false;"><span :class="{line_bottom: tabSwitch.lineBottom1}">排行榜</span></div>
            <div class="item fr" @click="tabSwitch.lineBottom1 = false; tabSwitch.lineBottom2 = true; tabSwitch.marLeft=true;"><span :class="{line_bottom: tabSwitch.lineBottom2}">购车榜</span></div>
        </div>
        <div class="teb_cont">
            <div class="tab_view clearfix" :class="{mar_left_373: tabSwitch.marLeft}">
                <div class="content_box fl">
                    <div class="list_top clearfix">
                        <div class="lt_item fl lt_sty_1">
                            <div class="pic_box">
                                <img :src="ranking_1_3[1].headimgurl" alt="" v-if="ranking_1_3[1]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="ranking_1_3[1].nickname" v-if="ranking_1_3[1]"></h3>
                            <p class="modification font_size_20" v-text="ranking_1_3[1].counts" v-if="ranking_1_3[1]"></p>
                        </div>
                        <div class="lt_item fl lt_sty_2">
                            <div class="pic_box">
                                <img :src="ranking_1_3[0].headimgurl" alt="" v-if="ranking_1_3[0]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="ranking_1_3[0].nickname" v-if="ranking_1_3[0]"></h3>
                            <p class="modification font_size_20" v-text="ranking_1_3[0].counts" v-if="ranking_1_3[0]"></p>
                        </div>
                        <div class="lt_item fl lt_sty_3">
                            <div class="pic_box">
                                <img :src="ranking_1_3[2].headimgurl" alt=""  v-if="ranking_1_3[2]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="ranking_1_3[2].nickname" v-if="ranking_1_3[2]"></h3>
                            <p class="modification font_size_20" v-text="ranking_1_3[2].counts"  v-if="ranking_1_3[2]"></p>
                        </div>
                    </div>
                    <div class="list_box">
                        <ul class="list font_size_26">
                            <li class="clearfix" v-for="(item,index) in ranking_4_6">
                                <p class="list_rank fl">第<i class="font_size_30" v-text="index + 4"></i>名</p>
                                <p class="list_name fl" v-text="item.nickname"></p>
                                <p class="list_modi fr" v-text="item.counts"></p>
                            </li>

                            <li class="clearfix" v-for="(item,index) in ranking_other">
                                <p class="list_rank fl">第<i v-text="index + 7"></i>名</p>
                                <p class="list_name fl" v-text="item.nickname"></p>
                                <p class="list_modi fr" v-text="item.counts"></p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="content_box fr">
                    <div class="list_top clearfix">
                        <div class="lt_item fl lt_sty_1">
                            <div class="pic_box">
                                <img :src="buyCar_1_3[1].headimgurl" alt="" v-if="buyCar_1_3[1]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="buyCar_1_3[1].nickname" v-if="buyCar_1_3[1]"></h3>
                            <p class="modification font_size_20" v-text="buyCar_1_3[1].counts" v-if="buyCar_1_3[1]"></p>
                        </div>
                        <div class="lt_item fl lt_sty_2">
                            <div class="pic_box">
                                <img :src="buyCar_1_3[0].headimgurl" alt="" v-if="buyCar_1_3[0]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="buyCar_1_3[0].nickname" v-if="buyCar_1_3[0]"></h3>
                            <p class="modification font_size_20" v-text="buyCar_1_3[0].counts" v-if="buyCar_1_3[0]"></p>
                        </div>
                        <div class="lt_item fl lt_sty_3">
                            <div class="pic_box">
                                <img :src="buyCar_1_3[2].headimgurl" alt="" v-if="buyCar_1_3[2]">
                                <div class="crown"></div>
                                <div class="ranking"></div>
                            </div>
                            <h3 class="user_name font_size_26" v-text="buyCar_1_3[2].nickname" v-if="buyCar_1_3[2]"></h3>
                            <p class="modification font_size_20" v-text="buyCar_1_3[2].counts" v-if="buyCar_1_3[2]"></p>
                        </div>
                    </div>
                    <div class="list_box">
                        <ul class="list font_size_26">
                            <li class="clearfix" v-for="(item,index) in buyCar_4_6">
                                <p class="list_rank fl">第<i class="font_size_30" v-text="index + 4"></i>名</p>
                                <p class="list_name fl" v-text="item.nickname"></p>
                                <p class="list_modi fr" v-text="item.counts"></p>
                            </li>

                            <li class="clearfix" v-for="(item,index) in buyCar_other">
                                <p class="list_rank fl">第<i v-text="index + 7"></i>名</p>
                                <p class="list_name fl" v-text="item.nickname"></p>
                                <p class="list_modi fr" v-text="item.counts"></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="my_recommend font_size_32 z_index_6" :class="{displayNoe: display_none}"><router-link :to="{ path:'myRecommend' }"> 我的推荐 </router-link></div>
        <alert-box :alert_status="alertStatus" :alert_data="alertData"></alert-box>
    </div>
</template>

<script>
import { ERR_OK } from "api/config";
import { checkRankingList, checkBuyCar, checkScene } from "api/interface";
import alertBox from "components/alert-box/alert-box";

export default {
  components: {
    "alert-box": alertBox,
  },
  data() {
    return {
      ranking_1_3: [],
      ranking_4_6: [],
      ranking_other: [],
      buyCar_1_3: [],
      buyCar_4_6: [],
      buyCar_other: [],
      tabSwitch: {
        lineBottom1: true,
        lineBottom2: false,
        marLeft: false
      },
      alertStatus: true,
      alertData: "",

      display_none: true,
    };
  },
  created() {
    checkScene().then(res=>{
      if(res.success === ERR_OK){
        this.display_none = false;
      }else{
        this.display_none = true;
      }
    }).catch(()=>{
      this.display_none = true;
    });

    checkRankingList().then(res => {
      if (res.success === ERR_OK) {
        for (let i = 0; i < res.data.length; i++) {
          if (i >= 0 && i < 3) {
            this.ranking_1_3.push(res.data[i]);
          } else if (i >= 3 && i < 6) {
            this.ranking_4_6.push(res.data[i]);
          } else if (i > 5) {
            this.ranking_other.push(res.data[i]);
          }
        }
      } else {
        this.alertStatus = false;
        this.alertData = "服务器网络忙，请稍后再试！";
      }
    });
    checkBuyCar().then(res => {
      if (res.success === ERR_OK) {
        for (let i = 0; i < res.data.length; i++) {
          if (i >= 0 && i < 3) {
            this.buyCar_1_3.push(res.data[i]);
          } else if (i >= 3 && i < 6) {
            this.buyCar_4_6.push(res.data[i]);
          } else if (i > 5) {
            this.buyCar_other.push(res.data[i]);
          }
        }
      } else {
        this.alertStatus = false;
        this.alertData = "服务器网络忙，请稍后再试！";
      }
    });
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
  background: url("@{imgSrc}assets/public_bg.png");
  background-size: 3.75rem auto;
  padding: 0 0.11rem;
  margin: 0 auto;
}
.tit_box {
  width: 100%;
  height: 0.55rem;
  padding: 0.12rem 0 0.13rem;
  background: url("@{imgSrc}assets/ph_bg.png") no-repeat center;
  background-size: 0.59rem 0.2rem;
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
.tab_box {
  width: 100%;
  height: 0.45rem;
  border: 0.01rem solid @Colord1dcfa;
  border-radius: 0.45rem;
  padding: 0.1rem 0;
  text-align: center;
}
.tab_box .item {
  width: 50%;
  height: 100%;
}
.line_right {
  border-right: 0.01rem solid @Colord1dcfa;
}
.tab_box .item span {
  display: inline-block;
  height: 100%;
  color: @Colofff;
}
.line_bottom {
  border-bottom: 0.03rem solid @Colord1dcfa;
}
.teb_cont {
  width: 100%;
  overflow: hidden;
}
.tab_view {
  width: 7.26rem;
  transition: all 0.5s;
}
.content_box {
  width: 3.53rem;
  margin-top: 0.1rem;
}
.mar_left_373 {
  margin-left: -3.73rem;
}

.list_top {
  width: 100%;
  height: 1.5rem;
}
.list_top .lt_item {
  width: 33%;
  padding-top: 0.25rem;
  background-color: @Colofff;
}
.list_top .lt_sty_2 {
  width: 34%;
  padding-top: 0.18rem;
  position: relative;

  &:after {
    content: "";
    width: 0.26rem;
    height: 0.26rem;
    display: block;
    background-image: url("@{imgSrc}assets/no1.png");
    background-size: 100% auto;
    position: absolute;
    top: 0.7rem;
    left: 0.7rem;
  }
}
.lt_sty_1,
.lt_sty_3 {
  margin-top: 0.15rem;
  height: 1.35rem;
  position: relative;
}
.lt_sty_1 {
  border-top-left-radius: 0.05rem;

  &:after {
    content: "";
    width: 0.26rem;
    height: 0.26rem;
    display: block;
    background-image: url("@{imgSrc}assets/no2.png");
    background-size: 100% auto;
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
  }
}
.lt_sty_3 {
  border-top-right-radius: 0.05rem;

  &:after {
    content: "";
    width: 0.26rem;
    height: 0.26rem;
    display: block;
    background-image: url("@{imgSrc}assets/no3.png");
    background-size: 100% auto;
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
  }
}
.lt_sty_2 {
  height: 1.5rem;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  border-left: 0.01rem solid @Colorf0f0f0;
  border-right: 0.01rem solid @Colorf0f0f0;
}
.pic_box {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 100%;
  border: 2px solid @Colorc8c8c8;
  margin: 0 auto;
  position: relative;
}
.lt_sty_1 .crown {
  width: 0.45rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/crown_2.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: -0.16rem;
  left: -0.04rem;
}
.lt_sty_2 .crown {
  width: 0.45rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/crown_1.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: -0.16rem;
  right: 0.04rem;
}
.lt_sty_3 .crown {
  width: 0.45rem;
  height: 0.26rem;
  background: url("@{imgSrc}assets/crown_3.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: -0.16rem;
  right: -0.04rem;
}
.lt_sty_2 .pic_box {
  width: 0.77rem;
  height: 0.77rem;
}
.pic_box img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.user_name {
  width: 0.95rem;
  height: 0.13rem;
  line-height: 0.13rem;
  color: @Color000;
  margin: 0.2rem auto 0.12rem;
  overflow: hidden;
  text-align: center;
  font-weight: 600;
  .text-ellipsis;
}
.modification {
  width: 0.95rem;
  height: 0.13rem;
  line-height: 0.13rem;
  color: @Color4a4a4a;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
  .text-ellipsis;
}
.list_box {
  width: 100%;
  height: calc(~"100vh - 2.58rem");
  background-color: @Colofff;
  padding: 0.17rem 0 0.5rem;
  margin-top: -0.02rem;
}
.list {
  width: 3.3rem;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 0 0.08rem;
  border-top: 0.01rem solid @Colorebebeb;
  border-bottom: 0.01rem solid @Colorebebeb;
}
.list li {
  border-bottom: 0.01rem solid @Colorebebeb;
  height: 0.4rem;
  line-height: 0.4rem;
}
.list li:last-child {
  border-bottom: 0 solid @Colorebebeb;
}
.list_rank {
  color: @Color5a8ac2;
  width: 0.8rem;
  height: 100%;
  text-indent: 0.3rem;
}
.list_name {
  margin-left: 0.15rem;
  width: 1.25rem;
  height: 100%;
  overflow: hidden;
  text-align: center;
  color: @Color4a4a4a;
  .text-ellipsis;
}
.list_modi {
  color: @Color4a4a4a;
  width: 0.7rem;
  height: 100%;
  overflow: hidden;
  .text-ellipsis;
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
.displayNoe{
  display: none;
}
</style>