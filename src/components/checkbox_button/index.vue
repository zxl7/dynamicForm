<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
    :error-message="errorMessage"
  >
    <template #input>
      <brick-checkbox-select
        v-model="selectedValue"
        :options="options"
      >
        <template #optionTemplate="{option}">
          <div
            v-if="option.other_option"
            class="other-select-item"
          >
            <div
              class="other-option"
              @click.stop
            >
              <div class="other-option-label">
                {{ option.name }}
              </div>
              <input
                v-model="otherValue"
                class="other-option-input"
              >
            </div>
          </div>
          <span v-else>
            {{ option.label }}
          </span>
        </template>
      </brick-checkbox-select>
    </template>
  </van-field>
</template>

<script>
import _ from 'lodash'
import { BrickCheckboxSelect } from '@byzanteam/vis-components'
import FieldMixin from '../mixin'

export const CheckboxButton = {
  mixins: [FieldMixin],

  components: {
    BrickCheckboxSelect,
  },

  data() {
    return {
      otherValue: '',
      selectedValue: [],
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
  },

  methods: {
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

    getData() {
      if (this.selectedValue.length <= 0) return []
      const entries = this.selectedValue.map(item => ({
        field_id: this.field.id,
        option_id: item.id,
        value: item.label,
      }))
      return entries
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
