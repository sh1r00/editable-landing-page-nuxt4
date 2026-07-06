<template>
  <AdminLayout>
    <h1 class="font-heading text-2xl font-bold text-text mb-6">Dashboard</h1>
    <div class="grid sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-surface rounded-xl border p-5"><span class="text-sm text-text-muted">Services</span><p class="text-3xl font-bold">{{ content.data.services.length }}</p></div>
      <div class="bg-surface rounded-xl border p-5"><span class="text-sm text-text-muted">Testimonials</span><p class="text-3xl font-bold">{{ content.data.testimonials.length }}</p></div>
      <div class="bg-surface rounded-xl border p-5"><span class="text-sm text-text-muted">Last Updated</span><p class="text-lg font-semibold">{{ content.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString() : 'Never' }}</p></div>
    </div>
    <div class="bg-surface rounded-xl border p-6">
      <h2 class="font-heading text-lg font-semibold mb-4">Quick Actions</h2>
      <div class="flex gap-3">
        <NuxtLink to="/admin/content" class="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90">Edit Content</NuxtLink>
        <NuxtLink to="/" target="_blank" class="px-5 py-2.5 rounded-lg border text-sm text-text-muted hover:bg-surface-alt">View Site →</NuxtLink>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useContentStore } from '~/stores/content'
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })
const auth = useAuthStore(); if (!auth.isAuthenticated) { await navigateTo('/admin/login') }
const content = useContentStore()
</script>
