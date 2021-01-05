<template>
  <div class="text-area">
    <van-field
      :id="field.identity_key"
      v-model="value"
      :label="field.title"
      :class="[statusClass, field.customCla, field.settings.layout]"
      :disabled="disabled"
      :error-message="error"
      autocomplete="off"
      placeholder="请输入"
      type="textarea"
      @blur="errorMessageBlur(value)"
    />
  </div>
</template>

<script>
import FieldMixin from '../mixin'

export const SlpTextArea = {
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

  methods: {},
}

export default SlpTextArea
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
