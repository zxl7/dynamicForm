/* eslint-disable no-param-reassign */
<template>
  <div :class="['uploader', field.identity_key]">
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
          :accept="field.accept?field.accept:'*'"
          :max-count="field.count?field.count : '10'"
          :max-size="field.size ? field.size * 1024 * 1024 : 10 * 1024 * 1024"
          @oversize="onOversize"
        />
      </template>
    </van-field>
  </div>
</template>

<script>
import _ from 'lodash'
import { Toast, Uploader } from 'vant'
import axios from 'axios'
import FieldMixin from '../mixin'

export const Upload = {
  mixins: [FieldMixin],
  props: {
    action: {
      type: String,
      default: 'https://up.qbox.me/',
    },
  },
  components: {
    'van-uploader': Uploader,
    Toast,
  },

  data() {
    return {
      files: [],
      fileList: [],
    }
  },
  mounted() {},
  watch: {
    dataList: {
      async handler(entries) {
        this.init()
        await this.cycle(entries)
      },
      // deep: true,
      immediate: true,
    },
  },
  methods: {
    // 附件回传-获取附件file
    cycle(entries) {
      if (Array.isArray(entries)) {
        entries.forEach((attachment) => {
          this.getUpload(attachment.attachment)
        })
      }
    },
    init() {
      this.fileList = []
    },
    // 获取附件base64
    async getUpload(attachment) {
      axios({
        method: 'get',
        url: `${this.field.URL}/api/v4/attachments/${attachment.id}/base64_file`,
        headers: {
          Authorization: `${this.field.Authorization}`,
        },
      }).then(({ data }) => {
        const file = this.blobToFile(attachment, data, this.fileList)
        this.afterRead(file)
      })
    },
    // 通过附件base64构建file
    blobToFile(attachment, data, fileList) {
      const base64Data = data
      const blob = this.base64ToBlob(base64Data, attachment.mime_type)
      blob.lastModifiedDate = new Date()
      blob.name = attachment.name
      const file = { file: new File([blob], attachment.name, { type: attachment.mime_type }) }
      fileList.push({
        content: `data:${attachment.mime_type};base64,${base64Data}`,
        file: file.file,
        name: blob.name,
      })
      return file
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
      Toast.fail(`文件大小不能超过 ${this.field.size ? this.field.size : 10} M`)
    },
    afterRead(file) {
      console.log(file)
      if (Array.isArray(file)) {
        file.forEach((res) => {
          this.beforeUploadFunc(res, this.files)
        })
      } else {
        this.beforeUploadFunc(file, this.files)
      }
    },
    // 上传附件
    beforeUploadFunc(file, files) {
      // eslint-disable-next-line no-param-reassign
      file.status = 'uploading'
      // eslint-disable-next-line no-param-reassign
      file.message = '上传中...'
      axios({
        method: 'get',
        url: `${this.field.URL}/api/v4/attachments/uptoken`,
        headers: {
          Authorization: `${this.field.Authorization}`,
        },
        params: {
          purpose: 'create_responses',
          user_id: this.field.USERID,
        },
      }).then(({ data }) => {
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('token', data.uptoken)
        formData.append('x:key', new Date().getTime())
        const dataFile = formData
        axios({
          method: 'post',
          url: 'https://up.qbox.me/',
          data: dataFile,
          headers: {
            'content-type': false,
          },
        })
          // eslint-disable-next-line no-shadow
          .then((data) => {
            files.push(data.data)
            // eslint-disable-next-line no-param-reassign
            file.status = 'done'
            // eslint-disable-next-line no-param-reassign
            file.name = data.data.name
          })
          .catch(() => {
            // eslint-disable-next-line no-param-reassign
            file.status = 'failed'
            // eslint-disable-next-line no-param-reassign
            file.message = '上传失败'
            Toast.fail('上传文件失败，请重试')
          })
      })
    },
    beforeDelete(file, detail) {
      // 删除
      this.fileList.splice(detail.index, 1)
      this.files.forEach((res, index) => {
        if (file.name === res.name) {
          this.files.splice(index, 1)
        }
      })
    },
    addFile(file) {
      if (_.isArray(file)) {
        this.fileList = this.fileList.concat(file)
      } else {
        this.fileList.push(file)
      }
    },
    getEntries() {
      // 解析给流程
      if (this.files.length <= 0) return []
      const entries = this.files.map(item => ({
        value_id: item.id,
        value: item.name,
        field_id: this.field.id,
      }))
      return entries
    },
    getValid() {
      if (this.files.length <= 0 && this.required) {
        this.valid = false
        this.error = '必填字段不能为空'
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
