<script setup lang="ts">
interface Homepage {
  title: string;
  hero: {
    title: string;
    text: string;
    backgroundImage?: { asset: { url: string } };
    cta: { label: string; url: string }[];
    stats: {
      title: string;
      value: string;
    }[];
  };
}

const { data: homepage } = await useSanityQuery<Homepage>(groq`
*[_type == "homepage"][0]{
  title,
  hero {
    title,
    text,
    backgroundImage {
      asset -> { url }
    },
    cta[] {
      label,
      url
    },
    stats[] {
      title,
      value
    }
  },
  subscriptions[] {
    title,
    description,
    price,
    features,
    cta {
      label,
      url
    }
  },
  features[] {
    title,
    text,
    icon {
      asset -> { url }
    }
  },
  testimonials[] {
    name,
    role,
    feedback,
    photo {
      asset -> { url }
    }
  },
  faq[] {
    question,
    answer
  },
  metaDescription
}
`);
</script>

<template>
  <div v-if="homepage">
    <!-- Section Hero -->
    <section v-if="homepage.hero">
      <div v-if="homepage.hero.backgroundImage">
        <img :src="homepage.hero.backgroundImage.asset.url" alt="Hero Background" />
      </div>
      <h2>{{ homepage.hero.title }}</h2>
      <p>{{ homepage.hero.text }}</p>
      <div v-for="stat in homepage.hero.stats" :key="stat.title">
        <h3>{{ stat.title }}</h3>
        <p>{{ stat.value }}</p>
      </div>
      <div v-for="cta in homepage.hero.cta" :key="cta.label">
        <a :href="cta.url">{{ cta.label }}</a>
      </div>
    </section>
  </div>
</template>