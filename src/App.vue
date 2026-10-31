<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPosts, isSanityConfigured, type Post } from './lib/sanity'

const posts = ref<Post[]>([])
const state = ref<'setup' | 'loading' | 'ready' | 'error'>(isSanityConfigured ? 'loading' : 'setup')

onMounted(async () => {
  if (!isSanityConfigured) return
  try {
    posts.value = await getPosts()
    state.value = 'ready'
  } catch {
    state.value = 'error'
  }
})

function formatDate(value: string | null): string {
  if (!value) return 'Bez daty'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Bez daty' : new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long' }).format(date)
}
</script>

<template>
<div class="mx-auto min-h-screen max-w-6xl px-6 sm:px-10">
  <header class="flex items-center justify-between border-b border-[#e3e7e1] py-7">
    <a href="/" class="flex items-center gap-2.5 font-semibold tracking-tight text-[#1d2421]">
      <span class="grid h-8 w-8 place-items-center rounded-lg bg-[#397a5d] text-sm font-bold text-white">S</span>
      studio<span class="text-[#8d9a90]">/</span>template
    </a>
    <span class="rounded-full border border-[#dce4db] bg-white px-3 py-1.5 text-xs font-medium text-[#637368]">Vue · Sanity</span>
  </header>
  <main>
    <section class="grid gap-12 border-b border-[#e3e7e1] py-20 sm:py-28 lg:grid-cols-[1fr_0.7fr] lg:items-end">
      <div>
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce7dd] bg-[#eff5ed] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#397a5d]">
          <span class="h-1.5 w-1.5 rounded-full bg-[#4c9b70]"></span> Gotowy na start
        </div>
        <h1 class="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-7xl">Dobre pomysły<br /><span class="text-[#5b9170]">zasługują na więcej.</span></h1>
        <p class="mt-7 max-w-lg text-base leading-7 text-[#6b786f] sm:text-lg">Twój punkt wyjścia do budowania nowoczesnych stron. Lekki frontend, wygodne zarządzanie treścią i przestrzeń na własne pomysły.</p>
        <a href="#wpisy" class="mt-9 inline-flex items-center gap-4 rounded-xl bg-[#253d30] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#397a5d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#397a5d]">Zobacz treści <span aria-hidden="true">↗</span></a>
      </div>
      <div class="rounded-3xl border border-[#dbe7db] bg-[#e7efe4] p-7 sm:p-9">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#6c8873]"><span>Twój nowy projekt</span><span>01 / 03</span></div>
        <div class="mt-16 flex items-end justify-between gap-4">
          <div><div class="text-4xl font-semibold tracking-tight text-[#31583e]">Mniej setupu.</div><div class="mt-2 text-4xl font-semibold tracking-tight text-[#7d9e84]">Więcej tworzenia.</div></div>
          <span class="hidden text-5xl text-[#8eaf93] sm:block" aria-hidden="true">✳</span>
        </div>
        <div class="mt-10 h-px bg-[#c8d9c8]"></div>
        <p class="mt-5 text-sm text-[#66816b]">Vue + TypeScript + Tailwind CSS + Sanity</p>
      </div>
    </section>
    <section id="wpisy" class="py-20">
      <div class="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div><p class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6c9a78]">Z Sanity CMS</p><h2 class="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Ostatnie wpisy</h2></div>
        <span class="text-sm text-[#8b988d]">Treść, którą zarządzasz samodzielnie</span>
      </div>
      <div v-if="state === 'setup'" class="rounded-2xl border border-dashed border-[#cbd9cc] bg-white/60 p-8 text-sm leading-6 text-[#68776b]" role="status">
        Skonfiguruj połączenie z Sanity w pliku <code class="font-semibold text-[#31583e]">.env.local</code>. Instrukcję znajdziesz w README.
      </div>
      <div v-else-if="state === 'loading'" class="rounded-2xl border border-[#e3e7e1] bg-white p-8 text-sm text-[#68776b]" role="status">Ładowanie wpisów...</div>
      <div v-else-if="state === 'error'" class="rounded-2xl border border-[#ead6d1] bg-white p-8 text-sm text-[#99594d]" role="alert">Nie udało się pobrać wpisów. Sprawdź ustawienia Sanity, dostęp do datasetu i CORS.</div>
      <div v-else-if="posts.length === 0" class="rounded-2xl border border-dashed border-[#cbd9cc] bg-white/60 p-8 text-sm leading-6 text-[#68776b]">Nie ma jeszcze wpisów. Dodaj i opublikuj pierwszy wpis w Sanity Studio.</div>
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="post in posts" :key="post._id" class="rounded-2xl border border-[#e3e7e1] bg-white p-6">
          <p class="text-xs font-medium text-[#83a18a]">{{ formatDate(post.publishedAt) }}</p>
          <h3 class="mt-5 text-xl font-semibold tracking-tight">{{ post.title }}</h3>
          <p v-if="post.excerpt" class="mt-3 text-sm leading-6 text-[#758077]">{{ post.excerpt }}</p>
        </article>
      </div>
    </section>
  </main>
  <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e7e1] py-7 text-xs text-[#849087]">
    <span>Studio Template · Zbuduj coś swojego.</span><span>Vue / TypeScript / Sanity</span>
  </footer>
</div>
</template>
