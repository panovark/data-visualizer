const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
};

export const decodeHtmlEntities = (text = "") => {
  if (typeof text !== "string" || text.length === 0) {
    return text ?? "";
  }

  return text.replace(/&(amp|lt|gt|quot|#039|apos);/g, (entity) => {
    return ENTITY_MAP[entity] ?? entity;
  });
};

export default decodeHtmlEntities;
