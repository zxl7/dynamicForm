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
        <van-uploader
          v-model="fileList"
          multiple
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
  watch: {
    initalValue: {
      handler(value) {
        console.log(value)
        this.imageUrlToBase64(value)
      },
      immediate: true,
    },
  },
  data() {
    return {
      files: [],
      fileList: [],
    }
  },
  mounted() {},
  methods: {
    imageUrlToBase64(imageUrl) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = imageUrl
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const quality = 0.8
        // base64类型
        const dataURL = canvas.toDataURL('image/jpeg', quality)
        // 图片的显示
        this.fileList.push({ content: dataURL, file: 'File' })
      }
    },
    afterRead(file) {
      this.beforeUploadFunc(file)
    },
    getEntries() {
      // 发给流程
      console.log(this.fileParams)
      this.files = this.fileParams.files
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
  },
}

export default Upload
</script>

<style lang="scss">
@import './index.scss';
</style>
