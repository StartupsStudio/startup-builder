// Startup types for schema.org.ai

// Startup lifecycle states
export type StartupStatus = 'draft' | 'validation' | 'mvp' | 'growth' | 'scale'

// ICP - Ideal Customer Profile (as/at/are/using/to framework)
export interface ICP {
  $id: string
  $type: 'https://schema.org.ai/ICP'
  as: string      // Who are they? (e.g., "Developers")
  at: string      // Where do they work? (e.g., "FinTech startups")
  are: string     // What are they doing? (e.g., "building APIs")
  using: string   // What tools? (e.g., "Node.js")
  to: string      // What goal? (e.g., "ship faster")
  // Optional grounding against standards
  occupation?: string  // O*NET SOC code
  industry?: string    // NAICS code
}

// Startup - Central entity
export interface Startup {
  $id: string
  $type: 'https://schema.org.ai/Startup'
  name: string
  status: StartupStatus
  icp: ICP | null
  idea: unknown | null  // Will be typed in next cycle
  businessModel: unknown | null  // Will be typed in next cycle
  founders: unknown[]  // Will be typed in next cycle
}

// Helper to create semantic frame from ICP
export function icpToFrame(icp: ICP): string {
  return `${icp.as} at ${icp.at} are ${icp.are} using ${icp.using} to ${icp.to}`
}
