<script>
import _ from 'lodash'
import { Integer } from '../integer.vue'

const PHONE_REGEX = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/

export const Phone = {
  extends: Integer,

  computed: {
    errorMessage() {
      return this.valid ? '' : '手机号格式错误'
    },
  },

  watch: {
    value: _.debounce(function debounceFunc(value) {
      this.$emit('valueChanged', value)
      this.valid = true
      if (!value) return
      if (!PHONE_REGEX.test(value)) {
        this.valid = false
      }
    }, 1000),
  },
}

export default Phone
</script>
