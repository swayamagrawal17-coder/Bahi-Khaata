// Rough reading time in minutes, based on ~220 words per minute.
// `unit` is the word shown after the number ("min", "मिनट", ...).
export function readingTime(text = "", unit = "min") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} ${unit}`;
}
