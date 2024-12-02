<script lang="ts">
export default defineComponent({
  name: 'CustomCounter',
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const count = ref(props.initialCount)

    const increase = () => {
      if (!props.disabled) count.value++
    }

    const decrease = () => {
      if (!props.disabled && count.value > 0) count.value--
    }

    return {
      count,
      increase,
      decrease,
    }
  },
})
</script>

<template>
  <div class="counter">
    <button
      class="counter-button"
      :disabled="disabled"
      :class="{ 'counter-button--disabled': disabled }"
      @click="decrease"
    >
      -
    </button>
    <span class="counter-display">{{ count }}</span>
    <button
      class="counter-button"
      :disabled="disabled"
      :class="{ 'counter-button--disabled': disabled }"
      @click="increase"
    >
      +
    </button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(48px);
  width: rem(128px);
  border: 1px solid $skyLight;
  border-radius: rem(60px);
}

.counter-button {
  font-size: 25px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin: 0 10px;
  font-family: $primaryFont;
  color: $primaryColor;

  &:hover {
    font-weight: bold;
  }

  &:active {
    transform: scale(0.9);
  }

  &--disabled {
    cursor: not-allowed;
    color: $skyLight;
  }

  &:disabled {
    background-color: transparent;
  }
}

.counter-display {
  font-size: 24px;
  font-weight: bold;
  width: 50px;
  text-align: center;
  font-family: $primaryFont;
  color: black;
}
</style>
