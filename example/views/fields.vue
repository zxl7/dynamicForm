<template>
  <fields
    :fields="flow.fields"
    :entries="entries"
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
      entries: [
        { field_id: 1, value: '单行文本' },
        { field_id: 2, option_id: 12195, value: '新选项' },
        { field_id: 2, option_id: 12326, value: '新选项2' },
        { field_id: 3, option_id: 12196, value: '新选项' },
        { field_id: 3, id: 122, value: '新选项2' },
        { field_id: 4, value: '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字' },
        { field_id: 5, value: 123333 },
        { field_id: 6, value: 510322199703122122 },
        { field_id: 7, value: 15377562132 },
        { field_id: 8, value: '2020-12-04' },
      ],
    }
  },

  created() {
    this.flow = {
      title: '流程222',
      fields: [{
        id: 1,
        title: '单行文本',
        type: 'Field::TextField',
        position: 0,
        validations: [],
        data: {},
      }, {
        id: 2,
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
        id: 3,
        title: '多选',
        type: 'Field::CheckBox',
        position: 1,
        validations: ['presence'],
        other_option: null,
        data: {},
        options: [{
          id: 12196, value: '新选项', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 0,
        }, {
          id: 12327, value: '新选项2', settings: { limit_settings: { max: null, text: '超过限制' } }, position: 1,
        }],
      },
      {
        id: 4,
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
        id: 5,
        title: '数字',
        type: 'Field::Integer',
        position: 1,
        validations: [],
        data: {},
      },
      {
        id: 6,
        title: '身份证号',
        type: 'Field::IDNumber',
        position: 1,
        validations: [],
        data: {},
      },
      {
        id: 7,
        title: '手机号',
        type: 'Field::Phone',
        position: 1,
        validations: [],
        data: {},
      },
      {
        id: 8,
        title: '日期时间',
        type: 'Field::DateTime',
        position: 2,
        validations: [],
        settings: {
          input_type: 'date',
        },
        data: {},
      }, {
        id: 9,
        title: '文件上传',
        type: 'Field::File',
        position: 3,
        validations: [],
        data: {},
      }, {
        id: 10,
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
