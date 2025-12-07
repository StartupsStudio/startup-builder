# Startup Builder

> Build autonomous startups with Business-as-Code

Startup Builder transforms your business vision into a fully operational autonomous startup—from ICP selection to Site, App, API, CLI, MCP, SDK, Docs, and Blog—all through code.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     startup-builder                          │
├─────────────────────────────────────────────────────────────┤
│  ICP → Products → Services → Build Targets                  │
│                                                             │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐    │
│  │  Site   │   │   App   │   │   API   │   │   CLI   │    │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘    │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐    │
│  │   MCP   │   │   SDK   │   │  Docs   │   │  Blog   │    │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    api.sb  ←→  db.sb                        │
│              (actions/events)  (user/tenant data)           │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
npm install startup-builder
```

## Quick Start

```typescript
import { Startup } from 'startup-builder'

// Define your startup
const startup = Startup.create({
  name: 'AutoLaunch',
  icp: 'technical-founders',
  industry: 'developer-tools',
  problem: 'Building startups takes too long'
})

// Add products
startup.addProduct({
  type: 'saas',
  name: 'AutoLaunch Platform',
  features: ['instant-deploy', 'ai-content', 'analytics']
})

// Build everything
await startup.build({
  site: true,      // Marketing site
  app: true,       // Full-stack application
  api: true,       // REST/GraphQL API
  cli: true,       // Command-line interface
  mcp: true,       // MCP server for AI
  sdk: true,       // Client SDKs
  docs: true,      // Documentation site
  blog: true       // Content platform
})
```

## API Endpoints

Startup Builder uses a unified API architecture:

| Service | Endpoint | Purpose |
|---------|----------|---------|
| **API** | `api.sb` | Actions, events, integrations |
| **Database** | `db.sb` | User and tenant-specific data |

### Using the RPC Client

```typescript
import { rpc } from 'startup-builder/api'

// Create a new startup
const result = await rpc('api.sb/startups.create', {
  name: 'MyStartup',
  icp: 'developers'
})

// Generate site
await rpc('api.sb/site.generate', {
  startupId: result.id,
  template: 'saas-landing'
})
```

## Core Concepts

### ICP (Ideal Customer Profile)

Select from curated business ontologies at [business.org.ai](https://github.com/dot-org-ai/business.org.ai):

```typescript
import { ICP } from 'startup-builder'

const icp = ICP.select('technical-founders', {
  company_size: '1-50',
  industry: 'technology',
  pain_points: ['slow-deployment', 'manual-processes']
})
```

### Products & Services

Define what you're building:

```typescript
startup.addProduct({
  type: 'saas',           // saas | api | marketplace | service
  pricing: 'freemium',    // free | freemium | subscription | usage
  features: [...]
})

startup.addService({
  type: 'consulting',
  deliverables: [...]
})
```

### Build Targets

Generate any combination of components:

| Target | Output |
|--------|--------|
| `site` | Next.js marketing site with landing pages, pricing, and conversion flows |
| `app` | Full-stack application with authentication, dashboard, and core features |
| `api` | RESTful and GraphQL endpoints with OpenAPI documentation |
| `cli` | Node.js CLI with commands for your product |
| `mcp` | Model Context Protocol server for AI agent integration |
| `sdk` | Client libraries for TypeScript, Python, Go |
| `docs` | Documentation site with guides, API reference, and examples |
| `blog` | MDX-powered blog with SEO optimization |

## Primitives

Built on [primitives.org.ai](https://github.com/dot-org-ai/primitives.org.ai) abstractions:

```typescript
import { AI, Workflow, Agent, Task } from 'startup-builder'

// Use AI primitives
const content = await AI.generate({
  prompt: 'Write landing page copy for {startup.name}',
  context: startup.toContext()
})

// Define workflows
const launchWorkflow = Workflow.define({
  name: 'launch',
  steps: [
    Task.create('generate-site'),
    Task.create('deploy-infrastructure'),
    Task.create('configure-analytics'),
    Task.create('send-announcement')
  ]
})

// Create autonomous agents
const marketingAgent = Agent.create({
  role: 'marketing',
  goals: ['increase-traffic', 'optimize-conversion'],
  tools: ['content-generator', 'seo-analyzer', 'ab-tester']
})
```

## Configuration

```typescript
// startup.config.ts
import { defineConfig } from 'startup-builder'

export default defineConfig({
  api: {
    baseUrl: 'https://api.sb',
    version: 'v1'
  },
  db: {
    baseUrl: 'https://db.sb',
    tenant: process.env.TENANT_ID
  },
  build: {
    outDir: './dist',
    targets: ['site', 'api', 'docs']
  }
})
```

## Related Packages

| Package | Description |
|---------|-------------|
| [sales-builder](https://github.com/StartupsStudio/sales-builder) | Autonomous sales and growth workflows |
| [builder.domains](https://github.com/StartupsStudio/builder.domains) | Free domains for builders |
| [startup.games](https://github.com/StartupsStudio/startup.games) | Gamification for founders |
| [rpc.do](https://www.npmjs.com/package/rpc.do) | RPC client for .do APIs |
| [primitives.org.ai](https://github.com/dot-org-ai/primitives.org.ai) | AI primitives and abstractions |

## License

MIT
