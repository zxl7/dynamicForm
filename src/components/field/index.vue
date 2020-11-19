<template>
  <div class="fields-group">
    <component
      :is="fieldsMap[field.type]"
      v-for="field in fields"
      ref="field"
      :key="field.id"
      :field="field"
      class="slp-field"
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

<style lang="scss">
@import '../style.scss';

.fields-group {
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  padding: 16px 0;
  margin-top: 24px;
}
</style>
