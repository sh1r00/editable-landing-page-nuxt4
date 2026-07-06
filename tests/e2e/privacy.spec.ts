import { test, expect } from '@playwright/test'

test.describe('Privacy Page', () => {
  test('privacy page loads successfully', async ({ page }) => {
    const response = await page.goto('/privacy')
    expect(response?.status()).toBeLessThan(400)
  })

  test('privacy page has a heading', async ({ page }) => {
    await page.goto('/privacy')
    const heading = page.locator('.legal-page h1')
    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })

  test('privacy page has last updated date', async ({ page }) => {
    await page.goto('/privacy')
    const date = page.locator('.legal-date')
    await expect(date).toBeVisible()
    await expect(date).toContainText('Last updated')
  })

  test('privacy page has content sections', async ({ page }) => {
    await page.goto('/privacy')
    const sections = page.locator('.legal-content__inner h2')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('privacy page header and footer are visible', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('privacy page sections have meaningful content', async ({ page }) => {
    await page.goto('/privacy')
    const paragraphs = page.locator('.legal-content__inner p')
    const count = await paragraphs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('privacy page has contact email', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('.legal-content__inner')).toContainText('hello@sh1r00.com')
  })
})
