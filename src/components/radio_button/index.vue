<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
    :error-message="errorMessage"
  >
    <template #input>
      <brick-radio-button-select
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
      </brick-radio-button-select>
    </template>
  </van-field>
</template>

<script>
import _ from 'lodash'
import { BrickRadioButtonSelect } from '@byzanteam/vis-components'
import FieldMixin from '../mixin'

export const RadioButton = {
  mixins: [FieldMixin],

  components: {
    BrickRadioButtonSelect,
  },

  data() {
    return {
      otherValue: '',
      selectedValue: null,
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
