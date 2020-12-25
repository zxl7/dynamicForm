fields: [
    {
          id: 7260,
          title: '单行文本（区块）',
          description: '这是描述',
          type: 'Field: :TextField',
          position: 0,
          validations: [],
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
          id: 7261,
          title: '单行文本（平铺）',
          description: '这是描述',
          type: 'Field: :TextField',
          position: 1,
          validations: [],
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
          type: 'Field: :TextArea',
          position: 2,
          validations: [],
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
          type: 'Field: :TextArea',
          position: 3,
          validations: [],
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
          description: '这是描述（用户只能查看不能填写）',
          type: 'Field: :RadioButton',
          position: 4,
          validations: [],
          other_option: '测试其他',
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
          type: 'Field: :RadioButton',
          position: 5,
          validations: [],
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
        ],
    },
    {
          id: 7264,
          title: '单选（下拉）',
          description: '这是描述',
          type: 'Field: :RadioButton',
          position: 6,
          validations: ['presence'
        ],
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
        ],
    },
    {
          id: 7266,
          title: '多选（列表）',
          description: '这是描述！！！',
          type: 'Field: :CheckBox',
          position: 7,
          validations: ['presence'
        ],
          other_option: '测试其他',
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
              id: 9118,
              value: '1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 0,
            },
            {
              id: 9119,
              value: '2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 1,
            },
            {
              id: 9120,
              value: '3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 2,
            },
            {
              id: 9121,
              value: '4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 3,
            },
            {
              id: 9122,
              value: '5',
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
          id: 7270,
          title: '多行文本（区块）',
          description: null,
          type: 'Field: :TextArea',
          position: 8,
          validations: [],
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
          identity_key: 'bbeac81ff0a643f986a24fa4ecca3251',
          data: {},
    },
    {
          id: 7267,
          title: '多选（平铺）',
          description: '描述撒打算',
          type: 'Field: :CheckBox',
          position: 9,
          validations: [],
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
          identity_key: '4e876f3c2fe441fcb9e969522795b458',
          data: {},
          options: [
            {
              id: 9123,
              value: '1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 0,
            },
            {
              id: 9124,
              value: '2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 1,
            },
            {
              id: 9125,
              value: '3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 2,
            },
            {
              id: 9126,
              value: '4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 3,
            },
            {
              id: 9127,
              value: '5',
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
          id: 7268,
          title: '多选（下拉）',
          description: '描述',
          type: 'Field: :CheckBox',
          position: 10,
          validations: [],
          other_option: '测试其他',
          visibility: 'public_visibility',
          marked: false,
          settings: {
            layout: 'select',
            length_limit: {},
            other_option_settings: {
              limit: {},
            },
            limit_settings: {},
            char_size_limit_settings: {},
        },
          detail_id: null,
          identity_key: 'cb216a955ddc44e5a333ad73f38d7683',
          data: {},
          options: [
            {
              id: 9128,
              value: '1',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 0,
            },
            {
              id: 9129,
              value: '2',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 1,
            },
            {
              id: 9130,
              value: '3',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 2,
            },
            {
              id: 9131,
              value: '4',
              settings: {
                limit_settings: {
                  max: null,
                  text: '超过限制',
                    },
                },
              position: 3,
            },
            {
              id: 9132,
              value: '5',
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
          description: null,
          type: 'Field: :DateTime',
          position: 11,
          validations: [],
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
],