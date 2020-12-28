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
            :name="option.id"
            shape="square"
          >
            {{ option.value }}
          </van-checkbox>
          <van-checkbox
            v-if="field.other_option"
            shape="square"
            checked-color="#fd7d58"
          >
            {{ field.other_option }}
            <input
              class="other-option"
              type="text"
            >
          </van-checkbox>
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
                  :name="option.id"
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
  mounted() {

  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
      this.checkboxValue = this.selectedValue.join(',')
    },
  },
}

export default CheckboxButton
</script>

<style lang="scss">
@import '/style.scss';
</style>
