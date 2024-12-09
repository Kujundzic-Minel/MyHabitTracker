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
  features: {
    title: string;
    text: string;
    icon?: { asset: { url: string } };
  }[];
  subscriptions: {
    title: string;
    description: string;
    price: string;
    features: string[];
    cta: { label: string; url: string };
  }[];
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
  <section v-if="homepage && homepage.features">
    <h2>Features</h2>
    <div v-for="feature in homepage.features" :key="feature.title">
      <div v-if="feature.icon">
        <img :src="feature.icon.asset.url" alt="Feature Icon" />
      </div>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.text }}</p>
    </div>
  </section>
</template>