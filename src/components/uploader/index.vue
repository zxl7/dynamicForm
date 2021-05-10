/* eslint-disable no-param-reassign */
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
  methods: {
    onOversize() {
      Toast.fail(`文件大小不能超过 ${this.field.size ? this.field.size : 10} M`)
    },
    afterRead(file) {
      console.log('%c 🍍 file: ', 'font-size:20px;background-color: #B03734;color:#fff;', file)
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
      this.axios({
        method: 'get',
        url: '/api/v4/attachments/uptoken',
        params: {
          purpose: 'create_responses',
          user_id: this.field.userID,
        },
      }).then(({ data }) => {
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('token', data.uptoken)
        formData.append('x:key', new Date().getTime())
        const dataFile = formData
        this.axios({
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
      localStorage.setItem('dataList', JSON.stringify(this.dataList))
      // 解析给流程
      if (this.files.length <= 0) return []
      const entries = this.files.map(item => ({
        value_id: item.id,
        form_id: item.form_id,
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
