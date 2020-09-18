<template>
  <field
    v-bind="$attrs"
    :title="title"
  >
    <div
      slot="input"
      class="field-input with-icon"
    >
      <input
        v-model.trim="inputValue"
        type="number"
        class="field-value"
        placeholder="请输入"
        @keypress="validateKeycode"
      >
    </div>
  </field>
</template>

<script>
import Field from './base.vue'

export const Integer = {
  components: {
    Field,
  },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    title: {
      type: String,
      default: '数字',
    },
  },

  data() {
    return {
      inputValue: this.value,
    }
  },

  watch: {
    inputValue(value) {
      this.$emit('input', value)
    },
  },

  methods: {
    validateKeycode(event) {
      const regex = /[\-.\d]/g
      if (!regex.test(event.key)) {
        event.preventDefault()
      }
    },
  },
}

export default Integer
</script>

<style lang="scss" scoped>
input[type=number]::-webkit-inner-spin-button {
  display: none;
}
</style>
