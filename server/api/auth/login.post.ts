// POST /api/auth/login
const DEFAULT_PASSWORD = 'admin123'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.password) throw createError({ statusCode: 400, statusMessage: 'Password is required' })
  if (body.password === DEFAULT_PASSWORD) {
    return { success: true, token: `cp_session_${Date.now()}` }
  }
  throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
})
