<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :class="['input', variant, { disabled }]"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    variant: {
      type: String as PropType<'primary' | 'disabled'>,
      default: 'primary',
    },
    placeholder: {
      type: String,
      default: 'Enter text...',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement | null
      if (target) {
        this.$emit('update:modelValue', target.value)
      }
    },
  },
})
</script>

<style lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.input {
  font-size: 16px;
  padding: 0.5em 1em;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &.primary {
    background-color: #fff;
    border-color: #007bff;
    color: #333;

    &:focus {
      border-color: (#007bff, 10%);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }

  &.disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    border-color: #ced4da;
    cursor: not-allowed;
    opacity: 0.65;

    &:focus {
      box-shadow: none;
      border-color: #ced4da;
    }
  }
}
</style>
