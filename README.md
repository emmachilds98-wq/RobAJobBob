# RobAJobBob 🧭

A personal career & travel planning app built for one specific friend, not a generic product.
It's an installable, phone-first PWA — built to live on Rob's iPhone home screen — that sits
alongside his day-to-day life at TreebySound and helps him think through two things at once:

1. **Long-term career** — he's not sure yet, and that's fine. The Career Compass turns his
   current all-rounder events/ops role into seven concrete, realistic directions, each with
   the actual steps to get there.
2. **A 5-year working holiday** across New Zealand, Australia and Canada — sequenced against
   realistic working-holiday visa lengths (with UK-specific rules baked in, since that's his
   passport), with a Casual Jobs Explorer covering bar work, excursions/tour guiding, flight
   attending, event crew, ski resorts and more.

The two aren't in competition — the app is built so travel-era casual jobs feed evidence back
into the long-term career paths. A prominent home-screen callout also flags the thing that
matters most given where he's starting from: UK working-holiday age caps sit around 35, and
he's already in his 30s with no firm start date, so timing is the one thing worth not letting
drift.

## Running it

No build step, no dependencies — it's four static files.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser. To actually install it on an iPhone: open the
GitHub Pages URL in Safari, tap Share → **Add to Home Screen**. From then on it launches
full-screen, works offline, and updates itself in the background (with a one-tap rollback if
an update ever looks wrong — see Settings below).

## Structure

Everything lives in one file on purpose, matching the pattern used across this account's other
personal apps (TreebySound, ThornProcurement) — one HTML file is easy to keep, easy to host on
GitHub Pages, and easy to hand-edit without a build step.

- `index.html` — the entire app: markup, styles, content data, and all the logic (tabs,
  the colour engine, the travel-date maths, localStorage persistence). Search for the
  `DATA` comment block near the top of the `<script>` section to find the career paths, visa
  defaults, casual job cards and checklist — **that's the block to edit** if specifics change
  (job titles, visa rules, his interests).
- `manifest.webmanifest` / `sw.js` / `robajobbob-icon.png` — makes it an installable,
  offline-capable PWA. `sw.js` also powers the Settings panel's "use previous version"
  rollback by keeping one snapshot of the app from before the last update.

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
- **First name** — synced with the same name shown on the **You** tab.
- **Backup / restore** — exports everything (profile, route, checklist, notes, photo) as one
  JSON file, and can restore it back on a new phone.
- **Use previous version** — if an update ever looks wrong, swap back to the version from
  before the last update, without touching any saved data.

## Personalizing it

Open the **You** tab to set his name, current role/company, nationality, visa status, driving
licence, savings and certificates — everything saves to `localStorage`, so it's private to
whoever opens it on that device. The **Travel Route** tab lets the visa month-lengths, country
order and travel start date be edited directly, with the whole 5-year timeline recalculating
live from those numbers, plus an age-cap warning on any leg that would land him past a typical
visa age limit if a birth year is set.

## A note on the visa numbers

Working-holiday visa lengths depend on nationality, age and rules that change over time. The
defaults in `index.html` (`VISA_DEFAULTS`) reflect a UK passport as of when they were last
checked (see the "what we checked, and when" disclosure on the Travel Route tab) — they're a
reasonable starting point, not legal fact. The app links out to the official NZ, Australia and
Canada immigration sites. Always verify before booking anything around these dates.
