<template>
  <div :class="['date', field.identity_key]">
    <van-field
      :id="field.identity_key"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :error-message="error"
      placeholder="请选择日期"
      :value="value"
      readonly
      clickable
      :disabled="field.disabled"
      name="datetimePicker"
      :right-icon="value ? 'clear' : 'play'"
      @blur="errorMessageBlur"
      @click="onCancel(disabled)"
      @click-right-icon.stop="clearValue(disabled)"
    >
      <template #extra>
        <p
          v-if="field.description"
          class="description"
        >
          {{ field.description }}
        </p>
      </template>
    </van-field>
    <van-popup
      v-model="showPicker"
      position="bottom"
      :style="{ height: '50%' }"
      round
      :close-on-click-overlay="false"
    >
      <div class="popup">
        <div v-if="field.settings.input_type === 'time'">
          <van-datetime-picker
            v-model="currentTime"
            type="time"
            :disabled="field.disabled"
            @confirm="onConfirm(currentTime)"
            @cancel="onCancel"
          />
        </div>
        <!-- 有无年月 -->
        <div v-else>
          <van-datetime-picker
            v-model="currentDate"
            :disabled="field.disabled"
            confirm-button-text="确定"
            :type="
              field.settings.input_type === 'datetime-local'
                ? 'datetime'
                : field.settings.input_type
            "
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirm(currentDate)"
            @cancel="onCancel"
          />
        </div>
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
      currentDate: new Date(),
      currentTime: '12:30',
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
    initalValue: {
      handler(value) {
        this.value = value
      },
      immediate: true,
    },
  },
  mounted() {
    this.maxDate = new Date(this.nowYear + 100, 12, 31)
    this.minDate = new Date(this.nowYear - 100, 0, 1)
  },

  methods: {
    onCancel(disabled) {
      if (disabled) {
        return
      }
      this.showPicker = !this.showPicker
    },
    // 清除值
    clearValue(disabled) {
      if (disabled) {
        return
      }
      this.value = ''
    },
    // 赋值
    onConfirm(date) {
      switch (this.field.settings.input_type) {
        case 'time':
          this.value = date
          break
        case 'datetime-local':
          this.value = `${this.generateDate(date)} ${this.generateTime(date)}`
          break
        default:
          this.value = this.generateDate(date)
          break
      }
      this.showPicker = false
      this.error = ''
      this.statusClass.error = false
    },
    getValid() {
      if (!this.value && this.required) {
        this.valid = false
        this.error = '必填字段不能为空'
      } else {
        this.valid = true
      }
      return this.valid
    },
    generateDate(date) {
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`
    },
    generateTime(date) {
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    },
  },
}
export default DateTime
</script>

<style lang="scss">
@import './style.scss';
</style>
