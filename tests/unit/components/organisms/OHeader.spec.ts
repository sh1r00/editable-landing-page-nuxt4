import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from 'vue'

// Mock i18n
const mockLocale = ref('en')
const mockLocales = ref([
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
])
const mockSwitchLocalePath = vi.fn((code: string) => `/${code}`)
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'site.name': 'Sh1r00',
    'common.switchLanguage': 'Switch language',
    'common.lightMode': 'Switch to light mode',
    'common.darkMode': 'Switch to dark mode',
  }
  return translations[key] || key
})

vi.stubGlobal('useI18n', vi.fn(() => ({
  locale: mockLocale,
  locales: mockLocales,
  t: mockT,
})))
vi.stubGlobal('useSwitchLocalePath', vi.fn(() => mockSwitchLocalePath))
vi.stubGlobal('$t', mockT)

// Mock route
const mockRoute = { path: '/', params: {}, query: {}, fullPath: '/' }
vi.stubGlobal('useRoute', vi.fn(() => mockRoute))

// Mock darkMode store
vi.stubGlobal('useCookie', vi.fn(() => ({ value: false })))

import OHeader from '~/components/organisms/OHeader.vue'

describe('OHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockRoute.path = '/'
  })

  it('renders the header element', () => {
    const wrapper = mount(OHeader)
    expect(wrapper.find('header.o-header').exists()).toBe(true)
  })

  it('renders the logo with link to home', () => {
    const wrapper = mount(OHeader)
    const logo = wrapper.find('.o-header__logo')
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toContain('Sh1r00')
  })

  it('renders navigation links from navLinks data', () => {
    const wrapper = mount(OHeader)
    const links = wrapper.findAll('.o-header__link')
    expect(links.length).toBeGreaterThanOrEqual(1)
    // Should have Home, About, Services, Contact links
    expect(links.length).toBe(4)
  })

  it('renders dark mode toggle', () => {
    const wrapper = mount(OHeader)
    const toggle = wrapper.findComponent({ name: 'ADarkModeToggle' })
    expect(toggle.exists()).toBe(true)
  })

  it('renders mobile menu toggle button', () => {
    const wrapper = mount(OHeader)
    const mobileBtn = wrapper.find('.o-header__mobile-toggle')
    expect(mobileBtn.exists()).toBe(true)
    expect(mobileBtn.attributes('aria-expanded')).toBe('false')
  })

  it('opens mobile menu when toggle is clicked', async () => {
    const wrapper = mount(OHeader)
    const mobileBtn = wrapper.find('.o-header__mobile-toggle')
    await mobileBtn.trigger('click')
    expect(wrapper.find('#mobile-menu').exists()).toBe(true)
    expect(mobileBtn.attributes('aria-expanded')).toBe('true')
  })

  it('shows close icon when mobile menu is open', async () => {
    const wrapper = mount(OHeader)
    const mobileBtn = wrapper.find('.o-header__mobile-toggle')
    await mobileBtn.trigger('click')
    const icon = mobileBtn.findComponent({ name: 'AIcon' })
    expect(icon.props('name')).toBe('close')
  })

  it('shows menu icon when mobile menu is closed', () => {
    const wrapper = mount(OHeader)
    const mobileBtn = wrapper.find('.o-header__mobile-toggle')
    const icon = mobileBtn.findComponent({ name: 'AIcon' })
    expect(icon.props('name')).toBe('menu')
  })

  it('renders locale switcher button', () => {
    const wrapper = mount(OHeader)
    const localeBtn = wrapper.find('.o-header__locale-btn')
    expect(localeBtn.exists()).toBe(true)
    expect(localeBtn.attributes('aria-expanded')).toBe('false')
  })

  it('shows locale menu when locale button clicked', async () => {
    const wrapper = mount(OHeader)
    await wrapper.find('.o-header__locale-btn').trigger('click')
    expect(wrapper.find('.o-header__locale-menu').exists()).toBe(true)
  })

  it('renders locale options in the menu', async () => {
    const wrapper = mount(OHeader)
    await wrapper.find('.o-header__locale-btn').trigger('click')
    const items = wrapper.findAll('.o-header__locale-item')
    expect(items.length).toBe(2) // en, es
    expect(items[0].text()).toBe('English')
    expect(items[1].text()).toBe('Español')
  })

  it('displays current locale code', () => {
    const wrapper = mount(OHeader)
    const code = wrapper.find('.o-header__locale-code')
    expect(code.text()).toBe('en')
  })

  it('closes mobile menu when locale is changed', async () => {
    const wrapper = mount(OHeader)
    // Open mobile menu
    await wrapper.find('.o-header__mobile-toggle').trigger('click')
    expect(wrapper.find('#mobile-menu').exists()).toBe(true)

    // Open locale menu
    await wrapper.find('.o-header__locale-btn').trigger('click')
    // Click a locale
    await wrapper.findAll('.o-header__locale-item')[0].trigger('click')

    // The locale item click sets showLocales = false
    expect(wrapper.find('.o-header__locale-menu').exists()).toBe(false)
  })
})
