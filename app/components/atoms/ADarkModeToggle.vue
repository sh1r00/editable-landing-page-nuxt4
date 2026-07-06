<template>
  <button
    class="dark-mode-toggle"
    :aria-label="isDark ? $t('common.lightMode') || 'Switch to light mode' : $t('common.darkMode') || 'Switch to dark mode'"
    @click="darkMode.toggle()"
  >
    <AIcon :name="isDark ? 'sun' : 'moon'" size="md" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDarkModeStore } from '~/stores/darkMode'
import AIcon from '~/components/atoms/AIcon.vue'

const darkMode = useDarkModeStore()
const isDark = computed(() => darkMode.isDark)
</script>

<style scoped>
.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  color: var(--color-on-surface);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode-toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
