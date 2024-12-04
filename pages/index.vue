<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
<<<<<<< Updated upstream
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null
=======
import useSanityImage from '~/assets/composables/useSanityImage';

const { urlFor } = useSanityImage()

useSeoMeta({
  title: 'Blog | Habit tracker',
  description: 'Retrouvez nos notes de mise à jour, nos astuces et nos conseils pour vous aider à atteindre vos objectifs.',
})
>>>>>>> Stashed changes

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
  <div class="container">
    <main>
      <section class="categories">
        <h1>Categories</h1>
        <div class="categories-list">
          <button v-for="category in categories" :key="category.slug.current"
            :class="{ active: selectCategory === category.slug.current }"
            @click="onCategoryClick(category.slug.current)">
            {{ category.title }}
          </button>
        </div>
      </section>

      <section class="posts">
        <h1>Posts</h1>
        <div v-if="posts && posts.length" class="posts-list">
          <div v-for="post in posts" :key="post._id" class="post-item">
            <NuxtLink :to="`/${post.slug.current}`" class="post-link">
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-date">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
              <div v-if="post.categories && post.categories.length > 0" class="post-categories">
                <span v-for="category in post.categories" :key="category.slug.current" class="post-category">
                  <p>{{ category.title }}</p>
                </span>
              </div>
              <img v-if="post.image" :src="urlFor(post.image)?.width(200).height(200).url()" alt="Post Image"
                class="post-image" />
            </NuxtLink>
          </div>
        </div>
        <div v-else class="no-posts">
          <p>No posts found</p>
        </div>
      </section>

      <section class="pagination">
        <button v-for="i in totalPages" :key="i" :class="{ active: page === i }" @click="onPageClick(i)">
          {{ i }}
        </button>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
/* Mixin for responsive design */
@mixin respond-to($breakpoint) {
  @if $breakpoint =='small' {
    @media (max-width: 600px) {
      @content;
    }
  }

  @else if $breakpoint =='medium' {
    @media (min-width: 601px) and (max-width: 1024px) {
      @content;
    }
  }

  @else if $breakpoint =='large' {
    @media (min-width: 1025px) {
      @content;
    }
  }
}

/* Global Styles */
.container {
  font-family: $primaryFont;
  padding: 20px;
  background-color: $skyLight;
  color: $darkDark;

  main {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Categories Section */
.categories {
  margin-bottom: 40px;

  h1 {
    font-size: 2rem;
    color: $primaryDark;
    margin-bottom: 20px;
    text-align: center;
  }

  .categories-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

    button {
      background-color: $primaryColor;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: $primaryDark;
      }

      &.active {
        background-color: $darkDark;
      }
    }
  }
}

/* Posts Section */
.posts {
  margin-bottom: 40px;

  h1 {
    font-size: 2rem;
    color: $primaryDark;
    margin-bottom: 20px;
    text-align: center;
  }

  .posts-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Default for large screens */
    gap: 20px;

    .post-item {
      background-color: #fff;
      border: 1px solid $darkLight;
      border-radius: 10px;
      overflow: hidden;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .post-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;

        .post-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 15px;
          color: $primaryDark;
        }

        .post-date {
          font-size: 0.9rem;
          color: $darkLight;
          margin: 0 15px 15px 15px;
        }

        .post-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 0 15px 15px 15px;

          .post-category {
            background-color: $skyLight;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 0.8rem;
            color: $darkDark;

            p {
              margin: 0;
            }
          }
        }

        .post-image {
          width: 100%;
          /* Full width of the card */
          height: 150px;
          /* Reduced height for better proportions */
          object-fit: cover;
        }
      }
    }
  }

  .no-posts {
    text-align: center;
    font-size: 1.2rem;
    color: $darkLight;
  }
}

/* Pagination Section */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  button {
    background-color: $skyLight;
    color: $darkDark;
    border: 1px solid $darkLight;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: $primaryColor;
      color: #fff;
    }

    &.active {
      background-color: $primaryDark;
      color: #fff;
      border-color: $primaryDark;
    }
  }
}

/* Responsive Styles */
@include respond-to('small') {
  .posts-list {
    grid-template-columns: 1fr;
    /* Single column for mobile */
  }
}

@include respond-to('medium') {
  .posts-list {
    grid-template-columns: repeat(2, 1fr);
    /* Two columns for tablets */
  }
}

@include respond-to('large') {
  .posts-list {
    grid-template-columns: repeat(3, 1fr);
    /* Three columns for desktop */
  }
}
</style>
