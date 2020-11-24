<template>
  <van-field
    :id="field.identity_key"
    v-model="value"
    :label="field.title"
    :class="statusClass"
    autocomplete="off"
    placeholder="请输入"
    type="number"
  />
</template>

<script>
import FieldMixin from './mixin'

export const Integer = {
  mixins: [FieldMixin],

  props: {
    initalValue: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      value: '',
    }
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

export default Integer
</script>
