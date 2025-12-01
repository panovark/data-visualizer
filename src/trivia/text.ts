const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
};

export const decodeHtmlEntities = (text?: string | null): string => {
  if (!text || typeof text !== "string") {
    return text ?? "";
  }

  return text.replace(/&(amp|lt|gt|quot|#039|apos);/g, (entity) => {
    return ENTITY_MAP[entity] ?? entity;
  });
};

export default decodeHtmlEntities;
