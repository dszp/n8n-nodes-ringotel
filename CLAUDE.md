# CLAUDE.md - n8n-nodes-ringotel

## Project Overview

n8n community node for the Ringotel Admin (and future Messaging) APIs. Published to npm as `@dszp/n8n-nodes-ringotel`. Licensed MIT. Author: David Szpunar.

- **Type**: Programmatic n8n node (not declarative) — chosen for RPC-style API (all POST to single endpoint with method/params JSON body)
- **Node API Version**: 1 (stable)
- **Package manager**: npm
- **TypeScript target**: ES2019, strict mode enabled
- **Current version**: Check `package.json` for latest

## Repository Structure

```
credentials/
  RingotelAdminApi.credentials.ts    # Base URL + API Key (Bearer token)
  ringotelAdmin.svg                  # Icon for credential dialog
nodes/RingotelAdmin/
  RingotelAdmin.node.ts              # Main node entry (resource/operation routing)
  RingotelAdmin.node.json            # Codex metadata (category: Communication)
  ringotelAdmin.svg                  # Node icon
  GenericFunctions.ts                # RPC request helper, credential test
  descriptions/                      # One file per resource (11 total)
    OrganizationDescription.ts       # 10 operations
    ConnectionDescription.ts         # 8 operations
    UserDescription.ts               # 24 operations
    ContactDescription.ts            # 6 operations
    SmsIntegrationDescription.ts     # 8 operations
    AccountDescription.ts            # 8 operations
    AiAgentDescription.ts            # 4 operations
    RegionDescription.ts             # 1 operation
    IntegrationDescription.ts        # 1 operation
    PackageDescription.ts            # 1 operation
    CallDescription.ts               # 3 operations
openapi/                             # API reference (not shipped in npm package)
  RingotelAdminAPI.json              # Postman collection export (source of truth)
```

## Key Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript (n8n-node build)
npm run dev          # Launch n8n locally with this node loaded
npm run lint         # Run n8n node linter
npm run lint:fix     # Auto-fix lint issues
npm run release      # Publish release via release-it
```

## Architecture & Key Patterns

### Authentication (Bearer Token)
- Static API key generated from Ringotel Shell admin portal
- Sent as `Authorization: Bearer {apiKey}` header
- No token refresh, no OAuth — simple key-based auth
- Base URL configurable (default: `https://shell.ringotel.co`, also `uk2.ringotel.co`)

### RPC-Style API
- **All requests**: `POST {baseUrl}/api` with JSON body `{"method": "methodName", "params": {...}}`
- **Success response**: `{"result": {...}}` or `{"result": [...]}`
- **Error response**: `{"error": {"message": "..."}}`
- No pagination — all results returned in single response
- No different HTTP methods or URL paths (except `getLogFile` which is GET)

### GenericFunctions.ts
- `ringotelAdminApiRequest(method, params)` — single RPC helper for all API calls
- `testRingotelAdminCredential(baseUrl, apiKey)` — credential test using `getOrganizations`

### Resources (11 in v0.1.0, 74 total operations)
Account (8), AI Agent (4), Call (3), Connection (8), Contact (6), Integration (1), Organization (10), Package (1), Region (1), SMS Trunk (8), User (24)

### Future Resources (planned)
Messaging API node (`nodes/RingotelMessaging/`) — separate node in same package

### Node Features
- `usableAsTool: true` for AI agent compatibility
- `continueOnFail()` error handling on every item
- `constructExecutionMetaData` for proper item linking
- Delete operations return `{ deleted: true }`
- Initiate call returns `{ success: true }`

## Code Style & Conventions

### Formatting (`.prettierrc.js`)
- Tabs (width 2), semicolons, single quotes, trailing commas (all)
- Print width: 100, LF line endings
- Arrow parens: always

### Linting
- ESLint flat config (`eslint.config.mjs`) with n8n node linter rules via `@n8n/node-cli`
- Must pass lint before publishing: `npm run lint`
- One suppression: `no-deprecated-workflow-functions` for credential test (ICredentialTestFunctions only exposes `helpers.request`)

### TypeScript
- Strict mode with all checks enabled
- `useUnknownInCatchVariables: false` (exception)
- Incremental compilation, declaration files, source maps

## n8n Node Development Rules

Detailed n8n development standards are in `.claude/rules/` (auto-loaded when editing relevant files):

- @.claude/rules/n8n-ui-standards.md — UI text case, terminology, field layout, progressive disclosure
- @.claude/rules/n8n-code-standards.md — data handling, file structure, verification guidelines
- @.claude/rules/n8n-operations-naming.md — CRUD vocabulary, operation naming, error messages
- @.claude/rules/n8n-credentials.md — credential file structure, auth types
- @.claude/rules/n8n-http-helpers.md — HTTP request helpers, request options, body types

## CI/CD

- **No automated tests** — testing is manual via `npm run dev` against Ringotel instances
- CI workflow TBD

## Key Documentation Links

- n8n Node Development: https://docs.n8n.io/integrations/creating-nodes/overview/
- Ringotel API Docs: https://ringotel.atlassian.net/wiki/spaces/RSW/pages/2091548680/Ringotel+API
- Ringotel Postman Docs: https://documenter.getpostman.com/view/3136743/2sA35Jzf7B
- Postman collection: `openapi/RingotelAdminAPI.json` (in project, not shipped)

## Development Notes

- Ringotel Admin API uses RPC-style requests (POST with method/params), not REST
- The full API has 70+ operations across 11 resources; v0.1.0 implements all of them
- Complex nested structures (provision objects, user settings, contact imports) are exposed as JSON input fields
- The `getLogFile` endpoint is the only non-RPC call (GET to /userlogs/{path}) — not yet implemented
- See `CHANGELOG.md` for version history
