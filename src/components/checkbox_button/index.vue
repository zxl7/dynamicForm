<template>
  <div class="checkbox">
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
        <van-checkbox-group
          v-model="selectedValue"
          :direction="field.settings.layout === 'list' ? '' : 'horizontal'"
        >
          <van-checkbox
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option"
            shape="square"
          >
            {{ option.value }}
          </van-checkbox>
          <!-- <van-checkbox
            v-if="field.other_option"
            shape="square"
            checked-color="#fd7d58"
          >
            {{ field.other_option }}
            <input
              class="other-option"
              type="text"
            >
          </van-checkbox> -->
        </van-checkbox-group>
      </template>
    </van-field>
    <!-- 多选下拉组件 -->
    <van-field
      v-else
      v-model="checkboxValue"
      :label="field.title"
      :class="[statusClass, field.customClass, field.settings.layout]"
      :disabled="disabled"
      :error-message="errorMessage"
      placeholder="请选择"
      readonly
      right-icon="arrow-down"
      @click="showCheck = true"
    />
    <van-popup
      v-model="showCheck"
      position="bottom"
      :style="{ height: '50%' }"
      round
    >
      <van-cell
        class="popup-head"
        title="取消"
        value="确认"
        @click="showCheck = false"
      />
      <div class="popup">
        <van-checkbox-group v-model="selectedValue">
          <van-cell-group>
            <van-cell
              v-for="(option, index) in field.options"
              :key="option.id"
              :title="option.value"
              clickable
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  ref="checkboxes"
                  :name="option"
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
      checkboxValue: '',
      showCheck: false,
    }
  },
  computed: {
    initalValue() {
      return this.entries.map(item => ({
        ...item,
        value: item.value,
        label: item.value,
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
    initalValue: {
      handler(value) {
        this.selectedValue = value
      },
      immediate: true,
    },
    selectedValue: {
      handler(value) {
        this.checkboxValue = ''
        value.forEach((select) => {
          this.checkboxValue += `${select.value}、`
        })
      },
      immediate: true,
    },
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    getEntries() {
      const fieldId = this.field.id
      const oldEntries = this.entries.slice()
      let result = []
      this.selectedValue.forEach((option) => {
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
      const deletedOldEntries = []
      _.each(oldEntries, (entry) => {
        if (entry.id) {
          const oldEntry = _.clone(entry)
          oldEntry._destroy = true
          deletedOldEntries.push(oldEntry)
        }
      })
      result = result.concat(deletedOldEntries)
      return result.concat(deletedOldEntries)
    },
    getValid() {
      if (this.selectedValue.length <= 0 && this.required) {
        this.valid = false
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
