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
        type="text"
        class="field-value"
        placeholder="请输入"
      >
    </div>
  </field>
</template>

<script>
import Field from './base.vue'

export const TextField = {
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
      default: '单行文本',
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
}

export default TextField
</script>
