import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '~/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders a span with role=img', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'code' },
    })
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.attributes('role')).toBe('img')
  })

  it('renders SVG for code icon', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'code' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders fallback circle SVG for unknown icon name', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'unknown-icon' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('circle').exists()).toBe(true)
  })

  it('sets aria-hidden=true when no ariaLabel', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'sun' },
    })
    expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
  })

  it('does not set aria-hidden when ariaLabel provided', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'sun', ariaLabel: 'Bright sun' },
    })
    expect(wrapper.find('span').attributes('aria-hidden')).toBeUndefined()
    expect(wrapper.find('span').attributes('aria-label')).toBe('Bright sun')
  })

  it('applies size class', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'moon', size: 'lg' },
    })
    expect(wrapper.find('span').classes()).toContain('a-icon--lg')
  })

  it('default size is md', () => {
    const wrapper = mount(AIcon, {
      props: { name: 'moon' },
    })
    expect(wrapper.find('span').classes()).toContain('a-icon--md')
  })

  // Test each known icon
  const iconNames = [
    'code', 'design', 'search', 'mobile', 'brand', 'cloud',
    'sun', 'moon', 'menu', 'close', 'chevron-left', 'chevron-right',
    'mail', 'phone', 'map-pin', 'check', 'quote', 'arrow-right',
    'globe', 'shield',
  ]

  for (const name of iconNames) {
    it(`renders ${name} icon correctly`, () => {
      const wrapper = mount(AIcon, {
        props: { name },
      })
      expect(wrapper.find('svg').exists()).toBe(true)
    })
  }

  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const wrapper = mount(AIcon, {
        props: { name: 'star', size },
      })
      expect(wrapper.find('span').classes()).toContain(`a-icon--${size}`)
    }
  })
})
