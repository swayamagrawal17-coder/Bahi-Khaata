const MONTHS = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

// "March 15, 2026" -> "15-03-2026"
export function formatDate(dateStr = "") {
  const [month, day, year] = dateStr.replace(",", "").split(/\s+/);
  const mm = MONTHS[month] ?? "00";
  const dd = String(day ?? "").padStart(2, "0");
  return `${dd}-${mm}-${year ?? ""}`;
}
