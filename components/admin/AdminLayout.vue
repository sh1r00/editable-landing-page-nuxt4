<template>
  <div class="min-h-screen flex bg-surface-alt">
    <aside class="w-56 bg-surface border-r border-border/50 p-4 flex flex-col">
      <h2 class="font-heading text-lg font-bold text-text mb-6">CMS</h2>
      <nav class="flex-1 space-y-1">
        <NuxtLink to="/admin" class="block px-3 py-2 rounded-lg text-sm text-text hover:bg-surface-alt">Dashboard</NuxtLink>
        <NuxtLink to="/admin/content" class="block px-3 py-2 rounded-lg text-sm text-text hover:bg-surface-alt">Edit Content</NuxtLink>
        <NuxtLink to="/" class="block px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-surface-alt">View Site →</NuxtLink>
      </nav>
      <button @click="logout" class="mt-auto px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full text-left">Sign Out</button>
    </aside>
    <main class="flex-1 p-6"><slot /></main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
if (!auth.isAuthenticated) { await navigateTo('/admin/login') }
const logout = () => { auth.logout(); navigateTo('/admin/login') }
</script>
