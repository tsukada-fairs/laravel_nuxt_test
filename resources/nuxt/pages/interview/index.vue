<template>
  <div style="padding-bottom: 15px;">
    <p class="section">{{section}}</p>
    <hooper ref="slider" :settings="hooperSettings" @slide="after">
      <slide v-for="interview in interviews" :key="interview.id">
        <div class="slide-wrap">
          <div class="question-wrap">
            <p class="question">Q. {{interview.question}}</p>
            <p class="question-attention">{{interview.attention}}</p>
            <div v-if="interview.type == 2">
              <div class="question-item-wrap" v-for="questionItem in interview.questionItems" :key="questionItem.id">
                <div class="question-item">{{questionItem.name}}</div>
                <div class="question-item-input">
                  <div v-for="(input, index) in questionItem.inputs" :key="index">
                    <span v-if="input.type == 'number' || input.type == 'text'">{{input.before}} <input :ref="`input_${interview.id}_${questionItem.id}_${input.id}`" :type="input.type" :name="`name_${interview.id}_${questionItem.id}_${input.id}`"> {{input.after}}</span>
                    <span v-if="input.type == 'radio'"><label><input :ref="`input_${interview.id}_${questionItem.id}_${input.id}`" :type="input.type" :name="`name_${interview.id}_${questionItem.id}`" :value="input.label"> {{input.label}}</label></span>
                    <span v-if="input.type == 'checkbox'"><label><input :ref="`input_${interview.id}_${questionItem.id}_${input.id}`" :type="input.type" :name="`name_${interview.id}_${questionItem.id}[]`" :value="input.label"> {{input.label}}</label></span>
                    <span v-if="input.type == 'textarea'"><textarea rows="5" :ref="`input_${interview.id}_${questionItem.id}_${input.id}`" :name="`name_${interview.id}_${questionItem.id}_${input.id}`"></textarea></span>
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
        <div class="btn-wrap">
          <button id="btn-prev" @click="prev" v-show="currentIndex > 0">戻る</button>
          <button id="btn-next" class="btn-next" @click="next" v-show="hasNext">次へ</button>
        </div>
      </slide>
      <hooper-progress slot="hooper-addons"></hooper-progress>
    </hooper>
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
      section: '',
      interviews: [
        {
          id: 1,
          type: 2,
          section: '1.身長・体重',
          question: '身長、体重の入力をお願いいたします。',
          attention: '※ MRI撮影時に必要なため、ご入力ください。',
          questionItems: [
            {
              id: 1,
              name: '身長',
              inputs: [
                {
                  id: 1,
                  type: 'number',
                  after: 'cm',
                }
              ]
            },
            {
              id: 2,
              name: '体重',
              inputs: [
                {
                  id: 2,
                  type: 'number',
                  after: 'kg',
                }
              ]
            }
          ]
        },
        {
          id: 2,
          type: 2,
          section: '2.脳ドックについて',
          question: '今までに脳ドックを受けたことがありますか？',
          questionItems: [
            {
              id: 3,
              inputs: [
                {
                  id: 1,
                  type: 'radio',
                  label: 'ある',
                },
                {
                  id: 2,
                  type: 'radio',
                  label: 'ない',
                }
              ]
            }
          ]
        },
        {
          id: 3,
          type: 2,
          section: '2.脳ドックについて',
          question: 'あると答えた方のみご記入ください。',
          questionItems: [
            {
              id: 4,
              name: '時期',
              inputs: [
                {
                  id: 3,
                  type: 'number',
                  after: '年',
                },
                {
                  id: 4,
                  type: 'number',
                  after: '月',
                },
              ]
            },
            {
              id: 5,
              name: '病院名',
              inputs: [
                {
                  id: 5,
                  type: 'text',
                }
              ]
            },
            {
              id: 6,
              name: '以前に受けた脳ドックの所見はあります。',
              inputs: [
                {
                  id: 6,
                  type: 'radio',
                  label: 'ある'
                },
                {
                  id: 7,
                  type: 'radio',
                  label: 'ない'
                },
              ]
            },
            {
              id: 7,
              name: '以前に受けた脳ドックの所見内容',
              inputs: [
                {
                  id: 8,
                  type: 'textarea'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          type: 2,
          section: '2.脳ドックについて',
          question: '今までにケガなどで頭のMRIやCT検査を受けたことがありますか？',
          questionItems: [
            {
              id: 8,
              inputs: [
                {
                  id: 9,
                  type: 'radio',
                  label: 'ある',
                },
                {
                  id: 10,
                  type: 'radio',
                  label: 'ない',
                }
              ]
            }
          ]
        },
        {
          id: 5,
          type: 2,
          section: '2.脳ドックについて',
          question: 'あると答えた方のみご記入ください。',
          questionItems: [
            {
              id: 9,
              name: '検査',
              inputs: [
                {
                  id: 11,
                  type: 'checkbox',
                  label: '1.CT'
                },
                {
                  id: 12,
                  type: 'checkbox',
                  label: '2.MRI'
                }
              ]
            },
            {
              id: 10,
              name: '時期',
              inputs: [
                {
                  id: 13,
                  type: 'text',
                  after: '年'
                },
                {
                  id: 14,
                  type: 'text',
                  after: '月'
                }
              ]
            },
            {
              id: 11,
              name: '病院名',
              inputs: [
                {
                  id: 15,
                  type: 'text'
                }
              ]
            }
          ]
        },
        {
          id: 6,
          type: 2,
          section: '3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。',
          question: '体内に、下記のものはありますか？',
          attention: '※ 該当する場合MRI検査は受診いただけません。不明な場合はお電話でお問い合わせ下さい。',
          questionItems: [
            {
              id: 12,
              inputs: [
                {
                  id: 16,
                  type: 'radio',
                  label: 'ある'
                },
                {
                  id: 17,
                  type: 'radio',
                  label: 'ない'
                }
              ]
            },
            {
              id: 13,
              name: 'あるを選択された方はチェックしてください。',
              inputs: [
                {
                  id: 18,
                  type: 'checkbox',
                  label: '1.心臓ペースメーカー'
                },
                {
                  id: 19,
                  type: 'checkbox',
                  label: '2.植込型除細動器'
                },
                {
                  id: 20,
                  type: 'checkbox',
                  label: '3.体内刺激電極'
                },
                {
                  id: 21,
                  type: 'checkbox',
                  label: '4.人工内耳'
                },
                {
                  id: 22,
                  type: 'checkbox',
                  label: '5.心臓ペーシングワイヤー'
                },
                {
                  id: 23,
                  type: 'checkbox',
                  label: '6.磁性体脳動脈瘤クリップ'
                },
                {
                  id: 24,
                  type: 'checkbox',
                  label: '7.植え込み型 AED'
                },
                {
                  id: 25,
                  type: 'checkbox',
                  label: '8.機械式人工弁'
                },
                {
                  id: 26,
                  type: 'checkbox',
                  label: '9.磁性体義眼'
                },
                {
                  id: 27,
                  type: 'checkbox',
                  label: '10.乳房再建用の皮膚拡張器'
                },
                {
                  id: 28,
                  type: 'checkbox',
                  label: '11.その他'
                },
                {
                  id: 29,
                  type: 'textarea'
                },
              ]
            },
          ]
        },
        {
          id: 7,
          type: 2,
          section: '3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。',
          question: '体内に、下記の金属異物はありますか？',
          attention: '※入れられた時期や場所によって、検査を受けられないことがあります。可能であれは、MRIの可否を手術を受けられた医師にご確認ください。',
          questionItems: [
            {
              id: 14,
              inputs: [
                {
                  id: 30,
                  type: 'radio',
                  label: 'ある'
                },
                {
                  id: 31,
                  type: 'radio',
                  label: 'ない'
                }
              ]
            },
            {
              id: 15,
              name: 'あるを選択された方は入力してください。',
              inputs: [
                {
                  id: 32,
                  type: 'checkbox',
                  label: '1.冠動脈ステント'
                },
                {
                  id: 33,
                  type: 'text',
                  before: '　手術日'
                },
                {
                  id: 34,
                  type: 'text',
                  before: '　部位'
                },
                {
                  id: 35,
                  type: 'checkbox',
                  label: '2.脳動脈瘤クリップ'
                },
                {
                  id: 36,
                  type: 'text',
                  before: '　手術日'
                },
                {
                  id: 37,
                  type: 'text',
                  before: '　部位'
                },
                {
                  id: 38,
                  type: 'text',
                  before: '　素材'
                },
                {
                  id: 39,
                  type: 'checkbox',
                  label: '3.人工関節'
                },
                {
                  id: 40,
                  type: 'text',
                  before: '　手術日'
                },
                {
                  id: 41,
                  type: 'text',
                  before: '　部位'
                },
                {
                  id: 42,
                  type: 'checkbox',
                  label: '4.その他'
                },
                {
                  id: 43,
                  type: 'text',
                  before: '　手術日'
                },
                {
                  id: 44,
                  type: 'text',
                  before: '　部位'
                },
                {
                  id: 44,
                  type: 'textarea',
                  before: '　'
                },
              ]
            },
          ]
        },
        {
          id: 8,
          type: 2,
          section: '3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。',
          question: '補聴器されていますか？',
          questionItems: [
            {
              id: 16,
              inputs: [
                {
                  id: 45,
                  type: 'radio',
                  label: 'ある',
                },
                {
                  id: 46,
                  type: 'radio',
                  label: 'ない',
                }
              ]
            }
          ]
        },
        {
          id: 9,
          type: 2,
          section: '4.既往歴について',
          question: '高血圧はありますか？',
          questionItems: [
            {
              id: 17,
              inputs: [
                {
                  id: 47,
                  type: 'radio',
                  label: 'ある',
                },
                {
                  id: 48,
                  type: 'radio',
                  label: 'ない',
                },
                {
                  id: 51,
                  type: 'radio',
                  label: 'わからない',
                }
              ]
            }
          ]
        },
        {
          id: 10,
          type: 2,
          section: '4.既往歴について',
          question: 'あるを選択された方で以下のものはありますか？',
          questionItems: [
            {
              id: 18,
              name: '治療状況',
              inputs: [
                {
                  id: 52,
                  type: 'radio',
                  label: '現在通院治療中',
                },
                {
                  id: 53,
                  type: 'radio',
                  label: '検診で指摘されたが放置',
                },
                {
                  id: 54,
                  type: 'radio',
                  label: '経過観察中',
                }
              ]
            },
            {
              id: 19,
              name: '収縮期血圧',
              inputs: [
                {
                  id: 55,
                  type: 'text',
                  after: 'mmHg',
                }
              ]
            },
            {
              id: 20,
              name: '拡張期血圧',
              inputs: [
                {
                  id: 56,
                  type: 'text',
                  after: 'mmHg',
                }
              ]
            },
          ]
        },
        {
          id: 8,
          type: 1,
          section: '最後のページ',
          question: '最後のページ',
          questionItems: [
            // {
            //   id: 45,
            //   text: 'ある',
            //   type: 'radio'
            // },
            // {
            //   id: 46,
            //   text: 'ない',
            //   type: 'radio'
            // }
          ]
        },
      ],
      pageControl: [
        {
          targetPageId: 3,
          pageId: 2,
          questionItemId: 3,
          answerItemId: 1
        },
        {
          targetPageId: 5,
          pageId: 4,
          questionItemId: 8,
          answerItemId: 9
        },
        {
          targetPageId: 10,
          pageId: 9,
          questionItemId: 17,
          answerItemId: 47
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
    this.section = this.interviews[this.currentIndex].section;
    // if(this.$route.query.page != undefined) {
    //   this.page = this.$route.query.page;
    //   this.$refs.slider.slideTo(this.page - 1);
    // }
  },
  methods: {
    prev: function() {
      if(this.$refs.slider.isSliding) {
        return;
      }

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
      this.section = this.interviews[this.currentIndex].section;
      this.hasNext = true;
    },
    next: function() {
      if(this.$refs.slider.isSliding) {
        return;
      }

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
      this.section = this.interviews[this.currentIndex].section;
    },
    after: function(payload) {
      if(payload.slideFrom == null) {
        return;
      }

      window.scrollTo(0, 0);

      // if(payload.currentSlide > payload.slideFrom) {
      //   // this.page++;
      //   this.currentIndex++;
      // } else {
      //   // this.page--;
      //   this.currentIndex--;
      // }
      // this.$router.push('/interview?page=' + (this.currentIndex + 1));
    },
    controlPage: function(baseIndex) {
      let nextPageControl = [];
      for(let i in this.pageControl) {
        let page = this.pageControl[i];
        if(page.targetPageId == this.interviews[baseIndex].id) {
          nextPageControl.push(page);
        }
      }

      let fullfilled = true;
      for(let i in nextPageControl) {
        let page = nextPageControl[i];
        let text = '';
        for(let j in this.interviews) {
          if(this.interviews[j].id == page.pageId) {
            for(let k in this.interviews[j].questionItems) {
              if(this.interviews[j].questionItems[k].id == page.questionItemId) {
                for(let l in this.interviews[j].questionItems[k].inputs) {
                  if(this.interviews[j].questionItems[k].inputs[l].id == page.answerItemId) {
                    text = this.interviews[j].questionItems[k].inputs[l].label;
                    break;
                  }
                }
              }
            }
          }
        }
        // console.log(this.$refs)
        let partFullfilled = false;
        let name = 'input_' + page.pageId + '_' + page.questionItemId + '_' + page.answerItemId;
        for(let i in this.$refs[name]) {
          console.log(this.$refs[name][i].checked);
          console.log(this.$refs[name][i].value);
          if(this.$refs[name][i].checked && this.$refs[name][i].value == text) {
            partFullfilled = true;
          }
        }
        if(!partFullfilled) {
          fullfilled = false;
          break;
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
.section {
  text-align: center;
  font-size: 20px;
  padding: 15px;
}
.slide-wrap {
  padding: 30px;
  font-size: 20px;
  // color: #fff;
  .question-wrap {
    margin-top: 15px;
    .question-attention {
      font-size: 14px;
      color: #999;
    }
    .question-item-wrap {
      margin-top: 20px;
      font-size: 90%;
    }
  }
}
.btn-wrap {
  text-align: center;
  button {
    width: 150px;
    height: 40px;
  }
  .btn-next {
    margin-left: 10px;
  }
}

textarea {
  width: 100%;
}

@media (min-width: 1021px) {
  .slide-wrap{
    width: 640px;
    margin:0 auto;
  }
}
</style>