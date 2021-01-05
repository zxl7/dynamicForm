<template>
  <div class="text">
    <van-field
      :id="field.identity_key"
      v-model="value"
      :label="field.title"
      :class="[statusClass, field.customClass]"
      :disabled="disabled"
      :error-message="error"
      autocomplete="off"
      placeholder="请输入"
      type="number"
      @blur="errorMessageBlur(value)"
    />
  </div>
</template>

<script>
import FieldMixin from './mixin'

export const Integer = {
  mixins: [FieldMixin],

  data() {
    return {
      value: '',
      error: '',
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

export default Integer
</script>
