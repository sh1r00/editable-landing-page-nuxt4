/**
 * Seed data for the landing page template.
 * NO API calls — all content comes from these static exports.
 * Agencies can edit this file to customize the template for their clients.
 */

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface PortfolioItem {
  title: string
  category: string
  description: string
}

export interface TestimonialItem {
  name: string
  role: string
  quote: string
  rating: number
}

export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface ValueItem {
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
}

export const siteConfig = {
  name: 'Sh1r00 Digital',
  tagline: 'Premium Digital Solutions',
  description: 'We build stunning, high-performance websites and digital solutions that drive growth for your business.',
  url: 'https://sh1r00.com',
}

export const services: ServiceItem[] = [
  {
    title: 'Web Development',
    description: 'Custom, responsive websites built with cutting-edge technology for optimal performance.',
    icon: 'code',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, engaging digital experiences.',
    icon: 'design',
  },
  {
    title: 'SEO Optimization',
    description: 'Data-driven strategies to improve your search rankings and organic traffic.',
    icon: 'search',
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that users love.',
    icon: 'mobile',
  },
  {
    title: 'Brand Strategy',
    description: 'Comprehensive brand development from identity design to market positioning.',
    icon: 'brand',
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps for reliable, secure deployment.',
    icon: 'cloud',
  },
]

export const portfolio: PortfolioItem[] = [
  { title: 'E-Commerce Platform', category: 'Web Development', description: 'Full-featured marketplace with 10K+ products' },
  { title: 'Healthcare App', category: 'Mobile Apps', description: 'Patient management system for clinics' },
  { title: 'FinTech Dashboard', category: 'UI/UX Design', description: 'Real-time financial analytics platform' },
  { title: 'Restaurant Chain', category: 'Brand Strategy', description: 'Complete rebrand for 50+ locations' },
  { title: 'EdTech Platform', category: 'Web Development', description: 'Online learning platform for 100K+ students' },
  { title: 'Logistics Tracker', category: 'Cloud Solutions', description: 'Real-time fleet tracking and analytics' },
]

export const testimonials: TestimonialItem[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures Inc.',
    quote: 'Sh1r00 transformed our online presence completely. Our conversion rate increased by 200% within weeks.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder, GreenLeaf Co.',
    quote: 'The team delivered beyond expectations. Professional, timely, and incredibly talented.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, ApexGlobal',
    quote: 'Outstanding work on our brand redesign. The new identity perfectly captures our vision.',
    rating: 5,
  },
]

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$999',
    period: '/project',
    description: 'Perfect for small businesses getting started',
    features: ['5-Page Website', 'Responsive Design', 'Contact Form', 'Basic SEO', '1 Month Support'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$2,999',
    period: '/project',
    description: 'For growing businesses that need more',
    features: ['10-Page Website', 'Custom Design', 'CMS Integration', 'Advanced SEO', '3 Months Support', 'Analytics Setup'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$5,999',
    period: '/project',
    description: 'For large-scale projects and organizations',
    features: ['Unlimited Pages', 'Custom Development', 'API Integrations', 'Premium SEO Package', '12 Months Support', 'Dedicated PM'],
    highlighted: false,
  },
]

export const teamMembers: TeamMember[] = [
  { name: 'Alex Thompson', role: 'Lead Developer', bio: '10+ years building scalable web solutions' },
  { name: 'Maria Santos', role: 'UX Designer', bio: 'Crafting intuitive experiences since 2015' },
  { name: 'David Park', role: 'Project Manager', bio: 'Ensuring projects are delivered on time and on budget' },
  { name: 'Lisa Wang', role: 'SEO Strategist', bio: 'Helping businesses rank #1 on Google' },
]

export const contactInfo: ContactInfo = {
  address: '123 Business Ave, Suite 100, San Francisco, CA 94107',
  phone: '+1 (555) 123-4567',
  email: 'hello@sh1r00.com',
}

export const aboutValues: ValueItem[] = [
  { title: 'Excellence', description: 'We hold ourselves to the highest standards in everything we do.' },
  { title: 'Innovation', description: 'We embrace new technologies and creative approaches to solve problems.' },
  { title: 'Integrity', description: 'We build trust through transparency, honesty, and ethical practices.' },
  { title: 'Collaboration', description: 'We work closely with our clients as true partners in their success.' },
]

export const aboutStats: StatItem[] = [
  { value: '200+', label: 'Projects Completed' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Years Experience' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/contact' },
]
