// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}


export function getNotificationTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  // Helper function to format dates as "Today", "Yesterday", etc.
  const formatDateDifference = (diffDays) => {
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Calculate the difference in days
  const timeDiff = now - date;
  const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Format the time as "Today", "Yesterday", or "X days ago"
  return formatDateDifference(diffDays);
}

export function isAdmin(roles: string) {
  return roles.includes('ROLE_ADMIN') ? "ADMIN" : roles.includes('ROLE_STUDENT') ? "STUDENT" : null
}
