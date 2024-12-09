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
    cta?: { label: string; url: string };
  }[];
  features: {
    title: string;
    text: string;
    icon?: { asset: { url: string } };
  }[];
  testimonials: {
    name: string;
    role: string;
    feedback: string;
    photo?: { asset: { url: string } };
  }[];
  faq: {
    question: string;
    answer: string;
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
  <div v-if="homepage">
    <!-- Titre Principal -->
    <h1>{{ homepage.title }}</h1>

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

    <!-- Section Subscriptions -->
    <section v-if="homepage.subscriptions">
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

    <!-- Section Features -->
    <section v-if="homepage.features">
      <h2>Features</h2>
      <div v-for="feature in homepage.features" :key="feature.title">
        <div v-if="feature.icon">
          <img :src="feature.icon.asset.url" alt="Feature Icon" />
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.text }}</p>
      </div>
    </section>

    <!-- Section Testimonials -->
    <section v-if="homepage.testimonials">
      <h2>Testimonials</h2>
      <div v-for="testimonial in homepage.testimonials" :key="testimonial.name">
        <div v-if="testimonial.photo">
          <img :src="testimonial.photo.asset.url" :alt="testimonial.name" />
        </div>
        <h3>{{ testimonial.name }}</h3>
        <p>{{ testimonial.role }}</p>
        <blockquote>{{ testimonial.feedback }}</blockquote>
      </div>
    </section>

    <!-- Section FAQ -->
    <section v-if="homepage.faq">
      <h2>FAQ</h2>
      <div v-for="faq in homepage.faq" :key="faq.question">
        <h3>{{ faq.question }}</h3>
        <p>{{ faq.answer }}</p>
      </div>
    </section>
  </div>
</template>
