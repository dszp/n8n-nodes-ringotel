# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Security
- Removed hardcoded vendor API token from Messaging API Postman collection (`openapi/RingotelMessagingAPI.json`), replaced with `{{token}}` placeholder (vendor notified)
- Pinned GitHub Actions to SHA hashes for supply chain protection (`actions/checkout@v5.0.1`, `actions/setup-node@v5.0.0`)

### Fixed
- Removed ineffective `unset` commands in CI workflow that don't persist across GitHub Actions steps

## [0.0.2](https://github.com/dszp/n8n-nodes-ringotel/releases/tag/v0.0.2) (2026-03-13)

### Fixed
- Upgraded GitHub Actions from v4 to v5 (`actions/checkout@v5`, `actions/setup-node@v5`) to resolve Node.js 20 deprecation warnings

## [0.0.1](https://github.com/dszp/n8n-nodes-ringotel/releases/tag/v0.0.1) (2026-03-13)

### Initial Release

- Programmatic n8n community node for the Ringotel Admin API
- Bearer token authentication with configurable base URL (default: `https://shell.ringotel.co`)
- Credential test via declarative POST to `getOrganizations`
- Configurable dropdown cache TTL (default: 10 minutes, set to 0 to disable)
- 11 resources with 74 total operations:
  - **Organization** (10 ops): Create, Delete, Get, Get Many, Update, Set Status, Get Event Log, Get Calls, Get Activity Subjects, Set Activity Subjects
  - **Connection** (8 ops): Create, Delete, Get, Get Many, Update, Set Status, Get Options, Get Templates
  - **User** (24 ops): Create, Create Many, Delete, Delete Many, Get, Get Many, Update, Attach, Deactivate, Delete Device, Delete Recordings, Delete Transcriptions, Detach, Get Logs, Get Phone Book URL, Get Registrations History, Get SIP Credentials, Recover Deleted, Reset Password, Resync SIP Device, Set Password, Set Settings, Set State, Set Status
  - **Contact** (6 ops): Delete, Get Blocked, Get Many, Import, Set Blocked, Update
  - **SMS Trunk** (8 ops): Create, Delete, Get Chats, Get Many, Get Opt-Out List, Add to Opt-Out, Remove from Opt-Out, Update
  - **Account** (8 ops): Get, Get AI Usage Info, Get History, Get Many Users, Get Statistics, Create Admin, Update Admin, Delete Admin
  - **AI Agent** (4 ops): Create, Delete, Get Many, Update
  - **Region** (1 op): Get Many
  - **Integration** (1 op): Get Many
  - **Package** (1 op): Get Many
  - **Call** (2 ops): Initiate, Update Activity
- Dynamic dropdowns for Organization and Connection (Branch) selection with caching
- Organization ID injected into User query results (`orgid` field) for downstream chaining
- AI agent tool compatibility (`usableAsTool: true`)
- `continueOnFail()` error handling on every item
- `constructExecutionMetaData` for proper item linking
