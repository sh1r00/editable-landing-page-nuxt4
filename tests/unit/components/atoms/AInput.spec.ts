import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AInput from '~/components/atoms/AInput.vue'

describe('AInput', () => {
  it('renders an input element', () => {
    const wrapper = mount(AInput, {
      props: { id: 'test', modelValue: '' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('sets the id attribute', () => {
    const wrapper = mount(AInput, {
      props: { id: 'email', modelValue: '' },
    })
    expect(wrapper.find('input').attributes('id')).toBe('email')
  })

  it('sets the type attribute', () => {
    const wrapper = mount(AInput, {
      props: { id: 'email', modelValue: '', type: 'email' },
    })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('default type is text', () => {
    const wrapper = mount(AInput, {
      props: { id: 'text', modelValue: '' },
    })
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('reflects modelValue', () => {
    const wrapper = mount(AInput, {
      props: { id: 'name', modelValue: 'John' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('John')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AInput, {
      props: { id: 'name', modelValue: '' },
    })
    const input = wrapper.find('input')
    await input.setValue('Jane')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Jane'])
  })

  it('sets placeholder', () => {
    const wrapper = mount(AInput, {
      props: { id: 'search', modelValue: '', placeholder: 'Search...' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('sets required attribute', () => {
    const wrapper = mount(AInput, {
      props: { id: 'req', modelValue: '', required: true },
    })
    expect(wrapper.find('input').attributes('required')).toBe('')
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(AInput, {
      props: { id: 'dis', modelValue: '', disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  it('applies error class when error prop is set', () => {
    const wrapper = mount(AInput, {
      props: { id: 'err', modelValue: '', error: 'Invalid input' },
    })
    expect(wrapper.find('input').classes()).toContain('a-input--error')
  })

  it('sets aria-invalid when error is present', () => {
    const wrapper = mount(AInput, {
      props: { id: 'err', modelValue: '', error: 'Required field' },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('sets aria-invalid to false when no error', () => {
    const wrapper = mount(AInput, {
      props: { id: 'ok', modelValue: '' },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
  })

  it('sets aria-describedby when error is present', () => {
    const wrapper = mount(AInput, {
      props: { id: 'myfield', modelValue: '', error: 'Bad' },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('myfield-error')
  })

  it('emits blur event', async () => {
    const wrapper = mount(AInput, {
      props: { id: 'blur-test', modelValue: '' },
    })
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
    expect(wrapper.emitted('blur')?.length).toBe(1)
  })

  it('uses ariaLabel as aria-label when provided', () => {
    const wrapper = mount(AInput, {
      props: { id: 'search', modelValue: '', ariaLabel: 'Search field' },
    })
    expect(wrapper.find('input').attributes('aria-label')).toBe('Search field')
  })

  it('falls back aria-label to placeholder when no ariaLabel', () => {
    const wrapper = mount(AInput, {
      props: { id: 'search', modelValue: '', placeholder: 'Find...' },
    })
    expect(wrapper.find('input').attributes('aria-label')).toBe('Find...')
  })
})
