<template>
  <div
    class="field"
  >
    <div class="field-head">
      <span class="field-title">{{ title }}</span>
      <div
        v-if="description"
        class="field-description"
      >
        {{ description }}
      </div>
    </div>
    <div class="field-input-container">
      <slot name="input" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },

}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  padding: 0 20px;
  background-color: #ffffff;
  padding-bottom: 1px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.08);

  &:first-child {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-top: 12px;
  }

  > .field-head {
    padding: 8px 0;
    font-size: 18px;
    font-weight: bold;
    color: #2e2e2e;
    line-height: 30px;

    .field-description {
      margin-top: 2px;
      font-weight: normal;
      font-size: 14px;
      color: #888888;
      line-height: 1.5em;
    }
  }

  > .field-input-container {
    font-size: 14px;
    line-height: 30px;
    flex-grow: 1;
    padding-bottom: 4px;

    > .field-input.with-icon {
      display: flex;
      line-height: inherit;
      align-items: center;
      border-bottom: 1px solid rgba(97, 95, 108, 0.2);

      > .field-value {
        border-bottom: 0;
        padding: 6px 0;
        flex-grow: 1;
        line-height: inherit;
      }
    }
  }

  input[type='text'],
  input[type='number'],
  textarea {
    display: block;
    padding: 6px 0;
    border-bottom: 1px solid rgba(97, 95, 108, 0.2);
  }

  ::-webkit-input-placeholder {
    color: rgba(46, 46, 46, 0.2);
    font-size: 16px;
    font-family: inherit;
    line-height: inherit;
    font-weight: normal;
  }
}

input[type=text],
input[type=number],
input[type=date],
input[type=time],
input[type=tel] {
  border: none;
  outline: none;
  background: none;
  min-height: 1em;
  vertical-align: middle;
  box-shadow: none;
  border-radius: 0;
  line-height: 1.5em;
}
</style>
