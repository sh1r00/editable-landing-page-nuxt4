import { defineStore } from 'pinia'

export interface ContentSection {
  hero: { title: string; subtitle: string }
  services: { icon: string; title: string; description: string }[]
  testimonials: { name: string; role: string; quote: string; rating: number }[]
  pricing: { tier: string; price: string; features: string[]; highlighted: boolean }[]
  team: { name: string; role: string; bio: string }[]
  portfolio: { title: string; category: string; description: string }[]
}

export const useContentStore = defineStore('content', () => {
  const data = ref<ContentSection>({} as ContentSection)
  const loading = ref(false)
  const lastUpdated = ref<string | null>(null)

  const init = async () => {
    loading.value = true
    try {
      data.value = await $fetch('/api/content')
    } catch {
      // Fallback: empty state
    }
    loading.value = false
  }

  const saveAll = async (content: ContentSection) => {
    try {
      await $fetch('/api/content', { method: 'POST', body: content })
      data.value = { ...content }
      lastUpdated.value = new Date().toISOString()
      return true
    } catch {
      return false
    }
  }

  return { data, loading, lastUpdated, init, saveAll }
})
