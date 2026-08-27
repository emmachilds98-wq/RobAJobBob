/* RobAJobBob — app logic. Vanilla JS, no build step, everything persists
   to localStorage so this stays "his" app across visits. */

const STORAGE_KEYS = {
  profile: "raj_profile",
  visaOverrides: "raj_visa_overrides",
  includeAusExt: "raj_include_ausext",
  checklist: "raj_checklist",
  notes: "raj_notes",
};

/* ------------------------------- storage helpers -------------------------- */

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || "{}");
    return { ...DEFAULT_PROFILE, ...saved };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

const VISA_KEY_META = [
  { key: "australia", label: "🇦🇺 Australia — 1st year WHV", base: 12 },
  { key: "australia_ext", label: "🇦🇺 Australia — 2nd year (if eligible)", base: 12 },
  { key: "newzealand", label: "🇳🇿 New Zealand WHV", base: 12 },
  { key: "canada", label: "🇨🇦 Canada IEC", base: 12 },
];

function loadVisaOverrides() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.visaOverrides) || "{}");
    const merged = {};
    VISA_KEY_META.forEach((v) => (merged[v.key] = saved[v.key] ?? v.base));
    return merged;
  } catch {
    const merged = {};
    VISA_KEY_META.forEach((v) => (merged[v.key] = v.base));
    return merged;
  }
}

function saveVisaOverrides(overrides) {
  localStorage.setItem(STORAGE_KEYS.visaOverrides, JSON.stringify(overrides));
}

function loadIncludeAusExt() {
  return localStorage.getItem(STORAGE_KEYS.includeAusExt) === "1";
}

function saveIncludeAusExt(val) {
  localStorage.setItem(STORAGE_KEYS.includeAusExt, val ? "1" : "0");
}

function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist) || "{}");
  } catch {
    return {};
  }
}

function saveChecklist(state) {
  localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(state));
}

function loadNotes() {
  return localStorage.getItem(STORAGE_KEYS.notes) || TOOLKIT_DEFAULT_NOTES;
}

function saveNotes(text) {
  localStorage.setItem(STORAGE_KEYS.notes, text);
}

/* --------------------------------- date math ------------------------------ */

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

/* --------------------------------- toast ----------------------------------- */

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* --------------------------------- state ----------------------------------- */

let profile = loadProfile();

/* ---------------------------------- render: home --------------------------- */

function renderHome() {
  const el = document.getElementById("view-home");
  el.innerHTML = `
    <section class="hero">
      <h1>Hey ${escapeHtml(profile.name)} — let's map out where this all goes 🌏</h1>
      <p>
        This is your own space to plan two things side by side: the <strong>long-term career</strong>
        you haven't fully decided on yet, and the <strong>5-year working holiday</strong> across
        New Zealand, Australia and Canada you're excited about. They don't have to compete —
        this app is here to help them feed each other.
      </p>
      <div class="pills">
        <span class="pill">📍 Currently: ${escapeHtml(profile.currentRole)}</span>
        <span class="pill">🤝 ${escapeHtml(profile.currentCompany)}</span>
      </div>
    </section>

    <div class="card-grid">
      <div class="card">
        <div class="icon-badge">🧭</div>
        <h3>Career Compass</h3>
        <p>Seven realistic paths from where you are now — with the actual steps to get there.</p>
        <button class="btn ghost" data-goto="career">Explore paths →</button>
      </div>
      <div class="card">
        <div class="icon-badge">🗺️</div>
        <h3>5-Year Travel Roadmap</h3>
        <p>NZ, Australia & Canada, sequenced against real working-holiday visa lengths.</p>
        <button class="btn ghost" data-goto="roadmap">See the timeline →</button>
      </div>
      <div class="card">
        <div class="icon-badge">🎉</div>
        <h3>Casual Jobs Explorer</h3>
        <p>Bar work, excursions, flight attending & more — the fun jobs that fund the trip.</p>
        <button class="btn ghost" data-goto="jobs">Browse jobs →</button>
      </div>
      <div class="card">
        <div class="icon-badge">✅</div>
        <h3>Toolkit</h3>
        <p>A prep checklist and a notes space that's just yours.</p>
        <button class="btn ghost" data-goto="toolkit">Open toolkit →</button>
      </div>
    </div>

    <div class="section-title"><span class="emoji">💡</span><h2>The idea, in one breath</h2></div>
    <div class="card">
      <p style="margin:0;">
        Right now you're an all-rounder at TreebySound — deliveries, event setup, being the person
        Dave can hand anything to. That's not "no career yet", that's <strong>broad experience most
        people don't get until much later</strong>. The travel years are a chance to test a few
        directions (events, tourism, hospitality, aviation) in the real world before committing —
        and every casual job you take abroad can double as evidence for where you go long-term.
      </p>
    </div>
  `;
  el.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.goto));
  });
}

/* ---------------------------------- render: career -------------------------- */

function renderCareer() {
  const el = document.getElementById("view-career");
  el.innerHTML = `
    <div class="section-title"><span class="emoji">🧭</span><h2>Long-Term Career Compass</h2></div>
    <p class="section-sub">
      You've said long-term is still open — that's fine, most people your age haven't locked it in either.
      Here are seven real directions that build on what you already do at TreebySound, from the obvious
      next step to the ambitious long shot.
    </p>

    <div class="section-title" style="margin-top:12px;"><span class="emoji">🔧</span><h2 style="font-size:1.15rem;">Skills you already have (and where they point)</h2></div>
    <div class="bridge-list">
      ${SKILLS_BRIDGE.map(
        (b) => `
        <div class="bridge-row">
          <div class="from">${escapeHtml(b.from)}</div>
          <div class="arrow">➜</div>
          <div class="to">${escapeHtml(b.to)}</div>
        </div>`
      ).join("")}
    </div>

    <div class="section-title"><span class="emoji">🛤️</span><h2 style="font-size:1.15rem;">Seven paths worth weighing up</h2></div>
    <div class="card-grid">
      ${CAREER_PATHS.map(
        (p) => `
        <div class="card">
          <div class="icon-badge">${p.icon}</div>
          <span class="timeframe-tag">${escapeHtml(p.timeframe)}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="tagline">${escapeHtml(p.tagline)}</p>
          <p>${escapeHtml(p.why)}</p>
          <details>
            <summary>How to get there from here</summary>
            <p style="margin-top:8px;"><em>${escapeHtml(p.from)}</em></p>
            <ol>${p.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
          </details>
        </div>`
      ).join("")}
    </div>
  `;
}

/* --------------------------------- render: roadmap --------------------------- */

function buildPhaseSequence() {
  const includeExt = loadIncludeAusExt();
  const order = profile.countryOrder && profile.countryOrder.length
    ? profile.countryOrder
    : DEFAULT_PROFILE.countryOrder;

  const phases = [];
  order.forEach((country) => {
    const content = ROADMAP_PHASE_CONTENT[country];
    if (!content) return;
    phases.push({ ...content, country });
    if (country === "australia" && includeExt) {
      phases.push({ ...AUSTRALIA_EXT_PHASE });
    }
  });
  phases.push({ ...CONSOLIDATE_PHASE });
  return phases;
}

function computeRoadmap() {
  const visas = loadVisaOverrides();
  const start = profile.travelStartDate ? new Date(profile.travelStartDate) : new Date();

  const phases = buildPhaseSequence();

  let cursor = new Date(start);
  const totalTargetMonths = 60;
  let usedMonths = 0;
  const built = [];

  phases.forEach((phase, idx) => {
    const isLast = idx === phases.length - 1;
    let months;
    if (phase.monthsKey === "consolidate") {
      months = Math.max(totalTargetMonths - usedMonths, 3);
    } else {
      months = visas[phase.monthsKey] ?? 12;
    }
    const from = new Date(cursor);
    const to = addMonths(cursor, months);
    cursor = to;
    usedMonths += months;
    built.push({ ...phase, from, to, months, isLast });
  });

  return built;
}

function phaseStatus(from, to) {
  const now = new Date();
  if (now < from) return "upcoming";
  if (now >= from && now < to) return "current";
  return "past";
}

function renderRoadmap() {
  const el = document.getElementById("view-roadmap");
  const visas = loadVisaOverrides();
  const includeExt = loadIncludeAusExt();
  const built = computeRoadmap();

  el.innerHTML = `
    <div class="section-title"><span class="emoji">🗺️</span><h2>5-Year Travel Career Plan</h2></div>
    <p class="section-sub">
      A working-holiday route through New Zealand, Australia and Canada, laid out against realistic
      visa lengths. Everything below is editable — nudge the start date or the visa months and the
      whole timeline recalculates.
    </p>

    <div class="disclaimer">
      ⚠️ <strong>Visa lengths change and depend on nationality, age and current rules.</strong>
      The numbers here are a sensible starting default (currently set for: ${escapeHtml(profile.nationalityNote)}) —
      always confirm on the official sites before booking anything:
      <a href="https://www.immigration.govt.nz" target="_blank" rel="noopener">immigration.govt.nz</a>,
      <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noopener">immi.homeaffairs.gov.au</a>,
      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html" target="_blank" rel="noopener">canada.ca/iec</a>.
    </div>

    <div class="roadmap-controls">
      <div class="field">
        <label for="rm-start">Travel start date</label>
        <input type="date" id="rm-start" value="${profile.travelStartDate}" />
      </div>
      <div class="field">
        <label for="rm-ext">Include Australia 2nd year?</label>
        <select id="rm-ext">
          <option value="0" ${!includeExt ? "selected" : ""}>Not yet decided</option>
          <option value="1" ${includeExt ? "selected" : ""}>Yes, include it</option>
        </select>
      </div>
      <button class="btn" id="rm-apply">Update roadmap</button>
    </div>

    <div class="visa-panel">
      ${VISA_KEY_META.map(
        (v) => `
        <div class="visa-card">
          <h4>${v.label}</h4>
          <div class="months">
            <input type="number" min="1" max="36" id="visa-${v.key}" value="${visas[v.key]}" /> <small>months</small>
          </div>
          <p>${escapeHtml(VISA_DEFAULTS[v.key.replace("_ext", "")]?.extendNote || "")}</p>
        </div>`
      ).join("")}
    </div>

    <div class="section-title"><span class="emoji">📅</span><h2 style="font-size:1.15rem;">The timeline</h2></div>
    <div class="timeline">
      ${built
        .map((phase) => {
          const status = phaseStatus(phase.from, phase.to);
          const meta = phase.country ? COUNTRY_META[phase.country] : { icon: "🏁" };
          let progressHtml = "";
          if (status === "current") {
            const now = new Date();
            const pct = Math.min(
              100,
              Math.max(0, ((now - phase.from) / (phase.to - phase.from)) * 100)
            );
            progressHtml = `<div class="progress-bar"><span style="width:${pct.toFixed(0)}%"></span></div>`;
          }
          return `
          <div class="phase ${status}">
            <div class="phase-head">
              <span class="phase-flag">${meta.icon}</span>
              <h3 class="phase-title">${escapeHtml(phase.title)}</h3>
              <span class="phase-dates">${formatDate(phase.from)} → ${formatDate(phase.to)} · ${phase.months}mo</span>
            </div>
            <span class="phase-status ${status}">${status === "current" ? "Happening now" : status === "past" ? "Done" : "Upcoming"}</span>
            <p>${escapeHtml(phase.focus)}</p>
            <div class="career-link">🧭 ${escapeHtml(phase.careerLink)}</div>
            ${progressHtml}
          </div>`;
        })
        .join("")}
    </div>
  `;

  document.getElementById("rm-apply").addEventListener("click", () => {
    profile.travelStartDate = document.getElementById("rm-start").value || profile.travelStartDate;
    saveProfile(profile);
    saveIncludeAusExt(document.getElementById("rm-ext").value === "1");
    const overrides = {};
    VISA_KEY_META.forEach((v) => {
      const raw = parseInt(document.getElementById(`visa-${v.key}`).value, 10);
      overrides[v.key] = Number.isFinite(raw) && raw > 0 ? raw : v.base;
    });
    saveVisaOverrides(overrides);
    showToast("Roadmap updated ✅");
    renderRoadmap();
  });
}

/* ----------------------------------- render: jobs ---------------------------- */

function renderJobs() {
  const el = document.getElementById("view-jobs");
  el.innerHTML = `
    <div class="section-title"><span class="emoji">🎉</span><h2>Casual Jobs Explorer</h2></div>
    <p class="section-sub">
      Bar work, excursions, flight attending and more — the social, adventurous jobs that fund the
      trip and fill it with people and stories. Good fun, and worth doing on purpose — but remember
      the long-term career is the point of the trip, these are the fuel, not the destination.
    </p>
    <div class="card-grid">
      ${CASUAL_JOBS.map(
        (j) => `
        <div class="card">
          <div class="icon-badge">${j.icon}</div>
          <h3>${escapeHtml(j.title)}</h3>
          <p>${escapeHtml(j.blurb)}</p>
          <div class="country-chips">
            ${j.countries.map((c) => `<span class="country-chip">${COUNTRY_META[c].icon} ${COUNTRY_META[c].short}</span>`).join("")}
          </div>
          <details>
            <summary>Why it fits & how to get started</summary>
            <p style="margin-top:8px;"><strong>Why it fits:</strong> ${escapeHtml(j.fit)}</p>
            <p><strong>How to get started:</strong> ${escapeHtml(j.howTo)}</p>
          </details>
          <div class="visa-angle">🛂 ${escapeHtml(j.visaAngle)}</div>
        </div>`
      ).join("")}
    </div>
  `;
}

/* ---------------------------------- render: toolkit --------------------------- */

function renderToolkit() {
  const el = document.getElementById("view-toolkit");
  const checklist = loadChecklist();
  const done = TOOLKIT_CHECKLIST_TEMPLATE.filter((i) => checklist[i.id]).length;
  const pct = Math.round((done / TOOLKIT_CHECKLIST_TEMPLATE.length) * 100);

  el.innerHTML = `
    <div class="section-title"><span class="emoji">✅</span><h2>Prep Toolkit</h2></div>
    <p class="section-sub">Practical prep, tracked in one place. Everything here is saved automatically on this device.</p>

    <div class="toolkit-progress">
      <div class="progress-bar"><span style="width:${pct}%"></span></div>
      <span class="pct">${pct}%</span>
    </div>

    <div class="checklist">
      ${TOOLKIT_CHECKLIST_TEMPLATE.map(
        (item) => `
        <div class="check-item ${checklist[item.id] ? "done" : ""}">
          <input type="checkbox" id="chk-${item.id}" ${checklist[item.id] ? "checked" : ""} />
          <label for="chk-${item.id}">${escapeHtml(item.label)}</label>
        </div>`
      ).join("")}
    </div>

    <div class="section-title"><span class="emoji">📝</span><h2 style="font-size:1.15rem;">Notes to yourself</h2></div>
    <div class="card notes-box">
      <textarea id="notes-area" placeholder="Thoughts, ideas, things to look into, pep talks to future-you...">${escapeHtml(loadNotes())}</textarea>
      <p class="save-note">Saves automatically as you type.</p>
    </div>
  `;

  TOOLKIT_CHECKLIST_TEMPLATE.forEach((item) => {
    document.getElementById(`chk-${item.id}`).addEventListener("change", (e) => {
      const state = loadChecklist();
      state[item.id] = e.target.checked;
      saveChecklist(state);
      renderToolkit();
    });
  });

  let notesTimer = null;
  document.getElementById("notes-area").addEventListener("input", (e) => {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => saveNotes(e.target.value), 400);
  });
}

/* --------------------------------- render: profile ---------------------------- */

function renderProfile() {
  const el = document.getElementById("view-profile");
  el.innerHTML = `
    <div class="section-title"><span class="emoji">⚙️</span><h2>Profile & Settings</h2></div>
    <p class="section-sub">This app is tailored around one person — make sure these details are actually right.</p>

    <div class="profile-form">
      <div class="field">
        <label for="p-name">First name</label>
        <input type="text" id="p-name" value="${escapeAttr(profile.name)}" />
      </div>
      <div class="field full">
        <label for="p-role">Current role</label>
        <input type="text" id="p-role" value="${escapeAttr(profile.currentRole)}" />
      </div>
      <div class="field full">
        <label for="p-company">Current company</label>
        <input type="text" id="p-company" value="${escapeAttr(profile.currentCompany)}" />
      </div>
      <div class="field full">
        <label for="p-nationality">Nationality / visa notes</label>
        <input type="text" id="p-nationality" value="${escapeAttr(profile.nationalityNote)}" />
      </div>
      <div class="field">
        <label for="p-start">Travel start date</label>
        <input type="date" id="p-start" value="${profile.travelStartDate}" />
      </div>
    </div>

    <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn" id="p-save">Save profile</button>
      <button class="btn ghost" id="p-reset">Reset everything to defaults</button>
    </div>

    <div class="section-title" style="margin-top:30px;"><span class="emoji">🔀</span><h2 style="font-size:1.15rem;">Country order</h2></div>
    <p class="section-sub">Which country he goes to first, second and third — reorder it and the whole Travel Roadmap timeline shifts to match.</p>
    <div class="card">
      <div class="order-list" id="order-list">
        ${(profile.countryOrder || DEFAULT_PROFILE.countryOrder)
          .map(
            (c, i, arr) => `
          <div class="order-chip">
            <span>${i + 1}. ${COUNTRY_META[c].icon} ${COUNTRY_META[c].short}</span>
            <button type="button" data-move="up" data-idx="${i}" ${i === 0 ? "disabled" : ""} title="Move earlier">▲</button>
            <button type="button" data-move="down" data-idx="${i}" ${i === arr.length - 1 ? "disabled" : ""} title="Move later">▼</button>
          </div>`
          )
          .join("")}
      </div>
      <p class="save-note">Saves instantly — no need to hit Save profile for this bit.</p>
    </div>
  `;

  document.getElementById("p-save").addEventListener("click", () => {
    profile = {
      ...profile,
      name: document.getElementById("p-name").value.trim() || DEFAULT_PROFILE.name,
      currentRole: document.getElementById("p-role").value.trim() || DEFAULT_PROFILE.currentRole,
      currentCompany: document.getElementById("p-company").value.trim() || DEFAULT_PROFILE.currentCompany,
      nationalityNote: document.getElementById("p-nationality").value.trim() || DEFAULT_PROFILE.nationalityNote,
      travelStartDate: document.getElementById("p-start").value || DEFAULT_PROFILE.travelStartDate,
    };
    saveProfile(profile);
    showToast("Profile saved ✅");
    renderAll();
  });

  document.getElementById("p-reset").addEventListener("click", () => {
    if (!confirm("Reset the profile, roadmap settings, checklist and notes back to defaults?")) return;
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    profile = loadProfile();
    showToast("Reset to defaults");
    renderAll();
  });

  document.getElementById("order-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-move]");
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    const order = [...(profile.countryOrder || DEFAULT_PROFILE.countryOrder)];
    const swapWith = btn.dataset.move === "up" ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= order.length) return;
    [order[idx], order[swapWith]] = [order[swapWith], order[idx]];
    profile = { ...profile, countryOrder: order };
    saveProfile(profile);
    showToast("Country order updated ✅");
    renderProfile();
    renderRoadmap();
  });
}

/* ----------------------------------- tabs / boot ------------------------------ */

function switchTab(id) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  document.getElementById(`view-${id}`).classList.add("active");
  document.querySelector(`.tab-btn[data-tab="${id}"]`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  document.getElementById("greet-name").textContent = profile.name;
  renderHome();
  renderCareer();
  renderRoadmap();
  renderJobs();
  renderToolkit();
  renderProfile();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function escapeAttr(str) {
  return escapeHtml(str);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
  renderAll();
});
