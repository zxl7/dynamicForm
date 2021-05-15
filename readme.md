# slp-fields

## Project setup
```
yarn add slp-fields
```

## style import

- 需要引入的样式文件
```
import '@byzanteam/slp-fields/index.css'
```

## 已开发组件
- 单，多选（排版）
- 单，多行文本（排版）
- 时间选择（排版）
- 附件上传（排版）
- 手机号，身份证号码

## 组件使用
```HTML
  <fields
    ref="fields"
    :fields="fields"
    :entries="entries"
  />

  <!-- ref 为了拿到组件 -->
  <!-- fields 传递对应的表单表项 -->
  <!-- entries 传入缓存值 or 自定义的值 -->
```

### 判断字段是否为空
```TS
  const valid = this.$refs.fields.getValid()
    if (!valid) {
      this.show = false
      Toast('必填字段不能为空')
      return
    }
```

### 获取填写的值
```TS
const entries = this.$refs.fields.getData()
```

## 注意事项
### 附件上传
- 使用附件上传的时候需要重新构建 files 对象
- 需要新增：`USERID,URL,Authorization` 字段
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

- 也可以添加属性 `accept,count,size` 用于控制附件的格式，数量，大小

