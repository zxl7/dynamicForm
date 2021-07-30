<template>
  <div :class="['text-area', field.identity_key]">
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
    >
      <template #extra>
        <p
          v-if="field.description"
          class="description"
        >
          {{ field.description }}
        </p>
      </template>
    </van-field>
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
  methods: {
    getData() {
      if (!this.value) return []
      const entry = {
        field_id: this.field.id,
        value: this.value,
        identity_key: this.field.identity_key,
      }
      return [entry]
    },
    getValid() {
      if (!this.value && this.required) {
        this.valid = false
        this.error = '必填字段不能为空'
      } else {
        this.valid = true
      }
      return this.valid
    },
  },
}

export default SlpTextArea
</script>
<style lang="scss">
@import './style.scss';
</style>
