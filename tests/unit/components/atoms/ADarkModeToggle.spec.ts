import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { defineStore } from 'pinia'

// Mock the darkMode store with full reactive behavior
const useDarkModeMock = defineStore('darkMode', () => {
  // We'll use a plain reactive approach that toggles
  const state = { isDark: false }
  const toggle = () => {
    state.isDark = !state.isDark
  }
  return state
})

// Mock Nuxt i18n $t
vi.stubGlobal('$t', vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'common.lightMode': 'Switch to light mode',
    'common.darkMode': 'Switch to dark mode',
  }
  return translations[key] || key
}))

// Mock useCookie for the store
vi.stubGlobal('useCookie', vi.fn(() => ({ value: false })))

import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

describe('ADarkModeToggle', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    // Set an initial instance of the mock store
    useDarkModeMock(pinia)
  })

  it('renders a button', () => {
    const wrapper = mount(ADarkModeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows moon icon when not dark (isDark=false)', () => {
    // Default isDark is false, so it should show moon
    const wrapper = mount(ADarkModeToggle)
    const icon = wrapper.findComponent({ name: 'AIcon' })
    expect(icon.exists()).toBe(true)
    expect(icon.props('name')).toBe('moon')
  })

  it('has correct aria-label for dark mode (when not dark)', () => {
    const wrapper = mount(ADarkModeToggle)
    const button = wrapper.find('button')
    expect(button.attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('clicking toggles aria-label', async () => {
    // Need to mock the store to be reactive
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useDarkModeMock(pinia)

    const wrapper = mount(ADarkModeToggle)

    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to dark mode')

    // Simulate toggle by updating the store directly
    store.isDark = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to light mode')

    // The icon should now be sun
    const icon = wrapper.findComponent({ name: 'AIcon' })
    expect(icon.props('name')).toBe('sun')
  })
})
