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
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY)
const { projectId, dataset } = useSanity().client.config()
</script>

<template>
  <main class="container mx-auto min-h-screen max-w-3xl p-8">
    <h1 class="text-4xl font-bold mb-8">Posts</h1>
    <ul class="flex flex-col gap-y-4">
      <li v-for="post in posts" :key="post._id" class="hover:underline">
        <NuxtLink :to="`/${post.slug.current}`">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
          <img v-if="post.image" :src="urlFor(post.image)?.width(200).height(200).url()">
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
