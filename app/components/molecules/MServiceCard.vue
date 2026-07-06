<template>
  <ACard hoverable class="m-service-card">
    <template #header>
      <div class="m-service-card__icon">
        <AIcon :name="icon" size="xl" />
      </div>
    </template>
    <h3 class="m-service-card__title">{{ title }}</h3>
    <p class="m-service-card__description">{{ description }}</p>
  </ACard>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<style scoped>
.m-service-card {
  text-align: center;
  padding: 2rem;
}

.m-service-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: #ffffff;
}

.m-service-card__title {
  font-size: 1.25rem;
  margin: 0.75rem 0 0.5rem;
  color: var(--color-on-surface);
}

.m-service-card__description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
