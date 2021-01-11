<template>
  <div class="radio">
    <van-field
      v-if="field.settings.layout !== 'select'"
      :id="field.identity_key"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="error"
    >
      <template #input>
        <p class="description">
          {{ field.description }}
        </p>
        <van-radio-group v-model="radioValue">
          <van-radio
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option.id"
            @click="onConfirm(option)"
          >
            {{ option.value }}
          </van-radio>
          <van-radio
            v-if="field.other_option"
            checked-color="#fd7d58"
            :name="0"
            @click="onOtherValue()"
          >
            <span>{{ field.other_option }}</span>
            <input
              v-model="otherValue"
              class="other-input"
              type="text"
              placeholder="请输入"
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
      :error-message="error"
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
        value="确定"
        @click="show = false"
      />
      <div class="popup">
        <van-radio-group v-model="radioValue">
          <van-cell-group>
            <!-- <van-cell
              class="other-option"
              @click="onOtherValue()"
            >
              <template #right-icon>
                <van-radio
                  v-if="field.other_option"
                  checked-color="#fd7d58"
                >
                  <input
                    v-model="otherValue"
                    class="other-input"
                    type="text"
                    placeholder="请输入"
                    @blur="onOtherValue"
                  >
                </van-radio>
              </template>
            </van-cell> -->
            <van-cell
              v-for="option in field.options"
              :key="option.id"
              :title="option.value"
              @click="onConfirm(option)"
            >
              <template #right-icon>
                <van-radio
                  :name="option.id"
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
      radioValue: '',
      selectedValue: '',
      hasChosen: [],
      error: '',
      otherArr: [],
      otherValue: '',
    }
  },
  computed: {
    initalValue() {
      // return this.entries.map(item => ({
      //   ...item,
      //   value: item.value,
      // }))
      return this.entries[0]
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
        this.radioValue = value.value - 0
      },
      immediate: true,
    },
    hasChosen: {
      handler() {
        if (this.hasChosen.length === 0) {
          this.value = false
          this.error = '必填字段不能为空'
          this.errorMessageBlur()
        } else {
          this.errorMessageBlur()
        }
      },
    },
    otherValue: {
      handler(otherValue) {
        if (otherValue) {
          this.valid = true
          this.value = true
          this.error = ''
        } else {
          this.error = '其他选项不能为空'
          this.value = false
          this.valid = false
        }
      },
    },
  },

  methods: {
    onConfirm(target) {
      if (this.hasChosen[0] === target.id) {
        this.radio = ''
        this.selectedValue = {}
        this.radioValue = {}
        this.hasChosen = []
      } else {
        this.otherArr = []
        this.radio = target.value
        this.value = true
        this.selectedValue = target
        this.radioValue = target.id
        this.hasChosen.unshift(target.id)
      }
    },
    onOtherValue() {
      if (this.otherArr.includes('其他')) {
        this.radio = ''
        this.otherArr.length = 0
        this.radioValue = {}
      } else {
        this.valid = false
        this.value = false
        this.radioValue = 0
        this.hasChosen = []
        this.otherArr.unshift('其他')
        this.radio = this.otherValue
        this.error = '其他选项不能为空'
      }
    },
    getEntries() {
      // 获取选中对象
      this.field.options.forEach((option) => {
        if (this.radioValue === option.id) {
          this.selectedValue = option
        }
      })
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
        value: option.id,
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
