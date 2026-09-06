// Rough reading time in minutes, based on ~220 words per minute.
export function readingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}
