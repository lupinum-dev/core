import type { Hsl, Oklab, Oklch, Rgb } from 'culori'
import { converter, formatHex, formatRgb, parse } from 'culori'

export interface Color {
  name: string
  l: number
  c: number
  h: number
  alpha?: number
}

export type ColorMode = 'oklch' | 'rgb' | 'hsl' | 'oklab'

const oklchConverter = converter('oklch')
const rgbConverter = converter('rgb')
const hslConverter = converter('hsl')
const oklabConverter = converter('oklab')

export function interpolate(value: number, min: number, max: number): number {
  return min + (value / 100) * (max - min)
}

export function roundTo(num: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(num * factor) / factor
}

export function oklchToRgb(l: number, c: number, h: number): { r: number, g: number, b: number } {
  const rgb = rgbConverter({ mode: 'oklch', l, c, h } as Oklch) as Rgb
  const result = {
    r: Math.round(rgb.r * 255),
    g: Math.round(rgb.g * 255),
    b: Math.round(rgb.b * 255),
  }

  return result
}

export function oklchToHsl(l: number, c: number, h: number): { h: number, s: number, l: number } {
  const hsl = hslConverter({ mode: 'oklch', l, c, h } as Oklch) as Hsl
  return {
    h: roundTo(hsl.h || 0, 1),
    s: roundTo(hsl.s * 100, 1),
    l: roundTo(hsl.l * 100, 1),
  }
}

export function oklchToOklab(l: number, c: number, h: number): { L: number, a: number, b: number } {
  const oklab = oklabConverter({ mode: 'oklch', l, c, h } as Oklch) as Oklab
  return {
    L: roundTo(oklab.l, 3),
    a: roundTo(oklab.a, 3),
    b: roundTo(oklab.b, 3),
  }
}

export function rgbToOklch(r: number, g: number, b: number): { l: number, c: number, h: number } {
  const oklch = oklchConverter({ mode: 'rgb', r: r / 255, g: g / 255, b: b / 255 } as Rgb) as Oklch
  return {
    l: roundTo(oklch.l, 3),
    c: roundTo(oklch.c, 3),
    h: roundTo(oklch.h || 0, 1),
  }
}

export function hslToOklch(h: number, s: number, l: number): { l: number, c: number, h: number } {
  const oklch = oklchConverter({ mode: 'hsl', h, s: s / 100, l: l / 100 } as Hsl) as Oklch
  const result = {
    l: roundTo(oklch.l, 3),
    c: roundTo(oklch.c, 3),
    h: roundTo(oklch.h || 0, 1),
  }

  return result
}

export function oklabToOklch(L: number, a: number, b: number): { l: number, c: number, h: number } {
  const oklch = oklchConverter({ mode: 'oklab', l: L, a, b } as Oklab) as Oklch
  return {
    l: roundTo(oklch.l, 3),
    c: roundTo(oklch.c, 3),
    h: roundTo(oklch.h || 0, 1),
  }
}

export function oklchToHex(l: number, c: number, h: number): string {
  return formatHex({ mode: 'oklch', l, c, h } as Oklch)
}

export function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  const rgb = rgbConverter({ mode: 'hsl', h, s: s / 100, l: l / 100 } as Hsl) as Rgb
  return {
    r: Math.round(rgb.r * 255),
    g: Math.round(rgb.g * 255),
    b: Math.round(rgb.b * 255),
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  return formatHex({ mode: 'hsl', h, s: s / 100, l: l / 100 } as Hsl)
}

export function hslToHsv(h: number, s: number, l: number): { h: number, s: number, v: number } {
  const hsv = converter('hsv')({ mode: 'hsl', h, s: s / 100, l: l / 100 } as Hsl)
  return {
    h: roundTo(hsv.h || 0, 1),
    s: roundTo(hsv.s * 100, 1),
    v: roundTo(hsv.v * 100, 1),
  }
}

export function parseInputColor(input: { name: string, color: string, type: string }): { name: string, h: number, s: number, l: number } {
  let h: number, s: number, l: number;

  switch (input.type) {
    case 'hsl':
      if (input.color.startsWith('hsl')) {
        const match = input.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (match) {
          [, h, s, l] = match.map(Number);
        } else {
          throw new Error('Invalid HSL format');
        }
      } else {
        [h, s, l] = input.color.split(',').map(Number);
      }
      break;
    case 'rgb':
      let r: number, g: number, b: number;
      if (input.color.startsWith('rgb')) {
        const match = input.color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          [, r, g, b] = match.map(Number);
        } else {
          throw new Error('Invalid RGB format');
        }
      } else {
        [r, g, b] = input.color.split(',').map(Number);
      }
      const hslColor = rgbToHsl(r, g, b);
      h = hslColor.h;
      s = hslColor.s;
      l = hslColor.l;
      break;
    case 'hex':
      const hex = input.color.startsWith('#') ? input.color.slice(1) : input.color;
      const rgb = hexToRgb(hex);
      const hslFromHex = rgbToHsl(rgb.r, rgb.g, rgb.b);
      h = hslFromHex.h;
      s = hslFromHex.s;
      l = hslFromHex.l;
      break;
    default:
      throw new Error('Unsupported color type');
  }

  return { name: input.name, h, s, l };
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}
