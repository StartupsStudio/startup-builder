/**
 * Startup types for schema.org.ai
 *
 * This module provides TypeScript types for modeling startups using the
 * schema.org.ai vocabulary. Types follow JSON-LD conventions with $id and $type.
 *
 * @packageDocumentation
 */

/**
 * StartupStatus - Lifecycle states for a startup venture.
 *
 * Represents the progression of a startup from initial concept to scale:
 * - `draft` - Initial idea capture, not yet validated
 * - `validation` - Testing assumptions with customers
 * - `mvp` - Building minimum viable product
 * - `growth` - Product-market fit achieved, scaling customers
 * - `scale` - Scaling operations and team
 *
 * @see https://schema.org.ai/StartupStatus
 */
export type StartupStatus = 'draft' | 'validation' | 'mvp' | 'growth' | 'scale'

/**
 * ICP - Ideal Customer Profile using the as/at/are/using/to framework.
 *
 * The ICP framework captures customer context in a structured way:
 * - **as**: Who are they? (role/persona)
 * - **at**: Where do they work? (company type/context)
 * - **are**: What are they doing? (current activity/pain)
 * - **using**: What tools do they use? (current solutions)
 * - **to**: What goal do they want? (desired outcome)
 *
 * @see https://schema.org.ai/ICP
 *
 * @example
 * ```typescript
 * const icp: ICP = {
 *   $id: 'https://schema.org.ai/icps/dev-fintech',
 *   $type: 'https://schema.org.ai/ICP',
 *   as: 'Developers',
 *   at: 'FinTech startups',
 *   are: 'building payment APIs',
 *   using: 'Node.js and TypeScript',
 *   to: 'ship faster with fewer bugs'
 * }
 * ```
 */
export interface ICP {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/ICP'
  /** Who are they? Role or persona (e.g., "Developers") */
  as: string
  /** Where do they work? Company type or context (e.g., "FinTech startups") */
  at: string
  /** What are they doing? Current activity or pain (e.g., "building APIs") */
  are: string
  /** What tools do they use? Current solutions (e.g., "Node.js") */
  using: string
  /** What goal do they want? Desired outcome (e.g., "ship faster") */
  to: string
  /**
   * O*NET SOC occupation code for labor market grounding.
   * @see https://www.onetonline.org/
   */
  occupation?: string
  /**
   * NAICS industry code for industry classification.
   * @see https://www.census.gov/naics/
   */
  industry?: string
}

/**
 * Startup - Central entity for a startup venture.
 *
 * Represents a startup company with its lifecycle status, ideal customer profile,
 * business model, and founding team.
 *
 * @see https://schema.org.ai/Startup
 *
 * @example
 * ```typescript
 * const startup: Startup = {
 *   $id: 'https://schema.org.ai/startups/acme',
 *   $type: 'https://schema.org.ai/Startup',
 *   name: 'Acme Inc',
 *   status: 'validation',
 *   icp: { ... },
 *   idea: null,
 *   businessModel: null,
 *   founders: []
 * }
 * ```
 */
export interface Startup {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/Startup'
  /** Name of the startup */
  name: string
  /** Current lifecycle status */
  status: StartupStatus
  /** Ideal Customer Profile - who the startup serves */
  icp: ICP | null
  /** Business idea (typed in subsequent cycles) */
  idea: unknown | null
  /** Business model canvas or similar (typed in subsequent cycles) */
  businessModel: unknown | null
  /** Founding team members (typed in subsequent cycles) */
  founders: unknown[]
}

/**
 * Creates a semantic frame string from an ICP.
 *
 * Transforms the structured ICP into a human-readable sentence:
 * "[as] at [at] are [are] using [using] to [to]"
 *
 * @param icp - The Ideal Customer Profile to convert
 * @returns A semantic frame string describing the customer
 *
 * @example
 * ```typescript
 * const frame = icpToFrame(icp)
 * // "Developers at FinTech startups are building APIs using Node.js to ship faster"
 * ```
 */
export function icpToFrame(icp: ICP): string {
  return `${icp.as} at ${icp.at} are ${icp.are} using ${icp.using} to ${icp.to}`
}
