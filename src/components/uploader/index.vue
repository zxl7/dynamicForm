<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="statusClass"
    class="no-border"
  >
    <template #input>
      <upload
        :data="fileParams"
        :on-success="successFunc"
        :on-error="errorFunc"
        :action="action"
      >
        <slot name="upload-btn">
          <i-button
            icon="ios-cloud-upload-outline"
            @click="beforeUploadClickedFunc"
          >
            上传文件
          </i-button>
        </slot>
      </upload>
    </template>
  </van-field>
</template>

<script>
import { Upload, Button } from 'iview'
import { Toast } from 'vant'
import FieldMixin from '../mixin'

export const Uploader = {
  mixins: [FieldMixin],

  props: {
    action: {
      type: String,
      default: 'https://up.qbox.me/',
    },
    fileParams: {
      type: Object,
      default: () => {},
    },
    beforeUploadFunc: {
      type: Function,
      required: true,
    },
  },

  components: {
    Upload,
    'i-button': Button,
    Toast,
  },

  data() {
    return {
      files: [],
    }
  },

  methods: {
    beforeUploadClickedFunc() {
      this.beforeUploadFunc()
    },
    getData() {
      if (this.files.length <= 0) return []
      const entries = this.files.map(item => ({
        value: item.name,
        value_id: item.id,
        field_id: this.field.id,
      }))
      return entries
    },
    getValid() {
      if (this.files.length <= 0 && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },
    successFunc(data) {
      this.files.push(data)
    },
    errorFunc() {
      Toast.fail('上传文件失败，请重试')
    },
  },
}

export default Uploader
</script>
