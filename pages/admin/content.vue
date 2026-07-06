<template>
  <AdminLayout>
    <h1 class="font-heading text-2xl font-bold text-text mb-6">Edit Content</h1>

    <!-- Hero -->
    <section class="bg-surface rounded-xl border p-6 mb-6">
      <h2 class="font-heading text-lg font-semibold mb-3">Hero Section</h2>
      <div class="grid gap-3">
        <div><label class="text-sm font-medium">Title</label><input v-model="form.hero.title" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        <div><label class="text-sm font-medium">Subtitle</label><input v-model="form.hero.subtitle" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
      </div>
    </section>

    <!-- Services -->
    <section class="bg-surface rounded-xl border p-6 mb-6">
      <h2 class="font-heading text-lg font-semibold mb-3">Services ({{ form.services.length }})</h2>
      <div v-for="(s, i) in form.services" :key="i" class="grid gap-3 mb-4 p-4 border rounded-lg">
        <div class="flex gap-3">
          <div class="flex-1"><label class="text-sm font-medium">Icon</label><input v-model="s.icon" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
          <div class="flex-1"><label class="text-sm font-medium">Title</label><input v-model="s.title" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        </div>
        <div><label class="text-sm font-medium">Description</label><input v-model="s.description" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        <button @click="removeService(i)" class="text-red-500 text-sm hover:underline self-start">Remove</button>
      </div>
      <button @click="addService" class="px-4 py-2 rounded-lg border text-sm hover:bg-surface-alt">+ Add Service</button>
    </section>

    <!-- Testimonials -->
    <section class="bg-surface rounded-xl border p-6 mb-6">
      <h2 class="font-heading text-lg font-semibold mb-3">Testimonials ({{ form.testimonials.length }})</h2>
      <div v-for="(t, i) in form.testimonials" :key="i" class="grid gap-3 mb-4 p-4 border rounded-lg">
        <div class="flex gap-3">
          <div class="flex-1"><label class="text-sm font-medium">Name</label><input v-model="t.name" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
          <div class="flex-1"><label class="text-sm font-medium">Role</label><input v-model="t.role" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        </div>
        <div><label class="text-sm font-medium">Quote</label><textarea v-model="t.quote" rows="2" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        <button @click="removeTestimonial(i)" class="text-red-500 text-sm">Remove</button>
      </div>
      <button @click="addTestimonial" class="px-4 py-2 rounded-lg border text-sm">+ Add Testimonial</button>
    </section>

    <!-- Pricing -->
    <section class="bg-surface rounded-xl border p-6 mb-6">
      <h2 class="font-heading text-lg font-semibold mb-3">Pricing ({{ form.pricing.length }})</h2>
      <div v-for="(p, i) in form.pricing" :key="i" class="grid gap-3 mb-4 p-4 border rounded-lg">
        <div class="flex gap-3">
          <div class="flex-1"><label class="text-sm font-medium">Tier</label><input v-model="p.tier" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
          <div class="flex-1"><label class="text-sm font-medium">Price</label><input v-model="p.price" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        </div>
        <div><label class="text-sm font-medium">Features (comma-separated)</label><input v-model="p.featuresStr" @change="p.features = p.featuresStr.split(',').map((f: string) => f.trim())" class="w-full px-3 py-2 rounded-lg border mt-1" /></div>
        <label class="flex items-center gap-2"><input type="checkbox" v-model="p.highlighted" /> Highlighted</label>
      </div>
    </section>

    <div class="flex gap-3 mt-8">
      <button @click="save" class="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90">Save All Changes</button>
      <button @click="resetForm" class="px-6 py-2.5 rounded-lg border text-sm hover:bg-surface-alt">Reset</button>
    </div>
    <p v-if="saved" class="text-green-600 text-sm mt-2">✅ Saved successfully!</p>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useContentStore } from '~/stores/content'
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })
const auth = useAuthStore(); if (!auth.isAuthenticated) { await navigateTo('/admin/login') }
const store = useContentStore()
const saved = ref(false)

const form = reactive(JSON.parse(JSON.stringify(store.data)))

const addService = () => form.services.push({ icon: 'star', title: '', description: '' })
const removeService = (i: number) => form.services.splice(i, 1)
const addTestimonial = () => form.testimonials.push({ name: '', role: '', quote: '', rating: 5 })
const removeTestimonial = (i: number) => form.testimonials.splice(i, 1)

// Ensure features are always strings for the input binding
if (form.pricing) form.pricing.forEach((p: any) => { if (Array.isArray(p.features)) p.featuresStr = p.features.join(', ') })

const save = async () => {
  const pricing = form.pricing.map((p: any) => { const { featuresStr, ...rest } = p; return { ...rest, features: p.featuresStr ? p.featuresStr.split(',').map((f: string) => f.trim()) : [] } })
  const content = { hero: form.hero, services: form.services, testimonials: form.testimonials, pricing, team: form.team, portfolio: form.portfolio } as any
  const ok = await store.saveAll(content)
  saved.value = ok
  if (ok) setTimeout(() => saved.value = false, 3000)
}

const resetForm = () => { Object.assign(form, JSON.parse(JSON.stringify(store.data))); saved.value = false }
</script>
