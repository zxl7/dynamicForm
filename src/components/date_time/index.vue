<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
    class="no-border"
  >
    <template #input>
      <time-picker
        v-if="timePickerShow"
        v-model="date"
        format="HH:mm"
        placeholder="选择时间"
      />
      <date-picker
        v-else
        v-model="date"
        v-bind="dateOptions"
      />
    </template>
  </van-field>
</template>

<script>
import { DatePicker, TimePicker } from 'iview'
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
    DatePicker,
    TimePicker,
  },

  data() {
    return {
      date: '',
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
    initalValue: {
      handler(value) {
        this.date = value
      },
      immediate: true,
    },
  },

  methods: {
    getData() {
      if (!this.date) return []
      const entry = {
        field_id: this.field.id,
        value: this.generateEntry(),
      }
      return [entry]
    },

    getValid() {
      if (!this.date && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },

    generateEntry() {
      const { input_type: inputType } = this.field.settings
      if (inputType === 'date') {
        return this.generateDate()
      } if (inputType === 'datetime-local') {
        return `${this.generateDate()}-${this.generateTime()}`
      }
      return this.date
    },

    generateDate() {
      return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
    },

    generateTime() {
      const hours = this.date.getHours()
      const minutes = this.date.getMinutes()
      return `${hours < 10 ? `0${hours}` : hours}-${minutes < 10 ? `0${minutes}` : minutes}`
    },
  },
}

export default DateTime
</script>

<style lang="scss">
@import './style.scss';
</style>
