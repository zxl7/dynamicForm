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
        <van-radio-group v-model="radio">
          <van-radio
            v-for="option in field.options"
            :key="option.id"
            checked-color="#fd7d58"
            :name="option.id"
          >
            {{ option.value }}
          </van-radio>
          <van-radio
            v-if="field.other_option"
            checked-color="#fd7d58"
          >
            {{ field.other_option }}
            <input
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
      v-model="selectedValue"
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
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              v-for="option in field.options"
              :key="option.id"
              :title="option.value"
              clickable
              @click="onConfirm(option, field)"
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
      value: '',
      show: false,
      selectedValue: '',
    }
  },

  computed: {},

  watch: {
    // initalValue: {
    //   handler(value) {
    //     this.selectedValue = value
    //   },
    //   immediate: true,
    // },
  },

  methods: {
    onConfirm(option) {
      this.selectedValue = option.value
      this.radio = option.id
    },
    // getValid() {
    //   if (!this.selectedValue && this.required) {
    //     this.valid = false
    //   } else {
    //     this.valid = true
    //   }
    //   return this.valid
    // },
  },
}

export default RadioButton
</script>

<style lang="scss">
@import './style.scss';
</style>
