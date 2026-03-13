# n8n-nodes-ringotel

This is an n8n community node for the [Ringotel](https://www.ringotel.com/) Admin API, providing programmatic access to manage organizations, connections, users, contacts, SMS trunks, AI agents, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) |
[Operations](#operations) |
[Credentials](#credentials) |
[API Coverage](#api-coverage) |
[Resources](#resources) |
[Changelog](CHANGELOG.md) |
[TODO](TODO.md)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Organization
- Create, Delete, Get, Get Many, Update, Set Status
- Get Event Log, Get Calls, Get Activity Subjects, Set Activity Subjects

### Connection (Branch)
- Create, Delete, Get, Get Many, Update, Set Status
- Get Options, Get Templates

### User
- Create, Create Many, Delete, Delete Many, Get, Get Many, Update
- Attach, Deactivate, Delete Device, Delete Recordings, Delete Transcriptions, Detach
- Get Logs, Get Phone Book URL, Get Registrations History, Get SIP Credentials
- Recover Deleted, Reset Password, Resync SIP Device
- Set Password, Set Settings, Set State, Set Status

### Contact
- Delete, Get Blocked, Get Many, Import, Set Blocked, Update

### SMS Trunk
- Create, Delete, Get Chats, Get Many
- Get Opt-Out List, Add to Opt-Out, Remove from Opt-Out, Update

### Account
- Get, Get AI Usage Info, Get History, Get Many Users, Get Statistics
- Create Admin, Update Admin, Delete Admin

### AI Agent
- Create, Delete, Get Many, Update

### Call
- Initiate, Update Activity

### Region / Integration / Package
- Get Many (each)

## Credentials

To use this node, you need an API key from your Ringotel Shell admin portal (API Settings).

| Field | Description |
|-------|-------------|
| **Base URL** | Your Ringotel Shell instance URL (default: `https://shell.ringotel.co`) |
| **API Key** | Bearer token generated from the admin portal |
| **Dropdown Cache (Minutes)** | How long to cache Organization/Connection dropdown options (default: 10, set to 0 to disable) |

Credentials are validated on save by calling the `getOrganizations` API method.

## API Coverage

The Ringotel Admin API uses an RPC-style interface where all requests are `POST` to a single `/api` endpoint with a JSON body containing `method` and `params`. This node implements **74 operations across 11 resources**, covering the full Admin API.

### Implemented Resources

| Resource | Operations | API Methods |
|----------|------------|-------------|
| **Organization** | 10 | createOrganization, deleteOrganization, getOrganization, getOrganizations, updateOrganization, setOrganizationStatus, getEventLog, getCalls, getActivitySubjects, setActivitySubjects |
| **Connection** | 8 | createBranch, deleteBranch, getBranch, getBranches, updateBranch, setBranchStatus, getBranchOptions, getTemplates |
| **User** | 24 | createUser, createUsers, deleteUser, deleteUsers, getUser, getUsers, updateUser, attachUser, deactivateUser, deleteDevice, deleteRecordings, deleteTranscriptions, detachUser, getUserLogs, getPhoneBookURL, getUserRegistrationsHistory, getSIPCredentials, recoverDeletedUser, resetUserPassword, resyncSIPDevice, setUserPassword, setUserSettings, setUserState, setUserStatus |
| **Contact** | 6 | deleteContacts, getBlockedContacts, getContacts, importContacts, setBlockedContacts, updateContacts |
| **SMS Trunk** | 8 | createSMSTrunk, deleteSMSTrunk, getSMSChats, getSMSTrunks, getSMSOptOutList, addToSMSOptOut, removeFromSMSOptOut, updateSMSTrunk |
| **Account** | 8 | getAccount, getAIUsageInfo, getAccountHistory, getAccountUsers, getAccountStatistics, createAdmin, updateAdmin, deleteAdmin |
| **AI Agent** | 4 | createAIAgent, deleteAIAgent, getAIAgents, updateAIAgent |
| **Region** | 1 | getRegions |
| **Integration** | 1 | getIntegrations |
| **Package** | 1 | getPackages |
| **Call** | 2 | initCall, updateActivity |

### Not Yet Implemented

| Feature | Description |
|---------|-------------|
| `getLogFile` | The only non-RPC endpoint (`GET /userlogs/{path}`) for downloading user log files |
| SMS Trunk dropdown | Dynamic dropdown for SMS Trunk ID selection (similar to Organization/Connection dropdowns) |
| Ringotel Messaging API | Separate node planned for the Messaging API (pending API documentation) |

See [TODO.md](TODO.md) for the full list of planned improvements.

## Features

- **Dynamic dropdowns** for Organization and Connection (Branch) selection with configurable caching
- **Organization ID injection** into User query results (`orgid` field) for downstream chaining
- **AI agent tool compatibility** (`usableAsTool: true`) for use with n8n AI agents
- **Error handling** with `continueOnFail()` on every item and proper item linking via `constructExecutionMetaData`
- **Cache invalidation** on mutation operations (create, update, delete) for Organizations and Connections

## Resources

- [Ringotel API Documentation](https://ringotel.atlassian.net/wiki/spaces/RSW/pages/2091548680/Ringotel+API)
- [Ringotel Postman Documentation](https://documenter.getpostman.com/view/3136743/2sA35Jzf7B)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
