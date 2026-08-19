# Canonical public lead API contract

This frontend copy records the authoritative backend handoff supplied on 2026-08-19. The environment-configured base URL is combined with `POST /api/contact`, `POST /api/consultations`, or `POST /api/service-inquiries`. Requests are JSON and uncredentialed. Only a 2xx response means durable persistence acceptance; it does not guarantee notification email delivery. The frontend abort boundary remains approximately 15 seconds.

Unknown top-level fields receive 422. Strings are trimmed. Languages are exactly `me`, `en`, or `fr`. Limits are: person name 120, email 254, phone 40, company 160, URL 2,048, selection 160, array item 120, long text 5,000, and array 20. Emails must be syntactically valid and non-empty URLs absolute HTTP(S).

## Endpoint DTOs

- Contact requires `name`, `email`, `message`, and `language`; optional `company` and `phone` normalize to empty strings.
- Consultation requires `fullName`, `email`, `company`, `businessType`, `currentChallenges`, `goals`, a non-empty `interestedServices`, `preferredContact`, and `language`. Optional fields are `phone`, `website`, `preferredTime`, `additionalInfo`, and strict-Boolean `newsletter` (default false). Machine values are: business type `startup|small_business|medium_business|large_business|freelancer|agency|non_profit|other`; services `web|seo|social|branding|strategy`; contact `phone|whatsapp|video|meeting`; time empty or `morning|afternoon|evening|flexible`.
- Service inquiry requires `fullName`, `email`, `company`, non-empty string-array `projectTypes`, `currentSituation`, `projectGoals`, `timeline`, `budget`, `preferredContact`, and `language`. Optional fields are `phone`, `website`, `selectedService`, `selectedPackage`, `targetAudience`, `additionalServices`, `additionalInfo`, `howDidYouHear`, and strict-Boolean `newsletter` (default false). Timeline is `asap|1-month|2-3-months|3-6-months|flexible`; budget is `under-1000|1000-2500|2500-5000|5000-10000|over-10000|discuss`; contact is `email|phone|whatsapp|meeting`; source is empty or `google|social-media|referral|advertisement|website|other`.

Errors have `error.code`, `error.message`, and validation-only `error.fields`; codes are `VALIDATION_ERROR|BAD_REQUEST|RATE_LIMITED|INTERNAL_ERROR|NOT_FOUND`. Invalid form JSON is 422, malformed JSON 400, oversized JSON 413, unknown API path 404, and persistence failure 500. Infrastructure details are never returned.

Attribution and idempotency are pending database migrations and must not be submitted. Newsletter is only a stored preference. Rate-limit infrastructure thresholds are not established, though clients must safely recognize 429. Canonical machine identifiers for service/package/project selections remain a frontend/business decision; safe string shape is enforced without inventing enums. Production requires `VITE_API_URL` and exact backend `FRONTEND_URL` coordination; the configured production frontend origin is `https://bdigital.me`.
