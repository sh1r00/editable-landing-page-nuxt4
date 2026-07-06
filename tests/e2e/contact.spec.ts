import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('contact page loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
  })

  test('contact form is visible', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form[aria-label]')
    await expect(form).toBeVisible()
  })

  test('contact form has required fields', async ({ page }) => {
    await page.goto('/contact')

    // Name field
    const nameInput = page.locator('#contact-name')
    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveAttribute('required', '')

    // Email field
    const emailInput = page.locator('#contact-email')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('required', '')
    await expect(emailInput).toHaveAttribute('type', 'email')

    // Subject field
    const subjectInput = page.locator('#contact-subject')
    await expect(subjectInput).toBeVisible()

    // Message field
    const messageInput = page.locator('#contact-message')
    await expect(messageInput).toBeVisible()
  })

  test('contact info section is visible', async ({ page }) => {
    await page.goto('/contact')
    const info = page.locator('.contact-content__info')
    await expect(info).toBeVisible()
  })

  test('contact page has map placeholder', async ({ page }) => {
    await page.goto('/contact')
    const map = page.locator('.contact-content__map')
    await expect(map).toBeVisible()
  })

  test('submitting empty form does not navigate away', async ({ page }) => {
    await page.goto('/contact')
    const submitBtn = page.locator('.contact-content__form button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await submitBtn.click()
    // Should still be on contact page (native HTML5 validation prevents submit)
    await expect(page).toHaveURL('/contact')
  })

  test('can fill and submit contact form', async ({ page }) => {
    await page.goto('/contact')

    await page.fill('#contact-name', 'Test User')
    await page.fill('#contact-email', 'test@example.com')
    await page.fill('#contact-subject', 'Test Subject')
    await page.fill('#contact-message', 'This is a test message.')

    const submitBtn = page.locator('.contact-content__form button[type="submit"]')
    await submitBtn.click()

    // Success message should appear
    await expect(page.locator('.contact-content__success')).toBeVisible()
  })

  test('contact page CTA section is visible', async ({ page }) => {
    await page.goto('/contact')
    const cta = page.locator('.cta-section')
    await expect(cta).toBeVisible()
  })
})
