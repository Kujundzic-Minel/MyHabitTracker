<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, "categories": categories[]->{title, slug}}`

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY)
const { projectId, dataset } = useSanity().client.config()
</script>

<template>
  <div>
    <Header />
    <main>
      <h1>Posts</h1>
      <div v-for="post in posts" :key="post._id">
        <NuxtLink :to="`/${post.slug.current}`">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
          <div v-if="post.categories && post.categories.length > 0">
            <span v-for="category in post.categories" :key="category.slug.current">
              <p>{{ category.title }}</p>
            </span>
          </div>
          <img v-if="post.image" :src="urlFor(post.image)?.width(200).height(200).url()">
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
