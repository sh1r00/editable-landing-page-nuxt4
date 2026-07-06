<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--full': fullWidth }
    ]"
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
  ariaLabel?: string
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Poppins', system-ui, sans-serif;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.base-button--primary {
  background-color: var(--color-primary);
  color: #ffffff;
}
.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.base-button--secondary {
  background-color: var(--color-bg-alt);
  color: var(--color-on-surface);
  border-color: var(--color-border);
}
.base-button--secondary:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background-color: var(--color-surface);
}

.base-button--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.base-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: #ffffff;
}

.base-button--ghost {
  background-color: transparent;
  color: var(--color-on-surface);
  border-color: transparent;
}
.base-button--ghost:hover:not(:disabled) {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
}

/* Sizes */
.base-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.base-button--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.base-button--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.base-button--full {
  width: 100%;
}
</style>
