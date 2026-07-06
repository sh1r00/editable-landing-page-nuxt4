<template>
  <div class="legal-page">
    <section class="legal-hero section">
      <div class="container-narrow">
        <h1>{{ $t('footer.terms') }}</h1>
        <p class="legal-date">Last updated: January 1, 2025</p>
      </div>
    </section>

    <section class="legal-content section" style="background-color: var(--color-bg-alt)">
      <div class="container-narrow legal-content__inner">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>

        <h2>2. Services</h2>
        <p>Sh1r00 Digital provides web development, design, SEO, and related digital services. All services are subject to separate agreements and statements of work that outline specific deliverables, timelines, and costs.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content, design, code, and materials on this website are the intellectual property of Sh1r00 Digital unless otherwise stated. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

        <h2>4. User Responsibilities</h2>
        <p>When using our website or services, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Use the website only for lawful purposes</li>
          <li>Not attempt to gain unauthorized access to our systems</li>
          <li>Not interfere with the proper functioning of the website</li>
        </ul>

        <h2>5. Limitation of Liability</h2>
        <p>Sh1r00 Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>

        <h2>6. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.</p>

        <h2>7. Modifications</h2>
        <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website following any changes constitutes acceptance of the new terms.</p>

        <h2>8. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>

        <h2>9. Contact</h2>
        <p>For questions about these Terms of Service, please contact us at hello@sh1r00.com.</p>
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
