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
  <main>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <div class="p-article-slug">
        <SanityContent v-bind="{ blocks: post.body }" />
        <div class="p-article-slug__image">
          <SanityImage :asset-id="post.image.asset._ref" />
        </div>
        <p>
          Catégories :
          <span v-for="(category, i) in post.categories" :key="i">
            {{ category }}<span v-if="i < post.categories.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>
    <div v-else>
      <h1>Post not found</h1>
    </div>
  </main>
</template>

<style lang="scss" scoped>
/* Variables */
$primaryColor: #6b4eff;
$primaryDark: #5538ee;
$skyLight: #e3e5e5;
$darkLight: #979c9e;
$darkDark: #303437;

$primaryFont: 'Inter', sans-serif;

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

/* General Styles */
main {
  font-family: $primaryFont;
  background-color: $skyLight;
  color: $darkDark;
  padding: 20px;

  h1 {
    font-size: 2rem;
    color: $primaryDark;
    margin-bottom: 20px;
    text-align: center;
  }

  .p-article-slug {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;

    &__image {
      margin: 20px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 400px;
      /* Maximum size for larger screens */
      height: auto;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    p {
      margin-top: 20px;
      color: $darkLight;
      font-size: 1rem;

      span {
        color: $darkDark;
        font-weight: bold;
      }
    }
  }
}

/* Responsive Styles */
@include respond-to('small') {
  main {
    padding: 10px;

    h1 {
      font-size: 1.5rem;
    }

    .p-article-slug {
      padding: 10px;

      &__image {
        max-width: 300px;
        /* Reduce size on smaller screens */
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
}

@include respond-to('medium') {
  .p-article-slug {
    &__image {
      max-width: 350px;
      /* Medium screen size adjustment */
    }
  }
}

@include respond-to('large') {
  .p-article-slug {
    &__image {
      max-width: 400px;
      /* Larger screens get the largest image size */
    }
  }
}
</style>
