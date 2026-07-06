<template>
  <div class="m-form-field">
    <label v-if="label" :for="id" class="m-form-field__label">
      {{ label }}
      <span v-if="required" class="m-form-field__required" aria-hidden="true">*</span>
    </label>
    <slot>
      <AInput
        :id="id"
        :model-value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :error="error"
        :aria-label="ariaLabel"
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur', $event)"
      />
    </slot>
    <p v-if="error" :id="`${id}-error`" class="m-form-field__error" role="alert">
      {{ error }}
    </p>
    <p v-if="hint && !error" :id="`${id}-hint`" class="m-form-field__hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import AInput from '~/components/atoms/AInput.vue'

defineProps<{
  id: string
  label?: string
  modelValue?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  ariaLabel?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()
</script>

<style scoped>
.m-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.m-form-field__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-on-surface);
}

.m-form-field__required {
  color: var(--color-error);
  margin-left: 0.125rem;
}

.m-form-field__error {
  font-size: 0.8125rem;
  color: var(--color-error);
  margin: 0;
}

.m-form-field__hint {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
