import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock i18n $t
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'footer.description': 'Premium digital solutions for modern businesses.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved.',
    'footer.newsletterPlaceholder': 'Your email address',
    'footer.newsletterButton': 'Subscribe',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'pricing.title': 'Pricing',
    'team.title': 'Team',
    'cta.button': 'Stay Updated',
  }
  return translations[key] || key
})
vi.stubGlobal('$t', mockT)

import OFooter from '~/components/organisms/OFooter.vue'

describe('OFooter', () => {
  beforeEach(() => {
    // Stub window.alert
    vi.stubGlobal('alert', vi.fn())
  })

  it('renders the footer element', () => {
    const wrapper = mount(OFooter)
    expect(wrapper.find('footer.o-footer').exists()).toBe(true)
    expect(wrapper.find('footer').attributes('role')).toBe('contentinfo')
  })

  it('renders the logo and brand name', () => {
    const wrapper = mount(OFooter)
    const logo = wrapper.find('.o-footer__logo')
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toContain('Sh1r00')
  })

  it('renders the description', () => {
    const wrapper = mount(OFooter)
    const desc = wrapper.find('.o-footer__description')
    expect(desc.exists()).toBe(true)
    expect(desc.text()).toBe('Premium digital solutions for modern businesses.')
  })

  it('renders Services column', () => {
    const wrapper = mount(OFooter)
    // Should have heading "Services"
    const headings = wrapper.findAll('.o-footer__heading')
    const headingTexts = headings.map(h => h.text())
    expect(headingTexts).toContain('Services')
  })

  it('renders Company column', () => {
    const wrapper = mount(OFooter)
    const headings = wrapper.findAll('.o-footer__heading')
    const headingTexts = headings.map(h => h.text())
    expect(headingTexts).toContain('Company')
  })

  it('renders Legal column', () => {
    const wrapper = mount(OFooter)
    const headings = wrapper.findAll('.o-footer__heading')
    const headingTexts = headings.map(h => h.text())
    expect(headingTexts).toContain('Legal')
  })

  it('renders newsletter form', () => {
    const wrapper = mount(OFooter)
    const form = wrapper.find('.o-footer__form')
    expect(form.exists()).toBe(true)
    expect(form.attributes('aria-label')).toBe('Newsletter subscription')
  })

  it('renders newsletter email input', () => {
    const wrapper = mount(OFooter)
    const input = wrapper.find('#footer-email')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('email')
  })

  it('renders subscribe button', () => {
    const wrapper = mount(OFooter)
    const button = wrapper.findComponent({ name: 'ABaseButton' })
    expect(button.exists()).toBe(true)
    expect(button.props('type')).toBe('submit')
  })

  it('renders copyright with current year', () => {
    const wrapper = mount(OFooter)
    const copyright = wrapper.find('.o-footer__copyright')
    expect(copyright.exists()).toBe(true)
    const currentYear = new Date().getFullYear().toString()
    expect(copyright.text()).toContain(currentYear)
  })

  it('renders credit line', () => {
    const wrapper = mount(OFooter)
    const credit = wrapper.find('.o-footer__credit')
    expect(credit.exists()).toBe(true)
    expect(credit.text()).toBe('Designed by sh1r00')
  })

  it('renders links in footer columns', () => {
    const wrapper = mount(OFooter)
    const links = wrapper.findAll('.o-footer__link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('has NuxtLink components for navigation', () => {
    const wrapper = mount(OFooter)
    const nuxtLinks = wrapper.findAllComponents({ name: 'NuxtLink' })
    // Should have logo link + service links + company links + legal links
    expect(nuxtLinks.length).toBeGreaterThan(0)
  })
})
