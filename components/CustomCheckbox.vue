<template>
  <div class="l-checkbox">
    <input
      :id="id"
      class="l-checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="handleChange"
    />
    <label :for="id" class="l-checkbox__box s-checkbox"></label>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CustomCheckbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:checked'],
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:checked', target.checked)
    },
  },
})
</script>

<style lang="scss" scoped>
/* Layout block */
.l-checkbox {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__box {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $skyLight;
    border-radius: 10%;
    transition: background-color 0.3s, border 0.3s;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 8px;
      top: 4px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }

  &__input:checked + &__box {
    background-color: $primaryColor;

    &:after {
      display: block;
    }
  }

  &__input:disabled + &__box {
    background-color: lighten($skyLight, 20%);
    cursor: not-allowed;

    &:after {
      border-color: lighten(white, 20%);
    }
  }
}
</style>
