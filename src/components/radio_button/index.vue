<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
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
      const entry = this.entry.find(item => !item._destroy)
      if (!entry) return null
      return {
        ...entry,
        uuid: entry.value,
        label: entry.value,
      }
    },

    options() {
      const { other_option: otherOption } = this.field
      const options = this.field.options.map(option => ({
        id: option.id,
        label: option.value,
        uuid: option.value,
      }))
      if (otherOption) {
        const option = {
          id: 0,
          name: otherOption,
          label: this.otherValue,
          uuid: otherOption,
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
    getData() {
      if (!this.selectedValue) return []
      const entry = {
        field_id: this.field.id,
        option_id: this.selectedValue.id,
        value: this.selectedValue.label,
      }
      return [entry]
    },
    getValid() {
      if (!this.selectedValue && this.required) {
        this.valid = false
      } else {
        this.valid = true
      }
      return this.valid
    },
  },
}

export default RadioButton
</script>

<style lang="scss">
@import './style.scss';
</style>
