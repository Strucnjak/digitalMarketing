# Frontend → Backend Contract

This is a source-derived handoff describing the frontend as it exists on 2026-08-19. It is an audit, not an OpenAPI specification: no backend implementation was inspected, and no endpoint, field, enum, or behavior below should be treated as a proposed change. Values called “required” are required by the current UI; the backend must independently validate every value.

## Frontend environment

- React 19 + TypeScript + Vite 7, rendered as a browser application with SSR/static generation. All lead requests execute in the browser through the native `fetch` API.
- The only backend-related environment variable found is `VITE_API_URL`. It is the public base URL for lead delivery, is required when a user submits a lead (not at build/render time), and is **public, never secret**, because Vite embeds `VITE_*` values in browser code.
- `.env.example` supplies an empty placeholder only. The same variable can therefore be set independently by local, staging, or production deployment configuration, but the repository defines no environment-specific API URLs and no fallback/local default.
- If the value is absent, empty, or whitespace-only, submission fails locally with the same translated generic error used for all other failures. The configured value is trimmed and all trailing `/` characters are removed.

## API base configuration

Every call uses:

```text
trim(VITE_API_URL).replace(/\/+$/, "") + endpoint
```

The endpoint argument begins with `/`, so examples resolve to `<API base>/api/contact`. The frontend does not rewrite paths, proxy calls, discover API versions, or inspect the base URL. A base containing its own path is preserved. There is no Axios or other HTTP client.

All three interactions share this exact transport contract:

- Method: `POST`.
- Header: `Content-Type: application/json` (and no other explicitly set header).
- Body: `JSON.stringify(payload)`.
- Browser defaults: `credentials` is omitted (`same-origin`), so cross-origin cookies are not sent; there is no explicit cache/mode/referrer policy.
- Cancellation: a fresh `AbortController` per call.
- Timeout: 15,000 ms, implemented by `setTimeout(() => controller.abort(), 15000)`; the timer is cleared in `finally`.
- Success: **implicit assumption only** — any status for which `Response.ok` is true (200–299, including 200, 201, and 204) is accepted. The response body and headers are never read; JSON is not expected and no response field is consumed.
- Failure: every non-2xx status and every thrown condition (network, CORS, abort/timeout, serialization/configuration) becomes a fieldless `LeadSubmissionError`. Callers catch without inspecting it and display a local translated generic message. There are no retries.

## Endpoint inventory

### Contract matrix

| Flow | Endpoint | Method | Request type | Expected success | Error expectations | Frontend file |
| --- | --- | --- | --- | --- | --- | --- |
| Contact | `trim(VITE_API_URL without trailing slashes) + /api/contact` | POST | Inline object (no named DTO) | Any 2xx; body ignored | Any non-2xx/network/timeout/config error → translated contact fallback | `src/components/ContactSection.tsx` |
| Free consultation | `trim(VITE_API_URL without trailing slashes) + /api/consultations` | POST | `ConsultationFormData` plus generated `language` | Any 2xx; body ignored | Any non-2xx/network/timeout/config error → translated consultation fallback | `src/components/FreeConsultationPage.tsx` |
| Service inquiry | `trim(VITE_API_URL without trailing slashes) + /api/service-inquiries` | POST | exported `InquiryFormData` plus generated `language` | Any 2xx; body ignored | Any non-2xx/network/timeout/config error → translated inquiry fallback | `src/components/ServiceInquiryForm.tsx` |

Exactly **three backend interactions** and exactly **three endpoint paths** were found globally. There are no GET, PUT, PATCH, DELETE, authentication, upload, webhook, or separate newsletter API calls.

## Contact contract

**Trigger and chain:** the home-page contact `<form>` submit event prevents normal navigation → native browser constraints run first (`required` and `type=email`) → five strings are trimmed → `language` is appended → `POST /api/contact` → any 2xx produces a translated success panel, emits a browser-only measurement event, and clears state → any other outcome keeps entered state and shows a translated generic error.

The form has no `noValidate`, so browser-native validation applies. `name`, `email`, and `message` have `required`; email also has `type="email"`. `company` and `phone` are optional, with phone merely `type="tel"` (no pattern). There are no min/max lengths. Required whitespace-only strings can satisfy native `required` and are then trimmed to `""`; this is a genuine frontend validation gap. No consent checkbox is present; the privacy copy is informational and is not submitted.

### Contact request field matrix

All fields are always present in JSON, non-null, and strings at runtime.

| Field | Type | UI required | Allowed values / validation | Normalization and empty behavior | Source |
| --- | --- | --- | --- | --- | --- |
| `name` | string | Yes | Native non-empty only; no length rule | `.trim()`; whitespace-only can become `""` | User text |
| `email` | string | Yes | Native HTML email validity; no length rule | `.trim()`; case preserved | User text |
| `company` | string | No | Unconstrained | `.trim()`; blank is submitted as `""`, never omitted/null | User text |
| `message` | string | Yes | Native non-empty only; no length rule | `.trim()`; whitespace-only can become `""` | User free text |
| `phone` | string | No | `type=tel` only; no frontend phone validation | `.trim()`; blank is submitted as `""` | User text |
| `language` | `"en" \| "me" \| "fr"` | Generated | Exact locale union | No transformation | Language context (route/stored/default) |

## Consultation contract

**Trigger and chain:** submit event is prevented and native validation is disabled with `noValidate` → custom validation runs → selected strings are trimmed and the remaining form object is spread unchanged → `language` is appended → `POST /api/consultations` → any 2xx replaces the page with translated success content and emits a browser-only event → failure preserves data and presents a local translated generic error. A user can reset after success.

Custom validation requires non-whitespace `fullName`, `email`, `company`, `currentChallenges`, and `goals`; an email regex `\S+@\S+\.\S+`; a non-empty `businessType`; at least one `interestedServices` item; and a non-empty `preferredContact`. Phone, website, preferred time, additional info, and newsletter opt-in are optional. Despite `type=url`, URL validity is not checked because `noValidate` disables native constraint validation and the custom validator has no URL rule. There are no length, phone, or array-maximum rules.

### Consultation request field matrix

Every field is always present and non-null. Optional strings are sent as `""`; arrays are sent as arrays; the boolean is always sent.

| Field | Type | UI required | Allowed values / validation | Normalization | Source |
| --- | --- | --- | --- | --- | --- |
| `fullName` | string | Yes | Non-whitespace | `.trim()` | User text |
| `email` | string | Yes | `\S+@\S+\.\S+` | `.trim()`, case preserved | User text |
| `phone` | string | No | No validation | `.trim()` | User text |
| `company` | string | Yes | Non-whitespace | `.trim()` | User text |
| `website` | string | No | No effective URL validation | `.trim()` | User text |
| `businessType` | string | Yes | `startup`, `small_business`, `medium_business`, `large_business`, `freelancer`, `agency`, `non_profit`, `other` | Unchanged machine value | Select |
| `currentChallenges` | string | Yes | Non-whitespace | `.trim()` | User free text |
| `goals` | string | Yes | Non-whitespace | `.trim()` | User free text |
| `interestedServices` | string[] | Yes (at least 1) | Each of `web`, `seo`, `social`, `branding`, `strategy`; multi-select, UI order | Array unchanged | User checkboxes |
| `preferredContact` | string | Yes | `phone`, `whatsapp`, `video`, `meeting` | Unchanged machine value | User radio |
| `preferredTime` | string | No | `""`, `morning`, `afternoon`, `evening`, `flexible` | Unchanged machine value | User select |
| `additionalInfo` | string | No | Unconstrained | `.trim()` | User free text |
| `newsletter` | boolean | No | `false` or `true`; default `false` | Unchanged | User checkbox |
| `language` | `"en" \| "me" \| "fr"` | Generated | Exact locale union | Unchanged | Language context |

## Service inquiry contract

**EXISTS.** This is a four-step form and submits to `/api/service-inquiries`.

**Trigger and chain:** the user advances through steps, each of which validates its required fields → the final button revalidates only step 4 → the complete `formData` object is spread **without trimming or other submit-time normalization**, and `language` is appended → any 2xx shows translated success, emits a browser-only event, and removes stored service/package selections → failure preserves the form and displays a translated generic error.

Step validation requires: step 1 non-whitespace full name/company and regex-valid email; step 2 at least one project type and non-whitespace current situation/goals; step 3 timeline and budget; step 4 preferred contact. Earlier steps are validated before navigation, but final submit only calls step-4 validation. There are no max/min lengths, phone rules, effective URL rules (`website` input is not `type=url` here), or array maxima.

`selectedService` and `selectedPackage` deserve special attention: they come verbatim from query parameters `service` and `package`, falling back to local storage. They are optional, are not validated against the displayed service map, and can therefore contain arbitrary strings. `additionalServices` contains **translated display labels**, not stable machine values; exact strings vary with `language` and are defined by locale translations. This is an existing contract-drift risk, not a proposed contract.

### Service inquiry request field matrix

Every field is always present and non-null. No strings are trimmed at submission; optional values remain `""`.

| Field | Type | UI required | Allowed values / validation | Normalization | Source |
| --- | --- | --- | --- | --- | --- |
| `fullName` | string | Yes | Non-whitespace | None; original whitespace submitted | User text |
| `email` | string | Yes | `\S+@\S+\.\S+` | None; case/whitespace submitted | User text |
| `phone` | string | No | No phone validation | None | User text |
| `company` | string | Yes | Non-whitespace | None | User text |
| `website` | string | No | No URL validation | None | User text |
| `selectedService` | string | No | No enforced enum; commonly `web-design`, `seo`, `social-media`, `branding`, `strategy`, but arbitrary URL/storage value is possible | None | `service` query param, else local storage, else `""` |
| `selectedPackage` | string | No | No enforced enum; arbitrary string possible | None | `package` query param, else local storage, else `""` |
| `projectTypes` | string[] | Yes (at least 1) | `new-website`, `redesign`, `ecommerce`, `mobile-app`, `seo-optimization`, `social-media`, `branding`, `marketing-strategy`, `other` | Array unchanged | User checkboxes |
| `currentSituation` | string | Yes | Non-whitespace | None | User free text |
| `projectGoals` | string | Yes | Non-whitespace | None | User free text |
| `targetAudience` | string | No | Unconstrained | None | User text |
| `timeline` | string | Yes | `asap`, `1-month`, `2-3-months`, `3-6-months`, `flexible` | Machine value unchanged | User select |
| `budget` | string | Yes | `under-1000`, `1000-2500`, `2500-5000`, `5000-10000`, `over-10000`, `discuss` | Machine value unchanged | User select |
| `additionalServices` | string[] | No | Locale-dependent translated labels for SEO, social media, Google Ads, content, branding, email, analytics, support | Translated strings stored/submitted unchanged | User checkboxes + `t(...)` |
| `preferredContact` | string | Yes | `email`, `phone`, `whatsapp`, `meeting` | Machine value unchanged | User radio |
| `additionalInfo` | string | No | Unconstrained | None | User free text |
| `howDidYouHear` | string | No | `""`, `google`, `social-media`, `referral`, `advertisement`, `website`, `other` | Machine value unchanged | User select |
| `newsletter` | boolean-like value | No | Default `false`; Radix checkbox normally supplies boolean, but the handler stores its `CheckedState` without a cast, so runtime `"indeterminate"` is structurally possible | None | User checkbox |
| `language` | `"en" \| "me" \| "fr"` | Generated | Exact locale union | Unchanged | Language context |

## Other API contracts

- No separate newsletter subscription endpoint exists. Footer translation strings for a newsletter placeholder/button exist, but no footer newsletter form or handler was found.
- Newsletter behavior is **A: included inside consultation lead data**, and it is also included inside service-inquiry lead data. It does not itself trigger another request.
- No contact/consultation/service file upload, authentication call, API health/config call, webhook call, or other backend interaction was found.
- Browser-only `dial:commercial-event` custom events are emitted after successful submissions and for clicks. They are not network API calls in this repository.

## Request field matrices

The authoritative field-by-field matrices are embedded in the three flow sections above. Important global shape rules are:

- JSON properties are never omitted by these forms and no submitted property is intentionally `null` or `undefined`.
- Contact and consultation trim their user-entered string fields listed above. Service inquiry trims only while checking validity and submits the original values.
- There is no lowercasing, phone normalization, URL normalization, HTML sanitization, `"" → null`, array sorting/deduplication, or consent timestamp/version generation.
- JSON serialization is the only transport transformation.

## Enum values

Exact stable machine values currently produced by constrained controls:

- `language`: `en`, `me`, `fr`.
- Consultation `businessType`: `startup`, `small_business`, `medium_business`, `large_business`, `freelancer`, `agency`, `non_profit`, `other`.
- Consultation `interestedServices`: `web`, `seo`, `social`, `branding`, `strategy`.
- Consultation `preferredContact`: `phone`, `whatsapp`, `video`, `meeting`.
- Consultation `preferredTime`: `morning`, `afternoon`, `evening`, `flexible` (or empty string).
- Inquiry `projectTypes`: `new-website`, `redesign`, `ecommerce`, `mobile-app`, `seo-optimization`, `social-media`, `branding`, `marketing-strategy`, `other`.
- Inquiry `timeline`: `asap`, `1-month`, `2-3-months`, `3-6-months`, `flexible`.
- Inquiry `budget`: `under-1000`, `1000-2500`, `2500-5000`, `5000-10000`, `over-10000`, `discuss`.
- Inquiry `preferredContact`: `email`, `phone`, `whatsapp`, `meeting`.
- Inquiry `howDidYouHear`: `google`, `social-media`, `referral`, `advertisement`, `website`, `other` (or empty string).
- Inquiry `selectedService` commonly uses `web-design`, `seo`, `social-media`, `branding`, `strategy`, but this is **not an enforced enum** because URL/local-storage input is accepted verbatim.
- Inquiry `selectedPackage` has no discoverable enforced enum.
- Inquiry `additionalServices` is deliberately excluded from stable enums: submitted values are translated labels and vary across `en`, `me`, and `fr`.

Translated labels are otherwise display-only and are not submitted.

## Response assumptions

### Explicit contract

- HTTP must complete within the frontend's 15-second window.
- `Response.ok` must be true. Thus all 200–299 statuses work.
- No response body contract exists. Empty, JSON, text, and ignored bodies behave identically.

### Implicit assumption

The frontend assumes any 2xx means the lead was accepted sufficiently to show success. It cannot distinguish accepted/queued delivery from completed downstream delivery, and does not require `201` specifically.

### Status matrix (all three flows)

| Outcome | Current frontend behavior |
| --- | --- |
| 200 | Success |
| 201 | Success |
| 204 | Success |
| Any other 2xx | Success |
| 400, 401, 403, 404, 409, 422, 429 | Identical generic localized failure; body ignored |
| 500+ | Same generic localized failure; body ignored |
| Network/DNS/TLS/CORS failure | Same generic localized failure |
| Timeout/abort | Same generic localized failure after about 15 seconds |

There is no expected validation-error or server-error schema, no status-specific behavior, and no response parsing. The frontend therefore cannot distinguish validation, authorization, conflict/duplicate, rate-limit, missing-route, or server failures.

## Validation rules

Validation is completely enumerated in each flow and field matrix above. In summary: email is browser-native for contact and a permissive regex for the other forms; phone has no validation; URLs have no effective application validation in consultation/service inquiry; no field has length limits; checkbox arrays require at least one only where stated; newsletter is never required; no privacy acceptance control exists. Frontend validation is not authoritative and must not replace backend validation.

All submitted names, email addresses, phone numbers, companies, URLs, free text, select values, arrays, locale, booleans, query/local-storage selections, and any future attribution fields are untrusted. Trimming is normalization, not sanitization. No HTML escaping/sanitization is performed before JSON encoding, and client-side controls can be bypassed.

## Error handling

Error-message ownership is entirely frontend-local:

- Contact uses the active locale's `contact.error.submit`.
- Consultation uses `consultation.error.submit`.
- Service inquiry uses `form.submit_error`.

Backend response text, JSON, fields, and codes are never displayed or inspected. This avoids raw technical response disclosure, but also prevents field-level backend validation feedback and status-specific guidance. Configuration errors share these same messages.

## Timeouts

All calls abort at 15,000 ms through `AbortController`. Abort errors are collapsed into the generic form-specific error. No automatic or manual background retry occurs; the user may press submit again after failure. The timeout starts before API-base validation/fetch and is always cleared.

## CORS expectations

When `VITE_API_URL` is cross-origin, the backend must allow the deployed frontend origin(s), `POST`, and `Content-Type: application/json`. JSON content type is not CORS-safelisted, so a browser preflight is expected cross-origin. No production frontend origin is inferred here. The frontend requests no `Authorization` header and does not use `credentials: "include"`; cross-origin cookies are therefore not part of this contract. If API and site are same-origin, ordinary same-origin behavior applies.

## Authentication expectations

`No frontend authentication mechanism found for public lead endpoints.`

There is no Bearer token, API key, explicit session-cookie inclusion, CSRF token, or authorization header. The backend must not require credentials the current browser client cannot supply.

## Localization contract

The payload field is named **`language`**, not `locale`. Its exact values are `en`, `me`, and `fr`, sourced from `LanguageContext`. Route locale wins when a route has a locale prefix; otherwise stored language may be loaded, falling back to the default `me`. Unprefixed routing also defaults/resolves among localized route slugs, while the API always receives the resulting active language value. The routing/API default is therefore `me`; there is no separate API locale mapping.

## Consent fields

- Consultation `newsletter`: boolean, default `false`, optional, user-controlled, always submitted, not required.
- Service inquiry `newsletter`: intended boolean, default `false`, optional, user-controlled, always submitted, not required; see the possible Radix `"indeterminate"` caveat above.
- Contact has no submitted consent field. Its privacy statement is display text only.
- No privacy acceptance, marketing-consent-specific field, tracking consent, consent timestamp, consent text/version, or cookie-consent payload was found.

No legal conclusion is made about these controls.

## Attribution current state

| Item | Classification | Actual behavior |
| --- | --- | --- |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | **CURRENTLY CAPTURED; AVAILABLE BUT NOT SUBMITTED** | First non-empty query values are trimmed, capped at 500 characters, and stored for the tab/session |
| Landing URL (`landing_page`) | **CURRENTLY CAPTURED; AVAILABLE BUT NOT SUBMITTED** | First pathname plus query string; not length-capped |
| Referrer (`referrer`) | **CURRENTLY CAPTURED; AVAILABLE BUT NOT SUBMITTED** | `document.referrer`, capped at 1,000 characters when non-empty |
| Current page at submission | **NOT IMPLEMENTED** | No submission-time page field |
| Locale/language | **CURRENTLY SUBMITTED** | `language` on every lead, although it is localization context rather than campaign attribution |
| `howDidYouHear` | **CURRENTLY SUBMITTED** (service inquiry only) | Optional self-reported machine value |
| Generic `source` / `medium` fields | **NOT IMPLEMENTED** | Only UTM capture names exist; no payload fields |
| Click identifiers / campaign IDs beyond UTM | **NOT IMPLEMENTED** | No capture or submission found |

First-touch attribution capture runs on client route initialization, returns existing session data rather than overwriting it, and stores JSON under `dial:first-touch-attribution` in `sessionStorage`. Storage failure leaves the data only in the return value, which is currently ignored.

## Attribution future requirements

No attribution change is made by this audit. If attribution is later added, frontend and backend must first agree on exact field names/nesting, optionality/null/empty behavior, accepted lengths, validation of URL/referrer strings, whether unknown fields are rejected, retention/privacy handling, and whether the same structure is accepted by all three endpoints. The backend would need to accept the already-captured UTM keys plus `landing_page` and optional `referrer`, or both repositories must agree on a different contract before implementation. Click IDs, current-page data, and campaign IDs would require new frontend capture as well as an agreed backend contract.

## Duplicate submission behavior

Each form uses both a synchronous mutable request lock and a disabled button while awaiting the request. After success, an `isSubmitted` guard blocks resubmission until the user explicitly starts a new form; service/consultation expose reset actions. There is no debounce, retry, idempotency key, persisted request identity, or cross-tab protection. A timeout/network response ambiguity followed by a user retry can create duplicates. Backend deduplication/idempotency is therefore **recommended** for ordinary UX retries; whether it is required depends on backend side effects and delivery semantics and must be verified.

## External/downstream assumptions

No actual CRM, Salesforce, Mailchimp, webhook, Slack, database, email-notification transport, marketing automation, or lead-routing integration is referenced. `HubSpot Certified` is footer marketing copy only. Locale files contain unused email subject/body templates, but the frontend does not send them or invoke an email system. Downstream storage, notification, routing, newsletter processing, and delivery are backend responsibilities unknown to this frontend.

## Frontend types

- `InquiryFormData` is an exported TypeScript interface in `ServiceInquiryForm.tsx`; its 18 properties are the service-inquiry fields excluding the appended `language`.
- `ConsultationFormData` is a file-local interface; its 13 properties exclude appended `language`.
- Contact uses an inferred state type and an inline payload; there is no named contact DTO.
- `submitLead` accepts only `Record<string, unknown>` and returns `Promise<void>`, so it does not enforce endpoint-specific request types and intentionally models no response DTO.
- `FirstTouchAttribution` models captured, currently unsubmitted attribution.

The two form interfaces and contact inline payload could later be candidates for generated/shared contract types, but this audit does not refactor them.

## Backend verification questions

### BACKEND QUESTIONS REQUIRING VERIFICATION

1. Do the three endpoint paths and `POST` method exactly match the backend: `/api/contact`, `/api/consultations`, and `/api/service-inquiries`?
2. Does each endpoint accept every always-present field, including optional fields represented as empty strings and consultation/inquiry arrays and booleans? Are unknown fields rejected?
3. Does the backend call the localization field `language` and accept exactly `en`, `me`, and `fr`?
4. Do backend required/optional rules match each UI matrix, especially contact phone/company, consultation phone/website/preferredTime, and service selection/package?
5. Does backend validation accept every exact machine enum above, including the differing consultation versus inquiry service/contact vocabularies?
6. How does the backend handle service inquiry `additionalServices`, whose current values are translated labels, and arbitrary query/storage-derived `selectedService`/`selectedPackage`?
7. Does the backend require a particular success status, or will it return any 2xx that is safe for the frontend to interpret as accepted? Does a 2xx guarantee durable acceptance/downstream handoff?
8. What validation/server error schema exists? The frontend currently ignores it and cannot distinguish 400/409/422/429/500-class failures.
9. Can each endpoint reliably complete within 15 seconds, including downstream work, or can frontend abort occur after backend acceptance?
10. Which frontend origins are allowed by CORS, and do preflight responses allow POST plus JSON content type without credentials?
11. Are authentication, CSRF, or cookies required? The current frontend supplies none.
12. Are rate limiting and duplicate/idempotency protections implemented, and what happens when a user retries after an ambiguous timeout?
13. Is `newsletter` actually processed for consultation and service-inquiry leads, and does the backend require a strict boolean?
14. Does the backend already support attribution fields? If so, what exact names, nesting, limits, and per-endpoint availability apply?
15. Where are leads delivered/stored, and what CRM/email/automation/routing behavior (if any) occurs beyond the HTTP acceptance response?
16. Does server validation impose length, URL, phone, sanitization, or array limits absent from the frontend, and how are mismatches communicated?

## Integration risks

No mismatch can be labeled **critical** until the separate backend is compared; none was proven from frontend source alone.

### HIGH

- **Unverified endpoints/fields/enums:** all three contracts must be compared with the separate backend; incompatible names or enum values would prevent lead delivery.
- **Locale-dependent inquiry data:** `additionalServices` submits translated labels, so backend matching/analytics can drift by locale and translation changes.
- **Untrusted arbitrary selections:** inquiry `selectedService` and `selectedPackage` accept query/local-storage strings without an enforced enum.
- **Ambiguous errors and acceptance:** all non-2xx failures look identical, while every 2xx is declared success without checking durable lead delivery; validation and rate-limit responses cannot guide the user.
- **Timeout ambiguity:** the browser aborts at 15 seconds with no idempotency key, so a successfully accepted but late response may be retried and duplicated.

### MEDIUM

- **Validation mismatch exposure:** no length/phone rules and weak or absent URL/email validation may differ from the backend; contact whitespace-only required fields can be sent empty after trimming.
- **Inconsistent normalization:** service inquiry validates trimmed values but sends original whitespace, unlike the other flows.
- **Attribution disconnected:** first-touch UTM/landing/referrer data is captured but no lead endpoint receives it.
- **CORS deployment dependency:** a separately hosted API requires correct origin/preflight configuration, which is not described in the frontend repository.
- **Possible consent type edge:** the service inquiry stores the Radix checkbox value without forcing a boolean, leaving a theoretical `"indeterminate"` runtime value.

### LOW

- Missing API configuration is surfaced only as the same generic submission failure, which makes deployment diagnosis harder but does not falsely show success.
- Contact has no named request type, and the shared request helper uses a broad record, allowing frontend contract drift to evade compile-time checks.
- Localized email templates and footer newsletter translation keys may imply integrations to maintainers, but they do not execute or affect requests.

