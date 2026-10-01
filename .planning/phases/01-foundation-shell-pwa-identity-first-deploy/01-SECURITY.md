---
phase: "01"
slug: "foundation-shell-pwa-identity-first-deploy"
status: verified
threats_open: 0
asvs_level: 1
created: "2026-10-01"
---

# Phase 01 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Dev machine → GitHub (push) | First credential-bearing boundary; public repo (D-08 accepted) | Source code, git credentials (never in repo) |
| GitHub Actions → Pages CDN | CI builds from source, publishes `_site/` | Workflow payload, artifact |
| Browser (child's phone) → live URL | ONLY runtime boundary: static HTTPS GETs, same-origin, zero input, zero JS | Nothing (no data collection) |
| Public repo / live URL → readers | Source + served content public; Impressum identity fields the only personal-data surface (owner-filled later) | Parent identity placeholders |

---

## Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation | Status |
|-----------|----------|-----------|----------|-------------|------------|--------|
| T-01-SC | Tampering | npm install @11ty/eleventy | high | mitigate | Package Legitimacy Audit OK/Approved; dep pinned exact 3.1.6; package-lock.json committed (npm ci reproduces audited tree) | closed |
| T-01-02 | Information disclosure | Third-party requests from built pages | high | mitigate | Architectural absence: system fonts only, no embeds; build-wide zero-external-host gate — verified 0 external hosts across all built files + live | closed |
| T-01-03 | Information disclosure | Child/parent PII in public repo | high | mitigate | Zero personal data in Phase 1 files; Happi is a fictional cat; Impressum = bracket placeholders only (prohibition P1) — reviewer re-verified all pushed files | closed |
| T-01-04 | Integrity | Subpath link breakage | medium | mitigate | url filter on internal links; CR-01 filter-precedence defect found by review, fixed (c36e300), regression-asserted (0 hrefs outside /handychecker/ on 4/4 pages) and live-verified | closed |
| T-02-01 | Information disclosure | Impressum identity fields | high | mitigate | D-10 + prohibition P1: bracketed placeholders are the ONLY permitted values; real data is the owner's human step before sharing (LEGAL-02 gate open by design) | closed |
| T-02-02 | Information disclosure | Datenschutz claim vs actual requests | high | mitigate | Zero-external-host gate (build) + live fetch check (deploy) + UAT fresh-profile network tab (pass) — the claim is literally true | closed |
| T-02-03 | Spoofing | Legal pages impersonating third parties | low | accept | No external links, no embeds, same-origin footer nav | closed (accepted) |
| T-03-01 | Integrity | Manifest icon paths/sizes vs actual files | high | mitigate | Relative-only src; IHDR dimension check 512/192/180/32 == manifest sizes strings — verifier-confirmed | closed |
| T-03-02 | Spoofing | Icon identity vs Happi brand | low | mitigate | Icon art is the ginger-cat motif by construction; UAT tests 3–4 passed (cat recognizable, no gray globe) | closed |
| T-03-03 | Information disclosure | Metadata in shipped SVG/PNG art | medium | mitigate | Hand-authored SVGs (no metadata by construction); tools/strip-png-meta.cjs strips tEXt chunks, hardened (WR-03: bounds + IEND validation, mutation-tested); PNGs are Inkscape exports, no EXIF | closed |
| T-03-04 | Information disclosure | Manifest advertising capabilities the site lacks | low | mitigate | Minimal member set only (no screenshots/share_target/shortcuts/SW); verify asserts no absolute src | closed |
| T-04-SC | Tampering | GitHub Actions dependency chain | medium | mitigate | Action majors pinned @v4/@v3; Eleventy pinned + lockfile; Pages auth via id-token permission, not stored secrets — reviewer verified workflow verbatim | closed |
| T-04-01 | Information disclosure | Secrets / child PII pushed to public repo | high | mitigate | No secrets exist by design (D-13); workflow secret-free (verify: 15 pinned tokens, secret-literal regex clean); no child-identifying data in any pushed file | closed |
| T-04-02 | Repudiation / integrity | Non-fast-forward push / tampered artifact | low | mitigate | Empty-repo creation → clean first push; concurrency group pages cancel-in-progress; push verified exit 0, origin/main == main | closed |
| T-04-03 | Information disclosure | Third-party requests from live page | high | mitigate | Live fetch asserts zero http(s):// third-party refs in served HTML; UAT fresh-profile network tab pass; system fonts + same-origin assets | closed |
| T-04-04 | Availability | Actions build failure / misconfiguration | medium | mitigate | workflow_dispatch manual re-run; documented Cloudflare Pages fallback (D-09); reproducible build from source (npm ci) | closed |

*Status: open · closed · open — below high threshold (non-blocking)*
*Severity: critical > high > medium > low — only open threats at or above workflow.security_block_on count toward threats_open*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

| Risk ID | Threat Ref | Rationale | Accepted By | Date |
|---------|------------|-----------|-------------|------|
| AR-01 | T-02-03 | Legal pages carry no external surface (no links/embeds/referrer leakage); impersonation vector negligible for a same-origin static site | Owner (implicit via plan approval) | 2026-10-01 |

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-10-01 | 16 | 16 | 0 | gsd-security short-circuit (L1): plan-time register + session evidence (verifier 22/23, code review remediation, UAT 4 pass) |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-10-01 (short-circuit path: threats_open 0 + plan-time register + ASVS L1 grep-depth evidence)