/**
 * Tests for new startup types (TDD RED phase)
 *
 * These tests will FAIL because the implementations don't exist yet.
 * This is Wave 1 of TDD - write failing tests first.
 *
 * Types to implement:
 * - Idea
 * - Hypothesis
 * - JTBD (Jobs To Be Done)
 * - LeanCanvas
 * - StoryBrand
 * - Founder
 */

import { describe, it, expect } from 'vitest'
import {
  // Idea exports
  type Idea,
  IdeaSchema,
  isIdea,
  createIdea,
  // Hypothesis exports
  type Hypothesis,
  HypothesisSchema,
  isHypothesis,
  createHypothesis,
  // JTBD exports
  type JTBD,
  JTBDSchema,
  isJTBD,
  createJTBD,
  // LeanCanvas exports
  type LeanCanvas,
  LeanCanvasSchema,
  isLeanCanvas,
  createLeanCanvas,
  // StoryBrand exports
  type StoryBrand,
  StoryBrandSchema,
  isStoryBrand,
  createStoryBrand,
  // Founder exports
  type Founder,
  FounderSchema,
  isFounder,
  createFounder,
} from './index'

// =============================================================================
// Idea Tests
// =============================================================================

describe('Idea', () => {
  const validIdea: Idea = {
    $id: 'https://schema.org.ai/ideas/api-platform',
    $type: 'https://schema.org.ai/Idea',
    concept: 'API-first business platform',
    problem: 'Building APIs is complex and time-consuming',
    solution: 'Pre-built API templates with DO backend',
  }

  const ideaWithDifferentiator: Idea = {
    $id: 'https://schema.org.ai/ideas/ai-agents',
    $type: 'https://schema.org.ai/Idea',
    concept: 'Autonomous AI agents for startups',
    problem: 'Founders spend too much time on repetitive tasks',
    solution: 'AI agents that handle routine business operations',
    differentiator: 'Schema.org.ai-native with semantic understanding',
  }

  describe('structure', () => {
    it('should have $id, $type, concept, problem, solution fields', () => {
      expect(validIdea.$id).toBeDefined()
      expect(validIdea.$type).toBe('https://schema.org.ai/Idea')
      expect(validIdea.concept).toBeDefined()
      expect(validIdea.problem).toBeDefined()
      expect(validIdea.solution).toBeDefined()
    })

    it('should accept optional differentiator field', () => {
      expect(ideaWithDifferentiator.differentiator).toBe(
        'Schema.org.ai-native with semantic understanding'
      )
    })
  })

  describe('IdeaSchema (Zod)', () => {
    it('should validate a valid Idea', () => {
      const result = IdeaSchema.safeParse(validIdea)
      expect(result.success).toBe(true)
    })

    it('should validate Idea with differentiator', () => {
      const result = IdeaSchema.safeParse(ideaWithDifferentiator)
      expect(result.success).toBe(true)
    })

    it('should reject Idea missing required fields', () => {
      const result = IdeaSchema.safeParse({ concept: 'only concept' })
      expect(result.success).toBe(false)
    })

    it('should reject Idea with wrong $type', () => {
      const result = IdeaSchema.safeParse({
        ...validIdea,
        $type: 'https://schema.org.ai/Wrong',
      })
      expect(result.success).toBe(false)
    })

    it('should reject Idea with empty strings', () => {
      const result = IdeaSchema.safeParse({
        ...validIdea,
        concept: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isIdea type guard', () => {
    it('should return true for valid Idea', () => {
      expect(isIdea(validIdea)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isIdea({ invalid: 'data' })).toBe(false)
    })

    it('should return false for null', () => {
      expect(isIdea(null)).toBe(false)
    })

    it('should return false for other types', () => {
      expect(isIdea({ $type: 'https://schema.org.ai/Startup' })).toBe(false)
    })
  })

  describe('createIdea factory', () => {
    it('should create Idea with $type auto-populated', () => {
      const idea = createIdea({
        $id: 'https://schema.org.ai/ideas/new',
        concept: 'New idea',
        problem: 'Some problem',
        solution: 'Some solution',
      })
      expect(idea.$type).toBe('https://schema.org.ai/Idea')
      expect(isIdea(idea)).toBe(true)
    })

    it('should accept optional differentiator', () => {
      const idea = createIdea({
        $id: 'https://schema.org.ai/ideas/unique',
        concept: 'Unique idea',
        problem: 'Problem',
        solution: 'Solution',
        differentiator: 'What makes it special',
      })
      expect(idea.differentiator).toBe('What makes it special')
    })
  })
})

// =============================================================================
// Hypothesis Tests
// =============================================================================

describe('Hypothesis', () => {
  const validHypothesis: Hypothesis = {
    $id: 'https://schema.org.ai/hypotheses/pricing',
    $type: 'https://schema.org.ai/Hypothesis',
    assumption: 'Users will pay $50/mo for this',
    metric: 'conversion_rate',
    target: 5,
    status: 'untested',
  }

  const hypothesisWithEvidence: Hypothesis = {
    $id: 'https://schema.org.ai/hypotheses/validated',
    $type: 'https://schema.org.ai/Hypothesis',
    assumption: 'Developers prefer TypeScript',
    metric: 'language_preference_survey',
    target: 70,
    status: 'validated',
    evidence: ['Survey: 85% prefer TS', '50 interviews confirmed'],
  }

  describe('structure', () => {
    it('should have required fields', () => {
      expect(validHypothesis.$id).toBeDefined()
      expect(validHypothesis.$type).toBe('https://schema.org.ai/Hypothesis')
      expect(validHypothesis.assumption).toBeDefined()
      expect(validHypothesis.metric).toBeDefined()
      expect(validHypothesis.target).toBeDefined()
      expect(validHypothesis.status).toBeDefined()
    })

    it('should accept optional evidence array', () => {
      expect(hypothesisWithEvidence.evidence).toHaveLength(2)
    })
  })

  describe('HypothesisSchema (Zod)', () => {
    it('should validate valid Hypothesis', () => {
      const result = HypothesisSchema.safeParse(validHypothesis)
      expect(result.success).toBe(true)
    })

    it('should validate Hypothesis with evidence', () => {
      const result = HypothesisSchema.safeParse(hypothesisWithEvidence)
      expect(result.success).toBe(true)
    })

    it('status should accept: untested, testing, validated, invalidated', () => {
      const statuses = ['untested', 'testing', 'validated', 'invalidated'] as const
      statuses.forEach((status) => {
        const result = HypothesisSchema.safeParse({ ...validHypothesis, status })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid status', () => {
      const result = HypothesisSchema.safeParse({
        ...validHypothesis,
        status: 'invalid',
      })
      expect(result.success).toBe(false)
    })

    it('should reject non-numeric target', () => {
      const result = HypothesisSchema.safeParse({
        ...validHypothesis,
        target: 'not a number',
      })
      expect(result.success).toBe(false)
    })

    it('should reject evidence with non-string items', () => {
      const result = HypothesisSchema.safeParse({
        ...validHypothesis,
        evidence: [123, 456],
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isHypothesis type guard', () => {
    it('should return true for valid Hypothesis', () => {
      expect(isHypothesis(validHypothesis)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isHypothesis({ assumption: 'only assumption' })).toBe(false)
    })
  })

  describe('createHypothesis factory', () => {
    it('should create Hypothesis with $type auto-populated', () => {
      const hypothesis = createHypothesis({
        $id: 'https://schema.org.ai/hypotheses/new',
        assumption: 'New assumption',
        metric: 'some_metric',
        target: 10,
        status: 'untested',
      })
      expect(hypothesis.$type).toBe('https://schema.org.ai/Hypothesis')
      expect(isHypothesis(hypothesis)).toBe(true)
    })
  })
})

// =============================================================================
// JTBD (Jobs To Be Done) Tests
// =============================================================================

describe('JTBD (Jobs To Be Done)', () => {
  const validJTBD: JTBD = {
    $id: 'https://schema.org.ai/jtbd/build-api',
    $type: 'https://schema.org.ai/JTBD',
    job: 'Build a customer-facing API',
    context: 'When launching a new SaaS product',
    outcome: 'Have a working API in days not months',
  }

  const jtbdWithOptionals: JTBD = {
    $id: 'https://schema.org.ai/jtbd/hire-engineer',
    $type: 'https://schema.org.ai/JTBD',
    job: 'Hire a senior engineer',
    context: 'When scaling from 5 to 20 engineers',
    outcome: 'Build a high-performing engineering team',
    constraints: ['Limited budget', 'Remote-first', 'Need domain expertise'],
    currentSolutions: ['Recruiters', 'LinkedIn', 'Referrals'],
  }

  describe('structure', () => {
    it('should have job, context, outcome fields', () => {
      expect(validJTBD.$id).toBeDefined()
      expect(validJTBD.$type).toBe('https://schema.org.ai/JTBD')
      expect(validJTBD.job).toBeDefined()
      expect(validJTBD.context).toBeDefined()
      expect(validJTBD.outcome).toBeDefined()
    })

    it('should accept optional constraints array', () => {
      expect(jtbdWithOptionals.constraints).toHaveLength(3)
    })

    it('should accept optional currentSolutions array', () => {
      expect(jtbdWithOptionals.currentSolutions).toHaveLength(3)
    })
  })

  describe('JTBDSchema (Zod)', () => {
    it('should validate valid JTBD', () => {
      const result = JTBDSchema.safeParse(validJTBD)
      expect(result.success).toBe(true)
    })

    it('should validate JTBD with optionals', () => {
      const result = JTBDSchema.safeParse(jtbdWithOptionals)
      expect(result.success).toBe(true)
    })

    it('should reject JTBD missing required fields', () => {
      const result = JTBDSchema.safeParse({ job: 'only job' })
      expect(result.success).toBe(false)
    })

    it('should reject JTBD with empty job', () => {
      const result = JTBDSchema.safeParse({ ...validJTBD, job: '' })
      expect(result.success).toBe(false)
    })

    it('should reject constraints with non-string items', () => {
      const result = JTBDSchema.safeParse({
        ...validJTBD,
        constraints: [123, true],
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isJTBD type guard', () => {
    it('should return true for valid JTBD', () => {
      expect(isJTBD(validJTBD)).toBe(true)
    })

    it('should return true for JTBD with optionals', () => {
      expect(isJTBD(jtbdWithOptionals)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isJTBD({ job: 'incomplete' })).toBe(false)
    })
  })

  describe('createJTBD factory', () => {
    it('should create JTBD with $type auto-populated', () => {
      const jtbd = createJTBD({
        $id: 'https://schema.org.ai/jtbd/new',
        job: 'New job',
        context: 'Some context',
        outcome: 'Desired outcome',
      })
      expect(jtbd.$type).toBe('https://schema.org.ai/JTBD')
      expect(isJTBD(jtbd)).toBe(true)
    })

    it('should accept optional fields', () => {
      const jtbd = createJTBD({
        $id: 'https://schema.org.ai/jtbd/full',
        job: 'Full job',
        context: 'Full context',
        outcome: 'Full outcome',
        constraints: ['Constraint 1'],
        currentSolutions: ['Solution 1'],
      })
      expect(jtbd.constraints).toHaveLength(1)
      expect(jtbd.currentSolutions).toHaveLength(1)
    })
  })
})

// =============================================================================
// LeanCanvas Tests
// =============================================================================

describe('LeanCanvas', () => {
  const validCanvas: LeanCanvas = {
    $id: 'https://schema.org.ai/canvas/startup-x',
    $type: 'https://schema.org.ai/LeanCanvas',
    problem: ['Problem 1', 'Problem 2', 'Problem 3'],
    solution: ['Solution 1', 'Solution 2', 'Solution 3'],
    uniqueValue: 'The only X that Y',
    customerSegments: ['Developers', 'Startups'],
    channels: ['Twitter', 'Product Hunt'],
    revenueStreams: ['Subscriptions'],
    costStructure: ['Infrastructure', 'Salaries'],
    keyMetrics: ['MRR', 'DAU', 'Churn'],
  }

  const canvasWithAdvantage: LeanCanvas = {
    ...validCanvas,
    $id: 'https://schema.org.ai/canvas/startup-y',
    unfairAdvantage: '10 years of industry relationships',
  }

  describe('structure', () => {
    it('should have all 8 required canvas sections', () => {
      expect(validCanvas.$id).toBeDefined()
      expect(validCanvas.$type).toBe('https://schema.org.ai/LeanCanvas')
      expect(validCanvas.problem).toBeDefined()
      expect(validCanvas.solution).toBeDefined()
      expect(validCanvas.uniqueValue).toBeDefined()
      expect(validCanvas.customerSegments).toBeDefined()
      expect(validCanvas.channels).toBeDefined()
      expect(validCanvas.revenueStreams).toBeDefined()
      expect(validCanvas.costStructure).toBeDefined()
      expect(validCanvas.keyMetrics).toBeDefined()
    })

    it('should accept optional unfairAdvantage', () => {
      expect(canvasWithAdvantage.unfairAdvantage).toBe(
        '10 years of industry relationships'
      )
    })

    it('problem should be an array', () => {
      expect(Array.isArray(validCanvas.problem)).toBe(true)
    })

    it('solution should be an array', () => {
      expect(Array.isArray(validCanvas.solution)).toBe(true)
    })
  })

  describe('LeanCanvasSchema (Zod)', () => {
    it('should validate valid LeanCanvas', () => {
      const result = LeanCanvasSchema.safeParse(validCanvas)
      expect(result.success).toBe(true)
    })

    it('should validate LeanCanvas with unfairAdvantage', () => {
      const result = LeanCanvasSchema.safeParse(canvasWithAdvantage)
      expect(result.success).toBe(true)
    })

    it('unfairAdvantage should be optional', () => {
      const result = LeanCanvasSchema.safeParse(validCanvas)
      expect(result.success).toBe(true)
    })

    it('should reject LeanCanvas missing required arrays', () => {
      const result = LeanCanvasSchema.safeParse({
        $id: 'https://schema.org.ai/canvas/incomplete',
        $type: 'https://schema.org.ai/LeanCanvas',
        problem: ['Problem'],
        // missing other required fields
      })
      expect(result.success).toBe(false)
    })

    it('should reject LeanCanvas with non-array problem', () => {
      const result = LeanCanvasSchema.safeParse({
        ...validCanvas,
        problem: 'Not an array',
      })
      expect(result.success).toBe(false)
    })

    it('should reject LeanCanvas with empty required arrays', () => {
      const result = LeanCanvasSchema.safeParse({
        ...validCanvas,
        customerSegments: [],
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isLeanCanvas type guard', () => {
    it('should return true for valid LeanCanvas', () => {
      expect(isLeanCanvas(validCanvas)).toBe(true)
    })

    it('should return true for LeanCanvas with unfairAdvantage', () => {
      expect(isLeanCanvas(canvasWithAdvantage)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isLeanCanvas({ problem: ['only problem'] })).toBe(false)
    })
  })

  describe('createLeanCanvas factory', () => {
    it('should create LeanCanvas with $type auto-populated', () => {
      const canvas = createLeanCanvas({
        $id: 'https://schema.org.ai/canvas/new',
        problem: ['P1'],
        solution: ['S1'],
        uniqueValue: 'Value prop',
        customerSegments: ['Segment'],
        channels: ['Channel'],
        revenueStreams: ['Revenue'],
        costStructure: ['Cost'],
        keyMetrics: ['Metric'],
      })
      expect(canvas.$type).toBe('https://schema.org.ai/LeanCanvas')
      expect(isLeanCanvas(canvas)).toBe(true)
    })
  })
})

// =============================================================================
// StoryBrand Tests
// =============================================================================

describe('StoryBrand', () => {
  const validStoryBrand: StoryBrand = {
    $id: 'https://schema.org.ai/storybrand/startup-x',
    $type: 'https://schema.org.ai/StoryBrand',
    character: 'A developer building a startup',
    problem: 'Spending weeks on infrastructure instead of product',
    guide: 'Our platform provides pre-built infrastructure',
    plan: ['Sign up', 'Choose template', 'Deploy'],
    callToAction: 'Start building today',
    success: 'Ship your product in days',
    failure: 'Waste months on plumbing',
  }

  describe('structure', () => {
    it('should have character, problem, guide, plan, cta, success, failure', () => {
      expect(validStoryBrand.$id).toBeDefined()
      expect(validStoryBrand.$type).toBe('https://schema.org.ai/StoryBrand')
      expect(validStoryBrand.character).toBeDefined()
      expect(validStoryBrand.problem).toBeDefined()
      expect(validStoryBrand.guide).toBeDefined()
      expect(validStoryBrand.plan).toBeDefined()
      expect(validStoryBrand.callToAction).toBeDefined()
      expect(validStoryBrand.success).toBeDefined()
      expect(validStoryBrand.failure).toBeDefined()
    })

    it('plan should be an array of steps', () => {
      expect(Array.isArray(validStoryBrand.plan)).toBe(true)
      expect(validStoryBrand.plan.length).toBeGreaterThan(0)
    })
  })

  describe('StoryBrandSchema (Zod)', () => {
    it('should validate valid StoryBrand', () => {
      const result = StoryBrandSchema.safeParse(validStoryBrand)
      expect(result.success).toBe(true)
    })

    it('should reject StoryBrand missing required fields', () => {
      const result = StoryBrandSchema.safeParse({
        character: 'A hero',
        problem: 'A problem',
        // missing other required fields
      })
      expect(result.success).toBe(false)
    })

    it('should reject StoryBrand with non-array plan', () => {
      const result = StoryBrandSchema.safeParse({
        ...validStoryBrand,
        plan: 'Not an array',
      })
      expect(result.success).toBe(false)
    })

    it('should reject StoryBrand with empty plan array', () => {
      const result = StoryBrandSchema.safeParse({
        ...validStoryBrand,
        plan: [],
      })
      expect(result.success).toBe(false)
    })

    it('should reject StoryBrand with empty strings', () => {
      const result = StoryBrandSchema.safeParse({
        ...validStoryBrand,
        character: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isStoryBrand type guard', () => {
    it('should return true for valid StoryBrand', () => {
      expect(isStoryBrand(validStoryBrand)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isStoryBrand({ character: 'incomplete' })).toBe(false)
    })

    it('should return false for other types', () => {
      expect(
        isStoryBrand({
          $type: 'https://schema.org.ai/LeanCanvas',
        })
      ).toBe(false)
    })
  })

  describe('createStoryBrand factory', () => {
    it('should create StoryBrand with $type auto-populated', () => {
      const story = createStoryBrand({
        $id: 'https://schema.org.ai/storybrand/new',
        character: 'A user',
        problem: 'Their problem',
        guide: 'Our guidance',
        plan: ['Step 1', 'Step 2'],
        callToAction: 'Act now',
        success: 'Win',
        failure: 'Lose',
      })
      expect(story.$type).toBe('https://schema.org.ai/StoryBrand')
      expect(isStoryBrand(story)).toBe(true)
    })
  })
})

// =============================================================================
// Founder Tests
// =============================================================================

describe('Founder', () => {
  const validFounder: Founder = {
    $id: 'https://schema.org.ai/founders/alice',
    $type: 'https://schema.org.ai/Founder',
    userId: 'https://schema.org.ai/users/alice',
    name: 'Alice',
    role: 'ceo',
    equity: 40,
  }

  const founderWithVesting: Founder = {
    $id: 'https://schema.org.ai/founders/bob',
    $type: 'https://schema.org.ai/Founder',
    userId: 'https://schema.org.ai/users/bob',
    name: 'Bob',
    role: 'cto',
    equity: 30,
    vesting: {
      cliff: 12,
      period: 48,
      schedule: 'monthly',
    },
  }

  describe('structure', () => {
    it('should reference User identity via userId', () => {
      expect(validFounder.userId).toBeDefined()
      expect(validFounder.userId).toContain('users/')
    })

    it('should have $id, $type, userId, name, role, equity', () => {
      expect(validFounder.$id).toBeDefined()
      expect(validFounder.$type).toBe('https://schema.org.ai/Founder')
      expect(validFounder.name).toBeDefined()
      expect(validFounder.role).toBeDefined()
      expect(validFounder.equity).toBeDefined()
    })

    it('should accept optional vesting object', () => {
      expect(founderWithVesting.vesting).toBeDefined()
      expect(founderWithVesting.vesting?.cliff).toBe(12)
      expect(founderWithVesting.vesting?.period).toBe(48)
      expect(founderWithVesting.vesting?.schedule).toBe('monthly')
    })
  })

  describe('FounderSchema (Zod)', () => {
    it('should validate valid Founder', () => {
      const result = FounderSchema.safeParse(validFounder)
      expect(result.success).toBe(true)
    })

    it('should validate Founder with vesting', () => {
      const result = FounderSchema.safeParse(founderWithVesting)
      expect(result.success).toBe(true)
    })

    it('role should accept: ceo, cto, coo, cfo, co-founder', () => {
      const roles = ['ceo', 'cto', 'coo', 'cfo', 'co-founder'] as const
      roles.forEach((role) => {
        const result = FounderSchema.safeParse({ ...validFounder, role })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid role', () => {
      const result = FounderSchema.safeParse({
        ...validFounder,
        role: 'intern',
      })
      expect(result.success).toBe(false)
    })

    it('equity should be 0-100', () => {
      expect(
        FounderSchema.safeParse({ ...validFounder, equity: 0 }).success
      ).toBe(true)
      expect(
        FounderSchema.safeParse({ ...validFounder, equity: 100 }).success
      ).toBe(true)
      expect(
        FounderSchema.safeParse({ ...validFounder, equity: 50 }).success
      ).toBe(true)
    })

    it('should reject equity > 100', () => {
      const result = FounderSchema.safeParse({ ...validFounder, equity: 101 })
      expect(result.success).toBe(false)
    })

    it('should reject equity < 0', () => {
      const result = FounderSchema.safeParse({ ...validFounder, equity: -1 })
      expect(result.success).toBe(false)
    })

    it('should reject non-numeric equity', () => {
      const result = FounderSchema.safeParse({
        ...validFounder,
        equity: 'forty',
      })
      expect(result.success).toBe(false)
    })

    it('vesting schedule should accept: monthly, quarterly', () => {
      const schedules = ['monthly', 'quarterly'] as const
      schedules.forEach((schedule) => {
        const result = FounderSchema.safeParse({
          ...founderWithVesting,
          vesting: { ...founderWithVesting.vesting, schedule },
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid vesting schedule', () => {
      const result = FounderSchema.safeParse({
        ...founderWithVesting,
        vesting: { ...founderWithVesting.vesting, schedule: 'weekly' },
      })
      expect(result.success).toBe(false)
    })
  })

  describe('isFounder type guard', () => {
    it('should return true for valid Founder', () => {
      expect(isFounder(validFounder)).toBe(true)
    })

    it('should return true for Founder with vesting', () => {
      expect(isFounder(founderWithVesting)).toBe(true)
    })

    it('should return false for invalid data', () => {
      expect(isFounder({ name: 'incomplete' })).toBe(false)
    })
  })

  describe('createFounder factory', () => {
    it('should create Founder with $type auto-populated', () => {
      const founder = createFounder({
        $id: 'https://schema.org.ai/founders/new',
        userId: 'https://schema.org.ai/users/new',
        name: 'New Founder',
        role: 'co-founder',
        equity: 25,
      })
      expect(founder.$type).toBe('https://schema.org.ai/Founder')
      expect(isFounder(founder)).toBe(true)
    })

    it('should accept optional vesting', () => {
      const founder = createFounder({
        $id: 'https://schema.org.ai/founders/vested',
        userId: 'https://schema.org.ai/users/vested',
        name: 'Vested Founder',
        role: 'ceo',
        equity: 40,
        vesting: {
          cliff: 12,
          period: 48,
          schedule: 'quarterly',
        },
      })
      expect(founder.vesting).toBeDefined()
      expect(founder.vesting?.schedule).toBe('quarterly')
    })
  })
})
