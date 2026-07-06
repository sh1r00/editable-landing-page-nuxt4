<template>
  <footer class="o-footer" role="contentinfo">
    <div class="container-narrow">
      <div class="o-footer__grid">
        <!-- Brand -->
        <div class="o-footer__brand">
          <NuxtLink to="/" class="o-footer__logo">
            <span class="o-footer__logo-icon">S</span>
            <span class="o-footer__logo-text">Sh1r00</span>
          </NuxtLink>
          <p class="o-footer__description">{{ $t('footer.description') }}</p>
        </div>

        <!-- Services -->
        <div class="o-footer__col">
          <h4 class="o-footer__heading">{{ $t('footer.services') }}</h4>
          <ul class="o-footer__list" role="list">
            <li><NuxtLink to="/#services" class="o-footer__link">Web Development</NuxtLink></li>
            <li><NuxtLink to="/#services" class="o-footer__link">UI/UX Design</NuxtLink></li>
            <li><NuxtLink to="/#services" class="o-footer__link">SEO Optimization</NuxtLink></li>
            <li><NuxtLink to="/#services" class="o-footer__link">Mobile Apps</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="o-footer__col">
          <h4 class="o-footer__heading">{{ $t('footer.company') }}</h4>
          <ul class="o-footer__list" role="list">
            <li><NuxtLink to="/about" class="o-footer__link">{{ $t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink to="/#pricing" class="o-footer__link">{{ $t('pricing.title') }}</NuxtLink></li>
            <li><NuxtLink to="/#team" class="o-footer__link">{{ $t('team.title') }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="o-footer__link">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="o-footer__col">
          <h4 class="o-footer__heading">{{ $t('footer.legal') }}</h4>
          <ul class="o-footer__list" role="list">
            <li><NuxtLink to="/privacy" class="o-footer__link">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms" class="o-footer__link">{{ $t('footer.terms') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="o-footer__newsletter">
          <h4 class="o-footer__heading">{{ $t('cta.button') || 'Stay Updated' }}</h4>
          <form class="o-footer__form" @submit.prevent="handleSubscribe" aria-label="Newsletter subscription">
            <label for="footer-email" class="sr-only">{{ $t('footer.newsletterPlaceholder') }}</label>
            <div class="o-footer__form-row">
              <AInput
                id="footer-email"
                v-model="email"
                type="email"
                :placeholder="$t('footer.newsletterPlaceholder')"
                :aria-label="$t('footer.newsletterPlaceholder')"
                required
              />
              <ABaseButton variant="primary" size="sm" type="submit" :aria-label="$t('footer.newsletterButton')">
                {{ $t('footer.newsletterButton') }}
              </ABaseButton>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="o-footer__bottom">
        <p class="o-footer__copyright">
          &copy; {{ new Date().getFullYear() }} Sh1r00 Digital. {{ $t('footer.rights') }}
        </p>
        <p class="o-footer__credit">Designed by sh1r00</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AInput from '~/components/atoms/AInput.vue'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    // No API call — just acknowledge locally
    alert('Thank you for subscribing! (demo mode)')
    email.value = ''
  }
}
</script>

<style scoped>
.o-footer {
  background-color: #0f172a;
  color: #cbd5e1;
  padding: 4rem 0 0;
}

.dark .o-footer {
  background-color: #020617;
}

.o-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .o-footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .o-footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  }
}

.o-footer__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.o-footer__logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: #ffffff;
  font-family: 'Poppins', system-ui, sans-serif;
  font-weight: 800;
}

.o-footer__logo-text {
  font-family: 'Poppins', system-ui, sans-serif;
}

.o-footer__description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0;
}

.o-footer__heading {
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 1rem;
  color: #ffffff;
  margin: 0 0 1rem;
}

.o-footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.o-footer__link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.o-footer__link:hover {
  color: #60a5fa;
}

.o-footer__form-row {
  display: flex;
  gap: 0.5rem;
}

.o-footer__form :deep(.a-input) {
  background-color: #1e293b;
  border-color: #334155;
  color: #e2e8f0;
}

.o-footer__form :deep(.a-input)::placeholder {
  color: #64748b;
}

.o-footer__form :deep(.a-input):focus {
  border-color: #3b82f6;
}

.o-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid #1e293b;
  font-size: 0.875rem;
  color: #64748b;
}

.o-footer__copyright {
  margin: 0;
}

.o-footer__credit {
  margin: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
