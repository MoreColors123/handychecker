# Phase 01: User Setup Required

**Generated:** 2026-09-28
**Phase:** 01-foundation-shell-pwa-identity-first-deploy
**Status:** Complete

The GitHub setup for the first deploy is **done and machine-verified** — every item below was
completed by the owner and independently confirmed by the executor (live deploy + live-URL checks).
**One human action remains, and it is a LEGAL launch gate, not setup:** fill the Impressum
placeholders with real parent data BEFORE the URL is shared with anyone (see last section).

## Dashboard Configuration (GitHub — all done ✓)

- [x] **Create an empty PUBLIC repository named handychecker**
  - Location: https://github.com/new
  - **Done & verified:** repo exists at https://github.com/MoreColors123/handychecker — `git ls-remote` succeeded and the first push fast-forwarded onto an empty default branch
- [x] **Report the GitHub username**
  - **Done & verified:** username is `MoreColors123` → live URL **https://morecolors123.github.io/handychecker/**
- [x] **Set the Pages source to "GitHub Actions"**
  - Location: Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**
  - **Done & verified:** after the source was set, the retriggered workflow run deployed successfully and the live URL serves the site (was the expected blocker for the first run's deploy job)
- [x] **Ensure local git can authenticate the push**
  - **Done & verified:** pushes of `e17c3f3` (deploy workflow) and `513c2a0` (retrigger) succeeded via the local credential manager over HTTPS

## Environment Variables

None — the deploy pipeline needs **no tokens or secrets**: the workflow authenticates with the
built-in `GITHUB_TOKEN` via the `id-token: write` permission (D-13). Nothing to configure.

## Verification

```bash
git remote get-url origin        # expected: https://github.com/MoreColors123/handychecker.git
git ls-remote origin main        # expected: a ref line ending in the pushed HEAD
```

Live-site spot checks (all verified by the executor on 2026-09-28):

- https://morecolors123.github.io/handychecker/ → HTTP 200, German home page ("Hi, ich bin Happi")
- .../manifest.webmanifest → valid JSON, `start_url: "."`, all icon paths relative
- .../icons/icon-192.png → `image/png`, IHDR exactly 192×192
- .../impressum/ and .../datenschutz/ → HTTP 200 with the placeholder-based legal content

## ⚠️ Launch-Gate Action Remaining (LEGAL-02 — the ONE remaining human action)

- [ ] **Fill the Impressum placeholders with the real parent data BEFORE sharing the URL with anyone**
  - Location: `src/impressum.njk` → live page https://morecolors123.github.io/handychecker/impressum/
  - Replace **exactly these four bracket placeholders** (and nothing else):
    - `[Name der Eltern]`
    - `[Straße und Hausnummer]`
    - `[PLZ] [Ort]`
    - `[E-Mail-Adresse der Eltern]`
  - Then rebuild and push — the push auto-deploys: `npm.cmd run build && git add src/impressum.njk && git commit -m "chore: fill Impressum parent data" && git push`
  - **Why:** § 5 DDG requires the provider identity before the site is publicly shared. The executor
    must never invent this data (plan prohibition P1) — the live site intentionally serves the
    bracketed placeholders until this step is done.
  - The kindgerechte Datenschutzerklärung needs **no** personal data — nothing to fill there.

**Once the four placeholders are replaced and pushed:** this phase's launch gate is closed; the URL
may be shared. Track the placeholders as handled in `.planning/WINDOWS.md` (entry 2).
