<template>
  <van-field
    :id="field.identity_key"
    v-model="value"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
    :error-message="errorMessage"
    autocomplete="off"
    placeholder="请输入"
    type="text"
  />
</template>

<script>
import _ from 'lodash'
import FieldMixin from '../mixin'

export const TextField = {
  mixins: [FieldMixin],

  data() {
    return {
      value: '',
    }
  },

  watch: {
    initalValue: {
      handler(value) {
        this.value = value
      },
      immediate: true,
    },
  },

  computed: {
    errorMessage() {
      const errors = []
      errors.push(this.required && !this.value ? '必填字段不能为空' : '')
      errors.push(this.valid ? '' : '填写错误，请重新填写')
      return _.compact(errors)[0]
    },
  },

  methods: {
    getValid() {
      if (!this.value && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },
  },
}

export default TextField
</script>

<style lang="scss" scoped>
@import '../style.scss';
</style>
