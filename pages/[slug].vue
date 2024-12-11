<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    image,
    "categories": categories[]->title 
  }
`
const route = useRoute()
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});
 
useSeoMeta({
  title: `Blog | ${post.value?.title}`,
  description: 'Retrouvez nos notes de mise à jour, nos astuces et nos conseils pour vous aider à atteindre vos objectifs.',
})
</script>

<template>
  <div class="article-page">
    <main class="article-page__main">
      <article v-if="post" class="article">
        <h1 class="article__title">{{ post.title }}</h1>
        <div class="article__content">
          <SanityContent v-bind="{ blocks: post.body }" class="article__body" />
          <div class="article__image">
            <SanityImage :asset-id="post.image.asset._ref" />
          </div>
          <div class="article__categories">
            <span class="article__categories-label">Catégories :</span>
            <span v-for="(category, i) in post.categories" :key="i" class="article__category">
              {{ category }}<span v-if="i < post.categories.length - 1">, </span>
            </span>
          </div>
        </div>
      </article>
      <div v-else class="article-page__error">
        <h1>Post not found</h1>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.article-page {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  max-width: 1200px;
  margin: 0 auto;

  &__main {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &__error {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: #666;
    padding: 2rem;
  }
}

.article {
  font-family: 'Poppins', sans-serif;

  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__body {
    line-height: 1.8;
    color: #666;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.8rem;
      color: #2c3e50;
      margin: 2rem 0 1rem;
    }

    p {
      margin-bottom: 1.5rem;
    }
  }

  &__image {
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &__categories {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    
    &-label {
      font-weight: 500;
      color: #2c3e50;
    }
  }

  &__category {
    color: #3498db;
    font-weight: 500;
  }
}
</style>
