<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="contact-hero section" aria-labelledby="contact-heading">
      <div class="container-narrow">
        <h1 id="contact-heading">{{ $t('contact.title') }}</h1>
        <p class="contact-hero__subtitle">{{ $t('contact.subtitle') }}</p>
      </div>
    </section>

    <!-- Contact Form + Info + Map -->
    <section class="contact-content section" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow contact-content__grid">
        <!-- Form -->
        <ACard>
          <form class="contact-content__form" @submit.prevent="handleSubmit" :aria-label="$t('contact.formSubmit')">
            <MFormField
              id="contact-name"
              :label="$t('contact.formName')"
              v-model="form.name"
              required
            />
            <MFormField
              id="contact-email"
              :label="$t('contact.formEmail')"
              v-model="form.email"
              type="email"
              required
            />
            <MFormField
              id="contact-subject"
              :label="$t('contact.formSubject')"
              v-model="form.subject"
            />
            <MFormField
              id="contact-message"
              :label="$t('contact.formMessage')"
              v-model="form.message"
            />
            <ABaseButton variant="primary" type="submit" full-width>
              {{ $t('contact.formSubmit') }}
            </ABaseButton>
            <Transition name="fade">
              <p v-if="submitted" class="contact-content__success" role="status">
                {{ $t('contact.formSuccess') }}
              </p>
            </Transition>
          </form>
        </ACard>

        <!-- Info + Map -->
        <div class="contact-content__side">
          <div class="contact-content__info">
            <div class="contact-content__info-item">
              <AIcon name="mail" size="lg" />
              <div>
                <h4>Email</h4>
                <p>{{ contactData.email }}</p>
              </div>
            </div>
            <div class="contact-content__info-item">
              <AIcon name="phone" size="lg" />
              <div>
                <h4>Phone</h4>
                <p>{{ contactData.phone }}</p>
              </div>
            </div>
            <div class="contact-content__info-item">
              <AIcon name="map-pin" size="lg" />
              <div>
                <h4>Address</h4>
                <p>{{ contactData.address }}</p>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <ACard class="contact-content__map">
            <div class="contact-content__map-placeholder" aria-label="Map showing our office location">
              <AIcon name="map-pin" size="xl" />
              <p>San Francisco, CA</p>
              <span>Map placeholder — embed your own map here</span>
            </div>
          </ACard>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section" aria-labelledby="contact-cta-heading">
      <div class="container-narrow cta-section__inner">
        <h2 id="contact-cta-heading">{{ $t('cta.title') }}</h2>
        <p>{{ $t('cta.subtitle') }}</p>
        <ABaseButton variant="secondary" size="lg" @click="scrollToForm">
          {{ $t('cta.button') }}
        </ABaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/content'

const contactData = contactInfo
const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  // No API call — demo acknowledgment
  setTimeout(() => {
    submitted.value = false
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }, 5000)
}

const scrollToForm = () => {
  const el = document.getElementById('contact-name')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.contact-hero {
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 3rem;
}

.contact-hero h1 {
  color: var(--color-on-surface);
  margin-bottom: 0.75rem;
}

.contact-hero__subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 32rem;
  margin: 0 auto;
}

.contact-content__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .contact-content__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-content__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-content__success {
  text-align: center;
  color: var(--color-success);
  font-weight: 600;
  margin: 0;
  padding: 0.75rem;
  background: rgba(22, 163, 74, 0.1);
  border-radius: var(--radius-md);
}

.contact-content__side {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-content__info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-content__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-content__info-item :deep(.a-icon) {
  color: var(--color-primary);
  margin-top: 0.125rem;
}

.contact-content__info-item h4 {
  font-size: 0.9375rem;
  margin: 0 0 0.25rem;
  color: var(--color-on-surface);
}

.contact-content__info-item p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.contact-content__map {
  padding: 0;
  overflow: hidden;
  min-height: 16rem;
}

.contact-content__map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 16rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: rgba(255, 255, 255, 0.9);
  gap: 0.5rem;
  padding: 2rem;
}

.contact-content__map-placeholder :deep(.a-icon) {
  color: #ffffff;
}

.contact-content__map-placeholder p {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.contact-content__map-placeholder span {
  font-size: 0.8125rem;
  opacity: 0.7;
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
