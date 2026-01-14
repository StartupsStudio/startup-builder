import { describe, it, expect } from 'vitest'
import type { Startup, ICP } from '../types'

describe('Startup types', () => {
  it('Startup has required properties', () => {
    const startup: Startup = {
      $id: 'https://schema.org.ai/startups/s1',
      $type: 'https://schema.org.ai/Startup',
      name: 'Acme Startup',
      status: 'validation',
      icp: null,
      idea: null,
      businessModel: null,
      founders: []
    }
    expect(startup.$type).toBe('https://schema.org.ai/Startup')
  })

  it('Startup has lifecycle states', () => {
    const startup: Startup = {
      $id: 'https://schema.org.ai/startups/s1',
      $type: 'https://schema.org.ai/Startup',
      name: 'Acme',
      status: 'mvp', // draft | validation | mvp | growth | scale
      icp: null,
      idea: null,
      businessModel: null,
      founders: []
    }
    expect(['draft', 'validation', 'mvp', 'growth', 'scale']).toContain(startup.status)
  })
})

describe('ICP (Ideal Customer Profile)', () => {
  it('ICP follows as/at/are/using/to framework', () => {
    const icp: ICP = {
      $id: 'https://schema.org.ai/icps/icp1',
      $type: 'https://schema.org.ai/ICP',
      as: 'Developers',
      at: 'FinTech startups',
      are: 'building payment APIs',
      using: 'Node.js and TypeScript',
      to: 'ship faster with fewer bugs'
    }
    expect(icp.$type).toBe('https://schema.org.ai/ICP')
    expect(icp.as).toBe('Developers')
  })

  it('ICP can be expressed as semantic frame', () => {
    const icp: ICP = {
      $id: 'https://schema.org.ai/icps/icp1',
      $type: 'https://schema.org.ai/ICP',
      as: 'Engineers',
      at: 'Series A startups',
      are: 'scaling infrastructure',
      using: 'Kubernetes',
      to: 'handle 10x growth'
    }
    // Semantic frame: "[as] at [at] are [are] using [using] to [to]"
    const frame = `${icp.as} at ${icp.at} are ${icp.are} using ${icp.using} to ${icp.to}`
    expect(frame).toBe('Engineers at Series A startups are scaling infrastructure using Kubernetes to handle 10x growth')
  })

  it('ICP can reference O*NET occupation and NAICS industry', () => {
    const icp: ICP = {
      $id: 'https://schema.org.ai/icps/icp1',
      $type: 'https://schema.org.ai/ICP',
      as: 'Software Developers',
      at: 'Technology companies',
      are: 'building web applications',
      using: 'React',
      to: 'deliver better UX',
      occupation: '15-1252.00', // O*NET code for Software Developers
      industry: '5112' // NAICS code for Software Publishers
    }
    expect(icp.occupation).toBe('15-1252.00')
    expect(icp.industry).toBe('5112')
  })
})
