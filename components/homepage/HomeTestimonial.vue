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
  testimonials: {
    name: string;
    role: string;
    feedback: string;
    photo?: { asset: { url: string } };
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
  <section v-if="homepage && homepage.testimonials">
    <h2>Témoignages</h2>
    <div v-for="testimonial in homepage.testimonials" :key="testimonial.name">
      <div v-if="testimonial.photo">
        <img :src="testimonial.photo.asset.url" :alt="testimonial.name" />
      </div>
      <h3>{{ testimonial.name }}</h3>
      <p>{{ testimonial.role }}</p>
      <blockquote>{{ testimonial.feedback }}</blockquote>
    </div>
  </section>
</template>