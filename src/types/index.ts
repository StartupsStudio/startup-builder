/**
 * @packageDocumentation
 * @module startup-builder
 *
 * Startup tooling types for schema.org.ai
 *
 * This package provides types for building startups using the schema.org.ai
 * vocabulary. All types follow JSON-LD conventions with $id and $type fields.
 *
 * ## Core Types
 * - {@link Startup} - Main startup entity with lifecycle status
 * - {@link ICP} - Ideal Customer Profile (as/at/are/using/to framework)
 *
 * ## Ideation Types
 * - {@link Idea} - Startup idea with problem/solution framing
 * - {@link Hypothesis} - Testable assumptions with validation status
 * - {@link JTBD} - Jobs To Be Done framework
 *
 * ## Business Model Types
 * - {@link LeanCanvas} - Lean Canvas business model (9 sections)
 * - {@link StoryBrand} - StoryBrand messaging framework (7 parts)
 *
 * ## Team Types
 * - {@link Founder} - Founding team member with equity/vesting
 *
 * ## Utilities
 * Each type has corresponding:
 * - Type guard: `isIdea()`, `isHypothesis()`, etc.
 * - Factory function: `createIdea()`, `createHypothesis()`, etc.
 * - Zod schema: `IdeaSchema`, `HypothesisSchema`, etc.
 *
 * @example
 * ```typescript
 * import {
 *   createIdea,
 *   createHypothesis,
 *   createICP,
 *   isIdea,
 *   icpToFrame
 * } from 'startup-builder'
 *
 * const idea = createIdea({
 *   $id: 'my-idea',
 *   concept: 'API-first business platform',
 *   problem: 'Building APIs is complex',
 *   solution: 'Pre-built API templates'
 * })
 *
 * if (isIdea(idea)) {
 *   console.log('Valid idea:', idea.concept)
 * }
 * ```
 */

import { z } from 'zod'

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

// ============================================================================
// New Types with Zod Schemas
// ============================================================================

/**
 * Idea - A startup idea with problem and solution framing
 *
 * Captures the core concept, the problem being solved, and the proposed
 * solution. Used for initial ideation and pitch deck development.
 *
 * @see https://schema.org.ai/Idea
 *
 * @example
 * ```typescript
 * const idea: Idea = {
 *   $id: 'https://schema.org.ai/ideas/api-platform',
 *   $type: 'https://schema.org.ai/Idea',
 *   concept: 'API-first business platform',
 *   problem: 'Building APIs is complex and time-consuming',
 *   solution: 'Pre-built API templates with DO backend',
 *   differentiator: 'Edge-native with global distribution'
 * }
 * ```
 */
export interface Idea {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/Idea'
  /** The core concept or vision for the startup */
  concept: string
  /** The problem being solved - customer pain point */
  problem: string
  /** The proposed solution to the problem */
  solution: string
  /** What makes this solution unique (optional) */
  differentiator?: string
}

/**
 * Zod schema for validating Idea objects
 * @see {@link Idea}
 */
export const IdeaSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/Idea'),
  concept: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  differentiator: z.string().optional()
})

/**
 * Type guard to check if an object is a valid Idea
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the Idea interface
 *
 * @example
 * ```typescript
 * const data = JSON.parse(response)
 * if (isIdea(data)) {
 *   console.log('Valid idea:', data.concept)
 * }
 * ```
 */
export function isIdea(obj: unknown): obj is Idea {
  return IdeaSchema.safeParse(obj).success
}

/**
 * Factory function to create a new Idea
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - Idea data without $type
 * @returns Complete Idea with $type auto-filled
 *
 * @example
 * ```typescript
 * const idea = createIdea({
 *   $id: 'my-startup-idea',
 *   concept: 'AI-powered code review',
 *   problem: 'Code reviews are slow',
 *   solution: 'Automated AI review assistant'
 * })
 * // idea.$type is 'https://schema.org.ai/Idea'
 * ```
 */
export function createIdea(input: Omit<Idea, '$type'>): Idea {
  return { ...input, $type: 'https://schema.org.ai/Idea' }
}

/**
 * HypothesisStatus - Validation lifecycle states for a hypothesis
 *
 * Tracks the progression of assumption testing:
 * - `untested` - Hypothesis defined but not yet tested
 * - `testing` - Currently running experiments/gathering data
 * - `validated` - Data supports the assumption (met target)
 * - `invalidated` - Data contradicts the assumption (failed target)
 *
 * @see https://schema.org.ai/HypothesisStatus
 */
export type HypothesisStatus = 'untested' | 'testing' | 'validated' | 'invalidated'

/**
 * Hypothesis - A testable assumption with metrics
 *
 * Used for lean startup validation - test assumptions with data before
 * committing resources. Each hypothesis has a measurable target that
 * determines validation.
 *
 * @see https://schema.org.ai/Hypothesis
 *
 * @example
 * ```typescript
 * const hypothesis: Hypothesis = {
 *   $id: 'https://schema.org.ai/hypotheses/pricing',
 *   $type: 'https://schema.org.ai/Hypothesis',
 *   assumption: 'Users will pay $50/mo for this product',
 *   metric: 'conversion_rate',
 *   target: 5,
 *   status: 'testing',
 *   evidence: ['Survey: 60% said they would pay', 'Landing page: 3% clicked buy']
 * }
 * ```
 */
export interface Hypothesis {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/Hypothesis'
  /** The assumption being tested */
  assumption: string
  /** The metric used to measure validation (e.g., "conversion_rate", "nps_score") */
  metric: string
  /** Target value for the metric to validate the hypothesis */
  target: number
  /** Current validation status */
  status: HypothesisStatus
  /** Evidence collected during testing (optional) */
  evidence?: string[]
}

/**
 * Zod schema for validating Hypothesis objects
 * @see {@link Hypothesis}
 */
export const HypothesisSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/Hypothesis'),
  assumption: z.string(),
  metric: z.string(),
  target: z.number(),
  status: z.enum(['untested', 'testing', 'validated', 'invalidated']),
  evidence: z.array(z.string()).optional()
})

/**
 * Type guard to check if an object is a valid Hypothesis
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the Hypothesis interface
 *
 * @example
 * ```typescript
 * if (isHypothesis(data)) {
 *   console.log(`Testing: ${data.assumption}`)
 *   console.log(`Status: ${data.status}`)
 * }
 * ```
 */
export function isHypothesis(obj: unknown): obj is Hypothesis {
  return HypothesisSchema.safeParse(obj).success
}

/**
 * Factory function to create a new Hypothesis
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - Hypothesis data without $type
 * @returns Complete Hypothesis with $type auto-filled
 *
 * @example
 * ```typescript
 * const hypothesis = createHypothesis({
 *   $id: 'pricing-test',
 *   assumption: 'Users prefer annual billing',
 *   metric: 'annual_conversion',
 *   target: 30,
 *   status: 'untested'
 * })
 * ```
 */
export function createHypothesis(input: Omit<Hypothesis, '$type'>): Hypothesis {
  return { ...input, $type: 'https://schema.org.ai/Hypothesis' }
}

/**
 * JTBD - Jobs To Be Done framework
 *
 * Captures the job customers are trying to accomplish, the context in which
 * they do it, and the outcome they desire. Based on Clayton Christensen's
 * Jobs To Be Done innovation framework.
 *
 * The JTBD framework focuses on customer motivation rather than demographics,
 * helping identify opportunities for innovation.
 *
 * @see https://schema.org.ai/JTBD
 * @see https://hbr.org/2016/09/know-your-customers-jobs-to-be-done
 *
 * @example
 * ```typescript
 * const jtbd: JTBD = {
 *   $id: 'https://schema.org.ai/jtbd/build-api',
 *   $type: 'https://schema.org.ai/JTBD',
 *   job: 'Build a customer-facing API',
 *   context: 'When launching a new SaaS product',
 *   outcome: 'Have a working API in days not months',
 *   constraints: ['Limited budget', 'Small team', 'Tight deadline'],
 *   currentSolutions: ['Build from scratch', 'Use API gateway', 'Hire contractors']
 * }
 * ```
 */
export interface JTBD {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/JTBD'
  /** The job the customer is trying to accomplish */
  job: string
  /** The situation or context when the job arises */
  context: string
  /** The desired outcome when the job is done well */
  outcome: string
  /** Constraints that make the job difficult (optional) */
  constraints?: string[]
  /** Current solutions customers use to get the job done (optional) */
  currentSolutions?: string[]
}

/**
 * Zod schema for validating JTBD objects
 * @see {@link JTBD}
 */
export const JTBDSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/JTBD'),
  job: z.string().min(1),
  context: z.string().min(1),
  outcome: z.string().min(1),
  constraints: z.array(z.string()).optional(),
  currentSolutions: z.array(z.string()).optional()
})

/**
 * Type guard to check if an object is a valid JTBD
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the JTBD interface
 *
 * @example
 * ```typescript
 * if (isJTBD(data)) {
 *   console.log(`Job: ${data.job}`)
 *   console.log(`Context: ${data.context}`)
 * }
 * ```
 */
export function isJTBD(obj: unknown): obj is JTBD {
  return JTBDSchema.safeParse(obj).success
}

/**
 * Factory function to create a new JTBD
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - JTBD data without $type
 * @returns Complete JTBD with $type auto-filled
 *
 * @example
 * ```typescript
 * const jtbd = createJTBD({
 *   $id: 'deploy-app',
 *   job: 'Deploy my application',
 *   context: 'When I have code ready for production',
 *   outcome: 'App is live and accessible to users'
 * })
 * ```
 */
export function createJTBD(input: Omit<JTBD, '$type'>): JTBD {
  return { ...input, $type: 'https://schema.org.ai/JTBD' }
}

/**
 * LeanCanvas - The Lean Canvas business model
 *
 * A one-page business plan adapted from Business Model Canvas for startups.
 * Contains all 9 sections that capture the key aspects of a startup business.
 *
 * The Lean Canvas is designed to be completed in 20 minutes and iterated
 * frequently as you learn from customers.
 *
 * @see https://schema.org.ai/LeanCanvas
 * @see https://leanstack.com/lean-canvas
 *
 * @example
 * ```typescript
 * const canvas: LeanCanvas = {
 *   $id: 'https://schema.org.ai/canvas/api-platform',
 *   $type: 'https://schema.org.ai/LeanCanvas',
 *   problem: ['Building APIs is slow', 'Scaling is expensive', 'Security is hard'],
 *   solution: ['Pre-built templates', 'Edge-native scaling', 'Built-in auth'],
 *   uniqueValue: 'Ship production APIs in minutes, not months',
 *   unfairAdvantage: 'Edge network with global presence',
 *   customerSegments: ['FinTech startups', 'SaaS developers'],
 *   channels: ['Developer communities', 'Technical blog', 'GitHub'],
 *   revenueStreams: ['Monthly subscription', 'Usage-based pricing'],
 *   costStructure: ['Cloud infrastructure', 'Engineering team'],
 *   keyMetrics: ['MAU', 'API calls', 'Deployment frequency']
 * }
 * ```
 */
export interface LeanCanvas {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/LeanCanvas'
  /** Top 1-3 problems you are solving */
  problem: string[]
  /** Top 3 features or capabilities that solve the problems */
  solution: string[]
  /** Single, clear, compelling message that states why you are different */
  uniqueValue: string
  /** Something that cannot be easily copied or bought (optional) */
  unfairAdvantage?: string
  /** Target customer segments */
  customerSegments: string[]
  /** Path to reach customers (marketing/sales channels) */
  channels: string[]
  /** Revenue model - how you make money */
  revenueStreams: string[]
  /** Fixed and variable costs */
  costStructure: string[]
  /** Key numbers that tell you how your business is doing */
  keyMetrics: string[]
}

/**
 * Zod schema for validating LeanCanvas objects
 * @see {@link LeanCanvas}
 */
export const LeanCanvasSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/LeanCanvas'),
  problem: z.array(z.string()).nonempty(),
  solution: z.array(z.string()).nonempty(),
  uniqueValue: z.string().min(1),
  unfairAdvantage: z.string().optional(),
  customerSegments: z.array(z.string()).nonempty(),
  channels: z.array(z.string()).nonempty(),
  revenueStreams: z.array(z.string()).nonempty(),
  costStructure: z.array(z.string()).nonempty(),
  keyMetrics: z.array(z.string()).nonempty()
})

/**
 * Type guard to check if an object is a valid LeanCanvas
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the LeanCanvas interface
 *
 * @example
 * ```typescript
 * if (isLeanCanvas(data)) {
 *   console.log(`Value Prop: ${data.uniqueValue}`)
 *   console.log(`Problems: ${data.problem.join(', ')}`)
 * }
 * ```
 */
export function isLeanCanvas(obj: unknown): obj is LeanCanvas {
  return LeanCanvasSchema.safeParse(obj).success
}

/**
 * Factory function to create a new LeanCanvas
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - LeanCanvas data without $type
 * @returns Complete LeanCanvas with $type auto-filled
 *
 * @example
 * ```typescript
 * const canvas = createLeanCanvas({
 *   $id: 'my-canvas',
 *   problem: ['Problem 1', 'Problem 2'],
 *   solution: ['Solution 1', 'Solution 2'],
 *   uniqueValue: 'The easiest way to X',
 *   customerSegments: ['Segment A'],
 *   channels: ['Direct sales'],
 *   revenueStreams: ['Subscription'],
 *   costStructure: ['Hosting'],
 *   keyMetrics: ['MRR', 'Churn']
 * })
 * ```
 */
export function createLeanCanvas(input: Omit<LeanCanvas, '$type'>): LeanCanvas {
  return { ...input, $type: 'https://schema.org.ai/LeanCanvas' }
}

/**
 * StoryBrand - StoryBrand messaging framework
 *
 * The 7-part framework for clear brand messaging created by Donald Miller.
 * Positions the customer as the hero and your brand as the guide that helps
 * them succeed.
 *
 * The framework follows the classic story arc:
 * 1. A character (customer) has a problem
 * 2. Meets a guide (your brand)
 * 3. Who gives them a plan
 * 4. And calls them to action
 * 5. That helps them avoid failure
 * 6. And ends in success
 *
 * @see https://schema.org.ai/StoryBrand
 * @see https://storybrand.com
 *
 * @example
 * ```typescript
 * const brand: StoryBrand = {
 *   $id: 'https://schema.org.ai/storybrand/api-platform',
 *   $type: 'https://schema.org.ai/StoryBrand',
 *   character: 'Startup developers who need APIs fast',
 *   problem: 'Building production APIs takes months',
 *   guide: 'API Platform - built by developers who faced the same challenge',
 *   plan: ['Choose a template', 'Customize your schema', 'Deploy to edge'],
 *   callToAction: 'Start building free',
 *   success: 'Ship your API this week, not next quarter',
 *   failure: 'Waste months building infrastructure instead of features'
 * }
 * ```
 */
export interface StoryBrand {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/StoryBrand'
  /** The hero of the story - your customer and what they want */
  character: string
  /** The problem the character faces (external, internal, philosophical) */
  problem: string
  /** Your brand as the guide - empathy + authority */
  guide: string
  /** Simple steps to success (3 steps ideal) */
  plan: string[]
  /** Direct call to action - what you want them to do */
  callToAction: string
  /** The positive outcome - what success looks like */
  success: string
  /** The negative outcome - what failure looks like (stakes) */
  failure: string
}

/**
 * Zod schema for validating StoryBrand objects
 * @see {@link StoryBrand}
 */
export const StoryBrandSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/StoryBrand'),
  character: z.string().min(1),
  problem: z.string().min(1),
  guide: z.string().min(1),
  plan: z.array(z.string()).nonempty(),
  callToAction: z.string().min(1),
  success: z.string().min(1),
  failure: z.string().min(1)
})

/**
 * Type guard to check if an object is a valid StoryBrand
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the StoryBrand interface
 *
 * @example
 * ```typescript
 * if (isStoryBrand(data)) {
 *   console.log(`Character: ${data.character}`)
 *   console.log(`CTA: ${data.callToAction}`)
 * }
 * ```
 */
export function isStoryBrand(obj: unknown): obj is StoryBrand {
  return StoryBrandSchema.safeParse(obj).success
}

/**
 * Factory function to create a new StoryBrand
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - StoryBrand data without $type
 * @returns Complete StoryBrand with $type auto-filled
 *
 * @example
 * ```typescript
 * const brand = createStoryBrand({
 *   $id: 'my-brand',
 *   character: 'Busy professionals',
 *   problem: 'No time for meal planning',
 *   guide: 'MealPlan Pro - nutrition experts',
 *   plan: ['Tell us your diet', 'Get weekly plans', 'Shop with one click'],
 *   callToAction: 'Get your first plan free',
 *   success: 'Eat healthy without the stress',
 *   failure: 'Keep ordering expensive takeout'
 * })
 * ```
 */
export function createStoryBrand(input: Omit<StoryBrand, '$type'>): StoryBrand {
  return { ...input, $type: 'https://schema.org.ai/StoryBrand' }
}

/**
 * FounderRole - Standard founder role titles
 *
 * Common executive roles for startup founders:
 * - `ceo` - Chief Executive Officer
 * - `cto` - Chief Technology Officer
 * - `coo` - Chief Operating Officer
 * - `cfo` - Chief Financial Officer
 * - `co-founder` - General co-founder without specific executive role
 *
 * @see https://schema.org.ai/FounderRole
 */
export type FounderRole = 'ceo' | 'cto' | 'coo' | 'cfo' | 'co-founder'

/**
 * Founder - A startup founder with equity and vesting
 *
 * References a User identity and tracks equity ownership with optional
 * vesting schedule. Used for cap table management and team composition.
 *
 * @see https://schema.org.ai/Founder
 *
 * @example
 * ```typescript
 * const founder: Founder = {
 *   $id: 'https://schema.org.ai/founders/alice',
 *   $type: 'https://schema.org.ai/Founder',
 *   userId: 'https://schema.org.ai/users/alice',
 *   name: 'Alice Chen',
 *   role: 'ceo',
 *   equity: 40,
 *   vesting: {
 *     cliff: 12,      // 12 month cliff
 *     period: 48,     // 4 year total vesting
 *     schedule: 'monthly'
 *   }
 * }
 * ```
 */
export interface Founder {
  /** Unique identifier (JSON-LD @id) */
  $id: string
  /** Type identifier (JSON-LD @type) */
  $type: 'https://schema.org.ai/Founder'
  /** Reference to the User identity */
  userId: string
  /** Display name of the founder */
  name: string
  /** Executive role in the startup */
  role: FounderRole
  /** Equity percentage (0-100) */
  equity: number
  /** Vesting schedule (optional for advisors/angels) */
  vesting?: {
    /** Cliff period in months before any vesting */
    cliff: number
    /** Total vesting period in months */
    period: number
    /** How often shares vest after cliff */
    schedule: 'monthly' | 'quarterly'
  }
}

/**
 * Zod schema for validating Founder objects
 * @see {@link Founder}
 */
export const FounderSchema = z.object({
  $id: z.string(),
  $type: z.literal('https://schema.org.ai/Founder'),
  userId: z.string(),
  name: z.string(),
  role: z.enum(['ceo', 'cto', 'coo', 'cfo', 'co-founder']),
  equity: z.number().min(0).max(100),
  vesting: z.object({
    cliff: z.number(),
    period: z.number(),
    schedule: z.enum(['monthly', 'quarterly'])
  }).optional()
})

/**
 * Type guard to check if an object is a valid Founder
 *
 * @param obj - Object to validate
 * @returns True if the object conforms to the Founder interface
 *
 * @example
 * ```typescript
 * if (isFounder(data)) {
 *   console.log(`${data.name} (${data.role}): ${data.equity}%`)
 * }
 * ```
 */
export function isFounder(obj: unknown): obj is Founder {
  return FounderSchema.safeParse(obj).success
}

/**
 * Factory function to create a new Founder
 *
 * Automatically fills in the $type field with the correct schema.org.ai URI.
 *
 * @param input - Founder data without $type
 * @returns Complete Founder with $type auto-filled
 *
 * @example
 * ```typescript
 * const founder = createFounder({
 *   $id: 'bob-founder',
 *   userId: 'user-bob',
 *   name: 'Bob Smith',
 *   role: 'cto',
 *   equity: 30,
 *   vesting: { cliff: 12, period: 48, schedule: 'monthly' }
 * })
 * ```
 */
export function createFounder(input: Omit<Founder, '$type'>): Founder {
  return { ...input, $type: 'https://schema.org.ai/Founder' }
}
