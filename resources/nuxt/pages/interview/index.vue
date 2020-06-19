<template>
  <div style="padding-bottom: 15px;">
    <p class="section">{{section}}</p>
    <hooper ref="slider" :settings="hooperSettings" @slide="after">
      <slide v-for="(interviewPage, index1) in interviewSheet.interviewPages" :key="interviewPage.id">
        <validation-observer :ref="`validationObserver${index1}`" tag="div" v-slot="{handleSubmit}">
          <div class="slide-wrap">
            <div class="question-wrap" v-for="(questionItemGroup, index2) in interviewPage.questionItems" :key="index2">
              <div v-for="questionItem in questionItemGroup" :key="questionItem.id">
                <p class="question"><span class="must" v-if="questionItem.required_flag">必須</span>Q. {{questionItem.question}}</p>
                <p class="question-attention">{{questionItem.caution}}</p>
                <div v-if="questionItem.answerItems.length > 0" class="question-item-wrap">
                  <div class="question-item-input">
                    <div v-for="answerItem in questionItem.answerItems" :key="answerItem.id" class="question-item-input-wrap">
                      <validation-provider v-slot="{ errors }" :rules="questionItem.required_flag == 1 ? 'required' : ''" :name="questionItem.question" tag="div">
                        <div v-if="answerItem.type == 'text'">
                          {{answerItem.before_string}} <input :ref="`input_${interviewSheet.id}_${questionItem.id}_${answerItem.id}`" :type="answerItem.type" v-model="interviewAnswers[`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`]" :placeholder="answerItem.placeholder"> {{answerItem.after_string}}
                        </div>
                        <div v-if="answerItem.type == 'number'" class="answerItem-wrap-flex">
                          <div style="margin-right: 5px;">
                            <div style="margin-bottom: 3px;">
                              <button
                                v-longclick="() => stepUpNumber(`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`, answerItem)"
                                @click="stepUpNumber(`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`, answerItem)" type="button" class="number-plus-btn">＋</button>
                            </div>
                            <input :ref="`input_${interviewSheet.id}_${questionItem.id}_${answerItem.id}`" :type="answerItem.type" v-model="interviewAnswers[`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`]" :value="answerItem.num_default" :placeholder="answerItem.placeholder">
                            <div style="margin-top: 3px;">
                              <button
                                v-longclick="() => stepDownNumber(`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`, answerItem)"
                                @click="stepDownNumber(`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`, answerItem)"
                                type="button" class="number-plus-btn">ー</button>
                            </div>
                          </div>
                          <div>{{answerItem.after_string}}</div>
                        </div>
                        <div v-if="answerItem.type == 'radio'"><label><input :ref="`input_${interviewSheet.id}_${questionItem.id}_${answerItem.id}`" :type="answerItem.type" v-model="interviewAnswers[`${interviewSheet.id}_${questionItem.id}`]" :value="answerItem.caption"> {{answerItem.caption}}</label></div>
                        <div v-if="answerItem.type == 'checkbox'"><label><input :ref="`input_${interviewSheet.id}_${questionItem.id}_${answerItem.id}`" :type="answerItem.type" :value="answerItem.id" v-model="interviewAnswers[`${interviewSheet.id}_${questionItem.id}`]"> {{answerItem.caption}}</label></div>
                        <div v-if="answerItem.type == 'textarea'"><textarea rows="5" :ref="`input_${interviewSheet.id}_${questionItem.id}_${answerItem.id}`" v-model="interviewAnswers[`${interviewSheet.id}_${questionItem.id}_${answerItem.id}`]"></textarea></div>
                        <p v-show="errors.length" class="error">
                          {{ errors[0] }}
                        </p>
                      </validation-provider>
                    </div>
                  </div>
                </div>
                <div v-if="questionItem.childItems.length > 0">
                  <div v-for="childItem in questionItem.childItems" :key="childItem.id">
                    <div class="question-item-wrap">
                      <p class="question-item"><span class="must" v-if="childItem.required_flag">必須</span>{{childItem.question}}</p>
                      <p class="question-attention">{{childItem.caution}}</p>
                      <div class="question-item-input">
                        <div v-for="answerItem in childItem.answerItems" :key="answerItem.id" class="question-item-input-wrap">
                          <validation-provider v-slot="{ errors }" :rules="childItem.required_flag == 1 ? 'required' : ''" :name="childItem.question" tag="div">
                            <div v-if="answerItem.type == 'text'">
                              {{answerItem.before_string}} <input :ref="`input_${interviewSheet.id}_${childItem.id}_${answerItem.id}`" :type="answerItem.type" v-model="interviewAnswers[`${interviewSheet.id}_${childItem.id}_${answerItem.id}`]" :placeholder="answerItem.placeholder"> {{answerItem.after_string}}
                            </div>
                            <div v-if="answerItem.type == 'number'" class="answerItem-wrap-flex">
                              <div style="margin-right: 5px;">
                                <div style="margin-bottom: 3px;">
                                  <button 
                                    v-longclick="() => stepUpNumber(`${interviewSheet.id}_${childItem.id}_${answerItem.id}`, answerItem)"
                                    @click="stepUpNumber(`${interviewSheet.id}_${childItem.id}_${answerItem.id}`, answerItem)"
                                    type="button" class="number-plus-btn">＋</button>
                                </div>
                                <input :ref="`input_${interviewSheet.id}_${childItem.id}_${answerItem.id}`" :type="answerItem.type" v-model="interviewAnswers[`${interviewSheet.id}_${childItem.id}_${answerItem.id}`]" :placeholder="answerItem.placeholder">
                                <div style="margin-top: 3px;">
                                  <button 
                                    v-longclick="() => stepDownNumber(`${interviewSheet.id}_${childItem.id}_${answerItem.id}`, answerItem)"
                                    @click="stepDownNumber(`${interviewSheet.id}_${childItem.id}_${answerItem.id}`, answerItem)"
                                    type="button" class="number-plus-btn">ー</button>
                                </div>
                              </div>
                              <div>{{answerItem.after_string}}</div>
                            </div>
                            <div v-if="answerItem.type == 'radio'"><label><input :ref="`input_${interviewSheet.id}_${childItem.id}_${answerItem.id}`" :type="answerItem.type" :value="answerItem.caption" v-model="interviewAnswers[`${interviewSheet.id}_${childItem.id}`]"> {{answerItem.caption}}</label></div>
                            <div v-if="answerItem.type == 'checkbox'"><label><input :ref="`input_${interviewSheet.id}_${childItem.id}_${answerItem.id}`" :type="answerItem.type" :value="answerItem.id" v-model="interviewAnswers[`${interviewSheet.id}_${childItem.id}`]"> {{answerItem.caption}}</label></div>
                            <div v-if="answerItem.type == 'textarea'"><textarea rows="5" :ref="`input_${interviewSheet.id}_${childItem.id}_${answerItem.id}`" v-model="interviewAnswers[`${interviewSheet.id}_${childItem.id}_${answerItem.id}`]"></textarea></div>
                            <p v-show="errors.length" class="error">
                              {{ errors[0] }}
                            </p>
                          </validation-provider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <button id="btn-prev" class="btn" @click="prev" v-show="currentIndex > 0">戻る</button>
            <button id="btn-next" class="btn-next btn" @click="handleSubmit(next)" v-show="hasNext">次へ</button>
          </div>
        </validation-observer>
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
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

export default {
  name: 'App',
  data: function() {
    return {
      page: 1,
      currentIndex: 0,
      hasNext: true,
      section: '',
      interviewAnswers: {},
      interviewSheet: {
        id: 1,
        interviewPages: [
          {
            id: 1,
            section: '1.身長・体重',
            questionItems: [
              [
                {
                  id: 1,
                  type: 1,
                  question: '身長、体重の入力をお願いいたします。',
                  memo: '',
                  caution: '※ MRI撮影時に必要なため、ご入力ください。',
                  required_flag: 0,
                  childItems: [
                    {
                      id: 2,
                      type: 2,
                      question: '身長',
                      memo: '',
                      caution: '小数点以下四捨五入',
                      required_flag: 1,
                      answerItems: [
                        {
                          id: 1,
                          type: 'number',
                          caption: '',
                          before_string: '',
                          after_string: 'cm',
                          placeholder: '175',
                          num_default: 165,
                          num_min: 110,
                          num_max: 250,
                          num_interval: 1
                        }
                      ]
                    },
                    {
                      id: 3,
                      type: 2,
                      question: '体重',
                      memo: '',
                      caution: '小数点以下四捨五入',
                      required_flag: 1,
                      answerItems: [
                        {
                          id: 2,
                          type: 'number',
                          caption: '',
                          before_string: '',
                          after_string: 'kg',
                          placeholder: '60',
                          num_default: 60,
                          num_min: 10,
                          num_max: 200,
                          num_interval: 1
                        }
                      ]
                    }
                  ],
                  answerItems: []
                }
              ]
            ]
          },
          {
            id: 2,
            section: '2.脳ドックについて',
            questionItems: [
              [
                {
                  id: 4,
                  type: 1,
                  question: '今までに脳ドックを受けたことがありますか？',
                  memo: '',
                  caution: '',
                  required_flag: 1,
                  childItems: [],
                  answerItems: [
                    {
                      id: 3,
                      type: 'radio',
                      caption: 'あり',
                      before_string: '',
                      after_string: '',
                    },
                    {
                      id: 4,
                      type: 'radio',
                      caption: 'なし',
                      before_string: '',
                      after_string: ''
                    }
                  ]
                }
              ]
            ]
          },
          {
            id: 3,
            section: '2.脳ドックについて',
            questionItems: [
              [
                {
                  id: 5,
                  type: 1,
                  question: 'あると答えた方のみご記入ください。',
                  memo: '',
                  caution: '',
                  required_flag: 0,
                  childItems: [
                    {
                      id: 6,
                      type: 2,
                      question: '時期',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 5,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: '年',
                          placeholder: '2017'
                        },
                        {
                          id: 6,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: '月',
                          placeholder: '5'
                        }
                      ]
                    },
                    {
                      id: 7,
                      type: 2,
                      question: '病院名',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 7,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: '',
                          placeholder: 'メディカルチェックスタジオ'
                        }
                      ]
                    },
                    {
                      id: 8,
                      type: 2,
                      question: '以前に受けた脳ドックの所見はあります。',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 8,
                          type: 'radio',
                          caption: 'あり',
                          before_string: '',
                          after_string: '',
                          placeholder: ''
                        },
                        {
                          id: 9,
                          type: 'radio',
                          caption: 'なし',
                          before_string: '',
                          after_string: '',
                          placeholder: ''
                        }
                      ]
                    },
                    {
                      id: 9,
                      type: 2,
                      question: '以前に受けた脳ドックの所見内容',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 10,
                          type: 'textarea',
                          caption: '',
                          before_string: '',
                          after_string: '',
                          placeholder: ''
                        }
                      ]
                    },
                  ],
                  answerItems: []
                }
              ]
            ]
          },
          {
            id: 4,
            section: '2.脳ドックについて',
            questionItems: [
              [
                {
                  id: 10,
                  type: 1,
                  question: '今までにケガなどで頭のMRIやCT検査を受けたことがありますか？',
                  memo: '',
                  caution: '',
                  required_flag: 1,
                  childItems: [],
                  answerItems: [
                    {
                      id: 11,
                      type: 'radio',
                      caption: 'あり',
                      before_string: '',
                      after_string: '',
                    },
                    {
                      id: 12,
                      type: 'radio',
                      caption: 'なし',
                      before_string: '',
                      after_string: ''
                    }
                  ]
                }
              ]
            ]
          },
          {
            id: 5,
            section: '2.脳ドックについて',
            questionItems: [
              [
                {
                  id: 11,
                  type: 1,
                  question: 'あると答えた方のみご記入ください。',
                  memo: '',
                  caution: '',
                  required_flag: 0,
                  childItems: [
                    {
                      id: 12,
                      type: 2,
                      question: '検査',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 13,
                          type: 'checkbox',
                          caption: '1.CT',
                          before_string: '',
                          after_string: ''
                        },
                        {
                          id: 14,
                          type: 'checkbox',
                          caption: '2.MRI',
                          before_string: '',
                          after_string: ''
                        }
                      ]
                    },
                    {
                      id: 13,
                      type: 2,
                      question: '時期',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 15,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: '年',
                          placeholder: '2017'
                        },
                        {
                          id: 16,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: '月',
                          placeholder: '5'
                        }
                      ]
                    },
                    {
                      id: 14,
                      type: 2,
                      question: '病院名',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 17,
                          type: 'textarea',
                          caption: '',
                          before_string: '',
                          after_string: ''
                        }
                      ]
                    }
                  ],
                  answerItems: []
                }
              ]
            ]
          },
          {
            id: 6,
            section: '3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。',
            questionItems: [
              [
                {
                  id: 15,
                  type: 1,
                  question: '体内に、下記のものはありますか？',
                  memo: '',
                  caution: '※該当する場合MRI検査は受診いただけません。不明な場合はお電話でお問い合わせ下さい。',
                  required_flag: 1,
                  childItems: [
                    {
                      id: 16,
                      type: 1,
                      question: 'あるを選択された方で以下のものはありますか？',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 18,
                          type: 'checkbox',
                          caption: '1.心臓ペースメーカー',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 19,
                          type: 'checkbox',
                          caption: '2.植込型除細動器',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 20,
                          type: 'checkbox',
                          caption: '3.体内刺激電極',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 21,
                          type: 'checkbox',
                          caption: '4.人工内耳',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 22,
                          type: 'checkbox',
                          caption: '5.心臓ペーシングワイヤー',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 23,
                          type: 'checkbox',
                          caption: '6.磁性体脳動脈瘤クリップ',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 24,
                          type: 'checkbox',
                          caption: '7.植え込み型 AED',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 25,
                          type: 'checkbox',
                          caption: '8.機械式人工弁',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 26,
                          type: 'checkbox',
                          caption: '9.磁性体義眼',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 27,
                          type: 'checkbox',
                          caption: '10.乳房再建用の皮膚拡張器',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 28,
                          type: 'checkbox',
                          caption: '11.その他',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 29,
                          type: 'textarea',
                          caption: '',
                          before_string: '',
                          after_string: '',
                        },
                      ]
                    }
                  ],
                  answerItems: [
                    {
                      id: 30,
                      type: 'radio',
                      caption: 'あり',
                      before_string: '',
                      after_string: '',
                    },
                    {
                      id: 31,
                      type: 'radio',
                      caption: 'なし',
                      before_string: '',
                      after_string: ''
                    }
                  ]
                }
              ]
            ]
          },
          {
            id: 7,
            section: '3.MRIは強い磁場と電波を使用して身体の断層画像を撮影します。より安全に検査を行うため、次の質問にお答えください。',
            questionItems: [
              [
                {
                  id: 17,
                  type: 1,
                  question: '体内に、下記の金属異物はありますか？',
                  memo: '',
                  caution: '※入れられた時期や場所によって、検査を受けられないことがあります。可能であれは、MRIの可否を手術を受けられた医師にご確認ください。',
                  required_flag: 1,
                  childItems: [
                    {
                      id: 18,
                      type: 1,
                      question: '金属異物',
                      memo: '',
                      caution: '※複数チェック可',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 34,
                          type: 'checkbox',
                          caption: '1.冠動脈ステント',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 35,
                          type: 'text',
                          caption: '',
                          before_string: '手術日',
                          after_string: '',
                        },
                        {
                          id: 36,
                          type: 'text',
                          caption: '',
                          before_string: '部位',
                          after_string: '',
                        },
                        {
                          id: 37,
                          type: 'checkbox',
                          caption: '2.脳動脈瘤クリップ',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 38,
                          type: 'text',
                          caption: '',
                          before_string: '手術日',
                          after_string: '',
                        },
                        {
                          id: 39,
                          type: 'text',
                          caption: '',
                          before_string: '部位',
                          after_string: '',
                        },
                        {
                          id: 40,
                          type: 'text',
                          caption: '',
                          before_string: '素材',
                          after_string: '',
                        },
                        {
                          id: 41,
                          type: 'checkbox',
                          caption: '3.人工関節',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 42,
                          type: 'text',
                          caption: '',
                          before_string: '手術日',
                          after_string: '',
                        },
                        {
                          id: 43,
                          type: 'text',
                          caption: '',
                          before_string: '部位',
                          after_string: '',
                        },
                        {
                          id: 44,
                          type: 'checkbox',
                          caption: '4.その他',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 45,
                          type: 'text',
                          caption: '',
                          before_string: '手術日',
                          after_string: '',
                        },
                        {
                          id: 46,
                          type: 'text',
                          caption: '',
                          before_string: '部位',
                          after_string: '',
                        },
                        {
                          id: 47,
                          type: 'textarea',
                          caption: '',
                          before_string: '',
                          after_string: '',
                        }
                      ]
                    }
                  ],
                  answerItems: [
                    {
                      id: 32,
                      type: 'radio',
                      caption: 'あり',
                      before_string: '',
                      after_string: '',
                    },
                    {
                      id: 33,
                      type: 'radio',
                      caption: 'なし',
                      before_string: '',
                      after_string: ''
                    }
                  ]
                }
              ]
            ]
          },
          {
            id: 8,
            section: '4.既往歴について',
            questionItems: [
              [
                {
                  id: 19,
                  type: 1,
                  question: '高血圧はありますか？',
                  memo: '',
                  caution: '',
                  required_flag: 1,
                  childItems: [],
                  answerItems: [
                    {
                      id: 48,
                      type: 'radio',
                      caption: 'ある',
                      before_string: '',
                      after_string: '',
                    },
                    {
                      id: 49,
                      type: 'radio',
                      caption: 'ない',
                      before_string: '',
                      after_string: ''
                    },
                    {
                      id: 50,
                      type: 'radio',
                      caption: 'わからない',
                      before_string: '',
                      after_string: ''
                    }
                  ]
                }
              ]
            ]
          },
          {
            id: 9,
            section: '4.既往歴について',
            questionItems: [
              [
                {
                  id: 20,
                  type: 1,
                  question: 'あるを選択された方で以下のものはありますか？',
                  memo: '',
                  caution: '',
                  required_flag: 0,
                  childItems: [
                    {
                      id: 21,
                      type: 1,
                      question: '治療状況',
                      memo: '',
                      caution: '',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 51,
                          type: 'radio',
                          caption: '現在通院治療中',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 52,
                          type: 'radio',
                          caption: '検診で指摘されたが放置',
                          before_string: '',
                          after_string: '',
                        },
                        {
                          id: 53,
                          type: 'radio',
                          caption: '経過観察中',
                          before_string: '',
                          after_string: '',
                        }
                      ]
                    },
                    {
                      id: 22,
                      type: 2,
                      question: '収縮期血圧',
                      memo: '',
                      caution: '※わからなければ未記入でも問題ございません。',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 54,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: 'mmHg',
                          placeholder: 186
                        }
                      ]
                    },
                    {
                      id: 23,
                      type: 2,
                      question: '拡張期血圧',
                      memo: '',
                      caution: '※わからなければ未記入でも問題ございません。',
                      required_flag: 0,
                      answerItems: [
                        {
                          id: 55,
                          type: 'text',
                          caption: '',
                          before_string: '',
                          after_string: 'mmHg',
                          placeholder: 107
                        }
                      ]
                    }
                  ],
                  answerItems: []
                }
              ]
            ]
          },
        ]
      },
      pageControl: [
        {
          targetPageId: 3,
          pageId: 2,
          questionItemId: 4,
          answerItemId: 3
        },
        {
          targetPageId: 5,
          pageId: 4,
          questionItemId: 10,
          answerItemId: 11
        },
        // {
        //   targetPageId: 10,
        //   pageId: 9,
        //   questionItemId: 17,
        //   answerItemId: 47
        // }
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
    this.section = this.interviewSheet.interviewPages[this.currentIndex].section;
    // if(this.$route.query.page != undefined) {
    //   this.page = this.$route.query.page;
    //   this.$refs.slider.slideTo(this.page - 1);
    // }
    // console.log(this.interviewAnswers);
    for(let j in this.interviewSheet.interviewPages) {
      let interviewPage = this.interviewSheet.interviewPages[j];
      for(let k in interviewPage.questionItems) {
        let questionItemGroup = interviewPage.questionItems[k]
        for(let l in questionItemGroup) {
          let questionItem = questionItemGroup[l];
          for(let l in questionItem.answerItems) {
            let answerItem = questionItem.answerItems[l];

            let keyName = '';
            if(answerItem.type == 'radio') {
              keyName = this.interviewSheet.id + '_' + questionItem.id;
              this.$set(this.interviewAnswers, keyName, '');
            } else if(answerItem.type == 'checkbox') {
                keyName = this.interviewSheet.id + '_' + questionItem.id;
                if(!(keyName in this.interviewAnswers)) {
                  this.$set(this.interviewAnswers, keyName, []);
                }
            } else if(answerItem.type == 'number') {
              keyName = this.interviewSheet.id + '_' + questionItem.id + '_' + answerItem.id;;
              this.$set(this.interviewAnswers, keyName, answerItem.num_default);
            } else {
              keyName = this.interviewSheet.id + '_' + questionItem.id + '_' + answerItem.id;
              this.$set(this.interviewAnswers, keyName, '');
            }
          }
          for(let l in questionItem.childItems) {
            let childItem = questionItem.childItems[l];
            for(let m in childItem.answerItems) {
              let answerItem = childItem.answerItems[m];
              let keyName = '';
              if(answerItem.type == 'radio') {
                this.$set(this.interviewAnswers, this.interviewSheet.id + '_' + childItem.id, '');
              } else if(answerItem.type == 'checkbox') {
                keyName = this.interviewSheet.id + '_' + childItem.id;
                if(!(keyName in this.interviewAnswers)) {
                  this.$set(this.interviewAnswers, keyName, []);
                }
              } else if(answerItem.type == 'number') {
                keyName = this.interviewSheet.id + '_' + childItem.id + '_' + answerItem.id;;
                this.$set(this.interviewAnswers, keyName, answerItem.num_default);
              } else {
                keyName = this.interviewSheet.id + '_' + childItem.id + '_' + answerItem.id;
                this.$set(this.interviewAnswers, keyName, '');
              }
            }
          }
        }
      }
    }
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
      this.section = this.interviewSheet.interviewPages[this.currentIndex].section;
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
        if (!(this.currentIndex in this.interviewSheet.interviewPages)) {
          return;
        }
        this.currentIndex++;
        this.next();
      }

      if (!((this.currentIndex + 1) in this.interviewSheet.interviewPages)) {
        this.hasNext = false;
      }
      this.section = this.interviewSheet.interviewPages[this.currentIndex].section;
      return;
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
    /**
     * ページ制御
     */
    controlPage: function(baseIndex) {
      let nextPageControl = [];
      for(let i in this.pageControl) {
        let page = this.pageControl[i];
        if(page.targetPageId == this.interviewSheet.interviewPages[baseIndex].id) {
          nextPageControl.push(page);
        }
      }

      let fullfilled = true;
      for(let i in nextPageControl) {
        let page = nextPageControl[i];
        let text = '';
        for(let j in this.interviewSheet.interviewPages) {
          let interviewPage = this.interviewSheet.interviewPages[j];
          if(interviewPage.id == page.pageId) {
            for(let k in interviewPage.questionItems) {
              let questionItemGroup = interviewPage.questionItems[k]
              for(let l in questionItemGroup) {
                let questionItem = questionItemGroup[l];
                if(questionItem.id == page.questionItemId) {
                  for(let l in questionItem.answerItems) {
                    let answerItem = questionItem.answerItems[l];
                    if(answerItem.id == page.answerItemId) {
                      text = answerItem.caption;
                      break;
                    }
                  }
                } else {
                  for(let l in questionItem.childItems) {
                    let childItem = questionItem.childItems[l];
                    if(childItem.id == page.questionItemId) {
                      for(let m in childItem.answerItems) {
                        let answerItem = childItem.answerItems[m];
                        if(answerItem.id == page.answerItemId) {
                          text = answerItem.caption;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        let partFullfilled = false;
        let name = 'input_' + this.interviewSheet.id + '_' + page.questionItemId + '_' + page.answerItemId;
        for(let i in this.$refs[name]) {
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
    },
    /**
     * input numberの加算
     */
    stepUpNumber: function(ref, answerItem) {
      const input = this.$refs['input_' + ref][0];
      if(answerItem.num_max > input.value) {
        input.focus();
        input.stepUp(answerItem.num_interval);
        this.interviewAnswers[ref] = input.value;
      }
    },
    /**
     * input numberの減算
     */
    stepDownNumber: function(ref, answerItem) {
      const input = this.$refs['input_' + ref][0];
      if(answerItem.num_min < input.value) {
        input.focus();
        input.stepDown(answerItem.num_interval);
        this.interviewAnswers[ref] = input.value;
      }
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
  font-size: 24px;
  padding: 15px;
}
.slide-wrap {
  padding: 30px;
  font-size: 22px;
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
      .question-item-input-wrap > div {
        margin-top: 8px;
      }
    }
  }
}
.answerItem-wrap-flex {
  display: flex;
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
.btn-wrap {
  text-align: center;
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    font-size: 1rem;
    // line-height: 1.5;
    border-radius: .25rem;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    line-height: 1;
    width: 150px;
    height: 40px;
  }
  .btn-next {
    margin-left: 10px;
  }
}

.error {
  color: red;
  font-size: 90%;
}

.must {
  background: #FF1A00;
  color: #FFF;
  border-radius: 3px;
  font-size: 9px;
  margin-right: 10px;
  padding: 2px 4px;
  letter-spacing: 0.2em;
}

.btn:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.number-plus-btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 1rem;
  // line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  width: 100px;
  height: 30px;
  line-height: 1;
}

.number-plus-btn:focus {
  outline: none;
}


input[type="number"]::-webkit-outer-spin-button, 
input[type="number"]::-webkit-inner-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
} 
input[type="number"] { 
  -moz-appearance:textfield; 
} 

textarea {
  width: 100%;
  font: 15px/24px sans-serif;
  transition: 0.3s;
  letter-spacing: 1px;
  border: 1px solid #1b2538;
  border-radius: 4px;
}

input[type='text'], input[type='number'] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  // color: #aaaaaa;
  border: 1px solid #1b2538;
  border-radius: 4px;
}

input[type='text'], input[type='number'], textarea {
  font-size: 110%;
}
input[type='text'] {
  width: 200px;
}
input[type='number'] {
  width: 100px;
}

@media (min-width: 1021px) {
  .slide-wrap{
    width: 640px;
    margin:0 auto;
  }
}
</style>