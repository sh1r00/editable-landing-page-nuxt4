<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :aria-label="ariaLabel || placeholder"
    :aria-invalid="!!error"
    :aria-describedby="error ? `${id}-error` : undefined"
    class="a-input"
    :class="{ 'a-input--error': error }"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  modelValue: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  ariaLabel?: string
}>(), {
  type: 'text',
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()
</script>

<style scoped>
.a-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  color: var(--color-on-surface);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.a-input::placeholder {
  color: var(--color-text-secondary);
}

.a-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.15);
}

.a-input--error {
  border-color: var(--color-error);
}

.a-input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.a-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
