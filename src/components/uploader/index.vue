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
        <p
          v-if="field.description"
          class="description"
        >
          {{ field.description }}
        </p>
        <van-uploader
          v-model="fileList"
          multiple
          :disabled="disabled"
          :deletable="!disabled"
          :before-delete="beforeDelete"
          :after-read="afterRead"
          :accept="fileParams.accept"
          :max-count="fileParams.count"
          :max-size="fileParams.size * 1024 * 1024"
          @oversize="onOversize"
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
    dataList: {
      handler(dataList) {
        if (dataList.length > 0) {
          dataList.forEach((res) => {
            if (this.noRepeat) {
              this.blobToFile(res.attachment)
            }
          })
        }
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
  mounted() {},
  methods: {
    blobToFile(attachment) {
      this.axios({
        method: 'GET',
        url: `/api/v4/attachments/${attachment.id}/base64_file`,
      }).then(({ data }) => {
        const base64Data = data
        const blob = this.base64ToBlob(base64Data, attachment.mime_type)
        blob.lastModifiedDate = new Date()
        blob.name = attachment.name
        const file = { file: new File([blob], attachment.name, { type: attachment.mime_type }) }
        if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.file.name)) {
          this.fileList.push({ file: file.file, name: blob.name })
        } else {
          this.fileList.push({ content: `data:${attachment.mime_type};base64,${base64Data}`, file: file.file, name: blob.name })
        }
        this.afterRead(file)
        this.noRepeat = false
      })
    },
    base64ToBlob(dataUrl, type) {
      const bstr = atob(dataUrl)
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type })
    },

    onOversize() {
      Toast.fail(`文件大小不能超过 ${this.fileParams.size} M`)
    },
    afterRead(file) {
      if (Array.isArray(file)) {
        file.forEach((res) => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < 2; i++) {
            this.beforeUploadFunc(res, this.files)
          }
        })
      } else {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 2; i++) {
          this.beforeUploadFunc(file, this.files)
        }
      }
    },
    beforeDelete(file, detail) {
      this.fileList.splice(detail.index, 1)
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 2; i++) {
        this.files.forEach((res, index) => {
          if (file.name === res.name) {
            this.files.splice(index, 1)
          }
        })
      }
    },
    getEntries() {
      localStorage.setItem('dataList', JSON.stringify(this.dataList))
      // 解析给流程
      this.files = this.setEntries(this.files)
      if (this.files.length <= 0) return []
      const entries = this.files.map(item => ({
        value_id: item.id,
        form_id: item.form_id,
        field_id: this.field.id,
      }))
      return entries
    },
    // 相同name附件，ID合并
    setEntries(files) {
      let array = []
      files.forEach((file) => {
        array.push(file.name)
      })
      // 去重
      array = Array.from(new Set(array))
      const fileList = []
      array.forEach((name) => {
        files.forEach((file) => {
          if (name === file.name) {
            fileList.push(file)
          }
        })
      })
      const arr = []
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < fileList.length; index += 2) {
        fileList[index].form_id = fileList[index + 1].id
        arr.push(fileList[index])
      }
      return arr
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
