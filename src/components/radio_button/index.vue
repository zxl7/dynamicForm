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
        <p
          v-if="field.description"
          class="description"
        >
          {{ field.description }}
        </p>
        <van-radio-group
          v-model="chooseValue"
          :disabled="disabled"
        >
          <van-radio
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option.id"
            @click="onConfirm(option,disabled)"
          >
            {{ option.value }}
          </van-radio>
          <van-radio
            v-if="field.other_option"
            checked-color="#fd7d58"
            :name="0"
            @click="onOtherValue(disabled)"
          >
            <span>{{ field.other_option }}</span>
            <input
              v-model="otherValue"
              :readonly="disabled"
              class="other-option"
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
      @click="onCancel(disabled)"
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
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      round
    >
      <van-cell
        class="popup-head"
        title="取消"
        value="确定"
        @click="onCancel(disabled)"
      />
      <div class="popup">
        <van-radio-group
          v-model="chooseValue"
          :disabled="disabled"
        >
          <van-cell-group>
            <van-cell
              class="other-radio"
              @click="onOtherValue(disabled)"
            >
              <template #right-icon>
                <van-radio
                  v-if="field.other_option"
                  :name="0"
                  checked-color="#fd7d58"
                >
                  <input
                    v-model="otherValue"
                    :readonly="disabled"
                    class="other-option"
                    type="text"
                    placeholder="请输入"
                    @blur="onOtherValue"
                  >
                </van-radio>
              </template>
            </van-cell>
            <van-cell
              v-for="option in field.options"
              :key="option.id"
              :title="option.value"
              @click="onConfirm(option,disabled)"
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
      chooseValue: '',
      selectedValue: {},
      haveChoose: [],
      error: '',
      otherValue: '',
    }
  },
  computed: {
    initalValue() {
      const entry = this.entries.find(item => !item._destroy)
      if (!entry) return null
      this.radio = entry.value
      return {
        ...entry,
        id: entry.option_id,
        value: entry.value,
      }
    },
    options() {
      const { other_option: otherOption } = this.field
      const options = this.field.options.map(option => ({
        id: option.id,
        value: option.value,
      }))
      if (otherOption) {
        const option = {
          id: 0,
          name: otherOption,
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
        if (value) {
          this.options.forEach((res) => {
            if (value.value === res.value) {
              this.chooseValue = res.id
              // 获取选中对象
              this.field.options.forEach((option) => {
                if (this.chooseValue === option.id) {
                  this.selectedValue = option
                }
              })
            }
          })
        }
      },
      immediate: true,
    },
    haveChoose: {
      handler() {
        if (this.haveChoose.length === 0) {
          this.value = false
          this.errorMessageBlur()
        } else {
          this.errorMessageBlur()
        }
      },
    },
    otherValue: {
      handler(otherValue) {
        if (otherValue) {
          this.radio = this.otherValue
          this.selectedValue.value = this.otherValue
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
    onCancel(disabled) {
      if (disabled) {
        return
      }
      this.show = !this.show
    },
    onConfirm(target, disabled) {
      if (disabled) {
        return
      }
      if (this.haveChoose[0] === target.id) {
        this.radio = ''
        this.chooseValue = ''
        this.selectedValue = {}
        this.haveChoose = []
      } else {
        this.error = ''
        this.valid = true
        this.radio = target.value
        this.value = true
        this.selectedValue = target
        this.chooseValue = target.id
        this.haveChoose.unshift(target.id)
      }
    },
    onOtherValue(disabled) {
      if (disabled) {
        return
      }
      if (!this.otherValue) {
        this.radio = this.otherValue
        this.error = '其他选项不能为空'
        this.valid = false
        this.value = false
        this.chooseValue = 0
        this.haveChoose = []
        this.selectedValue = {}
      }
    },
    getEntries() {
      const option = this.selectedValue
      const entries = []
      if (this.chooseValue === 0 || this.haveChoose.length > 0) {
        entries.push(this._generateEntryFromOption(option))
      }
      return entries
    },
    getValid() {
      if (!this.selectedValue && this.required) {
        this.valid = false
        this.error = '必填字段不能为空'
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
