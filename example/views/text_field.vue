<template>
  <div>
    <text-field
      v-model="name"
      title="名称"
      description="描述"
    />
    <integer v-model="count" />
  </div>
</template>

<script>
import TextField from '../../src/components/text_field.vue'
import Integer from '../../src/components/integer.vue'

export default {
  components: {
    TextField,
    Integer,
  },

  data() {
    return {
      name: '',
      count: 0,
    }
  },
}
</script>
