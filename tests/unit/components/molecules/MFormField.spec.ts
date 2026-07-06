import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MFormField from '~/components/molecules/MFormField.vue'

describe('MFormField', () => {
  it('renders the component', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'field1' },
    })
    expect(wrapper.find('.m-form-field').exists()).toBe(true)
  })

  it('renders a label when provided', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'name', label: 'Full Name' },
    })
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toContain('Full Name')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'name' },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders required asterisk when required', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'name', label: 'Full Name', required: true },
    })
    expect(wrapper.find('.m-form-field__required').exists()).toBe(true)
    expect(wrapper.find('.m-form-field__required').text()).toBe('*')
  })

  it('renders error message when error is set', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'email', error: 'Invalid email address' },
    })
    expect(wrapper.find('.m-form-field__error').exists()).toBe(true)
    expect(wrapper.find('.m-form-field__error').text()).toBe('Invalid email address')
    expect(wrapper.find('.m-form-field__error').attributes('role')).toBe('alert')
    // Error should have the correct id
    expect(wrapper.find('.m-form-field__error').attributes('id')).toBe('email-error')
  })

  it('renders hint when hint is set and no error', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'password', hint: 'At least 8 characters' },
    })
    expect(wrapper.find('.m-form-field__hint').exists()).toBe(true)
    expect(wrapper.find('.m-form-field__hint').text()).toBe('At least 8 characters')
    expect(wrapper.find('.m-form-field__hint').attributes('id')).toBe('password-hint')
  })

  it('does not render hint when error is present', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'password', hint: 'At least 8 characters', error: 'Too short' },
    })
    // When error is present, hint should NOT show (v-if="hint && !error")
    expect(wrapper.find('.m-form-field__hint').exists()).toBe(false)
    expect(wrapper.find('.m-form-field__error').exists()).toBe(true)
  })

  it('renders AInput by default via slot', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'email', label: 'Email', modelValue: '' },
    })
    // The default slot contains AInput
    const input = wrapper.findComponent({ name: 'AInput' })
    expect(input.exists()).toBe(true)
  })

  it('passes modelValue to AInput', () => {
    const wrapper = mount(MFormField, {
      props: { id: 'email', modelValue: 'test@test.com' },
    })
    const input = wrapper.findComponent({ name: 'AInput' })
    expect(input.props('modelValue')).toBe('test@test.com')
  })
})
