<script>
import _ from 'lodash'
import { Integer } from '../integer.vue'

const PHONE_REGEX = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/

export const Phone = {
  extends: Integer,

  watch: {
    value: {
      // 手机号规则校验
      handler: _.debounce(function debounceFunc(value) {
        this.$emit('valueChanged', value)
        this.valid = true
        if (!value) return
        if (!PHONE_REGEX.test(value)) {
          this.valid = false
          this.errors = '手机号格式错误'
        } else {
          this.errors = ''
        }
      }, 500),
      immediate: true,
    },
  },

  methods: {
    // blur判断
    errorMessageBlur() {
      if (this.required && !this.value) {
        this.errors = '必填字段不能为空'
        this.valid = false
      } else if (!this.valid) {
        this.errors = '手机号格式错误'
      } else {
        this.errors = ''
        this.valid = true
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

export default Phone
</script>
