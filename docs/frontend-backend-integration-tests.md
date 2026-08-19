# Frontend/backend staging integration test plan

## Preconditions

Configure staging `VITE_API_URL` with no credentials, configure backend `FRONTEND_URL` to the exact staging frontend origin, and use test lead data. Confirm persistence from backend records rather than notification email delivery. Use `https://bdigital.me` as production backend `FRONTEND_URL`; no staging frontend or API origin is committed in this repository.

| Scenario | Request | Expected status | Expected frontend behavior | Expected backend outcome |
|---|---|---:|---|---|
| CONTACT VALID | Canonical contact DTO with trimmed required fields | 2xx | Localized success; analytics event after response | One durable contact record |
| CONTACT INVALID | Whitespace-only name (direct API fixture; UI blocks it) | 422 | Localized validation guidance | No record |
| CONSULTATION VALID | All required fields, valid enums, Boolean newsletter | 2xx | Localized success | One durable consultation record; newsletter stored only |
| CONSULTATION INVALID | Invalid URL or missing services | 422 | Field guidance where mapped | No record |
| SERVICE INQUIRY VALID | Canonical fields, bounded arrays, valid enums | 2xx | Localized success | One durable inquiry record |
| SERVICE INQUIRY INVALID | Oversized array item or missing goals | 422 | Localized validation guidance | No record |
| INVALID ENUM | Invalid business type, timeline, budget, or contact | 422 | No success; localized validation guidance | No record |
| UNKNOWN FIELD | Add `unknown` to any direct API fixture | 422 | No success | No record; field rejected |
| ME | Valid DTO with `language: "me"` | 2xx | Montenegrin success copy | Language stored as `me` |
| EN | Valid DTO with `language: "en"` | 2xx | English success copy | Language stored as `en` |
| FR | Valid DTO with `language: "fr"` | 2xx | French success copy | Language stored as `fr` |
| TIMEOUT | Staging fault delays beyond ~15 seconds | Client abort | Localized ambiguous-timeout copy; no automatic retry | Inspect persistence because outcome may be ambiguous |
| RATE LIMIT | Only after staging infrastructure enables a reproducible 429 | 429 | Localized wait message; no success or aggressive retry | No accepted lead for rejected request |

## Deferred scenarios

- **IDEMPOTENT RETRY:** not executable; backend durable idempotency is pending and the frontend sends no key.
- **UTM LEAD:** not executable; attribution remains capture-only and is intentionally excluded from DTOs.
- Service/package/project/additional-service identifiers remain compatibility strings pending frontend/business agreement; staging should record the current values without treating translated labels as settled identifiers.
