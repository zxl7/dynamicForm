<template>
  <div class="text">
    <van-field
      :id="field.identity_key"
      v-model="value"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="errors"
      autocomplete="off"
      placeholder="请输入"
      type="text"
      @blur="errorMessageBlur(value)"
    />
  </div>
</template>

<script>
import FieldMixin from '../mixin'

export const TextField = {
  mixins: [FieldMixin],

  data() {
    return {
      value: '',
      errors: '',
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

  methods: {
    errorMessageBlur() {
      if (this.required && !this.value) {
        this.errors = '必填字段不能为空'
      } else {
        this.errors = ''
      }
    },
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
@import './style.scss';

// inline
.van-cell.van-field.inline {
  flex-direction: row;
}
</style>
