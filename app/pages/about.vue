<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="about-hero section" aria-labelledby="about-heading">
      <div class="container-narrow">
        <h1 id="about-heading">{{ t('about.title') }}</h1>
        <p class="about-hero__subtitle">{{ t('about.subtitle') }}</p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="about-mv section" aria-labelledby="mv-heading" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow about-mv__grid">
        <ACard hoverable>
          <div class="about-mv__icon">
            <AIcon name="brand" size="xl" />
          </div>
          <h3 id="mv-heading">{{ t('about.mission') }}</h3>
          <p>{{ t('about.missionText') }}</p>
        </ACard>
        <ACard hoverable>
          <div class="about-mv__icon">
            <AIcon name="search" size="xl" />
          </div>
          <h3>{{ t('about.vision') }}</h3>
          <p>{{ t('about.visionText') }}</p>
        </ACard>
      </div>
    </section>

    <!-- Values -->
    <section class="about-values section" aria-labelledby="values-heading">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="values-heading">{{ t('about.values') }}</h2>
        </div>
        <div class="about-values__grid">
          <ACard v-for="value in valuesList" :key="value.title" hoverable class="about-values__card">
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </ACard>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="about-stats" aria-labelledby="stats-heading" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow about-stats__grid">
        <div v-for="stat in statsList" :key="stat.label" class="about-stats__item">
          <span class="about-stats__value">{{ stat.value }}</span>
          <span class="about-stats__label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section" aria-labelledby="about-cta-heading">
      <div class="container-narrow cta-section__inner">
        <h2 id="about-cta-heading">{{ t('cta.title') }}</h2>
        <p>{{ t('cta.subtitle') }}</p>
        <ABaseButton variant="secondary" size="lg" @click="navigateTo('/contact')">
          {{ t('cta.button') }}
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { aboutValues, aboutStats } from '~/data/content'

const { t } = useI18n()

const valuesList = computed(() => {
  const raw = t('about.valuesList', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw : aboutValues
})

const statsList = computed(() => {
  const raw = t('about.stats', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw : aboutStats
})
</script>

<style scoped>
.about-hero {
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.about-hero h1 {
  margin-bottom: 1rem;
  color: var(--color-on-surface);
}

.about-hero__subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 36rem;
  margin: 0 auto;
  line-height: 1.7;
}

.section-header {
  text-align: center;
  max-width: 36rem;
  margin: 0 auto 3rem;
}

.section-header h2 {
  color: var(--color-on-surface);
}

.about-mv__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .about-mv__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.about-mv__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  margin-bottom: 1rem;
}

.about-mv h3 {
  color: var(--color-on-surface);
  margin: 0 0 0.5rem;
}

.about-mv p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.about-values__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .about-values__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.about-values__card {
  text-align: center;
  padding: 2rem;
}

.about-values__card h3 {
  color: var(--color-on-surface);
  margin: 0 0 0.5rem;
}

.about-values__card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.about-stats {
  padding: 3rem 0;
}

.about-stats__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .about-stats__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.about-stats__item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.about-stats__value {
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
}

.about-stats__label {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.cta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
}

.cta-section__inner {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

@media (min-width: 768px) {
  .cta-section__inner {
    padding: 5rem 2rem;
  }
}

.cta-section h2 { color: #ffffff; margin: 0; }
.cta-section p { font-size: 1.125rem; margin: 0; opacity: 0.9; max-width: 36rem; }
.cta-section :deep(.base-button--secondary) { background-color: #ffffff; color: var(--color-primary); border-color: #ffffff; }
.cta-section :deep(.base-button--secondary):hover { background-color: #f8fafc; }
</style>
