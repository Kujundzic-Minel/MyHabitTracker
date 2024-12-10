<template>
  <button class="edit-btn">
    <span class="edit-btn__text">
      <slot>Edit</slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.edit-btn {
  position: relative;
  padding: 8px 16px 8px 40px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: #000;
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
    background-color: $primaryColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: $primaryDark;
    color: white;

    &::before {
      background-color: white;
    }
  }

  &__text {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>