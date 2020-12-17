<template>
  <div class="fields-group">
    <component
      :is="fieldsMap[field.type]"
      v-for="field in fields"
      ref="field"
      :key="field.id"
      :field="field"
      :before-upload-func="beforeUploadFunc"
      :file-params="fileParams"
      :entry="getEntry(field)"
      class="slp-field"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { TextField } from '../text_field/index.vue'
import { RadioButton } from '../radio_button/index.vue'
import { CheckboxButton } from '../checkbox_button/index.vue'
import { SlpTextArea } from '../text_area/index.vue'
import { Integer } from '../integer.vue'
import { Uploader } from '../uploader/index.vue'
import { DateTime } from '../date_time/index.vue'
import { Phone } from '../phone/index.vue'
import { IdNumber } from '../id_number/index.vue'

const FIELDS_MAP = {
  'Field::TextField': 'text-field',
  'Field::Integer': 'integer',
  'Field::IDNumber': 'id-number',
  'Field::Phone': 'phone',
  'Field::TextArea': 'slp-text-area',
  'Field::CascadedSelect': 'cascaded-select',
  'Field::RadioButton': 'radio-button',
  'Field::CheckBox': 'checkbox-button',
  'Field::DateTime': 'date-time',
  'Field::File': 'uploader',
}

export const Fields = {
  components: {
    TextField,
    RadioButton,
    CheckboxButton,
    SlpTextArea,
    Integer,
    Uploader,
    DateTime,
    IdNumber,
    Phone,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    entries: {
      type: Array,
      default: () => [],
    },
    beforeUploadFunc: {
      type: Function,
      default: () => [],
    },
    action: {
      type: String,
      default: '',
    },
    fileParams: {
      type: Object,
      default: () => {},
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

    getEntry(field) {
      return this.entries.filter(entry => entry.field_id === field.id)
    },
  },
}

export default Fields
</script>

<style lang="scss">
@import '../style.scss';

.fields-group {
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  padding: 16px 0;
  margin-top: 24px;
}
</style>
