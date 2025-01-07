export const defaultColors = (length: number): string[] => {
  const baseColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--destructive))',
  ]
  
  return Array(length).fill(0).map((_, i) => baseColors[i % baseColors.length])
} 