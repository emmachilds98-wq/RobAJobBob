# RobAJobBob 🧭

A personal career & travel planning app built for one specific person — Rob (Robert Kirkpatrick),
not a generic product. It's an installable, phone-first PWA — built to live on his iPhone home
screen, with a full responsive web view too — that sits alongside his day-to-day life at
TreebySound and helps him think through three things at once:

1. **Long-term career** — he's not sure yet, and that's fine. The Career Compass turns his real
   background (TreebySound, running the bar solo at Cheeky Clucker, a Music Management degree
   from BIMM, and real label/artist-management/promotions roles at Open Room Records, Sleeping
   Dog Promotions, Bang Bang Merch and Madway Brewery) into 13 concrete, realistic directions,
   each with the actual steps to get there — spanning the obvious music/events/hospitality paths
   and a wider set of generalist corporate options (project coordination, procurement, business
   operations, recruitment, marketing) that don't need years of retraining to start, so there's a
   genuinely broad set of directions on the table, not just the ones tied to the music industry.
   A filter (Music & Events / Corporate / Hospitality & Travel) keeps 13 cards easy to scan
   instead of one long scroll.
2. **A 5-year working holiday** across New Zealand, Australia and Canada — sequenced against
   realistic working-holiday visa lengths (with UK-specific rules baked in, since that's his
   passport), with a Casual Jobs Explorer naming real platforms and employers per country, not
   just categories.
3. **Actually applying for jobs** — the Apply tab checks a pasted job spec against his real work
   history, surfaces what to lead with, flags what's worth covering off first (with free options
   named where they exist), and drafts a tailored pitch, CV bullets and STAR-format interview
   prep — no external AI calls, just a transparent keyword-matching engine running entirely
   on-device. It isn't fixed to what was known when this was built either: a "Your own talking
   points" section on the You tab lets him add anything else worth using — a project, a specific
   achievement — and **every Experience Log entry from the Kit tab is matched too**, so the tool
   gets better at its job every time he records having done something. Saved applications track a
   real status (applied / interview / offer / rejected) plus free-text notes and a "next step by"
   date that surfaces on the home screen once it's due — so it works as an actual job-search
   tracker, not just a pitch-generator history.
4. **What happens after** — the Kit tab's Experience Log lets him record a dated entry every time
   he works something, anywhere, optionally tagged to a Career Compass path. Each entry immediately
   becomes matchable evidence in the Apply tab, and the whole log copies out as CV bullets in one
   tap. Five years from now that's real, specific evidence for whatever comes next — travelling
   on, a role picked up locally, or heading home — not a vague "went travelling" line on a CV. The Route tab also
   covers the practical side of coming home: the UK State Pension/National Insurance implications
   of years abroad, and that the same tax-residency test applies in reverse on the way back.

None of these compete — travel-era casual jobs feed evidence back into the long-term career
paths, and the Apply tab draws on all of it. A prominent home-screen callout also flags the
thing that matters most given where he's starting from: UK applicants are eligible right through
age 35 on Australia 417, NZ Working Holiday and Canada IEC alike, so the real cut-off on all
three is the 36th birthday, not the 35th as it's easy to assume — he's 32 with no firm start
date, so timing is the one thing worth not letting drift.

The Travel Route tab turns that birthday into arithmetic rather than a warning. It computes the
cut-off date from his birth date (the deadline to have each visa *lodged* — or, for Canada, been
invited — not to have finished travelling, since eligibility is assessed at that point), then
works the whole route backwards from it:

- **A verdict on the plan as drawn** — whether every leg fits inside the cap, fits but only just,
  or doesn't fit at all.
- **The one date that actually matters** — the latest the trip can *start* and still have the
  final country begin before the cut-off. With the current default route that's a specific day,
  and pushing the start past it costs a country. That number is the whole point of the tab: it
  turns "don't let this drift" into a deadline that can be put in a calendar.
- **A lodge-by date per leg**, on a conservative lead time per country (Canada's is longest,
  because IEC needs a pool profile, an invitation and a permit, and only the invitation has to
  beat the birthday), shown once it's close enough to act on.
- **A per-leg verdict** — `ok`, `tight` (starts after the cut-off but inside the roughly
  12-month first-entry window a granted visa gives, so it works only with no slack) or `blocked`
  (starts so far past it that no application lodged in time could still be used).

Plus concrete advice on making the most of each scheme before then, and the reasoning behind the
default Australia → New Zealand → Canada order and what would change it.

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
an update ever looks wrong — see Settings below). Each tab has its own URL (`#apply`, `#roadmap`
and so on), so the phone's back gesture moves back a tab instead of closing the app — which
matters once it's installed and there's no browser chrome to navigate with — and a link straight
to one tab opens on it. On a wider screen it automatically switches to
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
  - `EVIDENCE_BANK` — keyword → real-experience mappings the Apply tab matches job specs against,
    each also carrying a `star` field (an interview-prep prompt for that piece of evidence).
    Anything he adds himself via the You tab's "Your own talking points" lives in
    `localStorage` under the same shape and is merged in at match time — `EVIDENCE_BANK` alone
    isn't the full picture once he's used that.
  - `GAP_SUGGESTIONS` — common job-spec asks (certs etc.) not covered by the evidence bank, each
    with a real next step and whether it's free
  - `FACTS_LAST_VERIFIED` — the date every fee, scheme length and tax rule below it was last
    checked against an official source. The Route tab prints it, and once it's older than
    `FACTS_STALE_AFTER_MONTHS` the tab shows a "these were checked N months ago" warning of its
    own accord. **Bump it only when the numbers are actually re-checked**, not whenever the file
    is edited — its whole value is that it can be trusted to mean what it says.
  - `LODGE_LEAD_MONTHS` / `FIRST_ENTRY_WINDOW_MONTHS` — the deadline engine's two assumptions:
    how far ahead of arriving each country's visa realistically needs lodging, and how long a
    granted visa gives to make first entry. Deliberately conservative rules of thumb, not quoted
    service standards.
  - `JOB_SEARCH_PLATFORMS` — real job boards/agencies, grouped UK-corporate vs AU/NZ/Canada
  - `CAREER_PATHS`, `CASUAL_JOBS`, `VISA_DEFAULTS`, `TOOLKIT_CHECKLIST_TEMPLATE` — the rest of
    the content. **These are the blocks to edit** if specifics change.
- `manifest.webmanifest` / `sw.js` / `robajobbob-icon-v2.png` — makes it an installable,
  offline-capable PWA. `sw.js` also powers the Settings panel's "use previous version"
  rollback by keeping one snapshot of the app from before the last update.
- `robajobbob-icon-v2.svg` — the editable source of the home-screen icon. The `.png` is that
  file rendered at 1024×1024; edit the SVG and re-render rather than touching the bitmap.

## The Apply tab

Paste a real job ad in and it's checked against three merged sources — the built-in
`EVIDENCE_BANK`, his own talking points from the You tab, and every Experience Log entry from the
Kit tab — by simple, inspectable keyword matching. Nothing is sent anywhere, there's no API call
and no AI model involved, just word-boundary matching against real, named experience (single-word
keywords like "av" match as whole words only, so they don't false-positive inside words like
"available" or "average"). It renders:

- **A fit-strength line** up top — strong / decent / a bit of a stretch / no match — scored on
  two things, because either alone lies: *breadth* (how many different areas of his background
  the ad touches) and *depth* (how many specific things it asks for that he can point at).
  Breadth alone rated a bar-supervisor ad "a stretch" because it hit only one evidence area,
  ignoring that it hit that one area a dozen times over; depth alone would over-rate an ad that
  just repeats "customer service". Both are measured against the fixed built-in bank, so his own
  additions can lift a score but never lower one — scoring against the merged bank meant every
  piece of real evidence he added made every job look like a *worse* fit, which is backwards.
- **What matches** — which parts of his real history line up, sorted by how strongly each one
  matched, each traceable back to a named employer (TreebySound, Cheeky Clucker, Foot Asylum,
  Tesco, Open Room Records, Sleeping Dog Promotions, Bang Bang Merch, Madway Brewery) or, for
  the two self-extending sources, labelled *Added by you* / *From your Experience Log* so a hit
  off something recorded last month is as traceable as one off the built-in bank.
- **Worth addressing** — job-spec asks with no match (first aid, food hygiene, RSA, etc.), each
  flagged free or paid with a real, current way to close the gap.
- **Already covered** — the flip side of that: job-spec asks he already has sorted (a degree, a
  driving licence) get their own explicit reassurance instead of just silently not appearing
  anywhere.
- **A draft pitch and CV bullets**, generated from the matched evidence, with one-tap copy.
- **If it gets to interview** — collapsible STAR-format prompts (Situation/Task/Action/Result)
  built from the same matched evidence, so there's real prep material the moment an ad matches
  well, not just a pitch.
- **Saved applications**, each tracked through an actual status (not sent / applied / interview
  arranged / offer / rejected / withdrawn) with a live summary count, plus free-text **notes**
  (who he spoke to, what was said) and a **"next step by" date** — anything dated today or
  earlier shows up on the home screen as a chase, so a follow-up can't quietly get forgotten.
  Loading a saved application back into the box marks it as the one being edited, so re-analysing
  and saving *updates* it rather than leaving a second copy behind, and re-running it later picks
  up whatever evidence has been added since. A first-ever open seeds one real worked example
  (`EXAMPLE_APPLICATION`) — an actual Artist Management Assistant listing from Crisp Music, run
  through the tool for real — so the tab shows a genuine result immediately instead of an empty
  state; delete it any time and it never comes back.

A "Before sending anything" card covers the things that help every application regardless of this
tool: a LinkedIn profile matching the CV, a proper professional photo for LinkedIn/CV specifically,
and two references lined up in advance. A "Where to actually look" card names real platforms —
LinkedIn Jobs, Indeed UK, Reed.co.uk, Totaljobs, CV-Library and Hays/Reed Specialist
Recruitment/Michael Page/Adecco/Randstad for UK corporate roles now, plus Seek.com.au, Seek.co.nz,
Trade Me Jobs, Indeed.ca and Job Bank Canada for once he's travelling.

## The look

The icon is a sunrise over a road with a flight path arcing across it, framed as a passport
stamp — the whole app in one picture: somewhere to get to, a way of getting there, and a
deadline stamped around the edge. Inside, the app is styled as a warm travel print rather than
a form: an illustrated night-into-sunrise hero on the home screen, colour-coded tiles on the
navigation cards, section headings with an accent rule, hand-drawn underlines under page
titles, passport-stamp marks on the route tickets, and a light paper grain over the whole page.

All of it is derived from the same design tokens the colour engine sets, so every one of the
fifteen themes, low-light mode and the brightness slider still work exactly as before —
and **high contrast switches the decoration off entirely** (no grain, no gradients, no tinted
surfaces) so legibility always wins when it's asked for. Motion is equally optional: the
staggered entrance, the drifting plane and the two confetti moments — finishing the Prep Kit
checklist, and marking an application as an offer — are all off under `prefers-reduced-motion`.

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
is what the Apply tab's matching is built on. His birth date is already known and baked in
(`DEFAULT_PROFILE.birthDate`), so there's no birth-date field to fill in — the Age shown is
computed live from it instead of a manually-typed value that would silently go stale. The
**Travel Route** tab lets the visa month-lengths, country order and travel start date be edited
directly, with the whole 5-year timeline recalculating live, a computed hard cut-off (the exact
date his age locks him out of lodging a fresh application), concrete guidance on making the most
of each country's scheme before then, an age-cap warning on any leg that would land him past a
typical visa age limit, and what the practical side of coming home looks like once the trip ends.
The **Kit** tab's Experience Log is the other ongoing one: a dated, optionally career-path-tagged
record of everything worked, anywhere. It isn't a diary the rest of the app ignores — every entry
is turned into keywords and matched by the Apply tab alongside everything built in, so the tool
gets better at pitching him with each thing he records, and the whole log copies out as CV
bullets in one tap when it's time to write the real thing.

## A note on the visa numbers

Working-holiday visa lengths depend on nationality, age and rules that change over time. The
defaults in `index.html` (`VISA_DEFAULTS`) reflect a UK passport as of `FACTS_LAST_VERIFIED` (see
the "what we checked, and when" disclosure on the Travel Route tab, which prints that date and
starts warning about its own age six months on) — they're a reasonable starting point, not legal
fact. Where a figure moves often enough that quoting it precisely would do more harm than good —
the Australian application charge, the voluntary National Insurance classes — the app deliberately
gives the shape of the decision and a link to the official page instead of a number to budget
from. The app links out to the official NZ, Australia and
Canada immigration sites. Always verify before booking anything around these dates. The same
goes for the Apply tab's certificate suggestions and named employers/platforms — real and
current as of when they were checked, but worth a quick verify before relying on any of them.
