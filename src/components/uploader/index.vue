<template>
  <div class="uploader">
    <van-field
      :id="field.identity_key"
      :label="field.title"
      :class="[statusClass, field.customClass]"
      :disabled="disabled"
      :error-message="errorMessage"
      class="no-border"
    >
      <template #input>
        <!-- <upload
        :data="fileParams"
        :on-success="successFunc"
        :on-error="errorFunc"
        :action="action"
      >
        <slot name="upload-btn">
          <i-button
            icon="ios-cloud-upload-outline"
            :disabled="disabled"
            @click="beforeUploadClickedFunc"
          >
            上传文件
          </i-button>
        </slot>
      </upload> -->

        <van-uploader
          v-model="fileList"
          multiple
          :data="fileParams"
          :after-read="afterRead"
          accept="*"
        />
      </template>
    </van-field>
  </div>
</template>

<script>
import { Button } from 'iview'
import { Toast, Uploader } from 'vant'
import FieldMixin from '../mixin'

export const Upload = {
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
    'van-uploader': Uploader,
    'i-button': Button,
    Toast,
  },

  data() {
    return {
      files: [],
      fileList: [],
    }
  },

  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      console.log(this.fileParams)
      this.beforeUploadFunc()
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('token', this.fileParams.uptoken)
      formData.append('x:key', new Date())

      this.axios({
        method: 'get',
        url: this.action,
        params: {
          data: formData,
        },
        headers: {
          'content-type': false,
        },
      })
        .then((data) => {
          this.files.push(data)
        })
        .catch((data) => {
          this.files.push(data)
          Toast.fail('上传文件失败，请重试')
        })
    },
    beforeUploadClickedFunc() {
      this.beforeUploadFunc()
    },
    getEntries() {
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
    // successFunc(data) {
    //   this.files.push(data)
    // },
    // errorFunc(data) {
    //   this.files.push(data)
    //   Toast.fail('上传文件失败，请重试')
    // },
  },
}

export default Upload
</script>

<style lang="scss">
@import './index.scss';
</style>
