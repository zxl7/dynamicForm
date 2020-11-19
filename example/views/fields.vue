<template>
  <fields :fields="flow.fields" />
</template>

<script>
import Fields from '../../src/components/field/index.vue'

export default {
  components: {
    Fields,
  },

  data() {
    return {
      flow: {},
    }
  },

  created() {
    this.flow = {
      id: 735,
      title: '流程222',
      fields: [{
        id: 8337,
        title: '单行文本',
        description: null,
        type: 'Field::TextField',
        position: 0,
        validations: [],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'block', char_size_limit_settings: {}, other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, enable_wechat_scan: false,
        },
        detail_id: null,
        identity_key: '3a97ad899ddb48ee82c818813ea8018e',
        data: {},
      }, {
        id: 9288,
        title: '单选',
        description: null,
        type: 'Field::RadioButton',
        position: 1,
        validations: ['presence'],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'list', other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, char_size_limit_settings: {},
        },
        detail_id: null,
        identity_key: '625f314b89b844439f471fc5c149992b',
        data: {},
        options: [{
          id: 12195, value: '新选项', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 0,
        }, {
          id: 12326, value: '新选项2', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 1,
        }],
      },
      {
        id: 9300,
        title: '多选',
        description: null,
        type: 'Field::CheckBox',
        position: 1,
        validations: ['presence'],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'list', other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, char_size_limit_settings: {},
        },
        detail_id: null,
        identity_key: '625f314b89b844439f471fc5c149992b',
        data: {},
        options: [{
          id: 12195, value: '新选项', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 0,
        }, {
          id: 12326, value: '新选项2', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 1,
        }],
      },
      {
        id: 9289,
        title: '日期时间',
        description: null,
        type: 'Field::DateTime',
        position: 2,
        validations: [],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'block', input_type: 'date', other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, char_size_limit_settings: {},
        },
        detail_id: null,
        identity_key: 'cb2acf611c00452bacb92f36b478cdb6',
        data: {},
      }, {
        id: 9290,
        title: '文件上传',
        description: null,
        type: 'Field::File',
        position: 3,
        validations: [],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'block', other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, char_size_limit_settings: {},
        },
        detail_id: null,
        identity_key: '96d6bdf6ccf24385a118667102617107',
        data: {},
      }, {
        id: 9339,
        title: '地理位置',
        description: null,
        type: 'Field::Location',
        position: 8,
        validations: [],
        other_option: null,
        visibility: 'public_visibility',
        marked: false,
        settings: {
          layout: 'block', other_option_settings: { limit: {} }, length_limit: {}, limit_settings: {}, char_size_limit_settings: {},
        },
        detail_id: null,
        identity_key: '998851f0025b4aa38476ce20e2caacd4',
        data: {},
      }],
    }
  },
}
</script>
