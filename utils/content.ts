// Function to convert kebab-case to Title Case
export function toTitleCase(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
