export const DEFAULT_MEDIA = {
  profile: {
    label: "Foto de perfil (Sobre)",
    url: "/assets/images/profile.jpg",
    altText: "Imagem de Gabriel",
    sortOrder: 1,
  },
  logo_navbar: {
    label: "Logo da navbar",
    url: "/assets/logos/Imagologo verde.png",
    altText: "Logo Gabriel Rodrigues",
    sortOrder: 2,
  },
  logo_hero: {
    label: "Logo do hero",
    url: "/assets/logos/Isologoverde.png",
    altText: "Logo Gabriel Rodrigues",
    sortOrder: 3,
  },
  logo_hero_hover: {
    label: "Logo do hero (hover)",
    url: "/assets/logos/Isologomescla.png",
    altText: "Logo Gabriel Rodrigues",
    sortOrder: 4,
  },
  hero_bg: {
    label: "Fundo do hero",
    url: "/assets/backgrounds/binary.jpg",
    altText: "",
    sortOrder: 5,
  },
  services_bg: {
    label: "Fundo da seção Serviços",
    url: "/assets/backgrounds/binary.jpg",
    altText: "",
    sortOrder: 6,
  },
  id1: {
    label: "Identidade visual 1",
    url: "/assets/images/id1.png",
    altText: "Descrição 1 da Identidade Visual",
    sortOrder: 7,
  },
  id2: {
    label: "Identidade visual 2",
    url: "/assets/images/id2.png",
    altText: "Descrição 3 da Identidade Visual",
    sortOrder: 8,
  },
  id3: {
    label: "Identidade visual 3",
    url: "/assets/images/id3.png",
    altText: "Descrição 2 da Identidade Visual",
    sortOrder: 9,
  },
};

/** Encode path segments so spaces/special chars work with next/image and CSS url(). */
export function normalizeMediaSrc(src) {
  if (!src || typeof src !== "string") return "";
  const trimmed = src.trim();
  if (!trimmed) return "";
  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }
  return trimmed
    .split("/")
    .map((part, index) => {
      if (index === 0) return part;
      try {
        return encodeURIComponent(decodeURIComponent(part));
      } catch {
        return encodeURIComponent(part);
      }
    })
    .join("/");
}

export function isLocalMediaSrc(src) {
  return Boolean(src && src.startsWith("/") && !src.startsWith("//"));
}

export function buildMediaMap(rows = []) {
  const map = {};
  for (const [key, defaults] of Object.entries(DEFAULT_MEDIA)) {
    map[key] = {
      key,
      label: defaults.label,
      url: normalizeMediaSrc(defaults.url),
      altText: defaults.altText,
      sortOrder: defaults.sortOrder,
    };
  }
  for (const row of rows) {
    if (!row?.key) continue;
    map[row.key] = {
      key: row.key,
      label: row.label || map[row.key]?.label || row.key,
      url: normalizeMediaSrc(row.url || map[row.key]?.url || ""),
      altText: row.altText || map[row.key]?.altText || "",
      sortOrder: row.sortOrder ?? map[row.key]?.sortOrder ?? 0,
      id: row.id,
    };
  }
  return map;
}

export function mediaUrl(mediaMap, key, fallback) {
  const fromMap = mediaMap?.[key]?.url;
  if (fromMap) return fromMap;
  if (fallback) return normalizeMediaSrc(fallback);
  return normalizeMediaSrc(DEFAULT_MEDIA[key]?.url || "");
}

export function mediaAlt(mediaMap, key, fallback = "") {
  return mediaMap?.[key]?.altText || DEFAULT_MEDIA[key]?.altText || fallback;
}
