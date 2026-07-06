// GET /api/content — returns content.json
import fs from 'fs'
import path from 'path'

const CONTENT_PATH = path.resolve(process.cwd(), 'public/content.json')

function getDefaultContent() {
  return {
    hero: { title: 'Grow Your Business', subtitle: 'Professional services to help your business thrive.' },
    services: [
      { icon: 'trending_up', title: 'Growth Strategy', description: 'Data-driven strategies to scale your business.' },
      { icon: 'groups', title: 'Team Building', description: 'Build high-performing teams.' },
      { icon: 'insights', title: 'Market Analysis', description: 'Deep insights into your market.' },
      { icon: 'rocket_launch', title: 'Launch Support', description: 'Go-to-market strategy and execution.' },
      { icon: 'shield', title: 'Risk Management', description: 'Protect and strengthen your business.' },
      { icon: 'handshake', title: 'Partnerships', description: 'Strategic partnership development.' },
    ],
    testimonials: [
      { name: 'Sarah Johnson', role: 'CEO, TechStart', quote: 'Transformed our go-to-market strategy.', rating: 5 },
      { name: 'Michael Chen', role: 'Founder, DataFlow', quote: 'Increased revenue by 40% in 6 months.', rating: 5 },
      { name: 'Emily Davis', role: 'VP, CloudNine', quote: 'The team is exceptional at what they do.', rating: 4 },
    ],
    pricing: [
      { tier: 'Starter', price: '$499', features: ['Strategy session', 'Market analysis', 'Email support'], highlighted: false },
      { tier: 'Growth', price: '$999', features: ['Everything in Starter', 'Monthly consulting', 'Priority support', 'Growth roadmap'], highlighted: true },
      { tier: 'Enterprise', price: 'Custom', features: ['Everything in Growth', 'Dedicated team', '24/7 support', 'Custom integrations'], highlighted: false },
    ],
    team: [
      { name: 'Alex Rivera', role: 'CEO & Founder', bio: '15+ years in business consulting.' },
      { name: 'Jordan Kim', role: 'Strategy Director', bio: 'Former McKinsey consultant.' },
      { name: 'Taylor Reed', role: 'Creative Lead', bio: 'Award-winning designer.' },
    ],
    portfolio: [
      { title: 'TechStart Rebrand', category: 'Branding', description: 'Complete brand overhaul for a SaaS startup.' },
      { title: 'DataFlow Campaign', category: 'Marketing', description: 'Multi-channel campaign reaching 2M+ users.' },
      { title: 'CloudNine Launch', category: 'Strategy', description: 'Product launch strategy for enterprise SaaS.' },
    ],
  }
}

export default defineEventHandler(async () => {
  try {
    if (fs.existsSync(CONTENT_PATH)) {
      return JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'))
    }
  } catch {}
  return getDefaultContent()
})
