import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function parseToDate(dateStr) {
  let year = null;
  let month = null;
  if (dateStr.match(/^\d{4}-\d{2}$/)) {
    const parts = dateStr.split("-");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const parts = dateStr.split("-");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}\.\d{2}$/)) {
    const parts = dateStr.split(".");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}\/\d{2}$/)) {
    const parts = dateStr.split("/");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  }
  if (year !== null && month !== null) {
    return new Date(Date.UTC(year, month - 1, 1));
  }
  return null;
}
function formatDateString(dateStr, locale = "zh") {
  if (!dateStr) return "";
  if (dateStr.includes(" - ")) {
    const [start, end] = dateStr.split(" - ");
    return `${formatDateString(start, locale)} - ${formatDateString(end, locale)}`;
  }
  const date = parseToDate(dateStr);
  if (!date) return dateStr;
  try {
    if (locale === "zh" || locale === "zh-CN") {
      return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      timeZone: "UTC"
    });
    return formatter.format(date);
  } catch (e) {
    return dateStr;
  }
}
export {
  cn as c,
  formatDateString as f
};
