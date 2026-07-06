// POST /api/content — saves content to public/content.json
import fs from 'fs'
import path from 'path'

const CONTENT_PATH = path.resolve(process.cwd(), 'public/content.json')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid content' })
  }
  try {
    fs.mkdirSync(path.dirname(CONTENT_PATH), { recursive: true })
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return { success: true, message: 'Content saved to public/content.json' }
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to save content' })
  }
})
