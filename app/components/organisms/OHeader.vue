<template>
  <header class="o-header" role="banner">
    <nav class="o-header__nav container-narrow" aria-label="Main navigation">
      <!-- Logo -->
      <NuxtLink to="/" class="o-header__logo" :aria-label="$t('site.name')">
        <span class="o-header__logo-icon">S</span>
        <span class="o-header__logo-text">Sh1r00</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <ul class="o-header__links" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="o-header__link"
            active-class="o-header__link--active"
            :aria-current="isCurrentPage(link.to) ? 'page' : undefined"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="o-header__actions">
        <!-- Locale Switcher -->
        <div class="o-header__locale">
          <button
            class="o-header__locale-btn"
            :aria-label="$t('common.switchLanguage') || 'Switch language'"
            @click="showLocales = !showLocales"
            :aria-expanded="showLocales"
            aria-haspopup="true"
          >
            <AIcon name="globe" size="sm" />
            <span class="o-header__locale-code">{{ currentLocale }}</span>
          </button>
          <div v-if="showLocales" class="o-header__locale-menu" role="menu">
            <NuxtLink
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              class="o-header__locale-item"
              :class="{ 'o-header__locale-item--active': locale.code === currentLocale }"
              role="menuitem"
              @click="showLocales = false"
            >
              {{ locale.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Dark Mode -->
        <ADarkModeToggle />

        <!-- Mobile Menu Toggle -->
        <button
          class="o-header__mobile-toggle"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          @click="mobileOpen = !mobileOpen"
        >
          <AIcon :name="mobileOpen ? 'close' : 'menu'" size="md" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <nav
      v-if="mobileOpen"
      id="mobile-menu"
      class="o-header__mobile"
      aria-label="Mobile navigation"
    >
      <ul role="list">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="o-header__mobile-link"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref, watch } from 'vue'
import { navLinks } from '~/data/content'
import AIcon from '~/components/atoms/AIcon.vue'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)
const mobileOpen = ref(false)
const showLocales = ref(false)

const isCurrentPage = (to: string) => {
  return route.path === to || (to !== '/' && route.path.startsWith(to))
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileOpen.value = false
  showLocales.value = false
})
</script>

<style scoped>
.o-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
}

.o-header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.o-header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-on-surface);
  font-weight: 700;
  font-size: 1.25rem;
}

.o-header__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  font-family: 'Poppins', system-ui, sans-serif;
  font-weight: 800;
}

.o-header__logo-text {
  font-family: 'Poppins', system-ui, sans-serif;
}

.o-header__links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

@media (min-width: 768px) {
  .o-header__links {
    display: flex;
  }
}

.o-header__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
}

.o-header__link:hover,
.o-header__link--active {
  color: var(--color-primary);
}

.o-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.o-header__locale {
  position: relative;
}

.o-header__locale-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  color: var(--color-on-surface);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: border-color 0.2s ease;
}

.o-header__locale-btn:hover {
  border-color: var(--color-primary);
}

.o-header__locale-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  min-width: 8rem;
  z-index: 60;
}

.o-header__locale-item {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--color-on-surface);
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.15s ease;
}

.o-header__locale-item:hover,
.o-header__locale-item--active {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
}

.o-header__mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  color: var(--color-on-surface);
  cursor: pointer;
}

@media (min-width: 768px) {
  .o-header__mobile-toggle {
    display: none;
  }
}

.o-header__mobile {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1rem;
}

.o-header__mobile ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.o-header__mobile-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--color-on-surface);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease;
}

.o-header__mobile-link:hover {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
}
</style>
