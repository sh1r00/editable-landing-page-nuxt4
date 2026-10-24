<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="legal-page">
    <section class="legal-hero section">
      <div class="container-narrow">
        <h1>{{ t('footer.privacy') }}</h1>
        <p class="legal-date">Last updated: January 1, 2025</p>
      </div>
    </section>

    <section class="legal-content section" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow legal-content__inner">
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you fill out a contact form, including your name, email address, and any message content you choose to share.</p>
        <p>We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your usage of our site.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Improve our website and services</li>
          <li>Send you relevant information about our services (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul>
          <li>With your explicit consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights, privacy, safety, or property</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>5. Cookies</h2>
        <p>We use essential cookies necessary for the website to function properly. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.</p>

        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict processing of your data</li>
          <li>Data portability</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at hello@sh1r00.com.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.legal-hero {
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 2rem;
}

.legal-hero h1 {
  color: var(--color-on-surface);
  margin-bottom: 0.5rem;
}

.legal-date {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.legal-content__inner {
  max-width: 48rem;
}

.legal-content h2 {
  font-size: 1.25rem;
  color: var(--color-on-surface);
  margin: 2rem 0 0.75rem;
}

.legal-content h2:first-child {
  margin-top: 0;
}

.legal-content p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 0.75rem;
}

.legal-content ul {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 0.75rem;
  padding-left: 1.5rem;
}

.legal-content li {
  margin-bottom: 0.25rem;
}
</style>
