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
  },
}
