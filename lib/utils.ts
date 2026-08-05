import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidImageSrc(src?: string | null): src is string {
  return typeof src === "string" && src.length > 0 && (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://"))
}

export function safeImageSrc(src?: string | null, fallback = "/home-photo-1.png") {
  return isValidImageSrc(src) ? src : fallback
}
