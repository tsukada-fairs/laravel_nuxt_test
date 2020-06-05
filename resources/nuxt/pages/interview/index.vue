<template>
  <div>
    <hooper ref="slider" :settings="hooperSettings" @slide="after">
      <slide>
        <div class="slide-wrap">
          <p class="title">1. 身長・体重</p>
          <div class="question-wrap">
            <p class="question">Q. 身長、体重の入力をお願いいたします。</p>
            <p class="question-attention">※ MRI撮影時に必要なため、ご入力ください。</p>
            <div class="question-item-wrap-flex">
              <div class="question-item">身長</div>
              <div class="question-item-input">
                <input type="number" name="height"> cm
              </div>
            </div>
            <div class="question-item-wrap-flex">
              <div class="question-item">体重</div>
              <div class="question-item-input">
                <input type="number" name="weight"> kg
              </div>
            </div>
          </div>
        </div>
      </slide>
      <slide>
        <div class="slide-wrap">
          <p class="title">2.脳ドックについて</p>
          <div class="question-wrap">
            <p class="question">Q. 今までに脳ドックを受けたことがありますか？</p>
            <div class="question-item-wrap">
              <p><label><input type="radio" name="doc">ある</label></p>
              <p style="margin-top:10px;"><label><input type="radio" name="doc">ない</label></p>
            </div>
          </div>
        </div>
      </slide>
      <slide>
        <div class="slide-wrap">
          <p class="title">3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。</p>
          <div class="question-wrap">
            <p class="question">Q. 体内に、下記のものはありますか？</p>
            <div class="question-item-wrap">
              <p><label><input type="radio" name="internalDevicesFlg">ある</label></p>
              <p style="margin-top:10px;"><label><input type="radio" name="internalDevicesFlg">ない</label></p>
            </div>
          </div>
        </div>
      </slide>
      <slide>
        <div class="slide-wrap">slide 4</div>
      </slide>
      
      <hooper-progress slot="hooper-addons"></hooper-progress>
    </hooper>
    <div class="btn-wrap">
      <button id="btn-prev" @click="prev" v-show="page > 1">戻る</button>
      <button id="btn-next" class="btn-next" @click="next" v-show="maxPage > page">次へ</button>
    </div>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress
  } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'App',
  data: function() {
    return {
      page: 1,
      maxPage: 4,
      hooperSettings: { 
        mouseDrag: false,
        touchDrag: false,
        wheelControl: false
      }
    }
  },
  components: {
    Hooper,
    Slide,
    HooperProgress
  },
  mounted: function() {
    if(this.$route.query.page != undefined) {
      this.page = this.$route.query.page;
      this.$refs.slider.slideTo(this.page - 1);
    }
  },
  methods: {
    prev: function() {
      this.$refs.slider.slidePrev();
    },
    next: function() {
      this.$refs.slider.slideNext();
    },
    after: function(payload) {
      if(payload.slideFrom == null) {
        return;
      }

      if(payload.currentSlide > payload.slideFrom) {
        this.page++;
      } else {
        this.page--;
      }
      this.$router.push('/interview?page=' + this.page);
    }
  }
};
</script>

<style lang="scss">
.hooper {
  height: 100%;
}
// .hooper-slide {
  // background-color: #47da7f;
// }
.hooper,
.hooper-list,
.hooper-slide:focus {
  outline: none !important;
}
.slide-wrap {
  padding: 30px;
  font-size: 20px;
  // color: #fff;
  .title {
    text-align: center;
  }
  .question-wrap {
    margin-top: 15px;
    .question-attention {
      font-size: 14px;
      color: #999;
    }
    .question-item-wrap {
      margin-top: 15px;
    }
    .question-item-wrap-flex {
      margin-top: 15px;
      display: flex;
      .question-item {
        margin-right: 15px;
      }
    }
  }
}
.btn-wrap {
  text-align: center;
  button {
    width: 100px;
  }
  .btn-next {
    margin-left: 10px;
  }
}

@media (min-width: 1021px) {
  .slide-wrap{
    width: 640px;
    margin:0 auto;
  }
}
</style>