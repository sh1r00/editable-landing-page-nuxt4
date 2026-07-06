import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('header is visible on all pages', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('nav')).toBeVisible()
    }
  })

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()

    // Check that at least 3 nav links exist
    const links = nav.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    const logo = page.locator('.o-header__logo')
    await expect(logo).toBeVisible()
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('footer is visible on all pages', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('footer')).toBeVisible()
    }
  })

  test('footer contains legal links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.locator('a[href="/privacy"]')).toBeVisible()
    await expect(footer.locator('a[href="/terms"]')).toBeVisible()
  })

  test('footer links navigate to correct pages', async ({ page }) => {
    await page.goto('/')

    // Privacy link in footer
    await page.locator('footer a[href="/privacy"]').click()
    await expect(page).toHaveURL('/privacy')

    // Terms link in footer
    await page.goto('/')
    await page.locator('footer a[href="/terms"]').click()
    await expect(page).toHaveURL('/terms')
  })

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeVisible()
  })
})
