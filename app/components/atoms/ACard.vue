<template>
  <div class="a-card" :class="{ 'a-card--hover': hoverable }">
    <div v-if="$slots.header" class="a-card__header">
      <slot name="header" />
    </div>
    <div class="a-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="a-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hoverable?: boolean
}>()
</script>

<style scoped>
.a-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.a-card--hover:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.a-card__header {
  margin-bottom: 1rem;
}

.a-card__body {
  color: var(--color-on-surface);
}

.a-card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
</style>
