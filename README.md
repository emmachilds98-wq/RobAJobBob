# RobAJobBob 🧭

A personal career & travel planning app built for one specific person — Rob (Robert Kirkpatrick),
not a generic product. It's an installable, phone-first PWA — built to live on his iPhone home
screen, with a full responsive web view too — that sits alongside his day-to-day life at
TreebySound and helps him think through three things at once:

1. **Long-term career** — he's not sure yet, and that's fine. The Career Compass turns his real
   background (TreebySound, running the bar solo at Cheeky Clucker, a Music Management degree
   from BIMM, and real label/artist-management/promotions roles at Open Room Records, Sleeping
   Dog Promotions, Bang Bang Merch and Madway Brewery) into concrete, realistic directions, each
   with the actual steps to get there.
2. **A 5-year working holiday** across New Zealand, Australia and Canada — sequenced against
   realistic working-holiday visa lengths (with UK-specific rules baked in, since that's his
   passport), with a Casual Jobs Explorer naming real platforms and employers per country, not
   just categories.
3. **Actually applying for jobs** — the Apply tab checks a pasted job spec against his real work
   history, surfaces what to lead with, flags what's worth covering off first (with free options
   named where they exist), and drafts a tailored pitch and CV bullets — no external AI calls,
   just a transparent keyword-matching engine running entirely on-device.

None of these compete — travel-era casual jobs feed evidence back into the long-term career
paths, and the Apply tab draws on all of it. A prominent home-screen callout also flags the
thing that matters most given where he's starting from: UK working-holiday age caps sit around
35, he's 32 with no firm start date, so timing is the one thing worth not letting drift. The
Travel Route tab goes further and computes his actual cut-off date from a set birth date — the
deadline to have each visa *lodged*, not to have finished travelling, since eligibility is
assessed at application time — plus the reasoning behind the default Australia → New Zealand →
Canada order and what would change it.

The plan also treats "funding the trip" and "staying funded and engaged for five years" as two
different problems. The Route tab names real music/events hotspots per country (Melbourne,
Wellington, Toronto, alongside the more obvious Sydney/Bondi, Queenstown/Wanaka, Whistler) tied
to his actual background, and points at real ways to stay plugged into the UK music industry
while he's away (Music Managers Forum, Association of Independent Music) so reconnecting with
his old label/promotions contacts on return is a warm re-entry, not a cold restart. Each Career
Compass path also notes how portable it actually is — useful in every country on the route, and
usable when he's back in the UK, or not.

## Running it

No build step, no dependencies — it's four static files.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser. To actually install it on an iPhone: open the
GitHub Pages URL in Safari, tap Share → **Add to Home Screen**. From then on it launches
full-screen, works offline, and updates itself in the background (with a one-tap rollback if
an update ever looks wrong — see Settings below). On a wider screen it automatically switches to
a full web-app layout with a docked sidebar instead of the bottom tab bar — see Settings to pin
it to Phone view or Web view regardless of window size.

## Structure

Everything lives in one file on purpose, matching the pattern used across this account's other
personal apps (TreebySound, ThornProcurement) — one HTML file is easy to keep, easy to host on
GitHub Pages, and easy to hand-edit without a build step.

- `index.html` — the entire app: markup, styles, content data, and all the logic (tabs, the
  colour engine, the travel-date maths, the job-spec matching engine, localStorage persistence).
  Search for the `DATA` comment block near the top of the `<script>` section to find:
  - `EMPLOYMENT_HISTORY` — his real, dated work history (source of truth for the Apply tab)
  - `EVIDENCE_BANK` — keyword → real-experience mappings the Apply tab matches job specs against
  - `GAP_SUGGESTIONS` — common job-spec asks (certs etc.) not covered by the evidence bank, each
    with a real next step and whether it's free
  - `CAREER_PATHS`, `CASUAL_JOBS`, `VISA_DEFAULTS`, `TOOLKIT_CHECKLIST_TEMPLATE` — the rest of
    the content. **These are the blocks to edit** if specifics change.
- `manifest.webmanifest` / `sw.js` / `robajobbob-icon.png` — makes it an installable,
  offline-capable PWA. `sw.js` also powers the Settings panel's "use previous version"
  rollback by keeping one snapshot of the app from before the last update.

## The Apply tab

Paste a real job ad in and it's checked against `EVIDENCE_BANK` by simple, inspectable keyword
matching — nothing is sent anywhere, there's no API call and no AI model involved, just
word-boundary matching against real, named experience (single-word keywords like "av" match as
whole words only, so they don't false-positive inside words like "available" or "average"). It
renders:

- **A fit-strength line** up top — strong / decent / a bit of a stretch / no match — based on how
  many of the 8 evidence areas actually matched, so it's obvious at a glance whether an ad is
  worth the effort before reading further.
- **What matches** — which parts of his real history line up, sorted by how strongly each one
  matched, each traceable back to a named employer (TreebySound, Cheeky Clucker, Foot Asylum,
  Tesco, Open Room Records, Sleeping Dog Promotions, Bang Bang Merch, Madway Brewery).
- **Worth addressing** — job-spec asks with no match (first aid, food hygiene, RSA, etc.), each
  flagged free or paid with a real, current way to close the gap.
- **A draft pitch and CV bullets**, generated from the matched evidence, with one-tap copy.
- **Saved applications** — a local history of past pastes, so he can revisit or reuse one.

A "Before sending anything" card also covers the things that help every application regardless
of this tool: a LinkedIn profile matching the CV, a proper professional photo for LinkedIn/CV
specifically, and two references lined up in advance.

## Settings (the cog, top right)

Tap the gear icon on any screen for:

- **Colour theme** — 15 full-app colour themes (not just an accent swap — background, text
  and all four accent colours shift together), generated at runtime from one seed hue per
  theme rather than hand-written per colour.
- **Brightness** — an 80–120% screen filter, with Dim/Normal/Bright presets.
- **Low-light mode** — a manual dark mode. It never follows the phone's system dark-mode
  setting on its own, only ever switched on from here.
- **High contrast** — overrides the chosen theme with a fixed, maximum-clarity black/white
  palette.
- **Layout** — Auto (follows window width live) / Phone view / Web view. Only shown at
  desktop widths — a phone always gets the phone layout no matter what's saved.
- **First name** — synced with the same name shown on the **You** tab.
- **Backup / restore** — exports everything (profile, route, checklist, notes, photo, saved
  applications) as one JSON file, and can restore it back on a new phone.
- **Use previous version** — if an update ever looks wrong, swap back to the version from
  before the last update, without touching any saved data.

## Personalizing it

Open the **You** tab to set his name, contact details, role, education, background, nationality,
visa status, driving licence and certificates — everything saves to `localStorage`, so it's
private to whoever opens it on that device. It also shows his real work history timeline, which
is what the Apply tab's matching is built on. The **Travel Route** tab lets the visa
month-lengths, country order and travel start date be edited directly, with the whole 5-year
timeline recalculating live, plus an age-cap warning on any leg that would land him past a
typical visa age limit (a birth year is already set).

## A note on the visa numbers

Working-holiday visa lengths depend on nationality, age and rules that change over time. The
defaults in `index.html` (`VISA_DEFAULTS`) reflect a UK passport as of when they were last
checked (see the "what we checked, and when" disclosure on the Travel Route tab) — they're a
reasonable starting point, not legal fact. The app links out to the official NZ, Australia and
Canada immigration sites. Always verify before booking anything around these dates. The same
goes for the Apply tab's certificate suggestions and named employers/platforms — real and
current as of when they were checked, but worth a quick verify before relying on any of them.
