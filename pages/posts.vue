<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

import useSanityImage from '~/assets/composables/useSanityImage';
const { urlFor } = useSanityImage()


useSeoMeta({
  title: 'Blog | Habit tracker',
  description: 'Retrouvez nos notes de mise à jour, nos astuces et nos conseils pour vous aider à atteindre vos objectifs.',
})

const selectCategory = ref('')
 
const onCategoryClick = (categorySlug: string) => {
  if (selectCategory.value === categorySlug) {
    selectCategory.value = ''
  } else {
    selectCategory.value = categorySlug
  }
  page.value = 1
}

function onPageClick(i: number) {
  page.value = i
}

const page = ref(1)
const postsPerPage = 2

const startPost = computed(() => (page.value - 1) * postsPerPage)
const endPost = computed(() => page.value * postsPerPage)

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[_type == "category"]{
  title,
  slug
}`)

const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "post"
  && defined(slug.current)
  && ($selectCategory == '' || $selectCategory in (categories[] -> slug.current))
]|order(publishedAt desc)[$startPost...$endPost]{_id, title, slug, publishedAt, image, "categories": categories[]->{title, slug}}`, { selectCategory, startPost: startPost, endPost: endPost })

const { data: totalPosts } = await useSanityQuery<number>(groq`
  count(*[_type == "post" && defined(slug.current)
  && ($selectCategory == '' || $selectCategory in (categories[] -> slug.current))]
  )`, { selectCategory })

const totalPages = computed(() => {
  console.log(totalPosts)
  return totalPosts?.value ? Math.ceil(totalPosts.value / postsPerPage) : 0
})
</script>

<template>
  <div class="posts-page">
    <main class="posts-page__main">
      <section class="posts-page__categories categories">
        <h1 class="categories__title">Categories</h1>
        <div class="categories__list">
          <button 
            v-for="category in categories" 
            :key="category.slug.current"
            :class="['categories__button', { 'categories__button--active': selectCategory === category.slug.current }]"
            @click="onCategoryClick(category.slug.current)">
            {{ category.title }}
          </button>
        </div>
      </section>

      <section class="posts-page__content posts">
        <h1 class="posts__title">Posts</h1>
        <div v-if="posts && posts.length" class="posts__grid">
          <article v-for="post in posts" :key="post._id" class="posts__item post-card">
            <NuxtLink :to="`/${post.slug.current}`" class="post-card__link">
              <h2 class="post-card__title">{{ post.title }}</h2>
              <p class="post-card__date">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
              <div v-if="post.categories?.length" class="post-card__categories">
                <span v-for="category in post.categories" :key="category.slug.current" class="post-card__category">
                  {{ category.title }}
                </span>
              </div>
              <img
v-if="post.image" :src="urlFor(post.image)?.width(200).height(200).url()" 
                   alt="Post Image" class="post-card__image" />
            </NuxtLink>
          </article>
        </div>
        <div v-else class="posts__empty">
          <p>No posts found</p>
        </div>
      </section>

      <nav class="posts-page__pagination pagination">
        <button
v-for="i in totalPages" :key="i" 
                :class="['pagination__button', { 'pagination__button--active': page === i }]"
                @click="onPageClick(i)">
          {{ i }}
        </button>
      </nav>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.posts-page {
  padding: 4rem 2rem;
  background-color: #f8f9fa;

  &__main {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.categories {
  margin-bottom: 3rem;

  &__title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #2c3e50;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  &__button {
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: #3498db;
      color: #fff;
      transform: translateY(-2px);
    }

    &--active {
      background: #3498db;
      color: #fff;
      border-color: #3498db;
    }
  }
}

.posts {
  &__title {
    @extend .categories__title;
  }

  &__grid {
    display: grid;
    gap: 2rem;
    padding: 1rem;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__empty {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: #666;
    font-size: 1.2rem;
    padding: 2rem;
  }
}

.post-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 1.5rem;
  }

  &__title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  &__date {
    font-family: 'Poppins', sans-serif;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__category {
    background: #f8f9fa;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #666;
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }
}

.pagination {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 0.8rem;

  &__button {
    padding: 0.8rem 1.2rem;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: #3498db;
      color: #fff;
    }

    &--active {
      background: #3498db;
      color: #fff;
      border-color: #3498db;
    }
  }
}
</style>
