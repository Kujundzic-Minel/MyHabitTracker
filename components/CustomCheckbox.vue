<script setup lang="ts">
interface Props {
  id: number;
  ischecked: boolean;
  disabled?: boolean;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const handleChange = () => {
  emit('toggle');
}
</script>

<template>
  <div class="l-checkbox">
    <input
      :id="id.toString()"
      class="l-checkbox__input"
      type="checkbox"
      :checked="ischecked"
      :disabled="disabled"
      @change="handleChange"
    >
    <label :for="id.toString()" class="l-checkbox__box s-checkbox"/>
  </div>
</template>