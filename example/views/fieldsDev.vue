<template>
  <fields
    :fields="flow.fields"
    :entries="entries"
    :before-upload-func="beforeUploadFunc"
    :file-params="fileParams"
  />
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
      fileParams: {},
      entries: [],
    }
  },

  created() {
    this.flow = {
      id: 726,
      title: '表单组件测试用例',
      description:
        '<p><img src="https://slp-qiniu-material-beta.skylarkly.com/690-1608876640-53b6afcf289861e0a1bfadfd0529d513-1608876640437?attname=640.gif&amp;e=1608880241&amp;token=WFpC8JEsN77rEZRgdoQgQw-yB82e-j3fpp8dXB8Z:B1AzSP6oAkcbGKwMpjnQl7ovsyg=">Test</p>',
      created_at: '2020-12-25T10:41:39.273+08:00',
      updated_at: '2020-12-30T17:23:05.129+08:00',
      status: 'published',
      identity_vertify_type: 'off',
      fields: [
        {
          id: 7260,
          title: '单行文本（区块）',
          description: '这是描述',
          type: 'Field::TextField',
          position: 0,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            char_size_limit_settings: {},
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            enable_wechat_scan: false,
          },
          detail_id: null,
          identity_key: 'c8637d2de99b4bb2afc37f04a02c11d6',
          data: {},
        },
        {
          id: 7292,
          title: '单行文本（区块）（数字）',
          description: '这是描述',
          type: 'Field::Integer',
          position: 1,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            limit_settings: {},
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '651b66c00c0a4212b02350744309ef27',
          data: {},
        },
        {
          id: 7293,
          title: '单行文本（区块）（sfz）',
          description: '这是描述',
          type: 'Field::IDNumber',
          position: 2,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: 'f3f64ea8d944442ca33076c61ecf3e60',
          data: {},
        },
        {
          id: 7294,
          title: '单行文本（区块）手机',
          description: '这是描述',
          type: 'Field::Phone',
          position: 3,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: 'c4b44fe3e1ef42b1ad68ab1624aa0ded',
          data: {},
        },
        {
          id: 7261,
          title: '单行文本（平铺）',
          description: '这是描述安康大火烧开的快',
          type: 'Field::TextField',
          position: 4,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            char_size_limit_settings: {},
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            enable_wechat_scan: false,
          },
          detail_id: null,
          identity_key: '9d8036c28cbb4750812413765c27d27b',
          data: {},
        },
        {
          id: 7271,
          title: '多行文本（区块）',
          description: null,
          type: 'Field::TextArea',
          position: 5,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            char_size_limit_settings: {},
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            enable_wechat_scan: false,
          },
          detail_id: null,
          identity_key: '0c0ce498699c4cf38e8d7a2719447112',
          data: {},
        },
        {
          id: 7272,
          title: '多行文本（平铺）',
          description: null,
          type: 'Field::TextArea',
          position: 6,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            char_size_limit_settings: {},
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            enable_wechat_scan: false,
          },
          detail_id: null,
          identity_key: '2a8d416c83d6482eb023642cceffede1',
          data: {},
        },
        {
          id: 7262,
          title: '单选（列表）',
          description: '这是描述（用户只看）',
          type: 'Field::RadioButton',
          position: 7,
          validations: ['presence'],
          other_option: '',
          visibility: 'protected_visibility',
          marked: false,
          settings: {
            layout: 'list',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '0e65bb2738de403d9ef94de32b5ba97a',
          data: {},
          options: [
            {
              id: 9109,
              value: '新选项1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9110,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9111,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
          ],
        },
        {
          id: 7263,
          title: '单选（平铺）',
          description: '这是描述',
          type: 'Field::RadioButton',
          position: 8,
          validations: ['presence'],
          other_option: '测试其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '6d9345724b1d4725881fb4e3f6b47adb',
          data: {},
          options: [
            {
              id: 9112,
              value: '新选项1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9113,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9114,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
            {
              id: 9148,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 3,
            },
            {
              id: 9149,
              value: '新选项5',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 4,
            },
          ],
        },
        {
          id: 7264,
          title: '单选（下拉）',
          description: '这是描述',
          type: 'Field::RadioButton',
          position: 9,
          validations: ['presence'],
          other_option: '测试其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'select',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: 'eccd84492d73447897fb7ed67e00b910',
          data: {},
          options: [
            {
              id: 9115,
              value: '新选项下拉',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9116,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9117,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
            {
              id: 9145,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 3,
            },
            {
              id: 9146,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 4,
            },
            {
              id: 9147,
              value: '新选项5',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 5,
            },
          ],
        },
        {
          id: 7266,
          title: '多选（列表）',
          description: '这是描述！！！',
          type: 'Field::CheckBox',
          position: 10,
          validations: ['presence'],
          other_option: '其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'list',
            length_limit: {},
            other_option_settings: {
              limit: {},
            },
            limit_settings: {},
            char_size_limit_settings: {},
            callback_url: 'www.baidu.com',
          },
          detail_id: null,
          identity_key: 'fbe42ff7b22149bb8865c7b1af105f9d',
          data: {},
          options: [
            {
              id: 9154,
              value: '新选项1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9155,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9156,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
            {
              id: 9157,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 3,
            },
            {
              id: 9158,
              value: '新选项5',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 4,
            },
          ],
        },
        {
          id: 7275,
          title: '多选（平铺）',
          description: '这是描述！！！',
          type: 'Field::CheckBox',
          position: 11,
          validations: ['presence'],
          other_option: '其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            callback_url: 'www.baidu.com',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: 'b041ca20a3c444ef8883616c2b46ba80',
          data: {},
          options: [
            {
              id: 9159,
              value: '新选项1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9160,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9161,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
            {
              id: 9162,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 3,
            },
            {
              id: 9163,
              value: '新选项5',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 4,
            },
          ],
        },
        {
          id: 7276,
          title: '多选（下拉）',
          description: '这是描述！！！',
          type: 'Field::CheckBox',
          position: 12,
          validations: ['presence'],
          other_option: '其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'select',
            callback_url: 'www.baidu.com',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '1eb5a4c69b1c4c439a316d4db2da4c35',
          data: {},
          options: [
            {
              id: 9164,
              value: '新选项1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 0,
            },
            {
              id: 9165,
              value: '新选项2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 1,
            },
            {
              id: 9166,
              value: '新选项3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 2,
            },
            {
              id: 9167,
              value: '新选项4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 3,
            },
            {
              id: 9168,
              value: '新选项5',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                },
              },
              position: 4,
            },
          ],
        },
        {
          id: 7269,
          title: '日期时间',
          description: '这是描述',
          type: 'Field::DateTime',
          position: 13,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            input_type: 'date',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: 'b18ec2e3069340818489391fa0e5cba4',
          data: {},
        },
        {
          id: 7280,
          title: '日期（平铺）',
          description: '这是描述',
          type: 'Field::DateTime',
          position: 14,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            input_type: 'date',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '097e22e25ebb4b1f9c84508a21ca4585',
          data: {},
        },
        {
          id: 7284,
          title: '时间（平铺）',
          description: '这是描述',
          type: 'Field::DateTime',
          position: 15,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            input_type: 'time',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '9544bf1b436747d884280099becd661d',
          data: {},
        },
        {
          id: 7285,
          title: '日期和时间（平铺）',
          description: '这是描述',
          type: 'Field::DateTime',
          position: 16,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'inline',
            input_type: 'datetime-local',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '412ba1eb126447bfac3535f382f2e1b6',
          data: {},
        },
        {
          id: 7281,
          title: '文件上传',
          description: '文件上传',
          type: 'Field::File',
          position: 17,
          validations: ['presence'],
          other_option: null,
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'block',
            other_option_settings: {
              limit: {},
            },
            length_limit: {},
            limit_settings: {},
            char_size_limit_settings: {},
          },
          detail_id: null,
          identity_key: '984bde33855a4ee39c3f0732158a6d38',
          data: {},
        },
      ],
    }
  },

  methods: {
    beforeUploadFunc() {
      this.fileParams = { data: 2 }
    },
  },
}
</script>
