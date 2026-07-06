<template>
  <ACard class="m-testimonial">
    <div class="m-testimonial__quote-icon">
      <AIcon name="quote" size="lg" />
    </div>
    <blockquote class="m-testimonial__quote">
      <p>"{{ quote }}"</p>
    </blockquote>
    <div class="m-testimonial__rating" :aria-label="`${rating} out of 5 stars`">
      <span v-for="i in 5" :key="i" class="m-testimonial__star" :class="{ 'm-testimonial__star--filled': i <= rating }" aria-hidden="true">
        ★
      </span>
    </div>
    <div class="m-testimonial__author">
      <p class="m-testimonial__name">{{ name }}</p>
      <p class="m-testimonial__role">{{ role }}</p>
    </div>
  </ACard>
</template>

<script setup lang="ts">
defineProps<{
  quote: string
  name: string
  role: string
  rating: number
}>()
</script>

<style scoped>
.m-testimonial {
  padding: 2rem;
  position: relative;
}

.m-testimonial__quote-icon {
  color: var(--color-accent);
  opacity: 0.3;
  margin-bottom: 1rem;
}

.m-testimonial__quote p {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-on-surface);
  font-style: italic;
  margin: 0 0 1rem;
}

.m-testimonial__rating {
  display: flex;
  gap: 0.125rem;
  margin-bottom: 1rem;
}

.m-testimonial__star {
  font-size: 1.25rem;
  color: var(--color-border);
}

.m-testimonial__star--filled {
  color: #f59e0b;
}

.m-testimonial__name {
  font-weight: 700;
  color: var(--color-on-surface);
  margin: 0;
}

.m-testimonial__role {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0.125rem 0 0;
}
</style>
