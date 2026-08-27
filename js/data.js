/* RobAJobBob — content data
   Everything here is meant to be edited. This is a personal app for one
   specific friend, so the numbers, names and defaults below are a
   starting point, not gospel — especially the visa lengths, which change
   and depend on nationality/age. Always double-check the official
   government immigration sites before relying on any date here. */

const DEFAULT_PROFILE = {
  name: "Rob",
  currentRole: "All-Rounder — Operations & Events Support",
  currentCompany: "TreebySound (working alongside Dave Treeby)",
  nationalityNote: "UK citizen (edit this if that's wrong — it changes every visa length below)",
  travelStartDate: "2027-03-01",
  countryOrder: ["australia", "newzealand", "canada"],
  birthYear: null,
};

/* Most working-holiday visas cap out around here — used only to flag a
   phase as worth double-checking, never to block anything. UK citizens
   currently get 35 across all three of AU/NZ/Canada; many other
   nationalities cap at 30 — see VISA_DEFAULTS ageNote per country. */
const TYPICAL_VISA_AGE_CAP = 35;

/* ----------------------------- CAREER COMPASS ---------------------------- */

const SKILLS_BRIDGE = [
  {
    from: "Loading, driving & delivering gear for events",
    to: "Logistics planning, route/scheduling, supply chain thinking",
  },
  {
    from: "Setting up & packing down event sites",
    to: "Production management, site management, H&S awareness",
  },
  {
    from: "Being the go-to support person across the business",
    to: "Operations management, project coordination, generalist management track",
  },
  {
    from: "Seeing sound, procurement, events & delivery all from the inside",
    to: "Whole-business fluency most people take a decade to get — a genuine edge for running or managing a company later",
  },
  {
    from: "Working directly under an owner-operator (Dave)",
    to: "Front-row seat on how a small business is actually run day to day",
  },
];

const CAREER_PATHS = [
  {
    id: "event-ops",
    icon: "🎪",
    title: "Event Production & Operations Manager",
    tagline: "The direct next step up from where you already stand.",
    why: "You're already doing the on-the-ground work — this is the same world, just with more planning, budget and people responsibility layered on top.",
    from: "Currently: hands-on all-rounder support role.",
    steps: [
      "Start owning one small event end-to-end (budget, run sheet, crew) as a stretch project at TreebySound",
      "Learn the commercial side: quoting, supplier costs, client comms",
      "Pick up a recognised events/production short course or certificate",
      "Build a portfolio of events you've run or co-run",
      "Aim for Production Manager / Operations Manager title within 2–4 years",
    ],
    timeframe: "2–4 years",
  },
  {
    id: "festival-touring",
    icon: "🎤",
    title: "Live Events, Festivals & Touring Production",
    tagline: "Bigger stages, bigger crews, more travel built into the job itself.",
    why: "Uses the same sound/event instincts you already have, but scales up to festivals, tours and large-scale production — and the industry travels a lot, which fits your appetite for it.",
    from: "Currently: sound & event setup exposure through TreebySound.",
    steps: [
      "Get on the crew list for a few festivals or larger shows as casual/freelance crew",
      "Specialise in one lane first — stage management, technical production or logistics",
      "Network hard — this industry runs on who's reliable and who you know",
      "Consider a stagehand/production union or crewing agency once you have runs on the board",
      "Long-term: touring production manager or festival site manager",
    ],
    timeframe: "3–5 years",
  },
  {
    id: "logistics",
    icon: "🚚",
    title: "Logistics & Supply Chain Coordinator",
    tagline: "Turns your delivery-driving into a proper career track.",
    why: "You already plan routes, load gear and hit deadlines — that's the core of logistics coordination. It's a stable, transferable career that exists everywhere in the world, useful if travel life continues.",
    from: "Currently: deliveries & equipment handling.",
    steps: [
      "Get familiar with basic inventory/warehouse software (even free tools)",
      "Look at a logistics or supply chain fundamentals course",
      "Target a coordinator role at a hire company, event supplier or freight business",
      "Build toward warehouse/ops manager or dispatch supervisor",
    ],
    timeframe: "1–3 years",
  },
  {
    id: "venue-hospitality",
    icon: "🏛️",
    title: "Venue & Hospitality Management",
    tagline: "Run the building instead of the one-off event.",
    why: "Combines the operational muscle you've built with steadier, more local hours than touring — good if he wants roots after the travel years.",
    from: "Currently: events + general operations support.",
    steps: [
      "Pick up shifts in a venue, bar or hospitality management setting",
      "Learn rostering, licensing basics and front-of-house operations",
      "Move into assistant venue manager, then venue/general manager",
    ],
    timeframe: "2–5 years",
  },
  {
    id: "adventure-tourism",
    icon: "🧭",
    title: "Travel & Adventure Tourism Operations",
    tagline: "Turn the travel years into the actual career, not just a break from it.",
    why: "If the 5-year trip lights him up, this path takes everything learned doing excursions/tours and turns it into running tourism operations rather than just guiding them.",
    from: "Currently: interest in excursions, adventure & meeting people.",
    steps: [
      "Use travel years to work front-line in tours/excursions across NZ, AU & Canada",
      "Note what each operator does well and badly — this becomes your instinct for running one",
      "Pick up a first-aid, guiding or tourism qualification relevant to the region",
      "Move into lead guide, then operations/booking coordinator for a tour company",
      "Long-term: operations manager or your own small tour outfit",
    ],
    timeframe: "Runs alongside the 5-year travel plan",
  },
  {
    id: "cabin-crew",
    icon: "✈️",
    title: "Aviation — Cabin Crew → Ground Operations",
    tagline: "Start as flight attendant, land in airline operations.",
    why: "Flight attendant work is a genuine gateway into the aviation industry, not just a travel job — airlines promote operationally-minded crew into ground ops, crew scheduling and base management.",
    from: "Currently: interest in flight attendant work as a travel job.",
    steps: [
      "Apply to airlines that base crew in NZ/AU/Canada hubs during the travel years",
      "Treat it seriously as a career entry, not just a stopgap — track performance & training",
      "After 2–3 years, look sideways into crew scheduling, base ops or training roles",
      "Long-term: ground operations manager or airline base management",
    ],
    timeframe: "3–6 years",
  },
  {
    id: "own-business",
    icon: "🚀",
    title: "Start His Own Thing",
    tagline: "The long shot with the best ceiling — running an event/hire business.",
    why: "Working across every part of TreebySound (delivery, sound, procurement, events, ops) is exactly the broad exposure someone needs before starting their own event or equipment-hire company.",
    from: "Currently: full-spectrum exposure to how a small events business runs.",
    steps: [
      "Keep absorbing the commercial side while at TreebySound — ask Dave questions, don't just execute",
      "Save & build a client/supplier network over the travel years",
      "Test a small side venture (e.g. mobile bar, event styling, gear hire) at low stakes",
      "Long-term: launch once there's capital, contacts and confidence",
    ],
    timeframe: "5–10 years",
  },
];

/* ------------------------------ TRAVEL ROADMAP ---------------------------- */

/* Visa assumptions — EDITABLE. Researched and last checked August 2026,
   defaults set for a UK passport since that's this app's current default
   nationality (see DEFAULT_PROFILE.nationalityNote — change it there or
   in Settings and re-check these notes if that's wrong). Every number
   here still needs re-verifying against the official site before it's
   relied on — rules move fast and change by nationality and age. */
const VISA_DEFAULTS = {
  australia: {
    label: "Australia — Working Holiday Visa (subclass 417/462)",
    baseMonths: 12,
    extendable: true,
    extendNote: "UK passport holders: since the 2024 UK–Australia FTA, a 2nd and 3rd 417 visa (36 months total) no longer require any specified work at all — a big change from the old rule. Most other nationalities still need 6 months of specified regional work (farm/fishing/tree-felling/regional mining & construction, or bushfire/flood recovery work) to unlock a 2nd year. Check immi.homeaffairs.gov.au — base application charge is ~AUD 840 (2026).",
    ageNote: "18–35 inclusive for UK, Canada, Ireland, France, Italy, Denmark and a growing list of others (several countries were added to the 35 cap in July 2026); 18–30 for the rest. Age is assessed at the moment you lodge, not when the visa starts.",
  },
  newzealand: {
    label: "New Zealand — Working Holiday Visa",
    baseMonths: 12,
    extendable: false,
    extendNote: "UK passport holders can apply for 12, 23, or up to 36 months (if you take a shorter visa first, you can later apply for the remaining balance up to 36 months total). Most other nationalities get a flat 12 months. Check immigration.govt.nz — ~15,000 UK places/year, from NZD 770.",
    ageNote: "18–35 inclusive for UK citizens; 18–30 for most other nationalities.",
  },
  canada: {
    label: "Canada — International Experience Canada (Working Holiday / IEC)",
    baseMonths: 12,
    extendable: false,
    extendNote: "UK passport holders (age cap raised to 35 in recent rounds) can get up to 36 months across two participations — first participation up to 24 months, second up to 12 months, in any mix of the Working Holiday / Young Professionals / International Co-op streams. Most other nationalities get a single 12-month, one-time entry. It's pool-based (not guaranteed) — check travel.gc.ca/iec for current rounds.",
    ageNote: "18–35 inclusive for UK citizens; commonly 18–30/35 depending on nationality.",
  },
};

const COUNTRY_META = {
  australia: { icon: "🇦🇺", short: "Australia" },
  newzealand: { icon: "🇳🇿", short: "New Zealand" },
  canada: { icon: "🇨🇦", short: "Canada" },
};

/* Per-country phase content, keyed so the roadmap can be rebuilt in
   whatever order the countries are set to on the Profile tab — the
   content for "Australia" is the same whether it's visited 1st or 3rd.
   Each phase's length (months) is pulled from the visa overrides at
   render time so editing the visa assumptions reflows the roadmap. */
const ROADMAP_PHASE_CONTENT = {
  australia: {
    title: "Australia — landing & finding your feet",
    focus: "Base yourself in a coastal or events-friendly city. Mix bar/hospitality shifts with casual event crew work and a few excursions/tour shifts to test what you enjoy.",
    careerLink: "Every event you crew for anywhere in the world adds to the 'Live Events & Festival Production' and 'Adventure Tourism' paths.",
    monthsKey: "australia",
  },
  newzealand: {
    title: "New Zealand adventure season",
    focus: "Ski/adventure tourism town for winter (Queenstown/Wanaka), excursions and guiding work, hospitality to fill the gaps. NZ is small enough to properly explore on days off.",
    careerLink: "Guiding + hospitality here builds the 'Adventure Tourism' and 'Venue & Hospitality' paths at once.",
    monthsKey: "newzealand",
  },
  canada: {
    title: "Canada — mountains & cities",
    focus: "A resort town (Whistler/Banff) for ski season, then a city stint (Vancouver/Toronto) trying event crew, flight attendant applications, or hospitality management shifts.",
    careerLink: "Good spot to seriously test the 'Aviation — Cabin Crew' path since major airlines hub through Canadian cities.",
    monthsKey: "canada",
  },
};

/* Slotted in directly after the Australia phase, wherever it falls in
   the order, when "include Australia 2nd year" is switched on. */
const AUSTRALIA_EXT_PHASE = {
  country: "australia",
  title: "Australia — second (and maybe third) year",
  focus: "For a UK passport this no longer needs any specified work at all (since the 2024 UK–Australia trade deal) — just apply again. Other nationalities generally need 6 months of regional work first. Either way: push further into ski season resort work, farm/harvest work, or a regional tourism operator.",
  careerLink: "Regional/adventure tourism work here is direct experience for the 'Travel & Adventure Tourism Operations' path.",
  monthsKey: "australia_ext",
  optional: true,
};

/* Always appended last, after every country phase. */
const CONSOLIDATE_PHASE = {
  country: null,
  title: "Consolidate & decide",
  focus: "Use whatever time is left (3rd AU year if eligible, or heading home) to either keep travelling on the strongest thread, or bring everything back into a real step up in the events/logistics/tourism career track.",
  careerLink: "This is the point to pick a lane from the Career Compass and start applying travel experience directly to it.",
  monthsKey: "consolidate",
};

/* ------------------------------- CASUAL JOBS ------------------------------ */

const CASUAL_JOBS = [
  {
    icon: "🍹",
    title: "Bar & Hospitality Work",
    blurb: "The easiest way to fund travel almost anywhere — flexible hours, social, and tips.",
    fit: "Fits straight on top of any events/hospitality experience already picked up at TreebySound.",
    howTo: "Walk in with a CV to bars/hostel bars in tourist towns first — they hire casually and often on the spot. RSA/RSA-equivalent certificates (short online courses) are usually required in AU/NZ.",
    countries: ["australia", "newzealand", "canada"],
    visaAngle: "Standard casual work — counts toward general working-holiday hours, not usually 'specified work'.",
  },
  {
    icon: "🧗",
    title: "Excursions & Tour Guiding",
    blurb: "Leading day trips, adventure activities or sightseeing tours — social, active, outdoors.",
    fit: "Directly feeds the Adventure Tourism Operations career path — this is the one to lean into if that path is interesting.",
    howTo: "Local tour operators, hostels and adventure companies hire seasonally. A first-aid certificate and (for driving roles) a local licence conversion helps a lot.",
    countries: ["newzealand", "australia", "canada"],
    visaAngle: "Regional excursion work in Australia can sometimes count toward 2nd-year specified work — verify per role/region.",
  },
  {
    icon: "✈️",
    title: "Flight Attendant / Cabin Crew",
    blurb: "Travel built into the job, plus a genuine airline career on-ramp.",
    fit: "Matches the interest in flight attendant work — and it's a real aviation career entry, not just a gap-year job.",
    howTo: "Apply directly to airlines based in the country you're in — most run open cabin crew recruitment days. Expect training school (paid) before flying.",
    countries: ["australia", "newzealand", "canada"],
    visaAngle: "Some airlines want longer visa validity (12+ months) to justify training you — worth timing this for early in a visa, not the last few months.",
  },
  {
    icon: "🎪",
    title: "Event & Festival Crew",
    blurb: "Bump-in/bump-out, stagehand, box office, bar or runner work at concerts and festivals.",
    fit: "Directly on-theme — this is the same work already being done at TreebySound, just abroad.",
    howTo: "Sign up with local crewing/casual staffing agencies (they exist in most major cities) and follow local venues/festival companies for casual call-outs.",
    countries: ["australia", "newzealand", "canada"],
    visaAngle: "Great CV-builder for the Live Events & Festival Production career path — keep a running list of every show worked.",
  },
  {
    icon: "🎿",
    title: "Ski Resort & Adventure Tourism",
    blurb: "A full winter season working lift ops, hospitality or guiding at a ski town — legendary for the social side of working holidays.",
    fit: "High energy, very social, and stacks hospitality + outdoor/guiding experience in one go.",
    howTo: "Resorts (Queenstown/Wanaka in NZ, Whistler/Banff in Canada, the Australian Alps) run big seasonal hiring pushes a few months before each season opens — apply early.",
    countries: ["newzealand", "canada", "australia"],
    visaAngle: "Seasonal accommodation is often bundled with the job — budget-friendly for a working holiday.",
  },
  {
    icon: "🏕️",
    title: "Hostel & Work Exchange",
    blurb: "Reception, cleaning or bar work at a hostel in exchange for free accommodation (plus sometimes a wage).",
    fit: "Cheap way to stretch savings between paid seasonal jobs, and a fast way to meet other travellers.",
    howTo: "Sites like Workaway/HelpX-style exchanges, or just ask directly at hostels in smaller towns.",
    countries: ["australia", "newzealand", "canada"],
    visaAngle: "Useful as a bridge between seasons rather than a main income source.",
  },
  {
    icon: "🚢",
    title: "Cruise Ship Crew",
    blurb: "Hospitality, entertainment or events roles on cruise lines that circuit the Pacific/Caribbean.",
    fit: "Another genuine hospitality/events career thread, with contracts that fund travel between them.",
    howTo: "Apply directly to cruise lines or crew agencies; contracts are usually 4–8 months on, then time off.",
    countries: ["australia", "newzealand", "canada"],
    visaAngle: "Sits slightly outside the standard working-holiday timeline — treat as an alternative branch, not a filler.",
  },
  {
    icon: "🍇",
    title: "Farm & Harvest Work",
    blurb: "Fruit picking, packing or general farm work — physical, seasonal, and a fast way to unlock a 2nd Australian working holiday year for nationalities that still need to.",
    fit: "Not the most social option, but a direct, reliable route to extending the Australia leg of the trip.",
    howTo: "Regional harvest trail job boards and hostels in farming regions post daily. Accommodation is often arranged alongside the job.",
    countries: ["australia"],
    visaAngle: "UK passport holders no longer need this for a 2nd/3rd Australian year (since the 2024 UK–Australia trade deal removed the work requirement) — it's optional for him. For most other nationalities it's still the classic 'specified work' route; verify current eligible regions/industries either way.",
  },
];

const TOOLKIT_DEFAULT_NOTES = "";

const TOOLKIT_CHECKLIST_TEMPLATE = [
  { id: "passport", label: "Check passport has 12+ months validity before each visa application" },
  { id: "savings", label: "Set a savings target for arrival funds (visas often require proof of funds)" },
  { id: "visa-aus", label: "Confirm current Australia WHV eligibility & apply" },
  { id: "visa-nz", label: "Confirm current New Zealand WHV eligibility & apply" },
  { id: "visa-can", label: "Enter the Canada IEC pool & confirm invitation" },
  { id: "insurance", label: "Sort travel/health insurance for the full trip" },
  { id: "cert-rsa", label: "Get RSA / bar certifications sorted before arrival" },
  { id: "cert-firstaid", label: "Get a first-aid certificate (helps for guiding/excursion roles)" },
  { id: "cv", label: "Build a one-page CV suited to casual/hospitality applications" },
  { id: "portfolio", label: "Start a simple log/portfolio of every event worked, anywhere" },
  { id: "bank", label: "Set up a fee-free international bank card" },
  { id: "checkin", label: "Set a 6-monthly check-in with yourself: still on the right country/lane?" },
];
