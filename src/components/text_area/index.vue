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
    type="textarea"
  />
</template>

<script>
import FieldMixin from '../mixin'

export const SlpTextArea = {
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

export default SlpTextArea
</script>
