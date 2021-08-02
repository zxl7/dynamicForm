<template>
  <div :class="['text', field.identity_key]">
    <van-field
      :id="field.identity_key"
      v-model="value"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="field.disabled"
      :error-message="error"
      autocomplete="off"
      placeholder="请输入"
      type="number"
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
    value: {
      handler(value) {
        this.field.value = value
      },
    },
  },

  methods: {
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

export default Integer
</script>
