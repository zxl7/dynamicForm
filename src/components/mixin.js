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
    streetAxios: {
      type: Function,
    },
    streetAuthorization: {
      type: String,
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
