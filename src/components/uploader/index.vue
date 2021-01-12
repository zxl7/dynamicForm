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
          :before-delete="beforeDelete"
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
        let arr = []
        arr = value.split('|')
        arr.forEach((res) => {
          this.imageUrlToBase64(res, this.noRepeat)
        })
      },
      immediate: true,
    },
  },
  data() {
    return {
      files: [],
      fileList: [],
      noRepeat: true,
    }
  },

  methods: {
    // 图片转base64
    imageUrlToBase64(imageUrl) {
      if (!this.noRepeat) {
        return
      }
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
        this.base64ToFile(dataURL, '附件.jpeg')
      }
    },
    // 转文件
    base64ToFile(dataURL, fileName) {
      const arr = dataURL.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      const ia = new Uint8Array(n)
      // eslint-disable-next-line no-plusplus
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      const file = { file: new File([ia], fileName, { type: mime }) }
      this.noRepeat = false
      this.afterRead(file)
    },
    afterRead(file) {
      if (Array.isArray(file)) {
        file.forEach((res) => {
          this.beforeUploadFunc(res, this.files)
        })
      }
      this.beforeUploadFunc(file, this.files)
    },
    beforeDelete(file, detail) {
      this.fileList.splice(detail.index, 1)
      this.files.splice(detail.index, 1)
    },
    getEntries() {
      // 解析给流程
      if (this.files.length <= 0) return []
      const entries = this.files.map(item => ({
        value_id: item.id,
        field_id: this.field.id,
      }))
      const valueArr = []
      this.files.forEach((res) => {
        valueArr.push(res.download_url)
      })
      entries.forEach((arr) => {
        // eslint-disable-next-line no-param-reassign
        arr.value = valueArr.join('|')
      })
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
