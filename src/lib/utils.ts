export function formatDate(date: string | Date, locale = 'en'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getDaysLeft(deadline: string): number {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isExpired(deadline: string): boolean {
  return new Date(deadline).getTime() < Date.now();
}

export function isExpiringSoon(deadline: string): boolean {
  const days = getDaysLeft(deadline);
  return days > 0 && days <= 7;
}

export function truncate(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function joinArray(arr: string[], separator = ', '): string {
  return arr.join(separator);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}