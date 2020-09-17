<template>
  <div>
    <text-field
      v-model="name"
      title="名称"
      description="描述"
    />
    <text-field />
  </div>
</template>

<script>
import TextField from '../../src/components/text_field.vue'

export default {
  components: {
    TextField,
  },

  data() {
    return {
      name: '',
    }
  },
}
</script>
