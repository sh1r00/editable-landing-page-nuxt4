<template>
  <ACard hoverable class="m-team-member">
    <div class="m-team-member__avatar" :aria-label="`${name}, ${role}`">
      <span class="m-team-member__initials">{{ initials }}</span>
    </div>
    <h3 class="m-team-member__name">{{ name }}</h3>
    <p class="m-team-member__role">{{ role }}</p>
    <p class="m-team-member__bio">{{ bio }}</p>
  </ACard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  role: string
  bio: string
}>()

const initials = computed(() =>
  props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
)
</script>

<style scoped>
.m-team-member {
  text-align: center;
  padding: 2rem;
}

.m-team-member__avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-family: 'Poppins', system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

.m-team-member__name {
  font-size: 1.125rem;
  margin: 0 0 0.25rem;
  color: var(--color-on-surface);
}

.m-team-member__role {
  font-size: 0.875rem;
  color: var(--color-primary);
  font-weight: 600;
  margin: 0 0 0.75rem;
}

.m-team-member__bio {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
