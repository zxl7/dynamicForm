<template>
  <div :class="['checkbox', field.identity_key]">
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
        <van-checkbox-group
          v-model="selectedValue"
          :disabled="disabled"
          :direction="field.settings.layout === 'list' ? '' : 'horizontal'"
        >
          <van-checkbox
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option.id"
            shape="square"
          >
            {{ option.value }}
          </van-checkbox>
          <van-checkbox
            v-if="field.other_option"
            shape="square"
            :name="0"
            checked-color="#fd7d58"
            @click="onOtherValue(disabled)"
          >
            <span>{{ field.other_option }}</span>
            <input
              ref="focus"
              v-model="selectedOther"
              class="other-option"
              type="text"
              :readonly="disabled"
              placeholder="请输入"
            >
          </van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>
    <!-- 多选下拉组件 -->
    <van-field
      v-else
      v-model="selectedShowValue"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      placeholder="请选择"
      readonly
      right-icon="arrow-down"
      :error-message="error"
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
      v-model="showCheck"
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
        <van-checkbox-group
          v-model="selectedValue"
          :disabled="disabled"
        >
          <van-cell-group>
            <van-cell
              v-for="(option, index) in field.options"
              :key="option.id"
              :title="option.value"
              clickable
              @click="toggle(index, disabled)"
            >
              <template #right-icon>
                <van-checkbox
                  ref="checkboxes"
                  :name="option.id"
                  checked-color="#fd7d58"
                  shape="square"
                />
              </template>
            </van-cell>
            <van-cell
              :title="field.other_option"
              clickable
              @click="checkboxOther(disabled)"
            >
              <template #right-icon>
                <input
                  ref="focus"
                  v-model="selectedOther"
                  class="other-option"
                  type="text"
                  :readonly="disabled"
                  placeholder="请输入"
                  @blur="onBlur"
                >
                <van-checkbox
                  :name="0"
                  checked-color="#fd7d58"
                  shape="square"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Checkbox, CheckboxGroup, Cell, CellGroup, Popup,
} from 'vant'
import _ from 'lodash'
import FieldMixin from '../mixin'

export const CheckboxButton = {
  mixins: [FieldMixin],

  components: {
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanCell: Cell,
    vanCellGroup: CellGroup,
    vanPopup: Popup,
  },

  data() {
    return {
      selectedValue: [],
      selectedCacheValue: [],
      selectedShowValue: '',
      selectedShowMiddle: [],
      selectedOther: '',
      showCheck: false,
      error: '',
    }
  },
  computed: {
    initalValue() {
      return this.entries.map(item => ({
        ...item,
        value: item.value,
      }))
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
    selectedOther: {
      handler(value) {
        if (value) {
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
    initalValue: {
      handler(value) {
        if (value.length > 0) {
          let arr = []
          arr = value[0].value.split('、')
          this.field.options.forEach((option) => {
            arr.forEach((res) => {
              if (res === option.value) {
                this.selectedValue.push(option.id)
              }
            })
          })
          this.selectedValue = Array.from([...new Set(this.selectedValue)])
        }
      },
      immediate: true,
    },
    selectedValue: {
      handler() {
        this.selectedShowMiddle = []
        this.field.options.forEach((option) => {
          this.selectedValue.forEach((res) => {
            if (res === option.id) {
              this.selectedShowMiddle.push(option.value)
            }
          })
        })
        this.selectedShowValue = this.selectedShowMiddle.join('、')
        if (this.selectedShowMiddle.length > 0 && this.selectedValue.includes(0)) {
          this.selectedShowValue = `${this.selectedShowValue}、${this.selectedOther}`
        } else if (this.selectedValue.includes(0)) {
          this.selectedShowValue = this.selectedOther
        }
        if (this.required && !this.selectedValue.length > 0) {
          this.error = '必填字段不能为空'
          this.value = false
        } else {
          this.error = ''
          this.value = true
        }

        this.errorMessageBlur()
      },
      deep: true,
    },
    selectedShowValue: {
      // 监听你选择的值
      handler(value) {
        this.field.value = value
      },
      immediate: true,
    },
  },
  methods: {
    onCancel(disabled) {
      if (disabled) {
        return
      }
      this.showCheck = !this.showCheck
    },
    onBlur() {
      this.selectedShowValue = this.selectedShowMiddle.join('、')
      if (this.selectedShowMiddle.length > 0) {
        this.selectedShowValue = `${this.selectedShowValue}、${this.selectedOther}`
      } else {
        this.selectedShowValue = this.selectedOther
      }
    },
    checkboxOther(disabled) {
      if (disabled) {
        return
      }
      if (this.selectedValue.includes(0)) {
        this.selectedValue.splice(this.selectedValue.indexOf(0), 1)
      }
      this.selectedValue.push(0)
      if (!this.selectedOther) {
        this.error = '其他选项不能为空'
        this.valid = false
        this.value = false
      }
      this.$refs.focus.focus()
    },
    onOtherValue(disabled) {
      if (disabled) {
        return
      }
      if (!this.selectedOther) {
        this.error = '其他选项不能为空'
        this.valid = false
        this.value = false
      }
      this.$refs.focus.focus()
    },
    toggle(index, disabled) {
      if (disabled) {
        return
      }
      this.$refs.checkboxes[index].toggle()
    },
    getEntries() {
      // 获取选中对象
      this.selectedCacheValue = []
      this.field.options.forEach((option) => {
        this.selectedValue.forEach((res) => {
          if (res === option.id) {
            this.selectedCacheValue.push(option)
          }
        })
      })
      const fieldId = this.field.id
      const oldEntries = this.entries.slice()
      let result = []
      this.selectedCacheValue.forEach((option) => {
        const oldEntryIndex = _.findIndex(oldEntries, (entry) => {
          if (option.id) {
            const optionId = entry.option_id ? entry.option_id.toString() : ''
            return optionId === option.id.toString()
          }
          return !entry.option_id
        })
        if (oldEntryIndex === -1) {
          result.push({
            option_id: option.id,
            value: option.value,
            field_id: fieldId,
            identity_key: this.field.identity_key,
          })
        } else {
          const oldEntry = _.clone(oldEntries.splice(oldEntryIndex, 1)[0])
          oldEntry._destroy = false
          if (!oldEntry.option_id) {
            oldEntry.value = option.value
          }
          result.push(oldEntry)
        }
      })
      result.forEach((res) => {
        // eslint-disable-next-line no-param-reassign
        res.checkboxText = this.selectedShowValue
      })
      const deletedOldEntries = []
      _.each(oldEntries, (entry) => {
        if (entry.id) {
          const oldEntry = _.clone(entry)
          oldEntry._destroy = true
          deletedOldEntries.push(oldEntry)
        }
      })
      result = result.concat(deletedOldEntries)
      // 其他传值
      if (this.selectedOther) {
        result.push({ field_id: this.field.id, value: this.selectedOther })
      }
      return result
    },
    getValid() {
      if (this.selectedValue.length <= 0 && this.required) {
        this.valid = false
        this.error = '必填字段不能为空'
      } else {
        this.valid = true
      }
      return this.valid
    },
  },
}

export default CheckboxButton
</script>

<style lang="scss">
@import '/style.scss';
</style>
