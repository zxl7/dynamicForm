import _ from 'lodash'
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
    entries: {
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
      const entry = this.entries.find(item => !item._destroy)
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

  methods: {
    getEntries() {
      let result
      const _result = []

      if (this.value) {
        if (this.entries.length) {
          result = _.clone(this.entries[0])
          result._destroy = false
          result.value = this.value
        } else {
          result = {
            value: this.value,
            field_id: this.field.id,
          }
        }
      } else if (this.entries.length && this.entries[0].id) {
        result = _.clone(this.entries[0])
        result._destroy = true
      }

      if (result) {
        _result.push(result)
      }

      return _result
    },
  },
}
