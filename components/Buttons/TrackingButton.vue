<script setup lang="ts">
const router = useRouter();
const props = defineProps<{ id: number }>();

const handleClick = () => {
  router.push(`/tracking/${props.id}`);
};
</script>

<template>
  <button class="info-btn" @click="handleClick">
    <span class="info-btn__text">
      Info
    </span>
  </button>
</template>

<style lang="scss" scoped>
.info-btn {
  position: relative;
  padding: 8px 16px 8px 40px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #28a745;
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
    background-color: #28a745;
    // Icône "i" en SVG
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: #28a745;
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
