import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a button element', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Click Me' },
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('applies variant class', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'outline' },
    })
    expect(wrapper.find('button').classes()).toContain('base-button--outline')
  })

  it('default variant is primary', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.find('button').classes()).toContain('base-button--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(ABaseButton, {
      props: { size: 'lg' },
    })
    expect(wrapper.find('button').classes()).toContain('base-button--lg')
  })

  it('default size is md', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.find('button').classes()).toContain('base-button--md')
  })

  it('applies fullWidth class when true', () => {
    const wrapper = mount(ABaseButton, {
      props: { fullWidth: true },
    })
    expect(wrapper.find('button').classes()).toContain('base-button--full')
  })

  it('does not have fullWidth class when false', () => {
    const wrapper = mount(ABaseButton, {
      props: { fullWidth: false },
    })
    expect(wrapper.find('button').classes()).not.toContain('base-button--full')
  })

  it('sets type attribute', () => {
    const wrapper = mount(ABaseButton, {
      props: { type: 'submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('default type is button', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(ABaseButton, {
      props: { disabled: true },
    })
    expect(wrapper.find('button').attributes('disabled')).toBe('')
  })

  it('sets aria-label', () => {
    const wrapper = mount(ABaseButton, {
      props: { ariaLabel: 'Close dialog' },
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
  })

  it('emits click event', async () => {
    const wrapper = mount(ABaseButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(ABaseButton, {
      props: { disabled: true },
    })
    await wrapper.find('button').trigger('click')
    // Native disabled buttons don't fire click events
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders all variants correctly', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const
    for (const variant of variants) {
      const wrapper = mount(ABaseButton, { props: { variant } })
      expect(wrapper.find('button').classes()).toContain(`base-button--${variant}`)
    }
  })

  it('renders all sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const wrapper = mount(ABaseButton, { props: { size } })
      expect(wrapper.find('button').classes()).toContain(`base-button--${size}`)
    }
  })
})
