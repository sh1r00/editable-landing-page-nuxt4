# Sh1r00 Digital — Agency Landing
*shiro — where style meets function*

**Category: Landing Page Template**  
**Live:** [https://landing-page-sh1r00-946.netlify.app](https://landing-page-sh1r00-946.netlify.app)  
**GitHub:** [editable-landing-page-nuxt4](https://github.com/sh1r00/editable-landing-page-nuxt4)  

## About This Project

Full-featured agency landing page. Hero, services, pricing, team, testimonials, portfolio gallery, contact form.

**Tech:** 
Nuxt 4, Vue 3, Tailwind CSS, Dark Mode, PWA, M3 Design, i18n

[![shiro](https://img.shields.io/badge/shiro-where_style_meets_function-6C5CE7)](https://shiro-portfolio-sh1r00.netlify.app)

## Deployment

```bash
npx nuxi generate
```bash
Deploy .output/public to Netlify via API zip upload.
```

## Quick Start (Local Development)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run generate
   ```

4. Preview production build:
   ```bash
   npx serve .output/public
   ```

## Notes

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

---

*Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
