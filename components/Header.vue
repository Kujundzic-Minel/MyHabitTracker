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

console.log(header);
</script>

<template>
  <header v-if="header" class="header">
    <div v-if="header.logo" class="header__logo">
      <img :src="header.logo.asset.url" alt="Logo" class="header__logo-img" />
    </div>

    <nav class="header__nav">
      <ul class="header__nav-list">
        <li v-for="navItem in header.navigation" :key="navItem.label" class="header__nav-item">
          <a :href="navItem.url" class="header__nav-link">{{ navItem.label }}</a>
        </li>
      </ul>
    </nav>

    <div v-if="header.cta" class="header__cta">
      <a :href="header.cta.url" class="header__cta-button">{{ header.cta.label }}</a>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  max-width: 100%;
  margin: 0 auto;

  &__logo {
    flex-shrink: 0;

    &-img {
      height: 2.5rem;
      width: auto;
    }
  }

  &__nav {
    &-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.2s ease;

      &:hover {
        color: #666;
      }
    }
  }

  &__cta {
    &-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      background-color: #333;
      color: white;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #555;
      }
    }
  }
}
</style>