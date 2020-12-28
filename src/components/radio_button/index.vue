<template>
  <div class="radio">
    <van-field
      v-if="field.settings.layout !== 'select'"
      :id="field.identity_key"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="errorMessage"
    >
      <template #input>
        <p class="description">
          {{ field.description }}
        </p>
        <van-radio-group
          v-model="selectedValue"
        >
          <van-radio
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option"
          >
            {{ option.value }}
          </van-radio>
          <van-radio
            v-if="field.other_option"
            checked-color="#fd7d58"
          >
            {{ field.other_option }}
            <input
              v-model="otherValue"
              class="other-option"
              type="text"
            >
          </van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <!-- 单选下拉组件 -->
    <van-field
      v-else
      v-model="radio"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="errorMessage"
      placeholder="请选择"
      readonly
      right-icon="arrow-down"
      @click="show = true"
    />
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      round
    >
      <van-cell
        class="popup-head"
        title="取消"
        value="确认"
        @click="show = false"
      />
      <div class="popup">
        <van-radio-group
          v-model="selectedValue"
        >
          <van-cell-group>
            <van-cell
              v-for="option in field.options"
              :key="option.id"
              :title="option.value"
              clickable
              @click="onConfirm(option)"
            >
              <template #right-icon>
                <van-radio
                  :name="option"
                  checked-color="#fd7d58"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  RadioGroup, Radio, Cell, CellGroup, Popup,
} from 'vant'
import _ from 'lodash'
import FieldMixin from '../mixin'

export const RadioButton = {
  mixins: [FieldMixin],
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanCell: Cell,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
  },
  data() {
    return {
      radio: '',
      show: false,
      otherValue: '',
      selectedValue: '',
    }
  },
  computed: {
    initalValue() {
      const entry = this.entries.find(item => !item._destroy)
      if (!entry) return null
      return {
        ...entry,
        id: entry.option_id,
        label: entry.value,
      }
    },
    options() {
      const { other_option: otherOption } = this.field
      const options = this.field.options.map(option => ({
        id: option.id,
        label: option.value,
        value: option.value,
      }))
      if (otherOption) {
        const option = {
          id: 0,
          name: otherOption,
          label: this.otherValue,
          value: otherOption,
          other_option: true,
        }
        return options.concat(option)
      }
      return options
    },
  },
  watch: {
    initalValue: {
      handler(value) {
        this.selectedValue = value
      },
      immediate: true,
    },
  },
  methods: {
    onConfirm(option) {
      this.selectedValue = option
      this.radio = option.value
    },
    getEntries() {
      const entry = _.first(this.entries)
      const option = this.selectedValue
      const entries = []
      if (entry) {
        if (option) {
          if (option.id !== 0 && option.id === entry.option_id) {
            entries.push(_.clone(entry))
          } else {
            entries.push(_.extend(_.clone(entry), { _destroy: true }))
            entries.push(this._generateEntryFromOption(option))
          }
        } else {
          entries.push(_.extend(_.clone(entry), { _destroy: true }))
        }
      } else if (option) {
        entries.push(this._generateEntryFromOption(option))
      }
      return entries
    },
    getValid() {
      if (!this.selectedValue && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },
    _generateEntryFromOption(option) {
      return {
        value: option.value,
        field_id: this.field.id,
        option_id: option.id,
      }
    },
  },
}

export default RadioButton
</script>

<style lang="scss">
@import './style.scss';
</style>
