 <template>
    <div class="body_box">
        <div class="scene_box">
            <div class="tit">
                <div class="ico_close"><router-link :to="{ path:'sceneRecommend' }"></router-link></div>
            </div>
            <div class="prompt_box font_size_34">
                <p>恭喜您已推荐成功<br>赶快邀请更多好友购吧！</p>
            </div>
            <div class="my_recommend font_size_32"><router-link :to="{ path:'sceneRecommend' }"> 继续推荐 </router-link></div>
        </div>
    </div>
</template>

<script>
export default {
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
.prompt_box {
  width: 3.25rem;
  height: 1.75rem;
  background: url("@{imgSrc}assets/success.png") no-repeat center;
  background-size: 100% 100%;
  margin: 1.35rem auto 1.1rem;
  color: @Color5f8ec4;
  padding-top: 0.3rem;
}
.prompt_box p {
  text-align: center;
}
.my_recommend {
  width: 2.65rem;
  height: 0.38rem;
  line-height: 0.38rem;
  text-align: center;
  border-radius: 0.38rem;
  margin: 0 auto;
  border: 0.01rem solid @Color5f8ec4;
}
.my_recommend a {
  color: @Color5f8ec4;
}
</style>