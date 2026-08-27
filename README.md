# RobAJobBob 🌏

A personal, picture-friendly career & travel planning app — built for one specific friend,
not a generic product. It sits alongside his day-to-day life at TreebySound and helps him
think through two things at once:

1. **Long-term career** — he's not sure yet, and that's fine. The Career Compass turns his
   current all-rounder events/ops role into seven concrete, realistic directions, each with
   the actual steps to get there.
2. **A 5-year working holiday** across New Zealand, Australia and Canada — sequenced against
   realistic working-holiday visa lengths, with a Casual Jobs Explorer covering bar work,
   excursions/tour guiding, flight attending, event crew, ski resorts and more.

The two aren't in competition — the app is built so travel-era casual jobs feed evidence back
into the long-term career paths.

## Running it

No build step — it's a static site.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Structure

- `index.html` — page shell & tab structure
- `css/styles.css` — bright, warm, picture-friendly visual design
- `js/data.js` — all the actual content: career paths, visa defaults, travel phases, casual
  job cards, prep checklist. **This is the file to edit** if any of the specifics need
  adjusting (job titles change, visa rules change, his interests shift).
- `js/app.js` — rendering, tab switching, date-math for the travel timeline, and
  localStorage persistence for the profile, checklist and notes.

## Personalizing it

Open the **Profile** tab in the app to set his name, current role/company, nationality
(which visa rules apply to him) and travel start date — everything saves to the browser's
`localStorage`, so it's private to whoever opens it on that device.

The **Travel Roadmap** tab lets the visa month-lengths and whether to include an Australia
2nd year be edited directly — the whole 5-year timeline recalculates from those numbers.

## A note on the visa numbers

Working-holiday visa lengths depend on nationality, age and rules that change over time.
The defaults in `js/data.js` (`VISA_DEFAULTS`) are a reasonable starting point, not legal
fact — the app links out to the official NZ, Australia and Canada immigration sites, and
the Travel Roadmap carries a visible disclaimer. Always verify before booking anything
around these dates.
