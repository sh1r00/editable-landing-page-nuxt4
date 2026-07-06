import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ACard from '~/components/atoms/ACard.vue'

describe('ACard', () => {
  it('renders a div with class a-card', () => {
    const wrapper = mount(ACard)
    expect(wrapper.find('.a-card').exists()).toBe(true)
  })

  it('renders default slot content', () => {
    const wrapper = mount(ACard, {
      slots: { default: '<p>Card body content</p>' },
    })
    expect(wrapper.find('.a-card__body').text()).toBe('Card body content')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(ACard, {
      slots: {
        header: '<h3>Card Header</h3>',
        default: '<p>Body</p>',
      },
    })
    expect(wrapper.find('.a-card__header').exists()).toBe(true)
    expect(wrapper.find('.a-card__header').text()).toBe('Card Header')
  })

  it('does not render header when slot is not provided', () => {
    const wrapper = mount(ACard, {
      slots: { default: '<p>Body</p>' },
    })
    expect(wrapper.find('.a-card__header').exists()).toBe(false)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(ACard, {
      slots: {
        footer: '<button>Action</button>',
        default: '<p>Body</p>',
      },
    })
    expect(wrapper.find('.a-card__footer').exists()).toBe(true)
    expect(wrapper.find('.a-card__footer').text()).toBe('Action')
  })

  it('does not render footer when slot is not provided', () => {
    const wrapper = mount(ACard)
    expect(wrapper.find('.a-card__footer').exists()).toBe(false)
  })

  it('applies hoverable class when prop is true', () => {
    const wrapper = mount(ACard, {
      props: { hoverable: true },
    })
    expect(wrapper.find('.a-card').classes()).toContain('a-card--hover')
  })

  it('does not apply hoverable class when prop is false or unset', () => {
    const wrapper = mount(ACard)
    expect(wrapper.find('.a-card').classes()).not.toContain('a-card--hover')
  })

  it('renders all three slots together', () => {
    const wrapper = mount(ACard, {
      slots: {
        header: '<span>H</span>',
        default: '<span>B</span>',
        footer: '<span>F</span>',
      },
    })
    expect(wrapper.find('.a-card__header').text()).toBe('H')
    expect(wrapper.find('.a-card__body').text()).toBe('B')
    expect(wrapper.find('.a-card__footer').text()).toBe('F')
  })
})
