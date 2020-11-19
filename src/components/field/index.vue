<template>
  <div class="fields-group">
    <component
      :is="fieldsMap[field.type]"
      v-for="field in fields"
      ref="field"
      :key="field.id"
      :field="field"
      :street-axios="streetAxios"
      :street-authorization="streetAuthorization"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { TextField } from '../text_field/index.vue'

const FIELDS_MAP = {
  'Field::TextField': 'text-field',
  'Field::IDNumber': 'integer',
  'Field::TextArea': 'textarea',
  'Field::CascadedSelect': 'cascaded-select',
  'Field::RadioButton': 'radio-button',
  'Field::CheckBox': 'checkbox-button',
  'Field::DateTime': 'date-time',
  'Field::File': 'uploader',
}

export const Fields = {
  components: {
    TextField,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fieldsMap: FIELDS_MAP,
    }
  },

  methods: {
    getData() {
      const entries = []
      this.$refs.field.forEach((component) => {
        const data = component.getData()
        entries.push(...data)
      })
      return entries
    },

    getValid() {
      const valids = this.$refs.field.map(item => item.getValid())
      return _.every(valids)
    },
  },
}

export default Fields
</script>

<style lang="scss" scoped>
.fields-group {
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  padding: 16px 0;
  margin-top: 24px;
}

.van-cell.van-field {
  flex-direction: column;
  padding: 0;
  overflow: visible;
  padding: 12px 20px 0;
}

.van-cell.van-field.error {
  background-color: #fcebec;
}

.van-field::after {
  display: none;
}

.van-field .van-field__label {
  font-weight: 500;
  font-size: 16px;
  color: #313131;
  line-height: 1.5em;
  width: auto;
  position: relative;
}

.van-field.required .van-field__label span::after {
  position: absolute;
  content: '*';
  bottom: 0;
  left: -13px;
  color: #ff9800;
  font-size: 30px;
  z-index: 1;
  transform: translateY(-50%);
  height: 13px;
}

.van-field .van-field__value {
  margin-top: 8px;
  line-height: 1.5em;
}

.van-field .van-field__body {
  display: flex;
  margin-bottom: 25px;
}

.van-field .van-field__control {
  color: #313131;
  line-height: inherit;
  overflow: hidden;
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  padding: 4px 0;
  border: none;
  outline: none;
  background: none;
  min-height: 1em;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: visible;
}

.van-field.no-border .van-field__control {
  border-bottom: none;
}

.van-field__control .ivu-select .ivu-select-selection {
  border: none;
  background: none;
}

.van-field__control .ivu-select-visible .ivu-select-selection {
  box-shadow: none;
}

.van-field__control .ivu-select .ivu-select-selected-value {
  color: #313131;
  font-size: 14px;
  padding: 0;
}

.van-field__control .ivu-select .ivu-select-placeholder {
  color: #969799 !important;
  font-size: 14px;
  padding: 0;
}

.van-field__control .ivu-select-dropdown-list .ivu-select-item {
  font-size: 14px !important;
  color: #313131 !important;
}

.van-field__control .ivu-select-dropdown-list .ivu-select-item:hover {
  background-color: #f4f4f8;
  color: #313131 !important;
}

.van-field__control .ivu-select-item.ivu-select-item-selected,
.van-field__control .ivu-select-item.ivu-select-item-focus {
  background-color: #f4f4f8;
  color: #313131 !important;
}

.van-field__control .ivu-date-picker {
  margin-top: 4px;
}

.van-field__control .ivu-date-picker .ivu-date-picker-rel .ivu-input-inner-container .ivu-input {
  border: none;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
  padding-left: 0;
  outline: none;
}

.van-field__control .ivu-date-picker-focused input {
  box-shadow: none;
}
</style>
