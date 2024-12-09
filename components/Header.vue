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
  <header v-if="header">
    <!-- Logo -->
    <div v-if="header.logo" class="header__logo">
      <img :src="header.logo.asset.url" alt="Logo" />
    </div>

    <!-- Navigation -->
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li v-for="navItem in header.navigation" :key="navItem.label" class="header__nav-item">
          <a :href="navItem.url" class="header__nav-link">{{ navItem.label }}</a>
        </li>
      </ul>
    </nav>

    <!-- CTA -->
    <div v-if="header.cta" class="header__cta">
      <a :href="header.cta.url" class="cta-button">{{ header.cta.label }}</a>
    </div>
  </header>

</template>