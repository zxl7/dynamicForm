# slp-fields
## Project setup
- `yarn add slp-fields`
## 需要引入的样式文件
```TS
import '@byzanteam/slp-fields/index.css'
```

## 已开发组件
- 单，多选（布局）
- 单，多行文本（布局）
- 时间选择（布局）
- 附件上传（布局）
- 手机号，身份证号码（布局）
- 级联选择（布局）

## 组件使用
```HTML
  <Fields
    ref="fields"
    :fields="data.fields"
    :entries="entries"
  />

  <!-- ref 为了使用组件内方法 -->
  <!-- fields 传递需要渲染的表单表项 -->
  <!-- entries 传入缓存值 or 自定义的值 -->
```

### 获取填写的值和必填字段是否都填写
```TS
const value = this.$refs.fields.getValue()

value {
  valid: Boolean,
  entries: Array
}
```

## 注意事项
### 附件上传
- 使用附件上传的时候需要重新构建附件的 files 对象
- 必须新增：`USERID,URL,Authorization` 字段
- 也可以添加属性 `accept,count,size` 用于控制附件的格式，数量，大小
- 案例如下：
```TS
    {
      id: 10785,
      title: '文件上传',
      description:
        '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      type: 'Field::File',
      position: 4,
      validations: [],
      other_option: null,
      visibility: 'public_visibility',
      marked: false,
      settings: {
        layout: 'block',
        other_option_settings: { limit: {} },
        length_limit: {},
        limit_settings: {},
        char_size_limit_settings: {},
      },
      detail_id: null,
      identity_key: 'file',
      data: {},
      USERID: 1,
      URL: 'https://beta.skylarkly.com',
      Authorization:
        'b01110629541b3eb51697db5a05dd2388aed11a58c81a75e9c08347bc30a09e6:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2VfaWQiOjF9.wj9V0ZVOOzSPuRYztizJL_5w0u8aJKb05Z73tEV_HuY',
    },
```
### 方法如下
```TS
    async requestForm() {
      const { data } = await this.api.getRequestForm(FORM_ID)
      common.processAttachmentField(data.fields)
    },

  // 处理附件字段
  processAttachmentField(fields) {
    fields.forEach((field) => {
      if (field.type === 'Field::File') {
        field.USERID = basis.USERID
        field.URL = basis.Url
        field.Authorization = basis.Authorization
      }
    })
  },
```


## 表单发送案例
``` TS
    submit() {
      const valueObj = this.$refs.fields.getValue()
      if (valueObj.valid) {
        // 提交表单数据
        common.postSubmitForm(valueObj.entries, FORM_ID)
      } else {
        this.$toast.fail('必填值未输入')
      }
    },
```

```TS
  // 提交数据
  async postSubmitForm(entries, FORM_ID) {
    const formData = {
      user_id: 26071,
      response: {
        entries_attributes: entries,
      },
    }
    const data = await api.postSubmitForm(FORM_ID, formData)
    if (data.status === 201) {
      Toast.success('填写成功！')
      location.reload()
    }
  },
```