<script setup lang="ts">
defineProps({
  progressHabit: Number,
})
</script>
<template>
  <div>
    <h2>Progrès :</h2>
    <div class="progressBar__BG">
      <div class="progressBar__Fill" :style="{'--WidthProgress': `${progressHabit}%`}"/>
    </div>
  </div>
</template>

<style lang="scss">
.progressBar__BG {
  width: 200px;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progressBar__Fill {
  height: 100%;
  background-color: blue;
  transition: width 0.3s ease;
  animation: forwards ProgressBarAnimation 1s cubic-bezier(.99,0,.27,1);
}
@keyframes ProgressBarAnimation{
  from{
    width: 0;
  }  to {
    width: var(--WidthProgress);
  }
}
</style>
