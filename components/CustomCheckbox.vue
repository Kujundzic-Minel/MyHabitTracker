<script setup lang="ts">
interface Props {
  id: number;
  ischecked: boolean;
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div class="l-checkbox">
    <input
      :id="id"
      class="l-checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="handleChange"
    >
    <label :for="id" class="l-checkbox__box s-checkbox"/>
  </div>
</template>