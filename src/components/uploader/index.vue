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

  data() {
    return {
      files: [],
      fileList: [],
    }
  },
  methods: {
    afterRead(file) {
      this.beforeUploadFunc(file)
    },
    getEntries() {
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
