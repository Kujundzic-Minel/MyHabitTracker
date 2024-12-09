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
  <section v-if="homepage && homepage.subscriptions">
    <h2>Subscriptions</h2>
    <div v-for="subscription in homepage.subscriptions" :key="subscription.title">
      <h3>{{ subscription.title }}</h3>
      <p>{{ subscription.description }}</p>
      <p>{{ subscription.price }}</p>
      <ul>
        <li v-for="feature in subscription.features" :key="feature">{{ feature }}</li>
      </ul>
      <div v-if="subscription.cta">
        <a :href="subscription.cta.url">{{ subscription.cta.label }}</a>
      </div>
    </div>
  </section>
</template>