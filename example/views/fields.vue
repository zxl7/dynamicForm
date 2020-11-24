<template>
  <fields
    :fields="flow.fields"
    :before-upload-func="beforeUploadFunc"
    :file-params="fileParams"
  />
</template>

<script>
import { Fields } from '@byzanteam/slp-fields'

export default {
  components: {
    Fields,
  },

  data() {
    return {
      flow: {},
      fileParams: {},
    }
  },

  created() {
    this.flow = {
      title: '流程222',
      fields: [{
        title: '单行文本',
        type: 'Field::TextField',
        position: 0,
        validations: [],
        data: {},
      }, {
        title: '单选',
        type: 'Field::RadioButton',
        position: 1,
        validations: ['presence'],
        other_option: null,
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
        type: 'Field::CheckBox',
        position: 1,
        validations: ['presence'],
        other_option: null,
        data: {},
        options: [{
          id: 12195, value: '新选项', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 0,
        }, {
          id: 12326, value: '新选项2', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 1,
        }],
      },
      {
        id: 9301,
        title: '多行文本',
        type: 'Field::TextArea',
        position: 1,
        validations: ['presence'],
        data: {},
        options: [{
          id: 12195, value: '新选项', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 0,
        }, {
          id: 12326, value: '新选项2', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 1,
        }],
      },
      {
        title: '数字',
        type: 'Field::IDNumber',
        position: 1,
        validations: [],
        data: {},
      },
      {
        title: '日期时间',
        type: 'Field::DateTime',
        position: 2,
        validations: [],
        settings: {
          input_type: 'date',
        },
        data: {},
      }, {
        title: '文件上传',
        type: 'Field::File',
        position: 3,
        validations: [],
        data: {},
      }, {
        title: '地理位置',
        type: 'Field::Location',
        position: 8,
        validations: [],
        data: {},
      }],
    }
  },

  methods: {
    beforeUploadFunc() {
      this.fileParams = { data: 2 }
    },
  },
}
</script>
