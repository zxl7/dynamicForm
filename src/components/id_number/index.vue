<script>
import _ from 'lodash'
import { Integer } from '../integer.vue'

const ID_NUMBER_REGEX = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const FACTOR = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const PARITY = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]

export const IdNumber = {
  extends: Integer,

  watch: {
    value: {
      handler: _.debounce(function debounceFunc(value) {
        this.$emit('valueChanged', value)
        this.valid = true
        if (!value) return
        const sum = _.reduce(
          FACTOR,
          (memo, item, index) => {
            const count = memo + value.substr(index, 1) * item
            return count
          },
          0,
        )

        const validRegex = ID_NUMBER_REGEX.test(value)
        if (!(validRegex && PARITY[sum % 11].toString() === value.substr(17, 1).toString())) {
          this.valid = false
        }
      }, 500),
      immediate: true,
    },
  },

  methods: {
    errorMessageBlur() {
      if (this.required && !this.value) {
        this.errors = '必填字段不能为空'
      }
      if (!this.valid) {
        this.errors = '身份证格式错误'
      } else {
        this.errors = ''
      }
    },
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
