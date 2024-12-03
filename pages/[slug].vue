<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
const route = useRoute()
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug: route.params.slug,
});
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
        <p>{{ post.categories }}</p>
      </div>
    </div>
    <div v-else>
      <h1>Post not found</h1>
    </div>
  </main>
</template>

<style lang="scss">
.p-article-slug {
  &__image {
    display: flex;
    width: 200px;
    height: 200px;
  }
}
</style>