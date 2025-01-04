<template>
  <button :class="['button', variant, { disabled }]" :disabled="disabled">
    <slot>{{ text }}</slot>
  </button>
</template>

<script lang="ts">

export default defineComponent({
  name: 'CustomButton',
  props: {
    variant: {
      type: String as PropType<'primary' | 'outline' | 'disabled'>,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '', // Texte par défaut
    },
  },
})
</script>

<style lang="scss">
.button {
  font-size: 16px;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;

    &:hover {
      background-color: (#004bff);
    }
  }

  &.outline {
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;

    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }

  &.disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    border: 1px solid #ced4da;
    cursor: not-allowed;
    opacity: 0.65;

    &:hover {
      background-color: #f8f9fa;
    }
  }
}
</style>
