<template>
  <div class="text">
    <van-field
      :id="field.identity_key"
      v-model="value"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="error"
      autocomplete="off"
      placeholder="请输入"
      type="text"
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

export const TextField = {
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
      }
      return [entry]
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

<style lang="scss">
@import './style.scss';


</style>
