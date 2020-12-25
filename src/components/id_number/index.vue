<script>
import _ from 'lodash'
import { Integer } from '../integer.vue'

const ID_NUMBER_REGEX = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const FACTOR = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const PARITY = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]

export const IdNumber = {
  extends: Integer,

  computed: {
    errorMessage() {
      const errors = []
      errors.push(this.required && !this.value ? '必填字段不能为空' : '')
      errors.push(this.valid ? '' : '身份证号格式错误')
      return _.compact(errors)[0]
    },
  },

  watch: {
    value: {
      handler: _.debounce(function debounceFunc(value) {
        this.$emit('valueChanged', value)
        this.valid = true
        if (!value) return
        const sum = _.reduce(FACTOR, (memo, item, index) => {
          const count = memo + value.substr(index, 1) * item
          return count
        }, 0)

        const validRegex = ID_NUMBER_REGEX.test(value)
        if (!(validRegex && PARITY[sum % 11].toString() === value.substr(17, 1).toString())) {
          this.valid = false
        }
      }, 1000),
      immediate: true,
    },
  },

  methods: {
    getValid() {
      if (!this.value && this.required) {
        this.valid = false
      }
      return this.valid
    },
  },
}

export default IdNumber
</script>
