<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-alt px-4">
    <div class="w-full max-w-sm">
      <div class="bg-surface rounded-2xl shadow-lg border border-border/50 p-8">
        <h1 class="font-heading text-2xl font-bold text-text text-center mb-6">Admin Login</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-text mb-1">Password</label>
            <input id="password" v-model="password" type="password" required class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt" placeholder="Enter password" :disabled="loading" />
          </div>
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
          <button type="submit" :disabled="loading || !password" class="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 disabled:opacity-50">Sign In</button>
        </form>
        <div class="mt-6 pt-4 border-t text-center">
          <NuxtLink to="/" class="text-sm text-text-muted hover:text-primary">← Back to site</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })
const auth = useAuthStore()
if (auth.isAuthenticated) { await navigateTo('/admin') }
const password = ref(''); const error = ref(''); const loading = ref(false)
const handleLogin = async () => {
  error.value = ''; loading.value = true
  try {
    if (auth.login(password.value)) { await navigateTo('/admin') }
    else { error.value = 'Invalid password.' }
  } catch { error.value = 'Error. Try again.' }
  finally { loading.value = false }
}
</script>
