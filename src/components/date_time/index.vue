<template>
  <div class="date">
    <van-field
      :id="field.identity_key"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :error-message="error"
      placeholder="请选择"
      :value="value"
      readonly
      clickable
      name="datetimePicker"
      :right-icon="value ? 'clear' : 'play'"
      @blur="errorMessageBlur"
      @click="showPicker = true"
      @click-right-icon.stop="clearValue"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      :style="{ height: '50%' }"
      round
      :close-on-click-overlay="false"
    >
      <div class="popup">
        <van-datetime-picker
          confirm-button-text="确定"
          :type="
            field.settings.input_type === 'datetime-local' ? 'datetime' : field.settings.input_type
          "
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  DatetimePicker, Cell, Popup, Icon,
} from 'vant'
import FieldMixin from '../mixin'

const DATE_OPTIONS_MAP = {
  date: {
    type: 'date',
    format: 'yyyy-MM-dd',
    placeholder: '选择日期',
  },
  'datetime-local': {
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    placeholder: '选择日期和时间',
  },
}

export const DateTime = {
  mixins: [FieldMixin],

  components: {
    vanDatetimePicker: DatetimePicker,
    vanCell: Cell,
    vanPopup: Popup,
    vanIcon: Icon,
  },

  data() {
    return {
      value: '',
      showPicker: false,
      nowYear: new Date().getFullYear(),
      minDate: '',
      maxDate: '',
      error: '',
    }
  },

  computed: {
    dateOptions() {
      return DATE_OPTIONS_MAP[this.field.settings.input_type]
    },
    timePickerShow() {
      return this.field.settings.input_type === 'time'
    },
  },

  watch: {
    value: {
      handler() {
        this.errorMessageBlur()
      },
    },
  },
  mounted() {
    this.maxDate = new Date(this.nowYear + 100, 12, 31)
    this.minDate = new Date(this.nowYear - 100, 0, 1)
  },

  methods: {
    onCancel() {
      this.showPicker = false
    },
    // 清除值
    clearValue() {
      this.value = ''
    },

    // 赋值
    onConfirm(time) {
      switch (this.field.settings.input_type) {
        case 'time':
          this.value = time
          break
        case 'datetime-local':
          this.value = this.formatDate(time) + this.generateTime(time)
          break
        default:
          this.value = this.formatDate(time)
          break
      }
      this.showPicker = false
      this.error = ''
      this.statusClass.error = false
    },

    formatDate(date) {
      this.error = ''
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    getValid() {
      if (!this.value && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },

    generateEntry(date) {
      const { input_type: inputType } = this.field.settings
      if (inputType === 'date') {
        return this.generateDate(date)
      }
      if (inputType === 'datetime-local') {
        return `${this.generateDate(date)}-${this.generateTime()}`
      }
      return this.date
    },

    generateDate() {
      return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
    },

    generateTime(date) {
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return ` ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    },
  },
}

export default DateTime
</script>

<style lang="scss">
@import './style.scss';
</style>
