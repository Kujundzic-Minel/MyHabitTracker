<script setup lang="ts">
const props = defineProps<{ id: number }>();
const emit = defineEmits(['delete']);

const handleClick = () => {
  emit('delete', props.id);
};
</script>

<template>
  <button class="delete-btn" @click="handleClick">
    <span class="delete-btn__text">
      <slot>Delete</slot>
    </span>
  </button>
</template>


<style lang="scss" scoped>
.delete-btn {
  position: relative;
  padding: 8px 16px 8px 40px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: #dc3545;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: #dc3545;
    color: #fff;

    &::before {
      background-color: #fff;
    }
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
