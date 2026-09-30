import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "badge-green";
    case "in_progress":
      return "badge-cyan";
    case "planned":
      return "badge-amber";
    case "archived":
      return "badge-red";
    default:
      return "badge-indigo";
  }
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In Progress";
    case "planned":
      return "Planned";
    case "archived":
      return "Archived";
    default:
      return status;
  }
}
