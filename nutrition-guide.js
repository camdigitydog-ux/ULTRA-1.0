/**
 * Mileage-based fueling ranges for training (not medical or dietetic advice).
 * Bands use ~9 min/mi to estimate hours for on-card math; individualize by actual
 * duration, intensity, climate, and health. Reference 154 lb (70 kg) for g per lb examples.
 */
(function () {
  /** @typedef {{ amount: string, timing: string, meals: string }} NutrientRow */

  /** @param {string} amount @param {string} timing @param {string} meals @returns {NutrientRow} */
  function row(amount, timing, meals) {
    return { amount, timing, meals };
  }

  const GUIDES = [
    {
      minMiles: 0,
      maxMiles: 5,
      label: "Under 5 mi",
      blurb: "Usually under 30–45 minutes at typical easy paces. Muscle glycogen is rarely limiting; research suggests intra-run carbs are usually unnecessary unless you’re fasted or pushing very hard.",
      pre: {
        carbs: row(
          "0–0.45 g per lb if eating (often 0–50 g total)",
          "1–3 h before if hungry; low fiber/fat if close to start",
          "Banana, toast, small bagel, fruit, dry cereal, or train fasted if it works for you",
        ),
        protein: row(
          "10–20 g (optional)",
          "With any pre-run snack",
          "Greek yogurt, eggs, nut butter, milk in coffee",
        ),
        sodium: row(
          "Normal meal sodium",
          "In whatever you eat beforehand",
          "Cheese on toast, soup, salted nuts—skip if not hungry",
        ),
        water: row(
          "Often 12–18 fl oz in the 4 h before (more if you’re heavier than ~150–170 lb)",
          "Start euhydrated; small sips near start if thirsty",
          "Water, coffee, tea—avoid chugging right before the run",
        ),
        electrolytes: row(
          "Usually from food",
          "Not a focus for short runs",
          "Plain water; light sports drink only if you prefer the taste",
        ),
      },
      during: {
        carbs: row(
          "Usually none",
          "Exercise under 30 min rarely needs carbs; mouth rinse or tiny sip OK if studied for you",
          "—",
        ),
        protein: row("—", "—", "—"),
        sodium: row("—", "—", "—"),
        water: row(
          "Drink to thirst",
          "Short runs: small volumes unless heat is high",
          "Water; a few ounces if very hot/humid",
        ),
        electrolytes: row(
          "Not required",
          "Unless you sweat heavily in heat",
          "Water first; sports drink only if practiced",
        ),
      },
      post: {
        carbs: row(
          "Next normal meal is enough for many",
          "If next meal >3–4 h away, add about 0.2–0.45 g carbs per lb body weight",
          "Fruit, oats, sandwich, smoothie—no need to “max” glycogen after easy short runs",
        ),
        protein: row(
          "0.1–0.2 g protein per lb in the next meal",
          "Within a few hours with usual eating",
          "Yogurt, eggs, fish, tofu, lean meat",
        ),
        sodium: row(
          "As in a normal meal",
          "With lunch or dinner",
          "Balanced plate; extra salt only if you sweated a lot",
        ),
        water: row(
          "Replace fluid over the day",
          "Drink with meals; pale urine is a simple check",
          "Water, milk, tea with food",
        ),
        electrolytes: row(
          "From food + fluids",
          "With recovery meal if long day overall",
          "Chocolate milk, broth, sports drink if you like them",
        ),
      },
    },
    {
      minMiles: 5,
      maxMiles: 8,
      label: "5–8 mi",
      blurb: "Often 45–75+ minutes depending on pace—around where small amounts of carb during exercise can help some athletes (especially past 60–75 min or in heat).",
      pre: {
        carbs: row(
          "0.45–1.1 g carbs per lb in the 1–3 h window (e.g. about 70–170 g for a 154 lb runner if 3 h out)",
          "Larger, low-fiber meal earlier; about 0.2–0.45 g per lb if only 60 min before",
          "Oatmeal + banana, rice bowl, bagel + jam, potatoes, rice cakes",
        ),
        protein: row(
          "15–25 g",
          "In the same meal",
          "Eggs, yogurt, lean chicken, tofu—keep fat moderate if gut-sensitive",
        ),
        sodium: row(
          "400–800 mg",
          "In breakfast or pre-run meal",
          "Toast + cheese, miso soup, salted avocado toast",
        ),
        water: row(
          "Often 12–18 fl oz in the 4 h before + sips after (scale up if heavier)",
          "Arrive hydrated; small sips in last 15–20 min only if practiced",
          "Water between meals; optional 15–30 g carb liquid if <60 min to start",
        ),
        electrolytes: row(
          "Match your during-run drink",
          "If you’ll use sports drink on the run, sip the same mix beforehand",
          "Half-strength sports drink, electrolyte tablet in water",
        ),
      },
      during: {
        carbs: row(
          "Usually 0–30 g total for the whole run",
          "If duration nears 60–75+ min or RPE is high: small amounts (<30 g/h max)",
          "Half gel + water, few chews, or mouth rinse strategy if studied for you",
        ),
        protein: row("—", "—", "—"),
        sodium: row(
          "Light sodium if using sports drink",
          "Scale to sweat and heat",
          "Electrolyte drink from handheld; plain water if short/cool",
        ),
        water: row(
          "Drink to thirst; planned sips in heat",
          "Often 3–6 fl oz every 15–20 min if sweating",
          "Water or diluted sports drink",
        ),
        electrolytes: row(
          "If sweating heavily",
          "Prefer drink mix over tabs alone for this distance",
          "Half-strength sports drink, single tab in bottle",
        ),
      },
      post: {
        carbs: row(
          "About 0.35–0.55 g carbs per lb in the first 2 h if you’ll train again soon",
          "Otherwise a normal balanced meal is fine",
          "Rice + veg, sweet potato, fruit, pancakes, smoothie",
        ),
        protein: row(
          "0.1–0.2 g protein per lb in the same meal/snack",
          "Within 2 h",
          "Greek yogurt, eggs, fish, chicken, tofu",
        ),
        sodium: row(
          "600–1200 mg if hot/salty sweat",
          "Across recovery meal/snacks",
          "Burrito, ramen, pickles, salted nuts",
        ),
        water: row(
          "Replace sweat loss over several hours",
          "Weigh before/after occasionally to learn your sweat rate",
          "Water with meals; add electrolytes if you’re a salty/heavy sweater",
        ),
        electrolytes: row(
          "Carbs + sodium together aid retention",
          "First bottle + meal",
          "Chocolate milk, recovery shake, broth",
        ),
      },
    },
    {
      minMiles: 8,
      maxMiles: 12,
      label: "8–12 mi",
      blurb: "Often ~75–120+ minutes at easy paces—fueling is driven by duration more than miles. Past ~60–90 min, exogenous carbs usually help; many athletes use about 30–60 g/h once they start fueling (start early, train the gut). Frameworks differ slightly by source—use what you tolerate.",
      pre: {
        carbs: row(
          "0.9–1.6 g carbs per lb in the 2–4 h window (taper fiber/fat)",
          "Example: about 140–245 g total for a 154 lb runner if eating 3–4 h out; less if closer to start",
          "Rice, oats, potatoes, bagels, low-fiber toast, rice cakes, bananas",
        ),
        protein: row(
          "15–25 g",
          "Same meal as carbs",
          "Eggs, yogurt, small portion fish or tofu",
        ),
        sodium: row(
          "500–1000 mg",
          "With savory breakfast",
          "Savory oatmeal, egg + cheese sandwich, small soup",
        ),
        water: row(
          "Often 12–17 fl oz by 4 h pre-run for a ~150 lb runner; scale with body weight; then small sips",
          "Avoid arriving thirsty; don’t overload in the last 20 min",
          "Water + planned electrolyte mix if you’ll drink it on the run",
        ),
        electrolytes: row(
          "Match on-course or long-run bottle",
          "Practice the exact products you’ll use",
          "Sports drink, electrolyte powder—read sodium per quart (32 fl oz) on the label",
        ),
      },
      during: {
        carbs: row(
          "30–60 g per hour (after first 45–60 min for many)",
          "Earlier fueling is easier on the gut than a late catch-up",
          "Gels + water, chews, drink mix, dates—split doses every 15–20 min",
        ),
        protein: row("—", "—", "—"),
        sodium: row(
          "200–600 mg/h (wide range by sweat)",
          "Use drink labels; add salt if you’re a salty sweater",
          "Sports drink, pretzels on loops, electrolyte mix",
        ),
        water: row(
          "Often 12–20 fl oz/h in moderate heat; less if cool",
          "Drink to thirst + schedule if you under-drink",
          "Alternate water and electrolyte drink if using both",
        ),
        electrolytes: row(
          "400–800 mg sodium per quart of fluid (32 fl oz) is a common starting band",
          "Tune to cramping, thirst, and sweat saltiness",
          "Tabs + water, sports drink, pinch salt in bottle (if practiced)",
        ),
      },
      post: {
        carbs: row(
          "About 0.45–0.55 g carbs per lb per hour for up to 4 h if glycogen matters soon",
          "Otherwise about 0.45 g per lb in the first meal is a practical target",
          "Pasta, rice bowl, smoothie + oats, potatoes, juice",
        ),
        protein: row(
          "0.1–0.2 g protein per lb with those carbs",
          "Within 2 h is ideal, not mandatory perfection",
          "Fish, chicken, Greek yogurt, tofu, chocolate milk",
        ),
        sodium: row(
          "800–1500 mg if session was long/hot",
          "Across snacks/meals",
          "Broth, pickles, salted rice, ramen",
        ),
        water: row(
          "Replace 150% of sweat loss over several hours if you track weight",
          "Otherwise drink with meals until urine is pale",
          "Water between meals; electrolyte if headachy or very salty sweat",
        ),
        electrolytes: row(
          "Food + fluids beat water alone after heavy sweat",
          "First meal and next bottle",
          "Sports drink, soup, coconut water blend",
        ),
      },
    },
    {
      minMiles: 12,
      maxMiles: 16,
      label: "12–16 mi",
      blurb: "Usually 1.5–2.5+ hours for many runners—fueling often trends toward the high end of 30–60 g/h or 60 g/h as you approach multi-hour duration; fluid and sodium should follow your tested sweat pattern.",
      pre: {
        carbs: row(
          "1.1–1.8 g carbs per lb in the 2–4 h window (low fiber/fat)",
          "Optional 15–30 g quick carb in last 10–15 min only if gut-trained",
          "Rice bowls, potatoes, bagels, low-fiber pancakes, rice cakes",
        ),
        protein: row(
          "20–30 g",
          "In pre-run meal",
          "Eggs, Greek yogurt, lean turkey",
        ),
        sodium: row(
          "600–1200 mg",
          "With meal (ask clinician if sodium-restricted)",
          "Savory rice, soup, cheese toast, olives",
        ),
        water: row(
          "Often 12–17 fl oz by 4 h pre for a ~150 lb runner; scale with weight; then small sips",
          "Stop heavy drinking 15–20 min before start",
          "Water + the electrolyte concentration you’ll drink while running",
        ),
        electrolytes: row(
          "Full-strength mix per label",
          "Morning bottle + breakfast aligned with race plan",
          "Electrolyte drink, banana + sports drink",
        ),
      },
      during: {
        carbs: row(
          "45–60 g/h for many (30–45 g/h if gut is sensitive)",
          "From early in the run; steady beats bingeing",
          "Gels + water, chews, drink mix, boiled potatoes, maple syrup packets",
        ),
        protein: row(
          "Usually not a focus yet (0–5 g/h max if composite drink)",
          "Only if you’ve practiced it without GI issues",
          "Some “fuel” drinks include a little protein—follow label",
        ),
        sodium: row(
          "300–800 mg/h depending on heat & sweat sodium",
          "Match fluid plan; salty sweaters trend higher",
          "Sports drink, salt caps only at doses you’ve tested",
        ),
        water: row(
          "Often 14–24 fl oz/h in warm conditions",
          "Less in cold/dry; avoid stomach sloshing",
          "Handheld, vest, or loops—sip, don’t chug",
        ),
        electrolytes: row(
          "Know mg sodium per bottle (primary); Mg/K if in your mix",
          "Steady intake beats huge single doses",
          "Electrolyte drink, occasional broth cup if racing",
        ),
      },
      post: {
        carbs: row(
          "About 0.45–0.55 g carbs per lb per hour for several hours if training hard again <24 h",
          "Otherwise prioritize a large carb-rich meal soon",
          "Rice + beans, pizza slice, smoothie bowls, juice",
        ),
        protein: row(
          "0.1–0.2 g protein per lb per eating occasion",
          "First meal + again later same day",
          "Salmon, chicken, Greek yogurt, lentil stew",
        ),
        sodium: row(
          "1000–2000 mg if long + hot",
          "Spread through food",
          "Pho, burrito, pickles, salted crackers",
        ),
        water: row(
          "150% of sweat loss over 4–6 h if you track weight",
          "With sodium-containing foods/fluids",
          "Water + electrolyte between meals",
        ),
        electrolytes: row(
          "Food + sports drink until rested",
          "Ongoing until urine pale",
          "Broth, recovery mix, salted potatoes",
        ),
      },
    },
    {
      minMiles: 16,
      maxMiles: 23,
      label: "16–23 mi",
      blurb: "Often 2–4+ hours—many athletes target about 60 g carbohydrate/hour for multi-hour work; higher intakes (70–90 g/h) are mainly for gut-trained athletes using mixed carbs (e.g. glucose + fructose). Rehearse your race nutrition here.",
      pre: {
        carbs: row(
          "1.4–1.8 g carbs per lb in the 2–4 h window + optional small top-up if trained",
          "Low fiber/fat; familiar foods only",
          "White rice, bagels, potatoes, rice cakes, plain toast",
        ),
        protein: row(
          "20–35 g",
          "In pre meal",
          "Eggs, fish, tofu—keep fat moderate",
        ),
        sodium: row(
          "800–1500 mg",
          "With meal + pre-hydration (medical diets: ask your clinician)",
          "Soup, ham + cheese sandwich, pickles",
        ),
        water: row(
          "Often 12–17 fl oz by 4 h pre for a ~150 lb runner; scale with weight; then small sips",
          "Match bottles to on-run concentration you’ve practiced",
          "Water + electrolyte mix you’ll use on course",
        ),
        electrolytes: row(
          "Same products as race/long run",
          "Morning bottle + breakfast",
          "Full-strength sports drink, sodium from food + drink",
        ),
      },
      during: {
        carbs: row(
          "60 g/h typical target; 70–90 g/h only if gut-trained",
          "Use glucose + fructose sources for high rates (gels, chews, mix, cola if practiced)",
          "Gels + water, blocks, drink mix, flat cola, potatoes",
        ),
        protein: row(
          "Usually 0–8 g/h (small real-food bits if practiced)",
          "Not required for glycogen; optional for satiety/variety",
          "Perogies, bites of sandwich, composite drink per label",
        ),
        sodium: row(
          "400–1000 mg/h (heat & salty sweat → higher)",
          "Align with fluid; avoid untested mega-doses",
          "Sports drink, broth, salted potatoes, planned caps",
        ),
        water: row(
          "Often 16–28 fl oz/h in warm marathons; individual",
          "Drinking schedule + thirst; know your sweat rate if possible",
          "Alternate water and electrolyte bottles",
        ),
        electrolytes: row(
          "Track mg sodium per hour from all sources",
          "Rotate with plain water to avoid overload",
          "Chews with sodium, drink mix, tested cap protocol",
        ),
      },
      post: {
        carbs: row(
          "About 0.45–0.55 g carbs per lb per hour early if you need rapid glycogen (e.g. quick turnaround)",
          "Otherwise frequent carb meals/snacks the rest of the day",
          "Rice plates, noodles, juice, bagels, fruit",
        ),
        protein: row(
          "0.1–0.2 g protein per lb per meal; 35–50 g is common first meal",
          "2–6 h post and again later",
          "Lean burger, chicken + rice, eggs, Greek yogurt",
        ),
        sodium: row(
          "1500–2500 mg across the day if depleted",
          "Especially if dizzy, crampy, or very salty crust",
          "Ramen, pizza, salted nuts, olives, table salt on meals",
        ),
        water: row(
          "Replace fluid deficit over many hours; don’t only chug plain water",
          "Until weight and urine normalize",
          "Water + electrolyte between meals",
        ),
        electrolytes: row(
          "Soup + drinks spread through the day",
          "ORS-style fluids if very dehydrated (medical issues: seek care)",
          "Broth, recovery mix, coconut water blend",
        ),
      },
    },
    {
      minMiles: 23,
      maxMiles: Infinity,
      label: "23+ mi",
      blurb: "Ultra-length efforts (often 4+ hours for many)—high hourly carb intakes (up to 90 g/h) require training the gut and usually mixed carbohydrate types; add variety, sodium, and fluid to match long-hour sweat losses.",
      pre: {
        carbs: row(
          "High carb 24–48 h: often about 3.5–5.5 g carbs per lb per day for trained athletes (spread meals)",
          "Morning of: about 0.45–1.4 g per lb familiar low-fiber carbs",
          "Pasta/rice night, potatoes, toast, bagels, rice cakes—avoid new foods",
        ),
        protein: row(
          "25–40 g per major meal (don’t skip protein days before)",
          "Race morning: modest, familiar",
          "Chicken, fish, eggs—less if gut-sensitive",
        ),
        sodium: row(
          "1000–2500 mg/day distributed (not sodium-restricted diets)",
          "Use foods you’ve practiced; ask MD if BP/renal issues",
          "Soup, pizza, pickles, soy sauce, cheese",
        ),
        water: row(
          "Sip to thirst + pale urine the day before",
          "Race morning: small volumes; avoid waterloading plain water",
          "Include sodium with fluids you’ll actually use on course",
        ),
        electrolytes: row(
          "Same products as during the event",
          "Night before + morning bottles",
          "Verify Na (and any K/Mg) on labels; match crew/aid plan",
        ),
      },
      during: {
        carbs: row(
          "60–90 g/h if gut-trained (start lower, build in training)",
          "Mix glucose + fructose sources for higher rates (gels, chews, drink, real food)",
          "Gels, potatoes, rice balls, drink mix, candy, flat soda if practiced",
        ),
        protein: row(
          "Small amounts if tolerated (often 5–15 g/h max from real food)",
          "Not the main fuel; variety and palatability",
          "Nut butter wraps, cheese, soup noodles, sips of protein drink if tested",
        ),
        sodium: row(
          "400–1200 mg/h highly individual (heat & sweat sodium)",
          "Track total from drinks, broth, chips, caps—per your tested plan",
          "Broth, chips, sports drink, pickle juice (only if practiced), caps",
        ),
        water: row(
          "Often 18–32 fl oz/h in hot ultras; less if cool",
          "Use aid walks to drink; prevent cumulative dehydration",
          "Rotate water + electrolyte drinks",
        ),
        electrolytes: row(
          "Sweet + salty rotation aids palatability and intake",
          "Steady hourly rhythm beats random boluses",
          "Electrolyte drink, tabs, broth, salty snacks (all tested)",
        ),
      },
      post: {
        carbs: row(
          "About 0.45–0.55 g carbs per lb per hour early if appetite allows; else frequent small carb hits",
          "24–72 h of emphasis if back-to-back long days",
          "Pasta, pancakes, juice, fruit, rice bowls, smoothies",
        ),
        protein: row(
          "0.1–0.2 g protein per lb per meal; 40–60 g first meal is common",
          "Repeat every 3–5 h for 24–48 h",
          "Eggs, steak, fish, lentil bowls, Greek yogurt",
        ),
        sodium: row(
          "Replace over 24–48 h with food + drinks",
          "Especially if night cramps or dizziness",
          "Pho, burritos, chips, olives, table salt on meals",
        ),
        water: row(
          "Large volumes spread over 24+ h with sodium-containing meals",
          "Monitor weight, urine, thirst",
          "Water, herbal tea, broth",
        ),
        electrolytes: row(
          "Continue drink mixes until rested and eating normally",
          "Medical dehydration signs: seek care",
          "Sports drink, ORS-style fluids if very depleted (per clinician)",
        ),
      },
    },
  ];

  function getGuideForMiles(miles) {
    const m = Number(miles);
    if (Number.isNaN(m) || m <= 0) {
      return GUIDES[0];
    }
    for (let i = 0; i < GUIDES.length; i += 1) {
      const g = GUIDES[i];
      if (m >= g.minMiles && m < g.maxMiles) {
        return g;
      }
    }
    return GUIDES[GUIDES.length - 1];
  }

  function formatMilesParam(miles) {
    const m = Number(miles);
    if (Number.isNaN(m) || m <= 0) {
      return "";
    }
    const rounded = Math.round(m * 10) / 10;
    return String(rounded);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const METRIC_ROWS = [
    { key: "carbs", label: "Carbohydrates" },
    { key: "protein", label: "Protein" },
    { key: "sodium", label: "Sodium" },
    { key: "water", label: "Water" },
    { key: "electrolytes", label: "Electrolytes" },
  ];

  /** Reference body weight for translating g/lb lines into gram totals on the card. */
  const REF_BODY_LB = 154;

  /**
   * Miles used to scale during-run carb totals (exact from plan/URL, else band midpoint).
   * @param {number | null | undefined} exactMiles
   * @param {typeof GUIDES[number]} guide
   */
  function milesForCarbMath(exactMiles, guide) {
    const m = Number(exactMiles);
    if (exactMiles != null && Number.isFinite(m) && m > 0) {
      return m;
    }
    if (guide.maxMiles === Infinity) {
      return 26;
    }
    return (guide.minMiles + guide.maxMiles) / 2;
  }

  /**
   * Rough duration for carb math (~9 min/mi easy pace), clamped.
   * @param {number | null | undefined} exactMiles
   * @param {typeof GUIDES[number]} guide
   */
  function runDurationHours(exactMiles, guide) {
    const miles = milesForCarbMath(exactMiles, guide);
    const h = (miles * 9) / 60;
    return Math.min(14, Math.max(0.38, h));
  }

  /**
   * Carbohydrates card: show suggested total grams for this phase + distance band.
   * @param {'pre' | 'during' | 'post'} phase
   * @param {typeof GUIDES[number]} guide
   * @param {number | null | undefined} exactMiles
   * @returns {{ main: string, unit: string, sub: string, isNone: boolean } | null} null → use prose parser
   */
  function carbGramsForCard(phase, guide, exactMiles) {
    const w = REF_BODY_LB;
    const m0 = guide.minMiles;
    const mx = guide.maxMiles;
    const h = runDurationHours(exactMiles, guide);
    const mi = milesForCarbMath(exactMiles, guide);
    const miDisp = Math.abs(mi - Math.round(mi)) < 0.05 ? String(Math.round(mi)) : String(Math.round(mi * 10) / 10);
    const distNote = `~${miDisp} mi → ~${h.toFixed(1)} h (9 min/mi est.).`;

    const r = (x) => Math.round(x);

    if (phase === "pre") {
      if (m0 === 0 && mx === 5) {
        return {
          main: "0–50",
          unit: "g",
          sub: `Total carbs if you eat pre-run (${w} lb ref.).`,
          isNone: false,
        };
      }
      if (m0 === 5 && mx === 8) {
        return {
          main: `${r(0.45 * w)}–${r(1.1 * w)}`,
          unit: "g",
          sub: `Typical total 1–3 h before (≈0.45–1.1 g/lb). ${w} lb reference.`,
          isNone: false,
        };
      }
      if (m0 === 8 && mx === 12) {
        return {
          main: `${r(0.9 * w)}–${r(1.6 * w)}`,
          unit: "g",
          sub: `Typical total 2–4 h before (≈0.9–1.6 g/lb). ${w} lb reference.`,
          isNone: false,
        };
      }
      if (m0 === 12 && mx === 16) {
        return {
          main: `${r(1.1 * w)}–${r(1.8 * w)}`,
          unit: "g",
          sub: `Typical total 2–4 h before (≈1.1–1.8 g/lb). ${w} lb reference.`,
          isNone: false,
        };
      }
      if (m0 === 16 && mx === 23) {
        return {
          main: `${r(1.4 * w)}–${r(1.8 * w)}`,
          unit: "g",
          sub: `Typical total 2–4 h before (≈1.4–1.8 g/lb). ${w} lb reference.`,
          isNone: false,
        };
      }
      if (m0 === 23 && mx === Infinity) {
        return {
          main: `${r(0.45 * w)}–${r(1.4 * w)}`,
          unit: "g",
          sub: `Race morning total (≈0.45–1.4 g/lb). Multi-day carb load is separate. ${w} lb ref.`,
          isNone: false,
        };
      }
      return null;
    }

    if (phase === "during") {
      if (m0 === 0 && mx === 5) {
        return {
          main: "0",
          unit: "g",
          sub: `Usually none on the run for ${distNote}`,
          isNone: true,
        };
      }
      if (m0 === 5 && mx === 8) {
        return {
          main: "0–30",
          unit: "g",
          sub: `Total on the run if needed (band cap). ${distNote}`,
          isNone: false,
        };
      }
      if (m0 === 8 && mx === 12) {
        const fuelLo = Math.max(0, h - 0.85);
        const fuelHi = Math.max(0.25, h - 0.2);
        const lo = r(30 * fuelLo);
        const hi = r(60 * fuelHi);
        return {
          main: `${lo}–${hi}`,
          unit: "g",
          sub: `Session total from ~30–60 g/h when fueling. ${distNote}`,
          isNone: lo === 0 && hi === 0,
        };
      }
      if (m0 === 12 && mx === 16) {
        const lo = r(38 * Math.max(0.2, h - 0.25));
        const hi = r(58 * h);
        return {
          main: `${lo}–${hi}`,
          unit: "g",
          sub: `Session total (~45–60 g/h when fueling). ${distNote}`,
          isNone: false,
        };
      }
      if (m0 === 16 && mx === 23) {
        const lo = r(52 * h);
        const hi = r(68 * h);
        return {
          main: `${lo}–${hi}`,
          unit: "g",
          sub: `Session total (~60 g/h typical). ${distNote}`,
          isNone: false,
        };
      }
      if (m0 === 23 && mx === Infinity) {
        const lo = r(55 * h);
        const hi = r(88 * h);
        return {
          main: `${lo}–${hi}`,
          unit: "g",
          sub: `Session total (~60–90 g/h if gut-trained). ${distNote}`,
          isNone: false,
        };
      }
      return null;
    }

    if (phase === "post") {
      if (m0 === 0 && mx === 5) {
        return {
          main: `${r(0.2 * w)}–${r(0.45 * w)}`,
          unit: "g",
          sub: `Only if next meal is 3–4+ h away (${w} lb ref.).`,
          isNone: false,
        };
      }
      if (m0 === 5 && mx === 8) {
        return {
          main: `${r(0.35 * w)}–${r(0.55 * w)}`,
          unit: "g",
          sub: `Target in the first ~2 h if training again soon (${w} lb ref.).`,
          isNone: false,
        };
      }
      if (m0 === 8 && mx === 12) {
        return {
          main: `${r(0.45 * w * 2)}–${r(0.55 * w * 2)}`,
          unit: "g",
          sub: `Aggressive refuel ≈2 h at 0.45–0.55 g/lb/h (${w} lb). Else one ~${r(0.45 * w)} g meal.`,
          isNone: false,
        };
      }
      if (m0 === 12 && mx === 16) {
        return {
          main: `${r(0.45 * w * 2)}–${r(0.55 * w * 3)}`,
          unit: "g",
          sub: `Early window if hard training again <24 h (${w} lb ref.).`,
          isNone: false,
        };
      }
      if (m0 === 16 && mx === 23) {
        return {
          main: `${r(0.45 * w * 2)}–${r(0.55 * w * 4)}`,
          unit: "g",
          sub: `Early refuel if quick turnaround (${w} lb ref.).`,
          isNone: false,
        };
      }
      if (m0 === 23 && mx === Infinity) {
        return {
          main: `${r(0.45 * w * 3)}–${r(0.55 * w * 6)}`,
          unit: "g",
          sub: `Spread over early hours post-finish as appetite allows (${w} lb ref.).`,
          isNone: false,
        };
      }
      return null;
    }

    return null;
  }

  /**
   * Split prose amounts into a prominent number/range + unit (when present) and a shorter subline.
   * @param {string} raw
   * @returns {{ main: string, unit: string, sub: string, isNone: boolean }}
   */
  function parseMetricAmount(raw) {
    const s = String(raw).trim();
    if (!s || s === "—") {
      return { main: "None", unit: "", sub: "", isNone: true };
    }
    const re = /([\d.]+(?:\s*[–\-]\s*[\d.]+)?)\s*(g|mg|fl oz)\b/i;
    const m = s.match(re);
    if (!m) {
      const truncated = s.length > 92 ? `${s.slice(0, 89)}…` : s;
      return { main: truncated, unit: "", sub: "", isNone: false };
    }
    const main = m[1].replace(/\s*-\s*/g, "–").replace(/\s*–\s*/g, "–");
    const u = m[2].toLowerCase();
    const unit = u === "mg" ? "mg" : u === "fl oz" ? "fl oz" : "g";
    const start = m.index;
    const end = start + m[0].length;
    let before = s.slice(0, start).trim().replace(/^[,.;\s]+/, "").replace(/[,.;\s]+$/, "");
    let after = s.slice(end).trim().replace(/^[,.;\s]+/, "");
    let sub = [before, after].filter(Boolean).join(" · ");
    if (sub.length > 130) {
      sub = `${sub.slice(0, 127)}…`;
    }
    return { main, unit, sub, isNone: false };
  }

  /**
   * Decorative bar width for intake cards (not a fuel gauge).
   * @param {{ main: string, unit: string, isNone?: boolean }} parsed
   * @param {string} key
   * @param {string} timingLine
   */
  function intakeBarPercent(parsed, key, timingLine) {
    if (parsed.isNone) {
      return 8;
    }
    let h = 0;
    const seed = `${key}:${parsed.main}|${parsed.unit}|${timingLine}`;
    for (let i = 0; i < seed.length; i += 1) {
      h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
    }
    return 30 + (Math.abs(h) % 58);
  }

  function splitMeals(s) {
    if (!s || s === "—") {
      return [];
    }
    return s
      .split(/[,;]\s*/)
      .map((x) => x.trim())
      .filter(Boolean)
      .filter((x) => x !== "—");
  }

  /**
   * @param {Record<string, { amount: string, timing: string, meals: string }>} data
   * @param {{ phase: 'pre' | 'during' | 'post', guide: typeof GUIDES[number], exactMiles: number | null | undefined }} ctx
   */
  function buildMetricsGrid(data, ctx) {
    const cards = METRIC_ROWS.map(({ key, label }) => {
      const cell = data[key];
      const amt = cell.amount && String(cell.amount).trim() !== "" ? cell.amount : "—";
      const carbOverride = key === "carbs" ? carbGramsForCard(ctx.phase, ctx.guide, ctx.exactMiles) : null;
      const parsed = carbOverride || parseMetricAmount(amt);
      const unitHtml = parsed.unit
        ? `<span class="nutrition-intake-unit">${escapeHtml(parsed.unit)}</span>`
        : "";
      const timRaw = cell.timing && String(cell.timing).trim() ? cell.timing.trim() : "";
      const timDisplay = timRaw === "" || timRaw === "—" ? "—" : timRaw;
      const titleBits = [amt, timDisplay].filter((x) => x && x !== "—").join(" — ");
      const pct = intakeBarPercent(parsed, key, timDisplay);
      return `<article class="nutrition-intake-card nutrition-intake-card--${key}" title="${escapeHtml(`${label}: ${titleBits || amt}`)}">
        <h4 class="nutrition-intake-label">${escapeHtml(label)}</h4>
        <p class="nutrition-intake-value-row">
          <span class="nutrition-intake-value">${escapeHtml(parsed.main)}</span>${unitHtml ? ` ${unitHtml}` : ""}
        </p>
        <p class="nutrition-intake-timing">${escapeHtml(timDisplay)}</p>
        <div class="nutrition-intake-bar" aria-hidden="true"><span class="nutrition-intake-bar-fill" style="width:${pct}%"></span></div>
      </article>`;
    }).join("");
    return `<section class="nutrition-amounts-section" aria-label="Target amounts for this phase">
      <h3 class="nutrition-subsection-title nutrition-amounts-heading">How much to take in</h3>
      <div class="nutrition-intake-grid">${cards}</div>
    </section>`;
  }

  /**
   * @param {Record<string, { amount: string, timing: string, meals: string }>} data
   */
  function buildMealRow(data) {
    const seen = new Set();
    const meals = [];
    METRIC_ROWS.forEach(({ key }) => {
      splitMeals(data[key].meals).forEach((m) => {
        const norm = m.toLowerCase();
        if (!seen.has(norm)) {
          seen.add(norm);
          meals.push(m);
        }
      });
    });
    const slice = meals.slice(0, 14);
    if (!slice.length) {
      return "";
    }
    const cards = slice
      .map(
        (m) =>
          `<div class="nutrition-meal-card"><span class="nutrition-meal-card-title">${escapeHtml(m)}</span></div>`,
      )
      .join("");
    return `<section class="nutrition-meal-block" aria-label="Suggested foods">
      <h3 class="nutrition-subsection-title">Suggested meals &amp; foods</h3>
      <div class="nutrition-meal-row">${cards}</div>
    </section>`;
  }

  /**
   * @param {Record<string, { amount: string, timing: string, meals: string }>} data
   */
  function buildPhaseExtra(data) {
    const meals = buildMealRow(data);
    if (!meals.trim()) {
      return "";
    }
    return `<details class="nutrition-phase-details">
      <summary class="nutrition-phase-details-summary">Food examples</summary>
      <div class="nutrition-phase-details-body">${meals}</div>
    </details>`;
  }

  /**
   * @param {Record<string, { amount: string, timing: string, meals: string }>} data
   * @param {'pre' | 'during' | 'post'} phase
   * @param {typeof GUIDES[number]} guide
   * @param {number | null | undefined} exactMiles
   */
  function buildPhaseBody(data, phase, guide, exactMiles) {
    return `${buildMetricsGrid(data, { phase, guide, exactMiles })}${buildPhaseExtra(data)}`;
  }

  function buildDailyBasicsPanel() {
    return `<div class="nutrition-daily-panel">
      <p class="nutrition-daily-lede">For day-to-day eating patterns, long-run strategy, and hydration big picture, use <strong>Fueling basics</strong>. This page stays focused on amounts for a single run length.</p>
      <a class="nutrition-daily-cta" href="nutrition-basics.html">Open Fueling basics</a>
    </div>`;
  }

  /**
   * @param {typeof GUIDES[number]} guide
   * @param {number | null} exactMiles run distance from plan / ?miles= (optional)
   */
  function buildTabbedGuide(guide, exactMiles) {
    const m = Number(exactMiles);
    const hasExact = exactMiles != null && Number.isFinite(m) && m > 0;
    const exactStr = hasExact ? formatMilesParam(m) : "";
    const milesSummary = hasExact
      ? `${escapeHtml(exactStr)} mi`
      : escapeHtml(guide.label);
    const bandnote = `<p class="nutrition-guide-callout-bandnote">This band describes a typical <strong>${escapeHtml(
      guide.label,
    )}</strong> run—adjust for pace, heat, and health. “How much to take in” totals use <strong>~9 min/mi</strong> to convert distance to hours unless your link includes exact miles.</p>`;
    const calloutBody = `<p class="nutrition-guide-callout-text">${escapeHtml(guide.blurb)}</p>${bandnote}`;
    const calloutHtml = `<details class="nutrition-guide-callout">
      <summary class="nutrition-guide-callout-summary">
        <span class="nutrition-guide-callout-summary-label">Distance &amp; fuel context</span>
        <span class="nutrition-guide-callout-summary-miles">${milesSummary}</span>
      </summary>
      <div class="nutrition-guide-callout-body">${calloutBody}</div>
    </details>`;

    return `<div class="nutrition-guide-app">
      <div class="nutrition-phase-tablist" role="tablist" aria-label="Fueling phase">
        <button type="button" class="nutrition-phase-tab" role="tab" id="nut-tab-pre" aria-controls="nut-panel-pre" aria-selected="true" data-phase="pre">Pre-run</button>
        <button type="button" class="nutrition-phase-tab" role="tab" id="nut-tab-during" aria-controls="nut-panel-during" aria-selected="false" tabindex="-1" data-phase="during">During run</button>
        <button type="button" class="nutrition-phase-tab" role="tab" id="nut-tab-post" aria-controls="nut-panel-post" aria-selected="false" tabindex="-1" data-phase="post">Post-run</button>
        <button type="button" class="nutrition-phase-tab" role="tab" id="nut-tab-daily" aria-controls="nut-panel-daily" aria-selected="false" tabindex="-1" data-phase="daily">Daily basics</button>
      </div>
      ${calloutHtml}
      <div class="nutrition-tabpanels">
        <div class="nutrition-phase-panel is-active" role="tabpanel" id="nut-panel-pre" aria-labelledby="nut-tab-pre">${buildPhaseBody(
          guide.pre,
          "pre",
          guide,
          exactMiles,
        )}</div>
        <div class="nutrition-phase-panel" role="tabpanel" id="nut-panel-during" aria-labelledby="nut-tab-during" hidden>${buildPhaseBody(
          guide.during,
          "during",
          guide,
          exactMiles,
        )}</div>
        <div class="nutrition-phase-panel" role="tabpanel" id="nut-panel-post" aria-labelledby="nut-tab-post" hidden>${buildPhaseBody(
          guide.post,
          "post",
          guide,
          exactMiles,
        )}</div>
        <div class="nutrition-phase-panel" role="tabpanel" id="nut-panel-daily" aria-labelledby="nut-tab-daily" hidden>${buildDailyBasicsPanel()}</div>
      </div>
    </div>`;
  }

  function bindPhaseTabs(appRoot) {
    if (!appRoot) {
      return;
    }
    const tablist = appRoot.querySelector('.nutrition-phase-tablist[role="tablist"]');
    if (!tablist) {
      return;
    }
    const tabs = [...tablist.querySelectorAll('.nutrition-phase-tab[role="tab"]')];
    const panels = tabs.map((t) => {
      const id = t.getAttribute("aria-controls");
      return id ? appRoot.querySelector(`#${id}`) : null;
    });

    function activate(tab) {
      tabs.forEach((btn, idx) => {
        const on = btn === tab;
        btn.setAttribute("aria-selected", String(on));
        btn.tabIndex = on ? 0 : -1;
        const panel = panels[idx];
        if (panel) {
          panel.hidden = !on;
          panel.classList.toggle("is-active", on);
        }
      });
    }

    tablist.addEventListener("click", (e) => {
      const btn = e.target.closest('.nutrition-phase-tab[role="tab"]');
      if (!btn || !tablist.contains(btn)) {
        return;
      }
      activate(btn);
    });

    tablist.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) {
        return;
      }
      let next = i;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = (i + 1) % tabs.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = (i - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        next = 0;
      } else if (e.key === "End") {
        next = tabs.length - 1;
      } else {
        return;
      }
      e.preventDefault();
      tabs[next].focus();
      activate(tabs[next]);
    });
  }

  /**
   * @param {HTMLElement} root
   * @param {typeof GUIDES[number]} guide
   * @param {number | null} exactMiles
   */
  function renderGuide(root, guide, exactMiles) {
    root.innerHTML = buildTabbedGuide(guide, exactMiles);
    bindPhaseTabs(root.querySelector(".nutrition-guide-app"));
  }

  /**
   * @param {HTMLElement} output
   */
  function renderMileageMissing(output) {
    output.innerHTML = `<div class="nutrition-mileage-missing" role="status">
      <p class="nutrition-mileage-missing-lead">No run distance in this link.</p>
      <p class="nutrition-mileage-missing-hint">Go to your <a href="plan.html">Weekly plan</a> and tap <strong>Nutrition</strong> (or the run line) for the day you want to fuel.</p>
    </div>`;
  }

  function init() {
    const output = document.getElementById("nutrition-guide-output");

    if (!output) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const milesParam = params.get("miles");
    if (milesParam != null && milesParam !== "") {
      const parsed = parseFloat(milesParam);
      if (!Number.isNaN(parsed) && parsed > 0) {
        const guide = getGuideForMiles(parsed);
        renderGuide(output, guide, parsed);
        return;
      }
    }

    renderMileageMissing(output);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
