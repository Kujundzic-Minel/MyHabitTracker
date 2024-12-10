<script setup lang="ts">
interface Header {
  logo: { asset: { url: string } };
  navigation: { label: string; url: string }[];
  cta: { label: string; url: string };
}

const { data: header } = await useSanityQuery<Header>(groq`
*[_type == "header"][0]{
  logo {
    asset -> { url }
  },
  navigation[] {
    label,
    url
  },
  cta {
    label,
    url
  },
}
`);

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

console.log(header);
</script>

<template>
  <header v-if="header" class="header">
    <div class="header__container">
      <div v-if="header.logo" class="header__logo">
        <img :src="header.logo.asset.url" alt="Logo" class="header__logo-img" />
      </div>

      <button class="header__hamburger" aria-label="Toggle menu" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__nav" :class="{ 'header__nav--active': isMenuOpen }">
        <ul class="header__nav-list">
          <li v-for="navItem in header.navigation" :key="navItem.label" class="header__nav-item">
            <a :href="navItem.url" class="header__nav-link">{{ navItem.label }}</a>
          </li>
        </ul>
      </nav>

      <div v-if="header.cta" class="header__cta">
        <a :href="header.cta.url" class="header__cta-button">{{ header.cta.label }}</a>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    &-img {
      height: 40px;
      width: auto;
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;

    span {
      display: block;
      width: 25px;
      height: 2px;
      background-color: #333;
      transition: all 0.3s ease;
    }
  }

  &__nav {
    &-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: $primaryColor;
      }
    }
  }

  &__cta {
    &-button {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background-color: $primaryColor;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: $primaryDark;
      }
    }
  }

  @media (max-width: 768px) {
    &__hamburger {
      display: flex;
    }

    &__nav {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 1rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;

      &--active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      &-list {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }

    &__cta {
      display: none;
    }
  }
}
</style>
