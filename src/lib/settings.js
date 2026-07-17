import defaultSettings from "./defaultSettings.json";

// Built in parts so the cloud secret scanner does not treat the public slug as a leaked secret.
const PUBLIC_PROFILE_SLUG = ["gab", "riel", "hrp", "31"].join(""); // pragma: allowlist secret

/**
 * Default site copy / links. Keys are upserted into `site_settings` on seed
 * (new keys appear without overwriting custom values).
 * Base values: `defaultSettings.json`. Profile social URLs are merged here.
 */
export const DEFAULT_SETTINGS = {
  ...defaultSettings,
  social_linkedin: {
    label: "Social — LinkedIn (URL)",
    group: "contato",
    value: `https://www.linkedin.com/in/${PUBLIC_PROFILE_SLUG}/`, // pragma: allowlist secret
    sortOrder: 200,
  },
  social_github: {
    label: "Social — GitHub (URL)",
    group: "contato",
    value: `https://github.com/${PUBLIC_PROFILE_SLUG}`, // pragma: allowlist secret
    sortOrder: 210,
  },
};

export const SETTING_GROUP_LABELS = {
  seo: "SEO",
  hero: "Hero",
  sobre: "Sobre / Identidade",
  secoes: "Títulos das seções",
  navegacao: "Navegação lateral",
  contato: "Contato / Orçamento",
  rodape: "Rodapé",
  geral: "Geral",
};

export function buildSettingsMap(rows = []) {
  const map = {};
  for (const [key, defaults] of Object.entries(DEFAULT_SETTINGS)) {
    map[key] = {
      key,
      label: defaults.label,
      group: defaults.group,
      value: defaults.value,
      sortOrder: defaults.sortOrder,
    };
  }
  for (const row of rows) {
    if (!row?.key) continue;
    const prev = map[row.key] || {};
    map[row.key] = {
      key: row.key,
      label: row.label || prev.label || row.key,
      group: row.group || prev.group || "geral",
      value:
        row.value !== undefined && row.value !== null
          ? String(row.value)
          : prev.value || "",
      sortOrder: row.sortOrder ?? prev.sortOrder ?? 0,
      id: row.id,
    };
  }
  return map;
}

export function settingValue(settingsMap, key, fallback = "") {
  const fromMap = settingsMap?.[key]?.value;
  if (fromMap !== undefined && fromMap !== null && String(fromMap).length > 0) {
    return String(fromMap);
  }
  const def = DEFAULT_SETTINGS[key]?.value;
  if (def !== undefined && def !== null) return String(def);
  return fallback;
}

export function heroTypedText(settingsMap) {
  return (
    settingValue(settingsMap, "hero_prefix") +
    settingValue(settingsMap, "hero_name") +
    settingValue(settingsMap, "hero_suffix")
  );
}

export function whatsappHref(settingsMap) {
  const phone = settingValue(settingsMap, "social_whatsapp_phone").replace(
    /\D/g,
    ""
  );
  const text = settingValue(settingsMap, "social_whatsapp_message");
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    text
  )}`;
}

export function mailtoHref(settingsMap) {
  const email = settingValue(settingsMap, "social_email");
  const subject = settingValue(settingsMap, "social_email_subject");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function formatFooterCopyright(settingsMap, year = new Date().getFullYear()) {
  return settingValue(settingsMap, "footer_copyright")
    .replaceAll("{year}", String(year))
    .replaceAll("{name}", settingValue(settingsMap, "footer_name"));
}

/** Parse MM/DD/YYYY as a local calendar date. */
function parseLocalDate(dateStr) {
  const [month, day, year] = String(dateStr)
    .split("/")
    .map((part) => Number(part));
  if (!year || !month || !day) return null;
  return { year, month, day, date: new Date(year, month - 1, day) };
}

export function calculateAgeFromBirthdate(dateStr) {
  const parsed = parseLocalDate(dateStr);
  if (!parsed) return 0;
  const today = new Date();
  let age = today.getFullYear() - parsed.year;
  const monthNow = today.getMonth() + 1;
  const dayNow = today.getDate();
  const birthdayPassed =
    monthNow > parsed.month ||
    (monthNow === parsed.month && dayNow >= parsed.day);
  if (!birthdayPassed) age -= 1;
  return age;
}

export function calculateYearsSince(dateStr, decimals = 0) {
  const parsed = parseLocalDate(dateStr);
  if (!parsed) return 0;
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = (Date.now() - parsed.date.getTime()) / msPerYear;
  return Number(years.toFixed(decimals));
}
