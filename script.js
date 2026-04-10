const form = document.getElementById("plan-form");
const output = document.getElementById("plan-output");
const weekTemplate = document.getElementById("week-template");
const runTemplate = document.getElementById("run-template");
const resetBtn = document.getElementById("reset-plan");
const clearPlanBtn = document.getElementById("clear-plan");

const completedRunsEl = document.getElementById("completed-runs");
const totalRunsEl = document.getElementById("total-runs");
const completionPercentEl = document.getElementById("completion-percent");
const progressBar = document.getElementById("progress-bar");

const isPlanPage = Boolean(output && weekTemplate && runTemplate);

const state = {
  weeks: [],
};

const runTypes = ["Easy Run", "Tempo Run", "Interval Session", "Long Run", "Recovery Jog"];

const raceTargetsMiles = {
  "5K": 3.1,
  "10K": 6.2,
  "Half Marathon": 13.1,
  "Marathon": 26.2,
  "50K": 31.1,
  "50 Miler": 50,
  "100 Miler": 100,
};

const raceProfiles = {
  "5K": {
    Beginner: { startWeeklyMiles: 10, peakWeeklyMiles: 20, peakLongRunMiles: 6, taperWeeks: 1 },
    Intermediate: { startWeeklyMiles: 16, peakWeeklyMiles: 28, peakLongRunMiles: 8, taperWeeks: 1 },
    Advanced: { startWeeklyMiles: 22, peakWeeklyMiles: 34, peakLongRunMiles: 9, taperWeeks: 1 },
    Pro: { startWeeklyMiles: 28, peakWeeklyMiles: 46, peakLongRunMiles: 11, taperWeeks: 1 },
  },
  "10K": {
    Beginner: { startWeeklyMiles: 14, peakWeeklyMiles: 28, peakLongRunMiles: 9, taperWeeks: 2 },
    Intermediate: { startWeeklyMiles: 20, peakWeeklyMiles: 36, peakLongRunMiles: 11, taperWeeks: 2 },
    Advanced: { startWeeklyMiles: 26, peakWeeklyMiles: 44, peakLongRunMiles: 13, taperWeeks: 2 },
    Pro: { startWeeklyMiles: 34, peakWeeklyMiles: 58, peakLongRunMiles: 16, taperWeeks: 2 },
  },
  "Half Marathon": {
    Beginner: { startWeeklyMiles: 18, peakWeeklyMiles: 35, peakLongRunMiles: 11, taperWeeks: 2 },
    Intermediate: { startWeeklyMiles: 24, peakWeeklyMiles: 44, peakLongRunMiles: 13, taperWeeks: 2 },
    Advanced: { startWeeklyMiles: 32, peakWeeklyMiles: 56, peakLongRunMiles: 15, taperWeeks: 2 },
    Pro: { startWeeklyMiles: 42, peakWeeklyMiles: 72, peakLongRunMiles: 17, taperWeeks: 2 },
  },
  "Marathon": {
    Beginner: { startWeeklyMiles: 24, peakWeeklyMiles: 42, peakLongRunMiles: 18, taperWeeks: 3 },
    Intermediate: { startWeeklyMiles: 30, peakWeeklyMiles: 52, peakLongRunMiles: 20, taperWeeks: 3 },
    Advanced: { startWeeklyMiles: 38, peakWeeklyMiles: 62, peakLongRunMiles: 22, taperWeeks: 3 },
    Pro: { startWeeklyMiles: 50, peakWeeklyMiles: 85, peakLongRunMiles: 24, taperWeeks: 3 },
  },
  "50K": {
    Beginner: { startWeeklyMiles: 28, peakWeeklyMiles: 50, peakLongRunMiles: 22, taperWeeks: 3 },
    Intermediate: { startWeeklyMiles: 34, peakWeeklyMiles: 58, peakLongRunMiles: 25, taperWeeks: 3 },
    Advanced: { startWeeklyMiles: 42, peakWeeklyMiles: 70, peakLongRunMiles: 29, taperWeeks: 3 },
    Pro: { startWeeklyMiles: 54, peakWeeklyMiles: 92, peakLongRunMiles: 33, taperWeeks: 3 },
  },
  "50 Miler": {
    Beginner: { startWeeklyMiles: 34, peakWeeklyMiles: 60, peakLongRunMiles: 26, taperWeeks: 3 },
    Intermediate: { startWeeklyMiles: 42, peakWeeklyMiles: 72, peakLongRunMiles: 31, taperWeeks: 3 },
    Advanced: { startWeeklyMiles: 52, peakWeeklyMiles: 88, peakLongRunMiles: 35, taperWeeks: 3 },
    Pro: { startWeeklyMiles: 64, peakWeeklyMiles: 108, peakLongRunMiles: 40, taperWeeks: 3 },
  },
  "100 Miler": {
    Beginner: { startWeeklyMiles: 42, peakWeeklyMiles: 70, peakLongRunMiles: 30, taperWeeks: 4 },
    Intermediate: { startWeeklyMiles: 52, peakWeeklyMiles: 84, peakLongRunMiles: 34, taperWeeks: 4 },
    Advanced: { startWeeklyMiles: 62, peakWeeklyMiles: 100, peakLongRunMiles: 39, taperWeeks: 4 },
    Pro: { startWeeklyMiles: 76, peakWeeklyMiles: 125, peakLongRunMiles: 44, taperWeeks: 4 },
  },
};

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildRunTypeSequence(runsPerWeek) {
  const sequence = runTypes.slice(0, runsPerWeek);
  if (!sequence.includes("Long Run")) {
    sequence[sequence.length - 1] = "Long Run";
  }
  return sequence;
}

function getRunWeight(runType) {
  if (runType === "Long Run") return 2.6;
  if (runType === "Tempo Run") return 1.4;
  if (runType === "Interval Session") return 1.25;
  if (runType === "Recovery Jog") return 0.9;
  return 1.1;
}

function getTaperFactor(weeksOut) {
  if (weeksOut === 0) return 0.35;
  if (weeksOut === 1) return 0.5;
  if (weeksOut === 2) return 0.7;
  return 0.8;
}

function generateWeeklyMileageTargets({
  weeks,
  startWeeklyMiles,
  peakWeeklyMiles,
  taperWeeks,
  cutbackDrop = 0.18,
  maxWeekGrowth = 0.12,
}) {
  const targets = [];
  const safeTaperWeeks = clamp(taperWeeks, 1, 4);
  const buildWeeks = Math.max(weeks - safeTaperWeeks, 1);
  let previous = startWeeklyMiles;

  for (let week = 0; week < weeks; week += 1) {
    const weeksOut = weeks - week - 1;
    let target;

    if (weeksOut < safeTaperWeeks) {
      target = peakWeeklyMiles * getTaperFactor(weeksOut);
    } else {
      const buildProgress = week / Math.max(buildWeeks - 1, 1);
      const planned = startWeeklyMiles + (peakWeeklyMiles - startWeeklyMiles) * buildProgress;
      const isCutback = week > 0 && (week + 1) % 4 === 0;
      target = isCutback ? previous * (1 - cutbackDrop) : planned;
      target = Math.min(target, previous * (1 + maxWeekGrowth));
    }

    target = clamp(target, 8, 140);
    targets.push(Math.round(target * 2) / 2);
    previous = target;
  }

  return targets;
}

function createPlan({ goalDistance, runnerLevel, weeks, runsPerWeek, startDate }) {
  const goalMiles = raceTargetsMiles[goalDistance];
  const profile = raceProfiles[goalDistance][runnerLevel];
  const startWeeklyMiles = profile.startWeeklyMiles;
  const possiblePeak = startWeeklyMiles * (1 + 0.07 * Math.max(weeks - 1, 0));
  const levelCutbackDrop = runnerLevel === "Pro" ? 0.13 : runnerLevel === "Advanced" ? 0.15 : 0.18;
  const levelMaxGrowth = runnerLevel === "Pro" ? 0.09 : runnerLevel === "Advanced" ? 0.1 : 0.12;
  const peakWeeklyMiles = clamp(
    Math.min(profile.peakWeeklyMiles, possiblePeak),
    startWeeklyMiles + 2,
    130,
  );
  const weeklyTargets = generateWeeklyMileageTargets({
    weeks,
    startWeeklyMiles,
    peakWeeklyMiles,
    taperWeeks: profile.taperWeeks,
    cutbackDrop: levelCutbackDrop,
    maxWeekGrowth: levelMaxGrowth,
  });
  const plan = [];

  for (let week = 0; week < weeks; week += 1) {
    const weekStart = addDays(startDate, week * 7);
    const weekRuns = [];
    const weekTarget = weeklyTargets[week];
    const weekRunTypes = buildRunTypeSequence(runsPerWeek);
    const runWeights = weekRunTypes.map(getRunWeight);
    const totalWeight = runWeights.reduce((sum, w) => sum + w, 0);

    for (let runIdx = 0; runIdx < runsPerWeek; runIdx += 1) {
      const runType = weekRunTypes[runIdx];
      let miles = (weekTarget * runWeights[runIdx]) / totalWeight;
      if (runType === "Long Run") {
        const longRunCapByGoal = Math.min(profile.peakLongRunMiles, goalMiles * 0.7);
        const longRunFloor = Math.max(goalMiles * 0.18, longRunCapByGoal * 0.55);
        miles = clamp(miles, longRunFloor, longRunCapByGoal);
      }
      const roundedMiles = clamp(Math.round(miles * 2) / 2, 1.5, 80);
      const dayOffset = Math.floor((7 / (runsPerWeek + 1)) * (runIdx + 1));
      const date = addDays(weekStart, dayOffset);

      weekRuns.push({
        id: `${week + 1}-${runIdx + 1}`,
        type: runType,
        distanceMiles: roundedMiles,
        date: formatDate(date),
        done: false,
      });
    }

    plan.push({
      weekNumber: week + 1,
      weekStart: formatDate(weekStart),
      weekTargetMiles: weekTarget,
      runs: weekRuns,
    });
  }

  return plan;
}

function saveState() {
  localStorage.setItem("ultra-plan-state", JSON.stringify(state.weeks));
}

function loadState() {
  const raw = localStorage.getItem("ultra-plan-state");
  if (!raw) {
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      state.weeks = parsed;
    }
  } catch (_error) {
    localStorage.removeItem("ultra-plan-state");
  }
}

function setupWeekAccordion(detailsEl) {
  const body = detailsEl.querySelector(".week-body");
  if (!body) {
    return;
  }

  const syncHeight = () => {
    if (!detailsEl.open) {
      body.style.maxHeight = "0px";
      return;
    }
    const inner = body.querySelector(".week-body-inner");
    const h = inner ? inner.scrollHeight : body.scrollHeight;
    body.style.maxHeight = `${h}px`;
  };

  detailsEl.addEventListener("toggle", () => {
    if (detailsEl.open) {
      requestAnimationFrame(() => {
        syncHeight();
      });
    } else {
      body.style.maxHeight = "0px";
    }
  });

  const inner = body.querySelector(".week-body-inner");
  if (inner && typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => {
      if (detailsEl.open) {
        syncHeight();
      }
    });
    ro.observe(inner);
  }
}

function updateProgress() {
  if (!completedRunsEl || !totalRunsEl || !completionPercentEl || !progressBar) {
    return;
  }
  const allRuns = state.weeks.flatMap((week) => week.runs);
  const totalRuns = allRuns.length;
  const completedRuns = allRuns.filter((run) => run.done).length;
  const percent = totalRuns ? Math.round((completedRuns / totalRuns) * 100) : 0;

  completedRunsEl.textContent = String(completedRuns);
  totalRunsEl.textContent = String(totalRuns);
  completionPercentEl.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

const emptyPlanHtml =
  '<div class="empty-state"><p class="empty-plan-msg">No plan here yet. <a href="index.html">Create a plan</a> and we’ll show your weeks below.</p></div>';

function renderPlan() {
  if (!isPlanPage || !output || !weekTemplate || !runTemplate) {
    return;
  }

  output.innerHTML = "";

  if (!state.weeks.length) {
    output.innerHTML = emptyPlanHtml;
    updateProgress();
    return;
  }

  state.weeks.forEach((week, weekIndex) => {
    const weekNode = weekTemplate.content.firstElementChild.cloneNode(true);
    const title = weekNode.querySelector("h3");
    const totalMilesLabel = weekNode.querySelector(".week-total");
    const meta = weekNode.querySelector(".week-meta");
    const runList = weekNode.querySelector(".run-list");
    const weekTotalMiles = Math.round(
      week.runs.reduce((sum, run) => sum + Number(run.distanceMiles ?? run.distanceKm ?? 0), 0) * 10,
    ) / 10;

    title.textContent = `Week ${week.weekNumber}`;
    totalMilesLabel.textContent = `${weekTotalMiles} mi total`;
    const targetMiles = week.weekTargetMiles ?? "N/A";
    meta.textContent = `Starts ${week.weekStart} - Target ${targetMiles} mi`;
    weekNode.open = false;

    week.runs.forEach((run, runIndex) => {
      const runNode = runTemplate.content.firstElementChild.cloneNode(true);
      runNode.classList.add("run-item-animate");
      runNode.style.setProperty("--run-index", String(runIndex));
      const checkbox = runNode.querySelector(".run-check");
      const text = runNode.querySelector(".run-text");
      const mileageLink = runNode.querySelector(".run-mileage-link");
      const nutritionLink = runNode.querySelector(".run-nutrition-btn");

      const rawDistance = run.distanceMiles ?? run.distanceKm;
      const distanceNum = Number(rawDistance);
      const hasDistance = Number.isFinite(distanceNum) && distanceNum > 0;
      const distanceLabel = hasDistance ? String(distanceNum) : String(rawDistance ?? "");
      const nutritionHref = hasDistance
        ? `nutrition.html?miles=${encodeURIComponent(String(distanceNum))}`
        : "plan.html";

      text.textContent = `${run.date} - ${run.type} - ${distanceLabel} mi`;
      checkbox.checked = run.done;
      checkbox.setAttribute(
        "aria-label",
        `Mark complete: ${run.date}, ${run.type}`,
      );
      if (mileageLink) {
        mileageLink.href = nutritionHref;
        mileageLink.setAttribute(
          "aria-label",
          hasDistance
            ? `Open mileage fuel for ${distanceNum} mile run (${run.date})`
            : "Weekly plan — set a run distance to open mileage fuel",
        );
      }
      if (nutritionLink) {
        nutritionLink.href = nutritionHref;
        nutritionLink.setAttribute(
          "aria-label",
          hasDistance
            ? `Nutrition guide for ${distanceNum} mile run`
            : "Weekly plan — set a run distance to open mileage fuel",
        );
      }

      checkbox.addEventListener("change", () => {
        state.weeks[weekIndex].runs[runIndex].done = checkbox.checked;
        saveState();
        updateProgress();
      });

      runList.appendChild(runNode);
    });

    weekNode.style.setProperty("--week-index", String(weekIndex));
    weekNode.classList.add("week-card-animate");
    output.appendChild(weekNode);
    setupWeekAccordion(weekNode);
    if (weekNode.open) {
      requestAnimationFrame(() => {
        const body = weekNode.querySelector(".week-body");
        if (!body) {
          return;
        }
        const inner = body.querySelector(".week-body-inner");
        const h = inner ? inner.scrollHeight : 0;
        body.style.maxHeight = `${h}px`;
      });
    }
  });

  updateProgress();
}

function setDefaultDate() {
  const dateInput = document.getElementById("start-date");
  if (!dateInput) {
    return;
  }
  const today = new Date();
  const iso = today.toISOString().slice(0, 10);
  dateInput.value = iso;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const goalDistance = document.getElementById("goal-distance").value;
    const runnerLevel = document.getElementById("runner-level").value;
    const weeks = Number(document.getElementById("plan-weeks").value);
    const runsPerWeek = Number(document.getElementById("runs-per-week").value);
    const startDateRaw = document.getElementById("start-date").value;
    const startDate = startDateRaw ? new Date(startDateRaw) : new Date();

    state.weeks = createPlan({
      goalDistance,
      runnerLevel,
      weeks: clamp(weeks, 4, 30),
      runsPerWeek: clamp(runsPerWeek, 2, 7),
      startDate,
    });
    saveState();
    window.location.href = "plan.html";
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    state.weeks = [];
    localStorage.removeItem("ultra-plan-state");
    if (form) {
      form.reset();
    }
    setDefaultDate();
  });
}

if (clearPlanBtn) {
  clearPlanBtn.addEventListener("click", () => {
    state.weeks = [];
    localStorage.removeItem("ultra-plan-state");
    window.location.href = "index.html";
  });
}

setDefaultDate();
loadState();
renderPlan();
