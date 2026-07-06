<template>
  <div :class="{ dark: darkMode.isDark }">
    <div class="app-shell">
      <a href="#main-content" class="skip-to-content">Skip to main content</a>
      <OHeader />
      <main id="main-content" tabindex="-1">
        <slot />
      </main>
      <OFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'

const darkMode = useDarkModeStore()
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  flex: 1;
}

main:focus {
  outline: none;
}
</style>
