# TODO

## Planned Improvements

### Messaging API
- [ ] Add Ringotel Messaging API node (`nodes/RingotelMessaging/`) as a second node in this package as defined in `openapi/RingotelMessaging.json`.

### SMS Trunk Resource
- [ ] Add dropdown for SMS Trunk ID (similar to Connection/Branch dropdown) to SMS Trunk operations that require it (Get Chats, Get Opt-Out List, Add to Opt-Out, Remove from Opt-Out, Delete, Update). Requires a `loadOptionsMethod` that fetches trunks via `getSMSTrunks` for the selected organization, with caching.

### Call Resource
- [ ] Add Organization dropdown to Call operations (currently uses `orgDomain` string field for `initiate` and `updateActivity`)
- [ ] Consider adding a `getCalls` operation (Organization resource currently has `getCalls` but a dedicated Call resource operation may be more discoverable)

### User Resource
- [ ] Add `getLogFile` support (the only non-RPC endpoint — `GET /userlogs/{path}`) to download log files returned by `getUserLogs`

### General
- [ ] Add automated tests
- [ ] Investigate adding `Simplify` toggle for operations returning many fields
