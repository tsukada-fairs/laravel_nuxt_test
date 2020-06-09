<template>
  <div>
    <hooper ref="slider" :settings="hooperSettings" @slide="after">
      <slide v-for="interview in interviews" :key="interview.id">
        <div class="slide-wrap">
          <!-- <p class="title">1. 身長・体重</p> -->
          <div class="question-wrap">
            <p class="question">Q. {{interview.question}}</p>
            <p class="question-attention">{{interview.attention}}</p>
            <div v-if="interview.type == 2">
              <div class="question-item-wrap-flex" v-for="questionItem in interview.questionItems" :key="questionItem.id">
                <div class="question-item">{{questionItem.name}}</div>
                <div class="question-item-input">
                  <div v-for="(input, index) in questionItem.inputs" :key="index">
                    <input :ref="`input_${interview.id}_${questionItem.id}_${input.id}`" :type="questionItem.type" :name="`name_${interview.id}_${questionItem.id}_${input.id}`" :value="input.text"> cm
                  </div>
                </div>
              </div>
            </div>
            <div v-if="interview.type == 1">
              <div class="question-item-wrap">
                <p v-for="questionItem in interview.questionItems" :key="questionItem.id">
                  <label><input :ref="`input_${interview.id}`" :type="questionItem.type" :name="`name_${interview.id}`" :value="questionItem.text">{{questionItem.text}}</label>
                </p>
              </div>
            </div>
          </div>
        </div>
      </slide>
      <hooper-progress slot="hooper-addons"></hooper-progress>
    </hooper>
    <div class="btn-wrap">
      <button id="btn-prev" @click="prev" v-show="currentIndex > 0">戻る</button>
      <button id="btn-next" class="btn-next" @click="next" v-show="hasNext">次へ</button>
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
      currentIndex: 0,
      hasNext: true,
      maxPage: 4,
      interviews: [
        {
          id: 1,
          type: 2,
          question: '身長、体重の入力をお願いいたします。',
          attention: '※ MRI撮影時に必要なため、ご入力ください。',
          questionItems: [
            {
              id: 1,
              name: '身長',
              inputs: [
                {
                  id: 1,
                  type: 'number'
                }
              ]
            },
            {
              id: 2,
              name: '体重',
              inputs: [
                {
                  id: 2,
                  type: 'number'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          type: 1,
          question: '今までに脳ドックを受けたことがありますか？',
          questionItems: [
            {
              id: 3,
              text: 'ある',
              type: 'radio'
            },
            {
              id: 4,
              text: 'ない',
              type: 'radio'
            }
          ]
        },
        {
          id: 3,
          type: 1,
          question: 'あると答えた方のみご記入ください。',
          questionItems: [
            {
              id: 4,
              text: 'ある',
              type: 'radio'
            },
            {
              id: 5,
              text: 'ない',
              type: 'radio'
            }
          ]
        },
        {
          id: 4,
          type: 1,
          question: 'テスト1',
          questionItems: [
            {
              id: 5,
              text: 'ある',
              type: 'radio'
            },
            {
              id: 6,
              text: 'ない',
              type: 'radio'
            }
          ]
        },
        {
          id: 5,
          type: 1,
          question: 'テスト2',
          questionItems: [
            {
              id: 7,
              text: 'ある',
              type: 'radio'
            },
            {
              id: 8,
              text: 'ない',
              type: 'radio'
            }
          ]
        }
      ],
      pageControl: [
        {
          pageId: 3,
          questionItemId: 2,
          answerItemId: 3
        },
        {
          pageId: 4,
          questionItemId: 2,
          answerItemId: 3
        }
      ],
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
      let fullfilled = this.controlPage(this.currentIndex - 1);

      if(fullfilled) {
        this.currentIndex--;
        this.$refs.slider.slideTo(this.currentIndex);
      } else {
        // if (!(this.currentIndex in this.interviews)) {
        //   return;
        // }
        this.currentIndex--;
        this.prev();
      }
      this.hasNext = true;
    },
    next: function() {
      let fullfilled = this.controlPage(this.currentIndex + 1);

      if(fullfilled) {
        this.currentIndex++;
        this.$refs.slider.slideTo(this.currentIndex);
      } else {
        if (!(this.currentIndex in this.interviews)) {
          return;
        }
        this.currentIndex++;
        this.next();
      }

      if (!((this.currentIndex + 1) in this.interviews)) {
        this.hasNext = false;
      }
    },
    after: function(payload) {
      if(payload.slideFrom == null) {
        return;
      }

      // if(payload.currentSlide > payload.slideFrom) {
      //   // this.page++;
      //   this.currentIndex++;
      // } else {
      //   // this.page--;
      //   this.currentIndex--;
      // }
      this.$router.push('/interview?page=' + (this.currentIndex + 1));
    },
    controlPage: function(baseIndex) {
      let nextPageControl = [];
      for(let i in this.pageControl) {
        let page = this.pageControl[i];
        if(page.pageId == this.interviews[baseIndex].id) {
          nextPageControl.push(page);
        }
      }

      let fullfilled = true;
      for(let i in nextPageControl) {
        let page = nextPageControl[i];
        let text = '';
        for(let j in this.interviews) {
          if(this.interviews[j].id == page.questionItemId) {
            for(let k in this.interviews[j].questionItems) {
              if(this.interviews[j].questionItems[k].id == page.answerItemId) {
                text = this.interviews[j].questionItems[k].text
              }
            }
          }
        }
        let partFullfilled = false;
        let name = 'input_' + page.questionItemId;
        for(let k in this.$refs[name]) {
          if(this.$refs[name][k].checked && this.$refs[name][k].value == text) {
            partFullfilled = true;
          }
        }
        if(!partFullfilled) {
          fullfilled = false
        }
      }

      return fullfilled;
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