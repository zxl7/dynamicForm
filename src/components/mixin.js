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
  },

  data() {
    return {
      valid: true,
    }
  },

  computed: {
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
  },

  watch: {
    value(value) {
      this.$emit('valueChanged', value)
    },
  },
}
