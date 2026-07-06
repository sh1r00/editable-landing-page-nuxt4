import { test, expect } from '@playwright/test'

test.describe('Hero Section', () => {
  test('hero section is visible on homepage', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section.hero')
    await expect(hero).toBeVisible()
  })

  test('hero heading is visible', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('#hero-heading')
    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })

  test('hero subheading is visible', async ({ page }) => {
    await page.goto('/')
    const subtitle = page.locator('.hero__subtitle')
    await expect(subtitle).toBeVisible()
  })

  test('hero CTA buttons are visible', async ({ page }) => {
    await page.goto('/')
    const ctas = page.locator('.hero__ctas')
    await expect(ctas).toBeVisible()
    const buttons = ctas.locator('button, a')
    const count = await buttons.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('hero has aria-labelledby attribute', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    await expect(hero).toBeVisible()
  })

  test('hero trust badge is visible', async ({ page }) => {
    await page.goto('/')
    const trust = page.locator('.hero__trust')
    await expect(trust).toBeVisible()
  })
})
