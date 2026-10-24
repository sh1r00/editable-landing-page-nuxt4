<template>
  <div class="landing-page">
    <!-- ===== HERO SECTION ===== -->
    <section class="hero section relative" aria-labelledby="hero-heading" style="background-image: url('/images/buildings-canada.jpg'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50 dark:from-primary-950/90 dark:via-primary-950/70 dark:to-primary-950/50" aria-hidden="true" />
      <div class="container-narrow hero__grid relative">
        <div class="hero__content">
          <h1 id="hero-heading" class="hero__title">{{ t('hero.title') }}</h1>
          <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
          <div class="hero__ctas">
            <ABaseButton variant="primary" size="lg" @click="scrollToContact">
              {{ t('hero.cta') }}
            </ABaseButton>
            <ABaseButton variant="outline" size="lg" @click="scrollTo('portfolio')">
              {{ t('hero.secondaryCta') }}
            </ABaseButton>
          </div>
          <div class="hero__trust">
            <div class="hero__trust-item">
              <AIcon name="shield" size="sm" />
              <span>Trusted by 200+ businesses</span>
            </div>
          </div>
        </div>
        <div class="hero__form-wrapper">
          <ACard>
            <form class="hero__form" @submit.prevent="handleHeroForm" :aria-label="t('hero.formSubmit')">
              <h3 class="hero__form-title">Get a Free Consultation</h3>
              <MFormField
                id="hero-name"
                :label="t('hero.formName')"
                v-model="heroForm.name"
                :placeholder="t('hero.formPlaceholderName')"
                required
              />
              <MFormField
                id="hero-email"
                :label="t('hero.formEmail')"
                v-model="heroForm.email"
                type="email"
                :placeholder="t('hero.formPlaceholderEmail')"
                required
              />
              <MFormField
                id="hero-message"
                :label="t('hero.formMessage')"
                v-model="heroForm.message"
                :placeholder="t('hero.formPlaceholderMessage')"
              />
              <ABaseButton variant="primary" type="submit" full-width>
                {{ t('hero.formSubmit') }}
                <AIcon name="arrow-right" size="sm" />
              </ABaseButton>
            </form>
          </ACard>
        </div>
      </div>
    </section>

    <!-- ===== SERVICES SECTION ===== -->
    <section id="services" class="services section" aria-labelledby="services-heading" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="services-heading">{{ t('services.title') }}</h2>
          <p class="section-subtitle">{{ t('services.subtitle') }}</p>
        </div>
        <div class="services__grid">
          <MServiceCard
            v-for="service in servicesList"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
          />
        </div>
      </div>
    </section>

    <!-- ===== PORTFOLIO SECTION ===== -->
    <section id="portfolio" class="portfolio section" aria-labelledby="portfolio-heading">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="portfolio-heading">{{ t('portfolio.title') }}</h2>
          <p class="section-subtitle">{{ t('portfolio.subtitle') }}</p>
        </div>
        <div class="portfolio__grid">
          <ACard v-for="item in portfolioList" :key="item.title" hoverable class="portfolio__card">
            <div class="portfolio__card-placeholder" aria-hidden="true">
              <AIcon :name="getPortfolioIcon(item.category)" size="xl" />
            </div>
            <span class="portfolio__card-category">{{ item.category }}</span>
            <h3 class="portfolio__card-title">{{ item.title }}</h3>
            <p class="portfolio__card-desc">{{ item.description }}</p>
          </ACard>
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS SECTION ===== -->
    <section id="testimonials" class="testimonials section" aria-labelledby="testimonials-heading" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="testimonials-heading">{{ t('testimonials.title') }}</h2>
          <p class="section-subtitle">{{ t('testimonials.subtitle') }}</p>
        </div>
        <div class="testimonials__carousel" role="region" aria-label="Testimonials" aria-roledescription="carousel">
          <button
            class="testimonials__arrow"
            aria-label="Previous testimonial"
            @click="prevTestimonial"
          >
            <AIcon name="chevron-left" size="md" />
          </button>
          <div class="testimonials__track">
            <Transition name="fade" mode="out-in">
              <MTestimonial
                :key="activeTestimonial"
                v-bind="testimonialsList[activeTestimonial]"
              />
            </Transition>
          </div>
          <button
            class="testimonials__arrow"
            aria-label="Next testimonial"
            @click="nextTestimonial"
          >
            <AIcon name="chevron-right" size="md" />
          </button>
        </div>
        <div class="testimonials__dots" role="tablist" :aria-label="'Testimonial ' + (activeTestimonial + 1) + ' of ' + testimonialsList.length">
          <button
            v-for="(_, i) in testimonialsList"
            :key="i"
            class="testimonials__dot"
            :class="{ 'testimonials__dot--active': i === activeTestimonial }"
            :aria-label="'Go to testimonial ' + (i + 1)"
            :aria-selected="i === activeTestimonial"
            role="tab"
            @click="activeTestimonial = i"
          />
        </div>
      </div>
    </section>

    <!-- ===== PRICING SECTION ===== -->
    <section id="pricing" class="pricing section" aria-labelledby="pricing-heading">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="pricing-heading">{{ t('pricing.title') }}</h2>
          <p class="section-subtitle">{{ t('pricing.subtitle') }}</p>
        </div>
        <div class="pricing__grid">
          <ACard
            v-for="tier in pricingList"
            :key="tier.name"
            class="pricing__card"
            :class="{ 'pricing__card--highlighted': tier.highlighted }"
          >
            <div v-if="tier.highlighted" class="pricing__badge">Popular</div>
            <h3 class="pricing__name">{{ tier.name }}</h3>
            <div class="pricing__price">
              <span class="pricing__amount">{{ tier.price }}</span>
              <span class="pricing__period">{{ tier.period }}</span>
            </div>
            <p class="pricing__desc">{{ tier.description }}</p>
            <ul class="pricing__features" role="list">
              <li v-for="feature in tier.features" :key="feature" class="pricing__feature">
                <AIcon name="check" size="sm" />
                <span>{{ feature }}</span>
              </li>
            </ul>
            <ABaseButton
              :variant="tier.highlighted ? 'primary' : 'outline'"
              full-width
              @click="scrollToContact"
            >
              {{ t('pricing.cta') }}
            </ABaseButton>
          </ACard>
        </div>
      </div>
    </section>

    <!-- ===== TEAM SECTION ===== -->
    <section id="team" class="team section" aria-labelledby="team-heading" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="team-heading">{{ t('team.title') }}</h2>
          <p class="section-subtitle">{{ t('team.subtitle') }}</p>
        </div>
        <div class="team__grid">
          <MTeamMember
            v-for="member in teamMembersList"
            :key="member.name"
            :name="member.name"
            :role="member.role"
            :bio="member.bio"
          />
        </div>
      </div>
    </section>

    <!-- ===== QUICK CONTACT SECTION ===== -->
    <section id="contact" class="quick-contact section" aria-labelledby="contact-heading">
      <div class="container-narrow">
        <div class="section-header">
          <h2 id="contact-heading">{{ t('contact.title') }}</h2>
          <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
        </div>
        <div class="quick-contact__grid">
          <div class="quick-contact__info">
            <div class="quick-contact__info-item">
              <AIcon name="mail" size="lg" />
              <div>
                <h4>Email</h4>
                <p>{{ contactInfoData.email }}</p>
              </div>
            </div>
            <div class="quick-contact__info-item">
              <AIcon name="phone" size="lg" />
              <div>
                <h4>Phone</h4>
                <p>{{ contactInfoData.phone }}</p>
              </div>
            </div>
            <div class="quick-contact__info-item">
              <AIcon name="map-pin" size="lg" />
              <div>
                <h4>Address</h4>
                <p>{{ contactInfoData.address }}</p>
              </div>
            </div>
          </div>
          <ACard>
            <form class="quick-contact__form" @submit.prevent="handleContactForm" :aria-label="t('contact.formSubmit')">
              <MFormField
                id="qc-name"
                :label="t('contact.formName')"
                v-model="contactForm.name"
                required
              />
              <MFormField
                id="qc-email"
                :label="t('contact.formEmail')"
                v-model="contactForm.email"
                type="email"
                required
              />
              <MFormField
                id="qc-message"
                :label="t('contact.formMessage')"
                v-model="contactForm.message"
              />
              <ABaseButton variant="primary" type="submit" full-width>
                {{ t('contact.formSubmit') }}
              </ABaseButton>
            </form>
          </ACard>
        </div>
      </div>
    </section>

    <!-- ===== CTA SECTION ===== -->
    <section class="cta-section" aria-labelledby="cta-heading">
      <div class="container-narrow cta-section__inner">
        <h2 id="cta-heading">{{ t('cta.title') }}</h2>
        <p>{{ t('cta.subtitle') }}</p>
        <ABaseButton variant="secondary" size="lg" @click="scrollToContact">
          {{ t('cta.button') }}
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { services, portfolio, testimonials, pricingTiers, teamMembers, contactInfo } from '~/data/content'

// i18n-computed service/portfolio lists using the JSON locale data
const { t } = useI18n()

const servicesList = computed(() => {
  const raw = t('services.items', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw.map((s: any) => ({
    icon: s.icon,
    title: s.title,
    description: s.description,
  })) : services
})

const portfolioList = computed(() => {
  const raw = t('portfolio.items', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw : portfolio
})

const testimonialsList = computed(() => {
  const raw = t('testimonials.items', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw : testimonials
})

const pricingList = computed(() => {
  const raw = t('pricing.tiers', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw.map((p: any) => ({
    ...p,
    price: p.price || '$999',
    period: p.period || '/project',
    description: p.description || '',
    features: Array.isArray(p.features) ? p.features : [],
  })) : pricingTiers
})

const teamMembersList = computed(() => {
  const raw = t('team.members', { locale: useI18n().locale.value }) as unknown as any[]
  return Array.isArray(raw) ? raw : teamMembers
})

const contactInfoData = contactInfo

const heroForm = reactive({ name: '', email: '', message: '' })
const contactForm = reactive({ name: '', email: '', message: '' })

const handleHeroForm = () => {
  alert('Thank you! We will get back to you within 24 hours. (demo mode)')
  heroForm.name = ''
  heroForm.email = ''
  heroForm.message = ''
}

const handleContactForm = () => {
  alert('Thank you! We will get back to you within 24 hours. (demo mode)')
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  scrollTo('contact')
}

// Testimonials carousel
const activeTestimonial = ref(0)
const prevTestimonial = () => {
  activeTestimonial.value = activeTestimonial.value === 0
    ? testimonialsList.value.length - 1
    : activeTestimonial.value - 1
}
const nextTestimonial = () => {
  activeTestimonial.value = activeTestimonial.value === testimonialsList.value.length - 1
    ? 0
    : activeTestimonial.value + 1
}

// Auto-rotate
let carouselTimer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  carouselTimer = setInterval(nextTestimonial, 5000)
})
onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
})

const getPortfolioIcon = (category: string): string => {
  const map: Record<string, string> = {
    'Web Development': 'code',
    'Mobile Apps': 'mobile',
    'UI/UX Design': 'design',
    'Brand Strategy': 'brand',
    'Cloud Solutions': 'cloud',
  }
  return map[category] || 'code'
}
</script>

<style scoped>
/* ===== Section Headers ===== */
.section-header {
  text-align: center;
  max-width: 36rem;
  margin: 0 auto 3rem;
}

.section-header h2 {
  color: var(--color-on-surface);
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ===== Hero ===== */
.hero {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero__title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-on-surface);
  margin: 0 0 1.25rem;
}

.hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0 0 2rem;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.hero__trust {
  display: flex;
  gap: 1rem;
}

.hero__trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.hero__form-title {
  font-size: 1.25rem;
  margin: 0 0 1.25rem;
  text-align: center;
  color: var(--color-on-surface);
}

.hero__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ===== Services Grid ===== */
.services__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ===== Portfolio ===== */
.portfolio__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .portfolio__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .portfolio__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.portfolio__card {
  text-align: center;
  padding: 2rem;
}

.portfolio__card-placeholder {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
}

.portfolio__card-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.portfolio__card-title {
  font-size: 1.125rem;
  margin: 0 0 0.5rem;
  color: var(--color-on-surface);
}

.portfolio__card-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ===== Testimonials ===== */
.testimonials__carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 48rem;
  margin: 0 auto;
}

.testimonials__track {
  flex: 1;
  min-height: 14rem;
}

.testimonials__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-on-surface);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.testimonials__arrow:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.testimonials__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.testimonials__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  border: none;
  background: var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 0;
}

.testimonials__dot--active {
  background: var(--color-primary);
}

/* ===== Pricing ===== */
.pricing__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .pricing__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .pricing__card--highlighted {
    transform: scale(1.05);
  }
}

.pricing__card {
  position: relative;
  padding: 2rem;
  text-align: center;
}

.pricing__card--highlighted {
  border: 2px solid var(--color-primary);
}

.pricing__badge {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: #ffffff;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pricing__name {
  font-size: 1.25rem;
  color: var(--color-on-surface);
  margin: 0 0 0.75rem;
}

.pricing__price {
  margin-bottom: 0.75rem;
}

.pricing__amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  font-family: 'Poppins', system-ui, sans-serif;
}

.pricing__period {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

.pricing__desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 1.5rem;
}

.pricing__features {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-on-surface);
}

.pricing__feature :deep(.a-icon) {
  color: var(--color-success);
}

/* ===== Team ===== */
.team__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .team__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .team__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ===== Quick Contact ===== */
.quick-contact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .quick-contact__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.quick-contact__info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quick-contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.quick-contact__info-item :deep(.a-icon) {
  color: var(--color-primary);
  margin-top: 0.125rem;
}

.quick-contact__info-item h4 {
  font-size: 0.9375rem;
  margin: 0 0 0.25rem;
  color: var(--color-on-surface);
}

.quick-contact__info-item p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.quick-contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ===== CTA Section ===== */
.cta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
  text-align: center;
}

.cta-section__inner {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .cta-section__inner {
    padding: 5rem 2rem;
  }
}

.cta-section h2 {
  color: #ffffff;
  margin: 0;
}

.cta-section p {
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
  max-width: 36rem;
}

.cta-section :deep(.base-button--secondary) {
  background-color: #ffffff;
  color: var(--color-primary);
  border-color: #ffffff;
}

.cta-section :deep(.base-button--secondary):hover {
  background-color: #f8fafc;
  color: var(--color-primary);
}
</style>
