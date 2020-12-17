import { Field } from 'vant'

export default {
  components: {
    'van-field': Field,
  },

  props: {
    field: {
      type: Object,
      default: () => {},
    },
    entry: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      valid: true,
    }
  },

  computed: {
    initalValue() {
      const entry = this.entry.find(item => !item._destroy)
      if (!entry) return ''
      return entry.value
    },

    required() {
      return this.field.validations.includes('presence')
    },

    statusClass() {
      return {
        required: this.required,
        error: !this.valid,
      }
    },

    errorMessage() {
      return this.valid ? '' : '填写错误，请重新填写'
    },

    disabled() {
      if (this.field.customClass) {
        return this.field.customClass.includes('disabled')
      }
      return false
    },
  },

  watch: {
    value(value) {
      this.$emit('valueChanged', value)
    },
  },
}
