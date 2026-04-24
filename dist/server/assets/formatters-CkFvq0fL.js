function formatSessionDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.toUpperCase();
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}
function formatSessionTime(value) {
  if (!value) {
    return "";
  }
  const parts = value.split(":");
  if (parts.length < 2) {
    return value;
  }
  const hours = Number(parts[0]);
  const minutes = parts[1]?.slice(0, 2) ?? "00";
  if (Number.isNaN(hours)) {
    return value;
  }
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHour = (hours + 11) % 12 + 1;
  return `${normalizedHour}:${minutes} ${suffix}`;
}
export {
  formatSessionTime as a,
  formatSessionDate as f
};
