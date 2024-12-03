<template>
  <div class="l-switch">
    <label class="switch">
      <input type="checkbox" :checked="checked" :disabled="disabled" @change="handleChange" >
      <span :class="['slider', { round: rounded }]"/>
    </label>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CustomSwitch',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:checked'],
  methods: {
    handleChange(event: Event) {
      // Vérification explicite de `event.target`
      const target = event.target as HTMLInputElement | null
      if (target) {
        this.$emit('update:checked', target.checked)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $skyLight;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
    }
  }

  input:checked + .slider {
    background-color: $primaryColor;

    &:before {
      transform: translateX(26px);
    }
  }

  .slider.round {
    border-radius: 34px;

    &:before {
      border-radius: 100%;
    }
  }
}
</style>
