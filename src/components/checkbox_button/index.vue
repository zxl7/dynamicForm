<template>
  <van-field
    :id="field.identity_key"
    :label="field.title"
    :class="[statusClass, field.customClass]"
    :disabled="disabled"
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
      selectedValue: null,
    }
  },

  computed: {
    initalValue() {
      return this.entry.map(item => ({
        ...item,
        uuid: item.value,
        label: item.value,
      }))
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
