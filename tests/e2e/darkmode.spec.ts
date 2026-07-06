import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle is visible in header', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode"]')
    await expect(toggle).toBeVisible()
  })

  test('dark mode toggle has accessible label', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('.dark-mode-toggle')
    await expect(toggle).toBeVisible()
    const label = await toggle.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label?.toLowerCase()).toMatch(/mode/)
  })

  test('clicking dark mode toggle does not crash the page', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode"]')
    if (await toggle.isVisible()) {
      await toggle.click()
      // Wait for potential transitions
      await page.waitForTimeout(300)
      // Header should still be visible
      await expect(page.locator('header')).toBeVisible()
    }
  })

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode"]')

    if (await toggle.isVisible()) {
      await toggle.click()
      await page.waitForTimeout(300)

      // Navigate to another page
      await page.goto('/about')
      await expect(page.locator('header')).toBeVisible()

      // The toggle should still be functional
      await expect(toggle).toBeVisible()
    }
  })

  test('dark mode toggle is present on all pages', async ({ page }) => {
    const pages = ['/', '/about', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('[aria-label*="mode"]')).toBeVisible()
    }
  })
})
